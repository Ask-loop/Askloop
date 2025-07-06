import { User } from '@modules/users/entities/user.entity';

export type SignInResponse = {
  accessToken: string;
  user: User;
  refreshToken: string;
};
