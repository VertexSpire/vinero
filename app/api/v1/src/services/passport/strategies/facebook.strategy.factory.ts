// src/services/passport/facebook.strategy.factory.ts
import { FacebookStrategy } from './facebook.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating FacebookStrategy instances.
 */
export class FacebookStrategyFactory {
  /**
   * Create a new instance of FacebookStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of FacebookStrategy.
   */
  public static createFacebookStrategy(passport: PassportStatic): FacebookStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new FacebookStrategy(userService, configService);
  }
}
