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
    def QueueDeclare(self,queue:str):
        self.channel.queue_declare(queue=queue,auto_delete=False)

if __name__ == '__main__':
    rabbit = RabbitmqConn()
    rabbit.QueueDeclare('test')
    channel = rabbit.channel
    for i in range(20):
        channel.basic_publish(exchange='',routing_key='test',body=str({'place_id': 'ChIJ-eTvMWipQjQRqQK0v2hnhSc', 'name': '台北國賓大飯店', 'score': 4.2, 'location': {'type': 'Point', 'coordinates': [121.5233125,25.0568205]}}))
    pass