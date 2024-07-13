// src/services/passport/strategies/facebook.strategy.ts

import { Strategy as FacebookStrategy, StrategyOptions } from 'passport-facebook';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class FacebookStrategy
 * @implements PassportStrategy
 * @description Facebook passport strategy for authenticating users. This class configures the Facebook OAuth strategy
 * for Passport, allowing users to authenticate using their Facebook accounts.
 */
export class FacebookStrategy implements PassportStrategy {
 /**
  * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
  */
 private readonly userService: UserService;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the Facebook strategy.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the FacebookStrategy class. It initializes the strategy with instances of UserService and ConfigService.
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
   * This ensures that the configuration service can be used to access settings for the Facebook strategy.
   */
  this.configService = configService;
 }

 /**
  * @method configureStrategy
  * @description Configure the Facebook passport strategy. This method sets up the strategy with the Passport instance
  * using the provided strategy options and callback handler.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  */
 public configureStrategy(passport: PassportStatic): void {
  /**
   * Use the Facebook strategy with the Passport instance.
   * The strategy is configured with options and a callback handler.
   */
  passport.use(new FacebookStrategy(this.getFacebookStrategyOptions(), this.handleFacebookCallback.bind(this)));
 }

 /**
  * @method getFacebookStrategyOptions
  * @description Get the options for the Facebook passport strategy. This method retrieves the necessary configuration
  * settings from the configuration service and returns them as strategy options.
  *
  * @returns {StrategyOptions} - Strategy options. These options include the client ID, client secret, callback URL, and profile fields.
  */
 private getFacebookStrategyOptions(): StrategyOptions {
  /**
   * Get the Facebook client ID from the configuration service.
   * This ID is used to identify the application to Facebook.
   */
  const clientID = this.configService.getValue<string>('facebookAuth.clientID');

  /**
   * Get the Facebook client secret from the configuration service.
   * This secret is used to authenticate the application to Facebook.
   */
  const clientSecret = this.configService.getValue<string>('facebookAuth.clientSecret');

  /**
   * Get the Facebook callback URL from the configuration service.
   * This URL is used by Facebook to redirect users after authentication.
   */
  const callbackURL = this.configService.getValue<string>('facebookAuth.callbackURL');

  /**
   * Get the Facebook profile fields from the configuration service.
   * These fields specify the user information to be retrieved from Facebook.
   */
  const profileFields = this.configService.getValue<string[]>('facebookAuth.profileFields');

  /**
   * Validate that all necessary configuration settings are present.
   * If any required setting is missing, throw an error.
   */
  if (!clientID || !clientSecret || !callbackURL) {
   throw new Error('Incomplete Facebook auth config');
  }

  /**
   * Return the strategy options for the Facebook strategy.
   * These options include the client ID, client secret, callback URL, and profile fields.
   */
  return {
   clientID,
   clientSecret,
   callbackURL,
   profileFields,
  };
 }

 /**
  * @method handleFacebookCallback
  * @description Handle the Facebook passport strategy callback. This method processes the callback from Facebook,
  * retrieves user information, and authenticates the user.
  *
  * @param {any} req - Express request object. This parameter provides the request data sent by Facebook during the callback.
  * @param {string} accessToken - Facebook API access token. This token is used to access Facebook APIs on behalf of the user.
  * @param {string} refreshToken - Facebook API refresh token. This token is used to refresh the access token when it expires.
  * @param {any} profile - User profile from Facebook. This parameter provides the user's profile information retrieved from Facebook.
  * @param {VerifyFunction} done - Passport done function. This function is called to complete the authentication process.
  */
 private async handleFacebookCallback(
  req: any, // Adjust type based on your Express request object
  accessToken: string,
  refreshToken: string,
  profile: any, // Adjust type based on the Facebook profile structure
  done: VerifyFunction,
 ): Promise<void> {
  try {
   /**
    * Authenticate the user using the user service.
    * The user service retrieves or creates the user based on the Facebook profile information.
    */
   const user: User = await this.userService.authenticateUserByFacebook('facebookUserId', profile);

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
