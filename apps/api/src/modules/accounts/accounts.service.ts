import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
import { AuthenticationMethod } from '@shared/enums';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor() {}

  async findByProvider(provider: AuthenticationMethod, providerAccountId: string) {
    return Account.findOne({ where: { provider, providerAccountId } });
  }

  async createOAuthUser(provider: AuthenticationMethod, providerAccountId: string, user: User) {
    return Account.create({ user, provider, providerAccountId }).save();
  }

  async createEmailUser(user: User) {
    return Account.create({ user, provider: AuthenticationMethod.EMAIL, providerAccountId: user.id.toString() }).save();
  }

  async getUserAccounts(userId: number) {
    return Account.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async deleteAccount(accountId: number) {
    const account = await Account.findOne({ where: { id: accountId } });

    if (!account) throw new NotFoundException('Account not found');

    return account.remove();
  }

  async deleteUserAccounts(userId: number) {
    return Account.delete({ user: { id: userId } });
  }
}
