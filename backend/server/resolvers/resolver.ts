import axios from 'axios';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config({ path: '../../.env' });
const { SERVICE_HOST, SERVICE_PORT } = process.env;

export default function root() {
  const root = {
    Query: {
      restaurants: async (_: any, args: { lat: number; lng: number; seed: string }) => {
        const url = `http://${SERVICE_HOST}:${SERVICE_PORT}/correlation`;
        const para = { seed: args.seed, lng: args.lng, lat: args.lat };
        const res = await axios.get(url, { params: para });
        return res.data;
      },
      uuid: async () => {
        return uuidv4();
      },
    },
  };
  return root;
}
