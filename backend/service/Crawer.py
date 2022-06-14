import json
import os
import requests
from time import sleep
from dotenv import load_dotenv


class Crawer:
    def __init__(self, key) -> None:
        self.placeIDList = []
        self.key = key
        pass

    def Getplaces(self, location):
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'location': location,
            'radius': '1000',
            'type': 'restaurant',
            'language': 'zh-TW',
            'key': self.key
        }
        # headers = {
        #     'User-Agent': 'PostmanRuntime/7.29.0',
        #     'Accept': '*/*',
        #     'Accept-Encoding': 'gzip, deflate, br',
        #     'Connection': 'keep-alive'
        # }
        isDone = False
        while not isDone:
            res = requests.get(url, params=params)
            print(res.url)
            res = res.text
            data = json.loads(res)
            print(data['status'])
            results = data['results']

            def getID(result):
                lat = result['geometry']['location']['lat']
                lng = result['geometry']['location']['lng']
                return self.placeIDList.append({
                    'place_id':result['place_id'],
                    'name':result['name'],
                    'score':result['rating'],
                    'location': {
                        'type': 'Point',
                        'coordinates': [lat,lng],
                    },
                })
            list(map(getID, results))
            if('next_page_token' in data):
                print('next')
                pagetoken = data['next_page_token']
                params = {
                    'key': self.key,
                    'pagetoken': pagetoken
                }
            else:
                print('end')
                isDone = True
            sleep(2)
        print((self.placeIDList))
    pass


def main():
    load_dotenv()
    key = os.getenv("GOOLE_MAPS_KEY")
    location = (25.05997860074323, 121.52320746563369)
    # locations = []
    # for x in range(10):
    #     lat = location[0] + (x * 0.01)
    #     for y in range(6):
    #         lng = location[1] + (y * 0.01)
    #         locations.append((lat,lng))
    # print(locations)
    location = ','.join(str(num) for num in location)
    crawer = Crawer(key)
    crawer.Getplaces(location)
    pass

if __name__ == '__main__':
    main()
