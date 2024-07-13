// src/services/passport/strategies/google.strategy.factory.ts

import { GoogleStrategy } from './google.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class GoogleStrategyFactory
 * @description Factory for creating GoogleStrategy instances. This factory provides a method to create
 * instances of GoogleStrategy, which handles authentication via Google OAuth.
 */
export class GoogleStrategyFactory {
 /**
  * @method createGoogleStrategy
  * @description Create a new instance of GoogleStrategy. This method uses the UserServiceFactory to create a user service instance
  * and the ConfigServiceFactory to get a configuration service instance. It then creates a new GoogleStrategy with these services.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  * @returns {GoogleStrategy} - An instance of GoogleStrategy. This instance is used to handle Google authentication with Passport.
  */
 public static createGoogleStrategy(passport: PassportStatic): GoogleStrategy {
  /**
   * Create an instance of the user service using the UserServiceFactory.
   * The user service is used to manage user-related operations during authentication.
   */
  const userService = UserServiceFactory.createUserService();

  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The configuration service is used to access configuration settings for the Google strategy.
   */
  const configService = ConfigServiceFactory.getConfigService();

  /**
   * Create and return a new instance of GoogleStrategy.
   * The GoogleStrategy is initialized with the user service and configuration service instances.
   */
  return new GoogleStrategy(userService, configService);
 }
}
