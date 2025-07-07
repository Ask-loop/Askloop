import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

dotenv.config({ path: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}` });

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'API',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  env: process.env.NODE_ENV || Environment.DEVELOPMENT,
  baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  frontendUrl: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  allowedOrigins: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === Environment.PRODUCTION,
}));
