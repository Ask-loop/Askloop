import { AuthenticationMethod } from '@shared/enums';

export interface OauthProfile {
  email: string;
  name?: string;
  avatar?: string;
  provider: AuthenticationMethod;
  providerId: string;
}
