import * as dotenv from 'dotenv';

dotenv.config();

const DATABASE_URI_DEFAULT =
  'mongodb+srv://setel:3JQAQhzkjLuvjE9b@cluster0.9w2cg.mongodb.net/OrderPayments?retryWrites=true&w=majority';

const DELAY_DELIVERY = Number(process.env.DELAY_DELIVERY || 10000);
const MONGO_URI = process.env.MONGO_URI || DATABASE_URI_DEFAULT;

export { DELAY_DELIVERY, MONGO_URI };
