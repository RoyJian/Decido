import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Meal } from '../Contexts/Interface';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: '/graphql',
});

interface RestaurantVariables{
  lat:number,
  lng:number,
  seed?:string|null,
  tag?:string|null
}

export const registID = async () => {
  const query = gql`
    query registID {
      uuid
    }
  `;
  const result = await client.query({ query });
  return result.data.uuid;
};

export const getRecommand = async (
  seed: string,
  meal: Meal,
  tag: string
) => {
  // const lng = meal.location.lng;
  const variables:RestaurantVariables = {lat:0,lng:0};
  variables.lat = meal.location.lat;
  variables.lng = meal.location.lng;
  meal.time.hour < 12 || meal.name ==='早餐'  ? variables.tag = '早餐' : '';
  tag !== '' ?  variables.tag = tag : variables.tag = null;
  seed !== '' ?  variables.seed = seed : variables.seed = null;
  const query = gql`
    fragment restaurantfields on restaurant {
      place_id
      name
      score
      location {
        lat,
        lng
      }
      corrwith
      address
      photo_id
      tag
      url
    }
    query getRecommand 
      ($lat: Float!, $lng: Float!, $seed: String, $tag: String) {
        restaurants(lat: $lat, lng: $lng, seed: $seed, tag: $tag) {
          ...restaurantfields
        }
      }
    `;
  console.log(typeof variables.seed);
  const result = await client.query({ query ,variables});
  return result.data.restaurants;
};
