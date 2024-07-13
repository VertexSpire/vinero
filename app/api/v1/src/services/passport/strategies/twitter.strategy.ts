// src/services/passport/strategies/twitter.strategy.ts

import { Strategy as TwitterStrategy, StrategyOptions } from 'passport-twitter';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class TwitterStrategy
 * @implements PassportStrategy
 * @description Twitter passport strategy for authenticating users. This strategy handles user authentication using Twitter OAuth.
 */
export class TwitterStrategy implements PassportStrategy {
 /**
  * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
  */
 private readonly userService: UserService;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the Twitter strategy.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the TwitterStrategy class. It initializes the strategy with instances of UserService and ConfigService.
  *
  * @param {UserService} userService - The UserService instance. This parameter provides the service for user-related operations.
  * @param {ConfigService} configService - The ConfigService instance. This parameter provides the service for accessing configuration settings.
  */
 constructor(userService: UserService, configService: ConfigService) {
  /**
   * Assign the user service instance to the class property.
   * This ensures that the user service can be used to manage user operations during authentication.
   */
  this.userService = userService;

  /**
   * Assign the configuration service instance to the class property.
   * This ensures that the configuration service can be used to access settings for the Twitter strategy.
   */
  this.configService = configService;
 }

 /**
  * @method configureStrategy
  * @description Configure the Twitter passport strategy. This method sets up the strategy with the Passport instance
  * using the provided strategy options and callback handler.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  */
 public configureStrategy(passport: PassportStatic): void {
  /**
   * Use the Twitter strategy with the Passport instance.
   * The strategy is configured with options and a callback handler.
   */
  passport.use(new TwitterStrategy(this.getTwitterStrategyOptions(), this.handleTwitterCallback.bind(this)));
 }

 /**
  * @method getTwitterStrategyOptions
  * @description Get the options for the Twitter passport strategy. This method retrieves the necessary configuration
  * settings from the configuration service and returns them as strategy options.
  *
  * @returns {StrategyOptions} - Strategy options. These options include the consumer key, consumer secret, callback URL, and email inclusion.
  * @throws Error if the Twitter auth config is incomplete.
  */
 private getTwitterStrategyOptions(): StrategyOptions {
  /**
   * Get the Twitter consumer key from the configuration service.
   * This key is used to identify the application to Twitter.
   */
  const consumerKey = this.configService.getValue<string>('twitterAuth.consumerKey');

  /**
   * Get the Twitter consumer secret from the configuration service.
   * This secret is used to authenticate the application to Twitter.
   */
  const consumerSecret = this.configService.getValue<string>('twitterAuth.consumerSecret');

  /**
   * Get the Twitter callback URL from the configuration service.
   * This URL is used by Twitter to redirect users after authentication.
   */
  const callbackURL = this.configService.getValue<string>('twitterAuth.callbackURL');

  /**
   * Validate that all necessary configuration settings are present.
   * If any required setting is missing, throw an error.
   */
  if (!consumerKey || !consumerSecret || !callbackURL) {
   throw new Error('Incomplete Twitter auth config');
  }

  /**
   * Return the strategy options for the Twitter strategy.
   * These options include the consumer key, consumer secret, callback URL, and email inclusion.
   */
  return {
   consumerKey,
   consumerSecret,
   callbackURL,
   includeEmail: true,
  };
 }

 /**
  * @method handleTwitterCallback
  * @description Handle the Twitter passport strategy callback. This method processes the callback from Twitter,
  * retrieves user information, and authenticates the user.
  *
  * @param {string} token - Twitter API token. This token is used to access Twitter APIs on behalf of the user.
  * @param {string} tokenSecret - Twitter API token secret. This token secret is used to sign the token.
  * @param {any} profile - User profile from Twitter. This parameter provides the user's profile information retrieved from Twitter.
  * @param {VerifyFunction} done - Passport done function. This function is called to complete the authentication process.
  */
 private async handleTwitterCallback(
  token: string,
  tokenSecret: string,
  profile: any, // Adjust type based on the Twitter profile structure
  done: VerifyFunction,
 ): Promise<void> {
  try {
   /**
    * Authenticate the user using the user service.
    * The user service retrieves or creates the user based on the Twitter profile information.
    */
   const user: User = await this.userService.authenticateUserByTwitter('twitterUserId', profile);

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
