import { BullMQBroker } from './bullmq.broker';
import { ConfigService } from '../../config/config.service';
import { LoggerServiceFactory } from '../../logger/logger.service.factory';

/**
 * @class BullMQBrokerFactory
 * @description Factory for creating BullMQBroker instances. This factory provides a method to create instances of BullMQBroker, which is responsible for interacting with BullMQ.
 */
export class BullMQBrokerFactory {
 /**
  * @method create
  * @description Create a new instance of BullMQBroker. This method initializes the BullMQBroker with the provided configuration service.
  * @param {ConfigService} configService - The ConfigService instance.
  * @returns {BullMQBroker} - An instance of BullMQBroker.
  */
 public static create(configService: ConfigService): BullMQBroker {
  /**
   * Get an instance of the LoggerService.
   * The LoggerServiceFactory is used to create a logger instance for logging actions within the BullMQBroker.
   * This ensures that all activities within the BullMQBroker are properly logged for debugging and monitoring purposes.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Create and return a new instance of BullMQBroker.
   * The BullMQBroker instance is initialized with the provided configuration and logger services.
   * This ensures that the BullMQBroker has all necessary dependencies to function correctly.
   */
  return new BullMQBroker(configService, loggerService);
 }
}
