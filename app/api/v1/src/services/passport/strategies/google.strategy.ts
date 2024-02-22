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
  private async handleGoogleCallback(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
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
   *
   * This function validates the Google profile, creates or updates a user, and returns the authenticated user.
   *
   * @param profile - User profile from Google.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(profile: Profile): Promise<User> {
    // Extract relevant information from the Google profile
    const googleUserId = 'google-' + profile.id;
    const username = profile.displayName || profile.emails[0]?.value || '';

    // Check if the user already exists based on Google user ID
    let existingUser = await this.userService.findUserByGoogleId(googleUserId);

    // If the user doesn't exist, create a new user
    if (!existingUser) {
      // Additional logic to extract more information from the Google profile if needed
      const email = profile.emails[0]?.value || '';

      // Create a new user with the extracted information
      const newUser: User = {
        id: googleUserId,
        username,
        email,
        // Additional fields can be populated here based on the Google profile
      };

      // Save the new user to the database
      existingUser = await this.userService.createUser(newUser);
    }

    return existingUser;
  }
}
