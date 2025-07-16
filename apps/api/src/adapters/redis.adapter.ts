import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisService } from '@shared/redis/redis.service';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

class RedisAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private readonly redisService: RedisService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true,
      },
    });

    const pubClient = this.redisService['redisClient'];

    const subClient = pubClient.duplicate();
    server.adapter(createAdapter(pubClient, subClient));
    return server;
  }
}

export { RedisAdapter };
