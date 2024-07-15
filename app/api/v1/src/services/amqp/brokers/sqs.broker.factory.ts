// src/services/amqp/brokers/sqs.broker.factory.ts

import { SQSBroker } from './sqs.broker';
import { ConfigService } from '../../config/config.service';

/**
 * @class SQSBrokerFactory
 * @description Factory for creating SQSBroker instances. This factory provides a method to create instances of SQSBroker, which is responsible for interacting with AWS SQS.
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
   * Create and return a new instance of SQSBroker.
   * The SQSBroker instance is initialized with the provided configuration service.
   */
  return new SQSBroker(configService);
 }
}
