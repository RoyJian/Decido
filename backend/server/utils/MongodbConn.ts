import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const { MONGODB_HOST, MONGODB_PORT, MONGODB_USER, MONGODB_PASS, MONGODB_DB } = process.env;

export class MongodbConn {
  static client: MongoClient;
  static db: Db;
  constructor() {
    const url = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}`;
    MongodbConn.client = new MongoClient(url);
    MongodbConn.db = MongodbConn.client.db(MONGODB_DB);
  }
  public async connect() {
    await MongodbConn.client.connect();
  }
}
