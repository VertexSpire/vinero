// src/services/amqp/brokers/kafka.broker.factory.ts

import { KafkaBroker } from './kafka.broker';
import { ConfigService } from '../../config/config.service';

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
   * Create and return a new instance of KafkaBroker.
   * The KafkaBroker instance is initialized with the provided configuration service.
   */
  return new KafkaBroker(configService);
 }
}
