import json
import os
import requests
from pymongo import IndexModel, ASCENDING, DESCENDING, TEXT, GEOSPHERE
from RabbitmqConn import RabbitmqConn
from MongodbConn import MongodbConn
from dotenv import load_dotenv
from itertools import repeat


class Worker():
    def __init__(self, key) -> None:
        self.key = key
        # threading.Thread.__init__(self)
        self.rabbitmq = RabbitmqConn()
        self.queueName = 'restaurants'
        self.rabbitmq.QueueDeclare(self.queueName)
        self.channel = self.rabbitmq.channel
        # DB
        self.mongo1 = MongodbConn()
        self.mongo2 = MongodbConn()
        self.restaurantCollection = self.mongo1.setCollection('restaurants')
        self.reviewCollection = self.mongo2.setCollection('reviews')

        try:
            self.restaurantCollection.create_index([("location", GEOSPHERE)])
            self.reviewCollection.create_index(
                [("author_id", ASCENDING)])
            self.reviewCollection.create_index([("restautant_id", TEXT)])
        except:
            print("An exception occurred")
        pass

    def GetRestaurant(self):
        def parseReviews(review, place_id):
            try:
                author_id = review['author_url'].split('/')[5]
                objID = author_id + place_id[-5:]
                r =  {
                    'author_name': review['author_name'],
                    'author_id': author_id,
                    'restautant_id': place_id,
                    'score': review['rating'],
                }
                self.reviewCollection.update_one({'_id':objID},{'$set':r},upsert=True)
            except Exception as e:
                print(e)

        def parseDetail(detail: dict):
            opening_hours = detail.get(
                'opening_hours', 'close')
            if opening_hours == 'close':
                print('close')
                return opening_hours
            return {
                'address': detail['formatted_address'],
                'weekday_text': opening_hours['weekday_text'],
                'photo_id': detail.get('photos',[{'photo_reference':''}])[0]['photo_reference'],
                'url': detail['url']
            }

        def getDetails(place_id: str):
            url = 'https://maps.googleapis.com/maps/api/place/details/json'
            params = {
                'place_id': place_id,
                'language': 'zh-TW',
                'key': self.key
            }
            res = requests.get(url, params=params)
            res = res.text
            details = json.loads(res)
            result = details['result']
            return result

            pass

        def callback(ch, method, properties, body):
            data = str(body.decode())
            restaurantData = eval(data)
            place_id = restaurantData['place_id']
            details = getDetails(place_id)

            detail = parseDetail(details)
            if detail != 'close':
                reviews = details.get('reviews',{})
                list(map(parseReviews, reviews,
                        repeat(place_id)))  # to db
                detail = {**restaurantData, **detail}  # to db
                try:
                    self.restaurantCollection.replace_one({'_id':place_id},detail, upsert=True)
                except Exception as e:
                    print(place_id)
                    print(str(e)[:20])
            #self.reviewCollection.insert_one({'$set':detail})
            ch.basic_ack(delivery_tag=method.delivery_tag)
            pass
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(
            queue=self.queueName, on_message_callback=callback)
        self.channel.start_consuming()


if __name__ == '__main__':
    load_dotenv()
    key = os.getenv("GOOLE_MAPS_KEY")
    worker = Worker(key)
    worker.GetRestaurant()
    pass
