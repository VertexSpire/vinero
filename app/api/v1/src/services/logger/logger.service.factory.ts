// src/services/logger/logger.service.factory.ts

import { LoggerService } from './logger.service';
import { ConfigServiceFactory } from '../config/config.service.factory';
import { LoggerServiceBuilder } from './logger.service.builder';

/**
 * @class LoggerServiceFactory
 * @description Factory for creating LoggerService instances. This factory provides a method to create instances of LoggerService,
 * which is responsible for logging messages to the console, files, HTTP, and MongoDB.
 */
export class LoggerServiceFactory {
 /**
  * @method createLoggerService
  * @description Create a new instance of LoggerService. This method uses the ConfigServiceFactory to get the configuration service instance.
  * It then creates a new LoggerService with the logger configuration.
  *
  * @returns {LoggerService} - An instance of LoggerService. This instance is used to log messages.
  */
 public static createLoggerService(): LoggerService {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The ConfigService provides configuration settings that will be used to configure the LoggerService.
   */
  const configService = ConfigServiceFactory.getConfigService();

  /**
   * Use the LoggerServiceBuilder to construct the LoggerService.
   * The builder pattern is used here to incrementally add various transports to the LoggerService.
   * This approach improves readability and maintainability by separating the configuration logic.
   */
  const loggerService = new LoggerServiceBuilder(configService)
   .addConsoleTransport() // Add console transport based on configuration.
   .addFileTransports() // Add file transports for logging to files.
   .addHttpTransport() // Add HTTP transport for logging to an HTTP endpoint.
   .addMongoTransport() // Add MongoDB transport for logging to a MongoDB database.
   .build(); // Build the LoggerService instance with the configured transports.

  /**
   * Return the configured LoggerService instance.
   * This instance is now ready to handle logging operations with the specified transports.
   */
  return loggerService;
 }
}
