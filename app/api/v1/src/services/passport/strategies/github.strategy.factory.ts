// src/services/passport/github.strategy.factory.ts
import { GithubStrategy } from './github.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating GithubStrategy instances.
 */
export class GithubStrategyFactory {
  /**
   * Create a new instance of GithubStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of GithubStrategy.
   */
  public static createGithubStrategy(passport: PassportStatic): GithubStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new GithubStrategy(userService, configService);
  }
}
