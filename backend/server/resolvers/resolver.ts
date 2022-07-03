import axios from 'axios';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import AddReview from '../models/AddReview';
import GetRestaurantInfo from '../models/GetRestaurantInfo';
dotenv.config({ path: '../../.env' });
const { SERVICE_HOST, SERVICE_PORT } = process.env;
export interface I_addReviewInput {
  author_id: string;
  restaurant_id: string;
  score: number;
}
export interface I_addReviewArgs {
  input: I_addReviewInput;
}
interface addReviewRes {
  code: number;
  msg: string;
}
interface Restaurant {
  name: string;
  corrwith: number;
}
export default function root() {
  const root = {
    Query: {
      restaurants: async (root: any, args: { lat: number; lng: number; seed?: string; tag?: string }) => {
        const url = `http://${SERVICE_HOST}:${SERVICE_PORT}/correlation`;
        const para = { seed: args.seed, lng: args.lng, lat: args.lat, tag: args.tag };
        console.log(para);
        const res = await axios.get(url, { params: para });
        if (res.data.errorcode === 666) throw new Error(JSON.stringify(res.data));
        const restaurants:Restaurant[] = res.data;
        console.log(restaurants)
        const resDataSort = restaurants.sort((first: Restaurant, second: Restaurant) => 0 - (first.name > second.name ? -1 : 1));
        // console.log(res.data);
        const queryRes = await GetRestaurantInfo(resDataSort);
        
        const finalres = queryRes.map((item, index) => {
          return { ...item, ...res.data[index] };
        });
        return finalres;
      },
      uuid: async () => {
        return uuidv4();
      },
    },
    Mutation: {
      addReview: async (_root: any, args: I_addReviewArgs) => {
        const yourReviewCount = await AddReview(args.input);
        if (yourReviewCount > 0) return { code: 0, msg: 'success post reviews' };
        return { code: 1, msg: 'you have reviewed a score' };
      },
    },
  };
  return root;
}
