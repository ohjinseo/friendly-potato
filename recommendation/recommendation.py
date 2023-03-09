import redis
import json
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

conn = redis.Redis(host='localhost', port=6379, db=0)
pubsub = conn.pubsub()
pubsub.subscribe('recommendation_request')

def create_item_user_matrix(visits_df, favorites_df, likes_df):

    timeSpentWeight = 0.5
    favoriteWeight = 0.3
    likeWeight = 0.2

    # 각 레시피와 유저간의 상호작용을 0으로 초기화된 데이터프레임 생성
    recipe_ids = pd.concat([visits_df['recipeId'], favorites_df['recipeId'], likes_df['recipeId']]).unique()
    item_user_matrix = pd.DataFrame(0, index=recipe_ids, columns=visits_df['userId'].unique())

    # 레시피 체류 시간에 비례해서 상호작용 값 계산
    for idx, row in visits_df.iterrows():
        item_user_matrix.loc[row['recipeId'], row['userId']] += row['timeSpent'] / visits_df['timeSpent'].max() * timeSpentWeight
    
    # 즐겨찾기에 대한 상호작용 값 2 추가
    for idx, row in favorites_df.iterrows():
        
        item_user_matrix.loc[row['recipeId'], row['userId']] += 1 * favoriteWeight

        # 좋아요에 대한 상호작용 값 추가
    for idx, row in likes_df.iterrows():
        item_user_matrix.loc[row['recipeId'], row['userId']] += 1 * likeWeight

    
    return item_user_matrix

def recommend_recipes(item_user_matrix, recipeId):
    # cosine_similarity = 각 행 (recipeId) 간의 코사인 유사도 구함
    cosine_similarities = cosine_similarity(item_user_matrix)
    recipe_index = item_user_matrix.index.get_loc(recipeId)
    print('-------------------2-------------------')
    print(item_user_matrix)
    print()
    print(cosine_similarities)
    print()

    # 현재 레시피와 가장 유사한 5개의 레시피를 찾음
    most_similar_recipes = cosine_similarities[recipe_index].argsort()[:-6:-1]

    # 가장 유사한 5개의 레시피를 추천
    recommended_recipes = item_user_matrix.iloc[most_similar_recipes].index.tolist()

    print(most_similar_recipes)
    print()
    print(item_user_matrix.iloc[most_similar_recipes])
    print()
    print(recommended_recipes)
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
        item_user_matrix = create_item_user_matrix(visits_df, favorites_df, likes_df)

        print('-------------------0-------------------')
        print(item_user_matrix)
        print()

        recommendations = recommend_recipes(item_user_matrix, recipeId)

        conn.publish('recommendation_response', json.dumps(recommendations))

        