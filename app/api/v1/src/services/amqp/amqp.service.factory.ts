// src/services/amqp/amqp.service.factory.ts

import { RabbitMQBrokerFactory } from './brokers/rabbitmq.broker.factory';
import { SQSBrokerFactory } from './brokers/sqs.broker.factory';
import { KafkaBrokerFactory } from './brokers/kafka.broker.factory';
import { BullMQBrokerFactory } from './brokers/bullmq.broker.factory';
import { MessageQueueService } from '../../common/interfaces/message-queue.interface';
import { ConfigService } from '../config/config.service';
import { ConfigServiceFactory } from '../config/config.service.factory';
import { AMQPService } from './amqp.service';

/**
 * @class AMQPServiceFactory
 * @description Factory for creating instances of AMQPService. This factory creates the appropriate broker instance based on the type provided and injects it into AMQPService.
 */
export class AMQPServiceFactory {
 /**
  * @method createService
  * @description Create a new instance of AMQPService based on the type provided. This method uses the respective broker factories to create the appropriate service instance and injects it into AMQPService.
  * @param {string} type - The type of AMQP service to create (e.g., 'rabbitmq', 'sqs', 'kafka', 'bullmq').
  * @returns {AMQPService} - An instance of AMQPService.
  * @throws {Error} - Throws an error if the provided type is unknown.
  */
 public static createService(type: string): AMQPService {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The configuration service provides access to necessary configurations required for setting up the broker services.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Determine the type of AMQP service to create.
   * Based on the provided type, the corresponding broker factory will be used to create the broker instance.
   */
  let brokerService: MessageQueueService;
  switch (type) {
   case 'rabbitmq':
    /**
     * Create and return an instance of RabbitMQBroker using the RabbitMQBrokerFactory.
     * This ensures that RabbitMQ specific configurations and initializations are handled properly.
     */
    brokerService = RabbitMQBrokerFactory.create(configService);
    break;
   case 'sqs':
    /**
     * Create and return an instance of SQSBroker using the SQSBrokerFactory.
     * This ensures that AWS SQS specific configurations and initializations are handled properly.
     */
    brokerService = SQSBrokerFactory.create(configService);
    break;
   case 'kafka':
    /**
     * Create and return an instance of KafkaBroker using the KafkaBrokerFactory.
     * This ensures that Kafka specific configurations and initializations are handled properly.
     */
    brokerService = KafkaBrokerFactory.create(configService);
    break;
   case 'bullmq':
    /**
     * Create and return an instance of BullMQBroker using the BullMQBrokerFactory.
     * This ensures that BullMQ specific configurations and initializations are handled properly.
     */
    brokerService = BullMQBrokerFactory.create(configService);
    break;
   default:
    /**
     * Throw an error if the provided type is unknown.
     * This helps in identifying and handling unsupported broker types gracefully.
     */
    throw new Error(`Unknown broker type: ${type}`);
  }

  /**
   * Create and return an instance of AMQPService with the created broker service.
   * The AMQPService instance will use the broker service for performing message queue operations.
   */
  return new AMQPService(brokerService);
 }
}
