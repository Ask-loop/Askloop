import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const redisProvider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('RedisProvider');

    const redisClient = new Redis({
      host: configService.get<string>('redis.host', 'localhost'),
      port: configService.get<number>('redis.port', 6379),
      password: configService.get<string>('redis.password', ''),
    });

    redisClient.on('error', error => {
      logger.error('Redis connection error', error);
    });

    redisClient.on('connect', () => {
      logger.log('Redis connected');
    });

    return redisClient;
  },
};
