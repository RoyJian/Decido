import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { loadFilesSync } from '@graphql-tools/load-files';
import resolver from './resolvers/resolver';
import { join } from 'path';
import { MongodbConn } from './utils/MongodbConn';

dotenv.config({ path: '../../.env' });
const { SERVER_PORT } = process.env;

const mongo = new MongodbConn();
mongo.connect();

const rootSchema = loadFilesSync(join(__dirname, './schemas/root.graphql'));
const server = new ApolloServer({
  typeDefs: [rootSchema],
  resolvers: resolver(),
});
server.listen(SERVER_PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
