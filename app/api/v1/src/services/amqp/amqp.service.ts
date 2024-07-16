// src/services/amqp/amqp.service.ts

import { MessageQueueService } from '../../common/interfaces/message-queue.interface';

/**
 * @class AMQPService
 * @description Service for interacting with different AMQP brokers. This service provides methods to connect, disconnect, publish, consume, and remove messages using the configured broker.
 */
export class AMQPService implements MessageQueueService {
 /**
  * @property {MessageQueueService} brokerService - The instance of the broker service (e.g., RabbitMQ, SQS, Kafka, BullMQ).
  * @description This property holds the instance of the broker service that is used for interacting with the message queue.
  */
 private brokerService: MessageQueueService;

 /**
  * @constructor
  * @description Constructor for AMQPService class. It initializes the broker service with the provided instance.
  * @param {MessageQueueService} brokerService - The instance of the broker service.
  */
 constructor(brokerService: MessageQueueService) {
  /*
   * Assign the provided broker service instance to the class property.
   * This instance will be used to perform all message queue operations.
   * The brokerService parameter is expected to be an instance of a class
   * that implements the MessageQueueService interface. This design allows
   * for flexibility in using different message queue services (e.g., RabbitMQ, SQS, Kafka, BullMQ)
   * without changing the AMQPService class itself.
   */
  this.brokerService = brokerService;
 }

 /**
  * @method connect
  * @description Connect to the message queue service using the configured broker.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 async connect(): Promise<void> {
  /*
   * Delegate the connect operation to the broker service.
   * This ensures that the connection logic specific to the broker is handled by the broker service.
   * By using this delegation, the AMQPService class does not need to contain
   * broker-specific connection logic, adhering to the single responsibility principle
   * and promoting code reusability and maintainability.
   */
  await this.brokerService.connect();
 }

 /**
  * @method disconnect
  * @description Disconnect from the message queue service using the configured broker.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 async disconnect(): Promise<void> {
  /*
   * Delegate the disconnect operation to the broker service.
   * This ensures that the disconnection logic specific to the broker is handled by the broker service.
   * This approach keeps the AMQPService class independent of the underlying broker's
   * disconnection process, allowing for easier updates and changes to the broker implementation.
   */
  await this.brokerService.disconnect();
 }

 /**
  * @method publish
  * @description Publish a message to the specified queue or topic using the configured broker.
  * @param {string} queue - The name of the queue or topic.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 async publish(queue: string, message: any): Promise<void> {
  /*
   * Delegate the publish operation to the broker service.
   * This ensures that the publishing logic specific to the broker is handled by the broker service.
   * By delegating this task, the AMQPService class remains agnostic to the specifics
   * of how messages are published, making it easier to swap out the broker service if needed.
   */
  await this.brokerService.publish(queue, message);
 }

 /**
  * @method consume
  * @description Consume messages from the specified queue or topic using the configured broker.
  * @param {string} queue - The name of the queue or topic.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 async consume(queue: string): Promise<any[]> {
  /*
   * Delegate the consume operation to the broker service.
   * This ensures that the consuming logic specific to the broker is handled by the broker service.
   * The AMQPService class leverages the broker service's implementation to retrieve messages,
   * promoting separation of concerns and making the codebase more modular and maintainable.
   */
  return await this.brokerService.consume(queue);
 }

 /**
  * @method remove
  * @description Remove a message from the specified queue or topic using the configured broker.
  * @param {string} queue - The name of the queue or topic.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 async remove(queue: string, message: any): Promise<void> {
  /*
   * Delegate the remove operation to the broker service.
   * This ensures that the removal logic specific to the broker is handled by the broker service.
   * By offloading this responsibility to the broker service, the AMQPService class
   * maintains a clear and concise API for interacting with message queues,
   * while the underlying complexity is managed by the broker service.
   */
  await this.brokerService.remove(queue, message);
 }
}
