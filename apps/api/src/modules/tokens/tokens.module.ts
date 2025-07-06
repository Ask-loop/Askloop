import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@modules/redis/redis.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.accessTokenSecret'),
        signOptions: { expiresIn: configService.get('jwt.accessTokenExpiresIn') },
      }),
    }),
    RedisModule,
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
