// src/services/passport/local.strategy.factory.ts

import { LocalStrategy } from './local.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class LocalStrategyFactory
 * @description Factory for creating LocalStrategy instances. This factory provides a method to create
 * instances of LocalStrategy, which handles traditional username and password authentication.
 */
export class LocalStrategyFactory {
 /**
  * @method createLocalStrategy
  * @description Create a new instance of LocalStrategy. This method uses the UserServiceFactory to create a user service instance
  * and the ConfigServiceFactory to get a configuration service instance. It then creates a new LocalStrategy with these services.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  * @returns {LocalStrategy} - An instance of LocalStrategy. This instance is used to handle local authentication with Passport.
  */
 public static createLocalStrategy(passport: PassportStatic): LocalStrategy {
  /**
   * Create an instance of the user service using the UserServiceFactory.
   * The user service is used to manage user-related operations during authentication.
   */
  const userService = UserServiceFactory.createUserService();

  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The configuration service is used to access configuration settings for the local strategy.
   */
  const configService = ConfigServiceFactory.getConfigService();

  /**
   * Create and return a new instance of LocalStrategy.
   * The LocalStrategy is initialized with the user service and configuration service instances.
   */
  return new LocalStrategy(userService, configService);
 }
}
