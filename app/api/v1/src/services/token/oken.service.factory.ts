// src/services/token/token.service.factory.ts

import { ConfigService } from '../config/config.service';
import { ConfigServiceFactory } from '../config/config.service.factory';
import { TokenService } from './token.service';

/**
 * @class TokenServiceFactory
 * @description Factory for creating TokenService instances. This factory provides a method to create instances of TokenService,
 * which is responsible for generating and validating authentication tokens.
 */
export class TokenServiceFactory {
  /**
   * @method createTokenService
   * @description Create a new instance of TokenService. This method uses the ConfigServiceFactory to get a configuration service instance.
   * It then creates a new TokenService with the configuration service.
   *
   * @returns {TokenService} - An instance of TokenService. This instance is used to manage authentication tokens.
   */
  public static createTokenService(): TokenService {
    /**
     * Get an instance of the configuration service using the ConfigServiceFactory.
     * The configuration service is used to access configuration settings for the token service.
     */
    const configService: ConfigService = ConfigServiceFactory.getConfigService();

    /**
     * Create and return a new instance of TokenService.
     * The TokenService is initialized with the configuration service instance.
     */
    return new TokenService(configService || new ConfigService());
  }
}
