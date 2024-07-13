// src/services/passport/github.strategy.factory.ts

import { GithubStrategy } from './github.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * @class GithubStrategyFactory
 * @description Factory for creating GithubStrategy instances. This factory provides a method to create
 * instances of GithubStrategy, which handles authentication via GitHub OAuth.
 */
export class GithubStrategyFactory {
  /**
   * @method createGithubStrategy
   * @description Create a new instance of GithubStrategy. This method uses the UserServiceFactory to create a user service instance
   * and the ConfigServiceFactory to get a configuration service instance. It then creates a new GithubStrategy with these services.
   *
   * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
   * @returns {GithubStrategy} - An instance of GithubStrategy. This instance is used to handle GitHub authentication with Passport.
   */
  public static createGithubStrategy(passport: PassportStatic): GithubStrategy {
    /**
     * Create an instance of the user service using the UserServiceFactory.
     * The user service is used to manage user-related operations during authentication.
     */
    const userService = UserServiceFactory.createUserService();

    /**
     * Get an instance of the configuration service using the ConfigServiceFactory.
     * The configuration service is used to access configuration settings for the GitHub strategy.
     */
    const configService = ConfigServiceFactory.getConfigService();

    /**
     * Create and return a new instance of GithubStrategy.
     * The GithubStrategy is initialized with the user service and configuration service instances.
     */
    return new GithubStrategy(userService, configService);
  }
}
