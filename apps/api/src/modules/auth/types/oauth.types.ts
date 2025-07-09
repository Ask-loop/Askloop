import { AuthenticationMethod } from '@shared/enums';

export type OauthProfile = {
  email: string;
  name?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  provider: AuthenticationMethod;
  providerId: string;
};
