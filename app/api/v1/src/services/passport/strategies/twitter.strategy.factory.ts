// src/services/passport/twitter.strategy.factory.ts

import { TwitterStrategy } from './twitter.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class TwitterStrategyFactory
 * @description Factory for creating TwitterStrategy instances. This factory provides a method to create
 * instances of TwitterStrategy, which handles authentication via Twitter OAuth.
 */
export class TwitterStrategyFactory {
 /**
  * @method createTwitterStrategy
  * @description Create a new instance of TwitterStrategy. This method uses the UserServiceFactory to create a user service instance
  * and the ConfigServiceFactory to get a configuration service instance. It then creates a new TwitterStrategy with these services.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  * @returns {TwitterStrategy} - An instance of TwitterStrategy. This instance is used to handle Twitter authentication with Passport.
  */
 public static createTwitterStrategy(passport: PassportStatic): TwitterStrategy {
  /**
   * Create an instance of the user service using the UserServiceFactory.
   * The user service is used to manage user-related operations during authentication.
   */
  const userService = UserServiceFactory.createUserService();

  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The configuration service is used to access configuration settings for the Twitter strategy.
   */
  const configService = ConfigServiceFactory.getConfigService();

  /**
   * Create and return a new instance of TwitterStrategy.
   * The TwitterStrategy is initialized with the user service and configuration service instances.
   */
  return new TwitterStrategy(userService, configService);
 }
}
