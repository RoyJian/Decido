import json
import numbers
import os
import string
import threading
from time import sleep
import requests
from dotenv import load_dotenv
from RabbitmqConn import RabbitmqConn


class Crawer:
    def __init__(self, key) -> None:
        # Google Maps key
        self.key = key
        # RabbitMQ Client
        self.rabbitmq = RabbitmqConn()
        self.queueName = 'restaurants'
        self.rabbitmq.QueueDeclare(self.queueName)
        self.rabbitmq.QueueDeclare('rowData')
        self.channel = self.rabbitmq.channel
        pass

    def Getplaces(self, location, keyword):
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'location': location,
            'radius': '500',
            'type': 'restaurant',
            'language': 'zh-TW',
            'key': self.key,
            'keyword': keyword
        }
        isDone = False

        def InsertQueue(obj: dict):
            self.channel.basic_publish(
                exchange='', routing_key=self.queueName, body=str(obj))
            pass

        def ParseData(result):
            lat = result['geometry']['location']['lat']
            lng = result['geometry']['location']['lng']
            info = {
                'place_id': result['place_id'],
                'name': result['name'],
                'score': result.get('rating', 0),
                'location': {
                    'type': 'Point',
                    'coordinates': [lng, lat],
                },
                'tag':keyword
            }
            InsertQueue(info)
            self.channel.basic_publish(
                exchange='', routing_key='rowData', body=str(result))
            pass

        while not isDone:
            res = requests.get(url, params=params)
            print(res.url)
            res = res.text
            data = json.loads(res)
            print(data['status'])
            results = data['results']
            list(map(ParseData, results))
            if('next_page_token' in data):
                print('next')
                pagetoken = data['next_page_token']
                params = {
                    'key': self.key,
                    'pagetoken': pagetoken
                }
                sleep(2)
            else:
                print('end')
                isDone = True
        # self.channel.close()
    pass


class WorkThread(threading.Thread):
    def __init__(self, key: str, num: int, locations: list, keyword: str):
        threading.Thread.__init__(self)
        self.key = key
        self.num = num
        self.locations = locations
        self.crawer = Crawer(key)
        self.keyword = keyword

    def run(self):
        print("Thread", self.num)
        for lo in self.locations:
            self.crawer.Getplaces(lo, self.keyword)


def main():
    load_dotenv()
    key = os.getenv("GOOLE_MAPS_KEY")
    initLocation = (25.046403324382986, 121.51748210185336)
    latNum = 3
    lngNum = 3
    locations = []
    for x in range(latNum):
        lat = initLocation[0] - (x * 0.01)
        for y in range(lngNum):
            lng = initLocation[1] + (y * 0.01)
            locations.append('{x},{y}'.format(x=lat, y=lng))
    threads = []
    for i in range(latNum):
        subLocations = locations[latNum * i: latNum * (i+1)]
        threads.append(WorkThread(key, i, subLocations, '麵店'))
        threads[i].start()

    for i in range(latNum):
        threads[i].join()
    print("Done.")
    pass


if __name__ == '__main__':
    main()
