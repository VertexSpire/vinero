// src/services/amqp/brokers/kafka.broker.factory.ts

import { KafkaBroker } from './kafka.broker';
import { ConfigService } from '../../config/config.service';
import { LoggerServiceFactory } from '../../logger/logger.service.factory';

/**
 * @class KafkaBrokerFactory
 * @description Factory for creating KafkaBroker instances. This factory provides a method to create instances of KafkaBroker, which is responsible for interacting with Kafka.
 */
export class KafkaBrokerFactory {
 /**
  * @method create
  * @description Create a new instance of KafkaBroker. This method initializes the KafkaBroker with the provided configuration service.
  * @param {ConfigService} configService - The ConfigService instance.
  * @returns {KafkaBroker} - An instance of KafkaBroker.
  */
 public static create(configService: ConfigService): KafkaBroker {
  /**
   * Get an instance of the LoggerService.
   * The LoggerServiceFactory is used to create a logger instance for logging actions within the KafkaBroker.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Create and return a new instance of KafkaBroker.
   * The KafkaBroker instance is initialized with the provided configuration and logger services.
   */
  return new KafkaBroker(configService, loggerService);
 }
}
