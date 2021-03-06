import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Meal } from '../Contexts/Interface';
import axios, { AxiosRequestHeaders } from 'axios';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: '/graphql',
});

interface RestaurantVariables {
  lat: number;
  lng: number;
  seed?: string | null;
  tag?: string | null;
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

export const getRecommand = async (seed: string, meal: Meal, tag: string) => {
  // const lng = meal.location.lng;
  const variables: RestaurantVariables = { lat: 0, lng: 0 };
  variables.lat = meal.location.lat;
  variables.lng = meal.location.lng;
  tag !== '' ? (variables.tag = tag) : (variables.tag = null);
  seed !== '' ? (variables.seed = seed) : (variables.seed = null);
  meal.time.hour < 12 || meal.name === '早餐' ? (variables.tag = '早餐') : '';
  const query = gql`
    fragment restaurantfields on restaurant {
      place_id
      name
      score
      location {
        lat
        lng
      }
      corrwith
      address
      photo_id
      tag
      url
    }
    query getRecommand(
      $lat: Float!
      $lng: Float!
      $seed: String
      $tag: String
    ) {
      restaurants(lat: $lat, lng: $lng, seed: $seed, tag: $tag) {
        ...restaurantfields
      }
    }
  `;
  const result = await client.query({
    query,
    variables,
    fetchPolicy: 'network-only',
  });
  return result.data.restaurants;
};
export const getRestaurantImg = async (url: string) => {
  const Pos = url.indexOf('?cid');
  const res = await axios.get(`/maps${url.slice(Pos)}`);
  let data: string = res.data.toString();
  const endPos = data.indexOf('itemprop="imag');
  data = data.slice(0, endPos);
  const startPos = data.lastIndexOf('https');
  data = data.slice(startPos, endPos - 2);
  return data;
};
export const addReview = async(author_id:string,restaurant_id:string,score:number)=>{
  const mutation = gql`
    mutation addReview($input: addReviewInput!) {
      addReview(input: $input) {
        code
        msg
      }
    }`; 
  const input = {
    input:{
      author_id,
      restaurant_id,
      score,
    }
  };
  const res = await client.mutate({mutation,variables:input,fetchPolicy:'network-only'});
  console.log(res.data.addReview);
  return res.data.addReview;
};