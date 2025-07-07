import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Environment } from './app.config';

dotenv.config({ path: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}` });

export default registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access-token-secret',
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h',
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh-token-secret',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d',
}));
