// src/services/amqp/brokers/sqs.broker.factory.ts

import { SQSBroker } from './sqs.broker';
import { ConfigService } from '../../config/config.service';
import { LoggerServiceFactory } from '../../logger/logger.service.factory';

/**
 * @class SQSBrokerFactory
 * @description Factory for creating SQSBroker instances. This factory provides a method to create instances of SQSBroker, which is responsible for interacting with Amazon SQS.
 */
export class SQSBrokerFactory {
 /**
  * @method create
  * @description Create a new instance of SQSBroker. This method initializes the SQSBroker with the provided configuration service.
  * @param {ConfigService} configService - The ConfigService instance.
  * @returns {SQSBroker} - An instance of SQSBroker.
  */
 public static create(configService: ConfigService): SQSBroker {
  /**
   * Get an instance of the LoggerService.
   * The LoggerServiceFactory is used to create a logger instance for logging actions within the SQSBroker.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Create and return a new instance of SQSBroker.
   * The SQSBroker instance is initialized with the provided configuration and logger services.
   */
  return new SQSBroker(configService, loggerService);
 }
}
