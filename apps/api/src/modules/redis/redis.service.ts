import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.redisClient.expire(key, ttl);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redisClient.keys(pattern);
  }

  async flushall(): Promise<void> {
    await this.redisClient.flushall();
  }

  async delMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.del(key)));
  }

  async setMany(keys: string[], values: string[], ttl: number): Promise<void> {
    await Promise.all(keys.map((key, index) => this.set(key, values[index], ttl)));
  }

  async incrBy(key: string, value: number): Promise<number> {
    return this.redisClient.incrby(key, value);
  }

  async decrBy(key: string, value: number): Promise<number> {
    return this.redisClient.decrby(key, value);
  }
}
