import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Environment } from './app.config';

dotenv.config({ path: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}` });

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'askLoop',
  synchronize: process.env.TYPEORM_SYNC === 'true',
  ssl: process.env.DATABASE_SSL === 'true',
}));
