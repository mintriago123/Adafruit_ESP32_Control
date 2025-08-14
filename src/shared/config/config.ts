import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  adafruit: {
    username: process.env.AIO_USERNAME || '',
    apiKey: process.env.AIO_KEY || '',
    feedName: process.env.FEED_NAME || '',
  },
};
