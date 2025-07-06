import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { OauthProfile } from '@modules/auth/interfaces/oauth.interface';
import { AccountsService } from '@modules/accounts/accounts.service';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly accountsService: AccountsService) {}

  async create(dto: CreateUserDto) {
    const user = User.create(dto);
    return user.save();
  }

  async findMany(options: FindManyOptions<User>): Promise<User[]> {
    return User.find(options);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        provider: true,
        providerId: true,
        picture: true,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<User>): Promise<User | null> {
    await User.update(id, dto);

    return User.findOne({ where: { id } });
  }

  async createOauthUser(profile: OauthProfile): Promise<User> {
    const user = await this.create({
      email: profile.email,
      provider: profile.provider,
      providerId: profile.providerId,
      picture: profile.avatar,
      emailVerified: true,
    });

    await this.accountsService.createOAuthUser(profile.provider, profile.providerId, user);

    return user;
  }

  async delete(id: number) {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await User.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.accountsService.deleteUserAccounts(id);

    await User.delete(id);

    return { message: 'User deleted successfully' };
  }
}
