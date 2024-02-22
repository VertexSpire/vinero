// src/services/passport/local.strategy.factory.ts
import { LocalStrategy } from './local.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating LocalStrategy instances.
 */
export class LocalStrategyFactory {
  /**
   * Create a new instance of LocalStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of LocalStrategy.
   */
  public static createLocalStrategy(passport: PassportStatic): LocalStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new LocalStrategy(userService, configService);
  }
}
