import pika
from dotenv import load_dotenv
import os
import json

class RabbitmqConn:
    def __init__(self) -> None:
        load_dotenv()
        host = os.getenv('RABBITMQ_HOST')
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()
        pass
    def QueueDeclare(self,queue):
        self.channel.queue_declare(queue=queue)

if __name__ == '__main__':
    # rabbit = RabbitmqConn()
    # rabbit.QueueDeclare('restaurants')
    # channel = rabbit.channel
    # channel.basic_publish(exchange='',routing_key='restaurants',body=str({'X':1,'y':2}))

    pass