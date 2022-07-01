from MongodbConn import MongodbConn


def main():
    mongodbConn = MongodbConn()
    collect = mongodbConn.setCollection('restaurants')
    deleteList = collect.aggregate(
        [
            {
                '$group': {
                    '_id': '$name',
                    'counts': {
                        '$sum': 1
                    }
                }
            }, {
                '$match': {
                    'counts': {
                        '$gt': 1
                    }
                }
            }, {
                '$project': {
                    '_id': False,
                    'name': '$_id'
                }
            }
        ]
    )
    print(deleteList)
    for obj in deleteList:
        print(obj['name'])
        collect.delete_one({'name': obj['name']})
    pass
    print('done')


if __name__ == '__main__':
    main()
