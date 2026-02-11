import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4200,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  // Add more environment variables as needed
};

