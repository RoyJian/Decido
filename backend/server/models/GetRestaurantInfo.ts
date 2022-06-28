import { MongodbConn } from '../utils/MongodbConn';
interface Restaurant {
  name: string;
  corrwith: number;
}

export default async function GetRestaurantInfo(restaruasts: Restaurant[]) {
  const collection = MongodbConn.db.collection('restaurants');
  const namelist = restaruasts.map((restaurant) => {
    return {
      name: restaurant.name,
    };
  });
  const res = await collection
    .find({
      $or: namelist,
    })
    .toArray();

  return res.map((item) => {
    const temp = item;
    const location = { lat: item.location.coordinates[1], lng: item.location.coordinates[0] };
    temp.location = location;
    return temp;
  });
}
