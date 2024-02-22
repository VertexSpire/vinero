// src/services/passport/jwt.strategy.factory.ts
import { JwtStrategy } from './jwt.strategy';
import { PassportStatic } from 'passport';
import { UserServiceFactory } from '../services/user/user.service.factory';
import { ConfigServiceFactory } from '../../config/config.service.factory';

/**
 * Factory for creating JwtStrategy instances.
 */
export class JwtStrategyFactory {
  /**
   * Create a new instance of JwtStrategy.
   * @param passport - The Passport instance.
   * @returns An instance of JwtStrategy.
   */
  public static createJwtStrategy(passport: PassportStatic): JwtStrategy {
    const userService = UserServiceFactory.createUserService();
    const configService = ConfigServiceFactory.getConfigService();
    return new JwtStrategy(userService, configService);
  }
}
