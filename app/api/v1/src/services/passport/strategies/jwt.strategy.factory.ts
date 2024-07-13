// src/services/passport/jwt.strategy.factory.ts

import { JwtStrategy } from './jwt.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class JwtStrategyFactory
 * @description Factory for creating JwtStrategy instances. This factory provides a method to create
 * instances of JwtStrategy, which handles authentication via JSON Web Tokens (JWT).
 */
export class JwtStrategyFactory {
  /**
   * @method createJwtStrategy
   * @description Create a new instance of JwtStrategy. This method uses the UserServiceFactory to create a user service instance
   * and the ConfigServiceFactory to get a configuration service instance. It then creates a new JwtStrategy with these services.
   *
   * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
   * @returns {JwtStrategy} - An instance of JwtStrategy. This instance is used to handle JWT authentication with Passport.
   */
  public static createJwtStrategy(passport: PassportStatic): JwtStrategy {
    /**
     * Create an instance of the user service using the UserServiceFactory.
     * The user service is used to manage user-related operations during authentication.
     */
    const userService = UserServiceFactory.createUserService();

    /**
     * Get an instance of the configuration service using the ConfigServiceFactory.
     * The configuration service is used to access configuration settings for the JWT strategy.
     */
    const configService = ConfigServiceFactory.getConfigService();

    /**
     * Create and return a new instance of JwtStrategy.
     * The JwtStrategy is initialized with the user service and configuration service instances.
     */
    return new JwtStrategy(userService, configService);
  }
}
