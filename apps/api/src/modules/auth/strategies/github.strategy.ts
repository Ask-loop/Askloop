import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import oauthConfig from '@config/oauth.config';
import { OauthProfile } from '../types/oauth.types';
import { AuthService } from '../auth.service';
import { AuthenticationMethod } from '@shared/enums';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, AuthenticationMethod.GITHUB) {
  constructor(private readonly authService: AuthService) {
    const { github } = oauthConfig();
    super({
      clientID: github.clientId,
      clientSecret: github.clientSecret,
      callbackURL: github.callbackUrl,
      scope: ['read:user', 'user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user: OauthProfile = {
      email: profile.emails?.[0]?.value || '',
      displayName: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      avatar: profile.photos?.[0]?.value,
      provider: AuthenticationMethod.GITHUB,
      providerId: profile.id,
    };

    return this.authService.oauthSignIn(user);
  }
}
