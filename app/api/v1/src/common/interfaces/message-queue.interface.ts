// src/common/interfaces/message-queue.interface.ts

/**
 * @file message-queue.interface.ts
 * @description Interface definitions for message queue services. These interfaces define the structure and required methods for different message brokers.
 */

/**
 * @interface MessageQueueService
 * @description Interface for message queue services. This interface defines the methods required for connecting, disconnecting, publishing, consuming, and removing messages from a message queue.
 */
export interface MessageQueueService {
 /**
  * @method connect
  * @description Connect to the message queue service.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 connect(): Promise<void>;

 /**
  * @method disconnect
  * @description Disconnect from the message queue service.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 disconnect(): Promise<void>;

 /**
  * @method publish
  * @description Publish a message to the specified queue.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 publish(queue: string, message: any): Promise<void>;

 /**
  * @method consume
  * @description Consume messages from the specified queue.
  * @param {string} queue - The name of the queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 consume(queue: string): Promise<any[]>;

 /**
  * @method remove
  * @description Remove a message from the specified queue.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 remove(queue: string, message: any): Promise<void>;
}
