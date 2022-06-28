import { gql } from '@apollo/client';
import {ApolloClient, InMemoryCache ,
} from '@apollo/client';
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: '/graphql',
});
export const registID = async () => {
  const query = gql`
    query registID{
      uuid
    }
  `;
  const result  = await client.query({query});
  return result.data.uuid;
};
