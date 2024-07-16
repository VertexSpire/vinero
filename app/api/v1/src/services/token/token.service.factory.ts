// src/services/token/token.service.factory.ts

import { ConfigService } from '../config/config.service';
import { ConfigServiceFactory } from '../config/config.service.factory';
import { TokenService } from './token.service';
import { LoggerFactory } from '../logger/logger.factory';
import { ILogger } from '../logger/logger.interface';

/**
 * The TokenServiceFactory class is responsible for creating instances of the TokenService.
 * It leverages the ConfigServiceFactory to obtain a configuration service and the LoggerFactory
 * to create a logger instance. The created TokenService will utilize these dependencies.
 *
 * @class TokenServiceFactory
 * @classdesc This factory class simplifies the creation of TokenService instances by
 *            managing dependencies internally.
 * @see ConfigServiceFactory
 * @see LoggerFactory
 * @see TokenService
 * @see ILogger
 * @author Wasif Farooq
 */
export class TokenServiceFactory {
 /**
  * Creates and returns an instance of TokenService.
  *
  * This method first obtains a configuration service instance using the ConfigServiceFactory.
  * If the configuration service is not available, a new instance of ConfigService is created.
  * It also creates a logger instance using the LoggerFactory. These instances are then
  * passed to the TokenService constructor to create a fully initialized TokenService.
  *
  * @returns {TokenService} An instance of TokenService initialized with necessary dependencies.
  */
 public static createTokenService(): TokenService {
  /**
   * Obtain a configuration service instance from ConfigServiceFactory.
   * This is essential for the TokenService to access configuration settings.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Create a logger instance using the LoggerFactory.
   * The logger is used by TokenService to log important information and errors.
   */
  const logger: ILogger = LoggerFactory.createLogger();

  /**
   * Create and return a new TokenService instance with the configuration service and logger.
   * If configService is null or undefined, a new ConfigService instance is created as a fallback.
   * This ensures that the TokenService always has the necessary configuration settings.
   */
  return new TokenService(configService || new ConfigService(), logger);
 }
}
