import { RabbitMQBroker } from './rabbitmq.broker';
import { ConfigService } from '../../config/config.service';
import { LoggerServiceFactory } from '../../logger/logger.service.factory';

/**
 * @class RabbitMQBrokerFactory
 * @description Factory for creating RabbitMQBroker instances. This factory provides a method to create instances of RabbitMQBroker, which is responsible for interacting with RabbitMQ.
 */
export class RabbitMQBrokerFactory {
 /**
  * @method create
  * @description Create a new instance of RabbitMQBroker. This method initializes the RabbitMQBroker with the provided configuration service.
  * @param {ConfigService} configService - The ConfigService instance.
  * @returns {RabbitMQBroker} - An instance of RabbitMQBroker.
  */
 public static create(configService: ConfigService): RabbitMQBroker {
  /**
   * Get an instance of the LoggerService.
   * The LoggerServiceFactory is used to create a logger instance for logging actions within the RabbitMQBroker.
   * This ensures that all activities within the RabbitMQBroker are properly logged for debugging and monitoring purposes.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Create and return a new instance of RabbitMQBroker.
   * The RabbitMQBroker instance is initialized with the provided configuration and logger services.
   * This ensures that the RabbitMQBroker has all necessary dependencies to function correctly.
   */
  return new RabbitMQBroker(configService, loggerService);
 }
}
