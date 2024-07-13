// src/services/passport/strategies/google.strategy.ts

import { Strategy as GoogleStrategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { PassportStatic, VerifyCallback } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class GoogleStrategy
 * @implements PassportStrategy
 * @description Google passport strategy for authenticating users. This strategy handles user authentication using Google OAuth 2.0.
 * It retrieves user information from the Google profile and validates/authenticates the user.
 */
export class GoogleStrategy implements PassportStrategy {
  /**
   * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
   */
  private readonly userService: UserService;

  /**
   * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the Google strategy.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for the GoogleStrategy class. It initializes the strategy with instances of UserService and ConfigService.
   *
   * @param {UserService} userService - An instance of the UserService for user-related operations.
   * @param {ConfigService} configService - An instance of the ConfigService for configuration retrieval.
   */
  constructor(userService: UserService, configService: ConfigService) {
    /**
     * Assign the user service instance to the class property.
     * This ensures that the user service can be used to manage user operations during authentication.
     */
    this.userService = userService;

    /**
     * Assign the configuration service instance to the class property.
     * This ensures that the configuration service can be used to access settings for the Google strategy.
     */
    this.configService = configService;
  }

  /**
   * @method configureStrategy
   * @description Configure the Google passport strategy. This method sets up the strategy with the Passport instance
   * using the provided strategy options and callback handler.
   *
   * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
   */
  public configureStrategy(passport: PassportStatic): void {
    /**
     * Use the Google strategy with the Passport instance.
     * The strategy is configured with options and a callback handler.
     */
    passport.use(new GoogleStrategy(this.getGoogleStrategyOptions(), this.handleGoogleCallback.bind(this)));
  }

  /**
   * @method getGoogleStrategyOptions
   * @description Get the Google passport strategy options. This method retrieves the necessary configuration
   * settings from the configuration service and returns them as strategy options.
   *
   * @returns {StrategyOptions} - Strategy options. These options include the client ID, client secret, and callback URL.
   * @throws Error if the Google auth config is incomplete.
   */
  private getGoogleStrategyOptions(): StrategyOptions {
    /**
     * Get the Google client ID from the configuration service.
     * This ID is used to identify the application to Google.
     */
    const clientID = this.configService.getValue<string>('googleAuth.clientID');

    /**
     * Get the Google client secret from the configuration service.
     * This secret is used to authenticate the application to Google.
     */
    const clientSecret = this.configService.getValue<string>('googleAuth.clientSecret');

    /**
     * Get the Google callback URL from the configuration service.
     * This URL is used by Google to redirect users after authentication.
     */
    const callbackURL = this.configService.getValue<string>('googleAuth.callbackURL');

    /**
     * Validate that all necessary configuration settings are present.
     * If any required setting is missing, throw an error.
     */
    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Incomplete Google auth config');
    }

    /**
     * Return the strategy options for the Google strategy.
     * These options include the client ID, client secret, and callback URL.
     */
    return {
      clientID,
      clientSecret,
      callbackURL,
    };
  }

  /**
   * @method handleGoogleCallback
   * @description Handle the Google passport strategy callback. This method processes the callback from Google,
   * retrieves user information, and authenticates the user.
   *
   * @param {string} accessToken - Google API access token. This token is used to access Google APIs on behalf of the user.
   * @param {string} refreshToken - Google API refresh token. This token is used to refresh the access token when it expires.
   * @param {Profile} profile - User profile from Google. This parameter provides the user's profile information retrieved from Google.
   * @param {VerifyCallback} done - Passport done function. This function is called to complete the authentication process.
   */
  private async handleGoogleCallback(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      /**
       * Authenticate the user using the user service.
       * The user service retrieves or creates the user based on the Google profile information.
       */
      const user: User = await this.userService.authenticateUserByGoogle('googleUserId', profile);

      /**
       * Call the done function to complete the authentication process.
       * Pass the authenticated user to the done function.
       */
      return done(null, user);
    } catch (error) {
      /**
       * Call the done function with an error to indicate authentication failure.
       * Pass the error to the done function.
       */
      return done(error, false);
    }
  }
}
