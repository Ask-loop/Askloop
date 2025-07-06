import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
          migrations: [__dirname + '/../migrations/*.{ts,js}'],
          synchronize: configService.get<boolean>('database.synchronize'),
          autoLoadEntities: true,
          ssl: configService.get<boolean>('database.ssl'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
