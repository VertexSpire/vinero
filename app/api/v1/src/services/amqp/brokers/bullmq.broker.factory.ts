// src/services/amqp/brokers/bullmq.broker.factory.ts

import { BullMQBroker } from './bullmq.broker';
import { ConfigService } from '../../config/config.service';

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
   * Create and return a new instance of BullMQBroker.
   * The BullMQBroker instance is initialized with the provided configuration service.
   */
  return new BullMQBroker(configService);
 }
}
