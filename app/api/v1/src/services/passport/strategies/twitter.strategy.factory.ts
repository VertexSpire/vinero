// src/services/passport/twitter.strategy.factory.ts
import { TwitterStrategy } from './twitter.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating TwitterStrategy instances.
 */
export class TwitterStrategyFactory {
  /**
   * Create a new instance of TwitterStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of TwitterStrategy.
   */
  public static createTwitterStrategy(passport: PassportStatic): TwitterStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new TwitterStrategy(userService, configService);
  }
}
