// src/services/amqp/brokers/rabbitmq.broker.factory.ts

import { RabbitMQBroker } from './rabbitmq.broker';
import { ConfigService } from '../../config/config.service';

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
   * Create and return a new instance of RabbitMQBroker.
   * The RabbitMQBroker instance is initialized with the provided configuration service.
   */
  return new RabbitMQBroker(configService);
 }
}
