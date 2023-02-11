import redis
import pandas as pd

conn = redis.Redis(host='localhost', port=6379, db=0)
pubsub = conn.pubsub()
pubsub.subscribe('recommendation_request')

for message in pubsub.listen():
    if message['type'] == 'message':
        requestData = pd.read_json(message['data'])
        print(requestData)