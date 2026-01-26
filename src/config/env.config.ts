import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4200,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
  // Add more environment variables as needed
};

