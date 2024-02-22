// src/services/passport/strategies/google.strategy.ts
import { Strategy as GoogleStrategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { PassportStatic, VerifyCallback } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * Google passport strategy for authenticating users.
 *
 * This strategy handles user authentication using Google OAuth 2.0.
 * It retrieves user information from the Google profile and validates/authenticates the user.
 */
export class GoogleStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the GoogleStrategy class.
   *
   * @param userService - An instance of the UserService for user-related operations.
   * @param configService - An instance of the ConfigService for configuration retrieval.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the Google passport strategy.
   *
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(new GoogleStrategy(this.getGoogleStrategyOptions(), this.handleGoogleCallback.bind(this)));
  }

  /**
   * Get the Google passport strategy options.
   *
   * @returns The Google passport strategy options.
   * @throws Error if the Google auth config is incomplete.
   */
  private getGoogleStrategyOptions(): StrategyOptions {
    const clientID = this.configService.getValue<string>('googleAuth.clientID');
    const clientSecret = this.configService.getValue<string>('googleAuth.clientSecret');
    const callbackURL = this.configService.getValue<string>('googleAuth.callbackURL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Incomplete Google auth config');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
    };
  }

  /**
   * Handle the Google passport strategy callback.
   *
   * @param accessToken - Google API access token.
   * @param refreshToken - Google API refresh token.
   * @param profile - User profile from Google.
   * @param done - Passport done function.
   */
  // Handle the Google passport strategy callback.
  private async handleGoogleCallback(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const user: User = await this.userService.authenticateUserByGoogle('googleUserId', profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
}
