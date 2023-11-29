require('dotenv').config();

export const config = {
  dbUrl: process.env.DATABASE_URL,
  stripeDomain: '',
  stripeProductId: '',
};
