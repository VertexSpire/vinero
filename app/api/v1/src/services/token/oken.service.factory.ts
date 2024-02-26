// src/services/token/token.service.factory.ts

import { ConfigService } from '../config/config.service';
import { ConfigServiceFactory } from '../config/config.service.factory';
import { TokenService } from './token.service';

/**
 * Factory for creating TokenService instances.
 */
export class TokenServiceFactory {
  /**
   * Create a new instance of TokenService.
   * @returns An instance of TokenService.
   */
  public static createTokenService(): TokenService {
    const configService: ConfigService = ConfigServiceFactory.getConfigService();
    return new TokenService(configService || new ConfigService());
  }
}
