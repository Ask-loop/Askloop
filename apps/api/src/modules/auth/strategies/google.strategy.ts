import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-google-oauth20';
import oauthConfig from 'src/config/oauth.config';
import { OauthProfile } from '../types/oauth.types';
import { AuthService } from '../auth.service';
import { AuthenticationMethod } from '@shared/enums';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthenticationMethod.GOOGLE) {
  constructor(private readonly authService: AuthService) {
    const { google } = oauthConfig();

    super({
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user: OauthProfile = {
      email: profile.emails?.[0]?.value ?? '',
      displayName: profile.displayName ?? '',
      firstName: profile.name?.givenName ?? '',
      lastName: profile.name?.familyName ?? '',
      avatar: profile.photos?.[0]?.value ?? '',
      provider: AuthenticationMethod.GOOGLE,
      providerId: profile.id,
    };

    return this.authService.oauthSignIn(user);
  }
}
