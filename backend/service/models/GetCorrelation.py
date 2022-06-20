import random
import pandas as pd
import numpy as np
import sys
sys.path.append("./utils/")
from MongodbConn import MongodbConn

class GetCorrelation:
    def __init__(
        self, restautant_name, coordinates: list[float]
    ) -> None:
        self.mongodbConn = MongodbConn()
        self.restautant_name = restautant_name
        self.coordinates = coordinates
        pass

    def CalcCorrelation(self):
        collection = self.mongodbConn.setCollection('reviews')
        userData = pd.DataFrame(list(collection.find({}, {
            '_id': 0,
            'author_id': 0,
        })))
        collection = self.mongodbConn.setCollection('restaurants')
        itemData = pd.DataFrame(
            list(collection.find({
                'location': {
                    '$near': {
                        '$geometry': {'type': 'Point', 'coordinates': self.coordinates},
                        '$maxDistance': 500,
                    },
                }
            }, {'_id': 0, 'place_id': 1, 'name': 1})))
        itemData.columns = ['restautant_id', 'restautant_name']
        data = pd.merge(userData, itemData)
        pivot_table = data.pivot_table(
            index=["author_name"],
            columns=["restautant_name"],
            values="score")
        pivot_table.fillna(0, inplace=True) # temp use fake score
        restaurant = pivot_table[self.restautant_name]
        similarity_with_other_restaurant = pivot_table.corrwith(restaurant)
        similarity_with_other_restaurant = similarity_with_other_restaurant.sort_values(
            ascending=False)
        res = pd.DataFrame({'name': similarity_with_other_restaurant.index,
                           'corrwith': similarity_with_other_restaurant.values})
        # print(res.head())
        res = res[1:6].to_dict('records')
        return res


if __name__ == '__main__':
    # matrix = GetCorrelation('甘泉魚麵 新生店', [121.53248433036269, 25.038479520773553])
    # matrix.CalcCorrelation()
    pass
