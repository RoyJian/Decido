from utils.MongodbConn import MongodbConn


def main():
    mongodbConn = MongodbConn()
    collect = mongodbConn.setCollection('reviews')
    deleteList = collect.aggregate(
        [
            {
                '$group': {
                    '_id': '$author_id',
                    'counts': {
                        '$sum': 1
                    }
                }
            }, {
                '$match': {
                    'counts': 1
                }
            }, {
                '$project': {
                    '_id': True
                }
            }
        ]
    )
    print(deleteList)
    for obj in deleteList:
        print(obj['_id'])
        collect.delete_one({'author_id':obj['_id']})
    pass
    print('done')



if __name__ == '__main__':
    main()
