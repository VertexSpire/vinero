// src/services/passport/facebook.strategy.factory.ts

import { FacebookStrategy } from './facebook.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class FacebookStrategyFactory
 * @description Factory for creating FacebookStrategy instances. This factory provides a method to create
 * instances of FacebookStrategy, which handles authentication via Facebook OAuth.
 */
export class FacebookStrategyFactory {
 /**
  * @method createFacebookStrategy
  * @description Create a new instance of FacebookStrategy. This method uses the UserServiceFactory to create a user service instance
  * and the ConfigServiceFactory to get a configuration service instance. It then creates a new FacebookStrategy with these services.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  * @returns {FacebookStrategy} - An instance of FacebookStrategy. This instance is used to handle Facebook authentication with Passport.
  */
 public static createFacebookStrategy(passport: PassportStatic): FacebookStrategy {
  /**
   * Create an instance of the user service using the UserServiceFactory.
   * The user service is used to manage user-related operations during authentication.
   */
  const userService = UserServiceFactory.createUserService();

  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The configuration service is used to access configuration settings for the Facebook strategy.
   */
  const configService = ConfigServiceFactory.getConfigService();

  /**
   * Create and return a new instance of FacebookStrategy.
   * The FacebookStrategy is initialized with the user service and configuration service instances.
   */
  return new FacebookStrategy(userService, configService);
 }
}
