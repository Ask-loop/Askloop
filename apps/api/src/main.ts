import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from '@common/filters';
import { TransformInterceptor } from '@common/interceptors';
import { RedisService } from '@shared/redis/redis.service';
import { RedisAdapter } from './adapters/redis.adapter';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

void (async () => {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  const config = new DocumentBuilder().setTitle('AskLoop API').setDescription('Q&A Platform API').setVersion('1.0').build();

  const configService = app.get(ConfigService);

  app.use(passport.initialize());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: configService.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // const redisService = app.get(RedisService);
  // app.useWebSocketAdapter(new RedisAdapter(app, redisService));

  await app.listen(configService.getOrThrow('PORT'));
})();
