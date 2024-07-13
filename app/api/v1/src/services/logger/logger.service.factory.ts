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
    // Get an instance of the configuration service using the ConfigServiceFactory.
    const configService = ConfigServiceFactory.getConfigService();

    // Use the builder to construct the LoggerService
    const loggerService = new LoggerServiceBuilder(configService)
      .addConsoleTransport()
      .addFileTransports()
      .addHttpTransport()
      .addMongoTransport()
      .build();

    // Return the configured LoggerService instance.
    return loggerService;
  }
}
