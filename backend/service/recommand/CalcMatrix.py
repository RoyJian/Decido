import random
import pandas as pd
import numpy as np
import sys
from sklearn.metrics.pairwise import pairwise_distances
sys.path.append("../utils")
from MongodbConn import MongodbConn


class CaclMatrix:
    def __init__(self) -> None:
        self.mongodbConn = MongodbConn()
        pass

    def I_I_Matrix(self):
        collection = self.mongodbConn.setCollection('reviews')
        userData = pd.DataFrame(list(collection.find({}, {
            '_id': 0,
            'author_id': 0,
        })))
        collection = self.mongodbConn.setCollection('restaurants')
        itemData = pd.DataFrame(list(collection.find({},
            {'_id': 0, 'place_id': 1, 'name': 1})))
        itemData.columns = ['restautant_id','restautant_name']
        #print('userData',len(userData))
        #print('itemData',len(itemData))
        data = pd.merge(userData,itemData)
        #print('data',len(data))
        pivot_table = data.pivot_table(
            index = ["author_name"],
            columns = ["restautant_name"],
            values = "score")
        pivot_table.fillna(0, inplace=True)
        # print(pivot_table)
        #print('pivot_table',len(pivot_table))
        #print(pivot_table['江家 焢肉飯、香腸便當'])
        restaurant = pivot_table['甘泉魚麵 新生店']
        similarity_with_other_restaurant = pivot_table.corrwith(restaurant)
        similarity_with_other_restaurant = similarity_with_other_restaurant.sort_values(ascending=False)
        print(similarity_with_other_restaurant.head())

if __name__ == '__main__':
    matrix = CaclMatrix()
    matrix.I_I_Matrix()
    pass
