from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import os


class MongodbConn:
    def __init__(self) -> None:
        load_dotenv()
        host = os.getenv('MONGODB_HOST')
        user = os.getenv('MONGODB_USER')
        password = os.getenv('MONGODB_PASS')
        db = os.getenv('MONGODB_DB')
        url = 'mongodb://{user}:{password}@{host}:27017/'.format(
            user=user, password=password, host=host)
        self.clinet = MongoClient(url)
        self.db = self.clinet[db]
    def setCollection(self,collection):
        return self.db[collection]
        
        


if __name__ == '__main__':
    pass
