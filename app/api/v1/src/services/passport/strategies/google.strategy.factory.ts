// src/services/passport/strategies/google.strategy.factory.ts
import { GoogleStrategy } from './google.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating GoogleStrategy instances.
 */
export class GoogleStrategyFactory {
  /**
   * Create a new instance of GoogleStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of GoogleStrategy.
   */
  public static createGoogleStrategy(passport: PassportStatic): GoogleStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new GoogleStrategy(userService, configService);
  }
}
