// Import necessary broker factories and interfaces for the AMQP service
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
 * @description Factory class responsible for creating instances of AMQPService.
 * This factory dynamically selects the appropriate broker factory based on the provided type and creates an instance of AMQPService with the corresponding broker service.
 * The factory pattern helps in encapsulating the creation logic and supports multiple broker types like RabbitMQ, SQS, Kafka, and BullMQ.
 */
export class AMQPServiceFactory {
 /**
  * @method createService
  * @description This method creates and returns a new instance of AMQPService based on the provided type.
  * It utilizes the respective broker factories to instantiate the appropriate broker service and injects it into the AMQPService.
  * @param {string} type - The type of AMQP service to create. Valid types include 'rabbitmq', 'sqs', 'kafka', and 'bullmq'.
  * @returns {AMQPService} - An instance of AMQPService initialized with the specific broker service.
  * @throws {Error} - Throws an error if an unknown type is provided, ensuring that unsupported broker types are handled properly.
  */
 public static createService(type: string): AMQPService {
  /**
   * Retrieve an instance of the ConfigService using the ConfigServiceFactory.
   * The ConfigService provides necessary configuration details required by the broker services to function correctly.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Declare a variable to hold the broker service instance.
   * This variable will be assigned a specific broker instance based on the provided type.
   */
  let brokerService: MessageQueueService;

  /**
   * Use a switch-case statement to determine the type of broker service to create.
   * The type parameter is used to identify and instantiate the correct broker factory.
   */
  switch (type) {
   case 'rabbitmq':
    /**
     * Instantiate RabbitMQBroker using the RabbitMQBrokerFactory.
     * This ensures that RabbitMQ-specific configurations and initializations are handled properly.
     * @type {MessageQueueService}
     */
    brokerService = RabbitMQBrokerFactory.create(configService);
    break;
   case 'sqs':
    /**
     * Instantiate SQSBroker using the SQSBrokerFactory.
     * This ensures that AWS SQS-specific configurations and initializations are handled properly.
     * @type {MessageQueueService}
     */
    brokerService = SQSBrokerFactory.create(configService);
    break;
   case 'kafka':
    /**
     * Instantiate KafkaBroker using the KafkaBrokerFactory.
     * This ensures that Kafka-specific configurations and initializations are handled properly.
     * @type {MessageQueueService}
     */
    brokerService = KafkaBrokerFactory.create(configService);
    break;
   case 'bullmq':
    /**
     * Instantiate BullMQBroker using the BullMQBrokerFactory.
     * This ensures that BullMQ-specific configurations and initializations are handled properly.
     * @type {MessageQueueService}
     */
    brokerService = BullMQBrokerFactory.create(configService);
    break;
   default:
    /**
     * Throw an error if an unknown broker type is provided.
     * This ensures that only supported broker types are processed and invalid types are caught early.
     * @throws {Error}
     */
    throw new Error(`Unknown broker type: ${type}`);
  }

  /**
   * Create an instance of AMQPService with the instantiated broker service.
   * The AMQPService instance will utilize the broker service for performing message queue operations.
   * @returns {AMQPService}
   */
  return new AMQPService(brokerService);
 }
}
