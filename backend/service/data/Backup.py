from RabbitmqConn import RabbitmqConn
from MongodbConn import MongodbConn


class Backup:
    def __init__(self) -> None:
        self.rabbitmq = RabbitmqConn()
        self.queueName = 'rowData'
        self.rabbitmq.QueueDeclare(self.queueName)
        self.channel = self.rabbitmq.channel

        self.mongo = MongodbConn()
        self.rowdata = self.mongo.setCollection('rowdata')
        self.collection = self.mongo.setCollection('backup')
        pass

    def Worker(self):
        def callback(ch, method, properties, body):
            data = str(body.decode())
            restaurantData = eval(data)
            place_id = restaurantData['place_id']
            self.collection.update_one({'_id':place_id},{'$set':restaurantData},upsert=True)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            pass
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(
            queue=self.queueName, on_message_callback=callback)
        self.channel.start_consuming()
if __name__ == '__main__':
    backup = Backup()
    backup.Worker()