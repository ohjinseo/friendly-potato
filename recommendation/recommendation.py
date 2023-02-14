import redis
import json
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

conn = redis.Redis(host='localhost', port=6379, db=0)
pubsub = conn.pubsub()
pubsub.subscribe('recommendation_request')

def recommend_recipes(user_recipe_matrix, userId):
    # cosine_similarity = 각 행 (userId) 간의 코사인 유사도 구함
    cosine_similarities = cosine_similarity(user_recipe_matrix)
    print(user_recipe_matrix)
    print(cosine_similarities)

    user_index = user_recipe_matrix.index.get_loc(userId)

    # user_id 사용자와 가장 유사한 사용자 5명
    most_similar_users = cosine_similarities[user_index].argsort()[:-5:-1]
    print(user_index)
    print(cosine_similarities[user_index].argsort())
    print()

    # 5명의 각 레시피 id에 대해 평균을 취함
    avg_interaction = user_recipe_matrix.iloc[most_similar_users].mean()
    print(user_recipe_matrix.loc[userId] == 0)
    print(avg_interaction)

    # 현재 사용자가 아직 접하지 않은 레시피 뽑음
    recommended_recipes = avg_interaction[user_recipe_matrix.loc[userId] == 0].index.tolist()

    return recommended_recipes


for message in pubsub.listen():
    if message['type'] == 'message':
        requestData = json.loads(message["data"].decode("utf-8"))
        userId = requestData['userId']
        visits = requestData['visits']
        favorites = requestData['favorites']

        visits_df = pd.DataFrame(visits)
        scaler = MinMaxScaler()
        visits_df['timeSpent'] = scaler.fit_transform(visits_df[['timeSpent']])
        favorites_df = pd.DataFrame(favorites)

        # user_id를 행, recipe_id를 열로 피봇 테이블 생성 (nan 값은 0으로 채움)
        user_recipe_matrix = pd.pivot_table(visits_df, values='timeSpent', index='userId', columns='recipeId', fill_value=0)

        # 즐겨 찾기 = 2로 설정
        for index, row in favorites_df.iterrows():
            user_recipe_matrix.at[row['userId'], row['recipeId']] = 2
        
        # 값을 0~1 사이의 범위로 정규화
        user_recipe_matrix = user_recipe_matrix.apply(lambda x: (x - x.min()) / (x.max() - x.min()), axis=1)
        recommendations = recommend_recipes(user_recipe_matrix, userId)

        conn.publish('recommendation_response', json.dumps(recommendations))