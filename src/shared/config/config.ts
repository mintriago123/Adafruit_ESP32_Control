import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  adafruit: {
    username: process.env.AIO_USERNAME || '',
    apiKey: process.env.AIO_KEY || '',
    feeds: {
      rele1: process.env.FEED_RELE1 || 'rele1',
      rele2: process.env.FEED_RELE2 || 'rele2',
      rele3: process.env.FEED_RELE3 || 'rele3',
      rele4: process.env.FEED_RELE4 || 'rele4',
    }
  },
};
