import redis
import json
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

conn = redis.Redis(host='localhost', port=6379, db=0)
pubsub = conn.pubsub()
pubsub.subscribe('recommendation_request')

def create_interactions_df(visits_df, favorites_df, likes_df):

    timeSpentWeight = 0.5
    favoriteWeight = 0.3
    likeWeight = 0.2

    # 각 레시피와 유저간의 상호작용을 0으로 초기화된 데이터프레임 생성
    recipe_ids = pd.concat([visits_df['recipeId'], favorites_df['recipeId'], likes_df['recipeId']]).unique()
    interactions_df = pd.DataFrame(0, index=recipe_ids, columns=visits_df['userId'].unique())

    # 레시피 체류 시간에 비례해서 상호작용 값 계산
    for idx, row in visits_df.iterrows():
        interactions_df.loc[row['recipeId'], row['userId']] += row['timeSpent'] / visits_df['timeSpent'].max() * timeSpentWeight
    
    # 즐겨찾기에 대한 상호작용 값 2 추가
    for idx, row in favorites_df.iterrows():
        
        interactions_df.loc[row['recipeId'], row['userId']] += 1 * favoriteWeight

        # 좋아요에 대한 상호작용 값 추가
    for idx, row in likes_df.iterrows():
        interactions_df.loc[row['recipeId'], row['userId']] += 1 * likeWeight

    
    return interactions_df

def recommend_recipes(item_recipe_matrix, recipeId):
    # cosine_similarity = 각 행 (recipeId) 간의 코사인 유사도 구함
    cosine_similarities = cosine_similarity(item_recipe_matrix)
    recipe_index = item_recipe_matrix.index.get_loc(recipeId)

    # 현재 레시피와 가장 유사한 5개의 레시피를 찾음
    most_similar_recipes = cosine_similarities[recipe_index].argsort()[:-6:-1]

    # 가장 유사한 레시피들의 평균 상호작용 값에 따라 추천
    recommended_recipes = item_recipe_matrix.iloc[most_similar_recipes].mean(axis=1).nlargest(5).index.tolist()

    return recommended_recipes

for message in pubsub.listen():
    if message['type'] == 'message':
        requestData = json.loads(message["data"].decode("utf-8"))
        recipeId = requestData['recipeId']
        visits = requestData['visits']
        favorites = requestData['favorites']
        likes = requestData['likes']

        visits_df = pd.DataFrame(visits)
        favorites_df = pd.DataFrame(favorites)
        likes_df = pd.DataFrame(likes)

        # 각 레시피와 유저간의 상호작용을 나타내는 데이터프레임 생성
        interactions_df = create_interactions_df(visits_df, favorites_df, likes_df)

        # 상호작용 값 정규화
        scaler = MinMaxScaler()
        interactions_df_scaled = interactions_df.apply(lambda x: x/x.max(), axis=1)

        # 아이템 기반 협업 필터링을 위한 데이터프레임 생성
        item_recipe_matrix = interactions_df_scaled.T

        recommendations = recommend_recipes(item_recipe_matrix, recipeId)

        conn.publish('recommendation_response', json.dumps(recommendations))