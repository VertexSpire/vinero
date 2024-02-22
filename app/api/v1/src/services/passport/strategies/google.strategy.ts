// src/services/passport/strategies/google.strategy.ts
import { Strategy as GoogleStrategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { PassportStatic, VerifyCallback } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * Google passport strategy for authenticating users.
 */
export class GoogleStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the GoogleStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the Google passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(
      new GoogleStrategy(
        this.getGoogleStrategyOptions(),
        this.handleGoogleCallback.bind(this)
      )
    );
  }

  /**
   * Get the Google passport strategy options.
   * @returns The Google passport strategy options.
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
   * @param accessToken - Google API access token.
   * @param refreshToken - Google API refresh token.
   * @param profile - User profile from Google.
   * @param done - Passport done function.
   */
  private async handleGoogleCallback(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    try {
      const user: User = await this.validateAndRetrieveUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  /**
   * Validate and retrieve a user based on the Google profile.
   * @param profile - User profile from Google.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(profile: Profile): Promise<User> {
    // Your logic to find or create user based on Google profile
  }
}
