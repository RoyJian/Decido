import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const { SERVICE_HOST, SERVICE_PORT } = process.env;

export default function root() {
  const root = {
    Query: {
      async restaurants(_: any, args: { lat: number; lng: number; seed: string }) {
        const url = `http://${SERVICE_HOST}:${SERVICE_PORT}/correlation`;
        const para = { seed: args.seed, lng: args.lng, lat: args.lat };
        const res = await axios.get(url, { params: para });
        return res.data;
      },
    },
  };
  return root;
}
