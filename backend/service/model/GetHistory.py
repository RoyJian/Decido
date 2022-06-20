import sys
sys.path.append("../utils")
from MongodbConn import MongodbConn

class GetHistory:
    def __init__(self) -> None:
        self.mongodbConn = MongodbConn()
        self.collection = self.mongodbConn.setCollection('historys')
        self.collection.create_index([("restautant_id", 'text')])
        self.collection.create_index([("user_id", 1)])
        
        pass
        

if __name__ == '__main__':
    pass
