import { MongodbConn } from '../utils/MongodbConn';
import { I_addReviewInput } from '../resolvers/resolver';

export default async function AddReview(args: I_addReviewInput) {
  console.log(args);
  const id = `${args.author_id}${args.restaurant_id.slice(-4)}`;
  const author_name = args.author_id;
  const collection = MongodbConn.db.collection('reviews');
  const review = {
    ...args,
    author_name,
  };
  const res = await collection.updateOne({ _id: id }, { $set: { _id: id, ...review } }, { upsert: true });
  return res.upsertedCount;
}
