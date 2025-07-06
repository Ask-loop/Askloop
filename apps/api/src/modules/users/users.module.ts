import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TokensModule } from '@modules/tokens/tokens.module';

@Module({
  imports: [AccountsModule, TokensModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
