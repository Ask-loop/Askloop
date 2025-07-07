import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { UsersModule } from '@modules/users/users.module';
import { TokensModule } from '@modules/tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
