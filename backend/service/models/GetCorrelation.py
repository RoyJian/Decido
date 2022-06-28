from MongodbConn import MongodbConn
import random
import pandas as pd
import numpy as np
import sys
sys.path.append("./utils/")


class GetCorrelation:
    def __init__(
        self, restautant_name, coordinates: list[float], tag
    ) -> None:
        self.mongodbConn = MongodbConn()
        self.restautant_name = restautant_name
        self.coordinates = coordinates
        self.tag = tag
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
                },
                '$or': [
                    {
                        'tag': self.tag
                    }, {
                        'name': self.restautant_name
                    }
                ]
            }, {'_id': 0, 'place_id': 1, 'name': 1})))
        itemData.columns = ['restautant_id', 'restautant_name']
        if self.restautant_name == '':
            randindex = random.randrange((itemData.shape[0]-1))
            self.restautant_name = itemData.iloc[randindex]['restautant_name']
            print(self.restautant_name)
            print('init restautant_name')
        data = pd.merge(userData, itemData)
        pivot_table = data.pivot_table(
            index=["author_name"],
            columns=["restautant_name"],
            values="score"
        )
        pivot_table.fillna(0, inplace=True)  # temp use fake score
        restaurant = pivot_table[self.restautant_name]
        similarity_with_other_restaurant = pivot_table.corrwith(restaurant)
        similarity_with_other_restaurant = similarity_with_other_restaurant.sort_values(
            ascending=False)
        res = pd.DataFrame({
            'name': similarity_with_other_restaurant.index,
            'corrwith': similarity_with_other_restaurant.values
        })
        res = res[1:4].to_dict('records')
        return res


if __name__ == '__main__':
    pass
