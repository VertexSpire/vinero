// src/services/amqp/brokers/sqs.broker.ts

import { SQSService } from '../../../common/interfaces/message-queue.interface';
import { ConfigService } from '../../config/config.service';
import AWS from 'aws-sdk';

/**
 * @class SQSBroker
 * @description Service for handling Amazon SQS operations. This class provides methods to connect, disconnect, publish, consume, and remove messages from SQS queues.
 */
export class SQSBroker implements SQSService {
 /**
  * @property {AWS.SQS} sqs - The AWS SQS instance.
  * @description This property holds an instance of AWS.SQS, which is used to interact with the Amazon SQS service.
  */
 private sqs: AWS.SQS;

 /**
  * @property {ConfigService} configService - The ConfigService instance for accessing configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings for the SQS service.
  */
 private configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for SQSBroker class. It initializes the SQS service with the provided configuration settings.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property and initializes the AWS.SQS instance with the configured region.
  */
 constructor(configService: ConfigService) {
  this.configService = configService;
  /**
   * Update AWS configuration with the region from the configuration service.
   * This ensures that the AWS SDK uses the correct region for all SQS operations.
   */
  AWS.config.update({ region: this.configService.getValue<string>('sqs.region') });
  /**
   * Initialize the AWS SQS instance.
   * This instance will be used to perform all SQS operations, such as sending and receiving messages.
   */
  this.sqs = new AWS.SQS();
 }

 /**
  * @method connect
  * @description Connect to the Amazon SQS service. SQS is a managed service and does not require explicit connection handling.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 async connect(): Promise<void> {
  /**
   * Log a message indicating that the connection to SQS has been established.
   * Since SQS is a managed service, this method does not need to perform any actual connection steps.
   */
  console.log('Connected to SQS');
 }

 /**
  * @method disconnect
  * @description Disconnect from the Amazon SQS service. SQS is a managed service and does not require explicit disconnection handling.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 async disconnect(): Promise<void> {
  /**
   * Log a message indicating that the disconnection from SQS has been completed.
   * Since SQS is a managed service, this method does not need to perform any actual disconnection steps.
   */
  console.log('Disconnected from SQS');
 }

 /**
  * @method publish
  * @description Publish a message to the specified SQS queue.
  * @param {string} queue - The URL of the SQS queue.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 async publish(queue: string, message: any): Promise<void> {
  /**
   * Create the parameters for the sendMessage operation.
   * The QueueUrl specifies the queue to send the message to, and the MessageBody contains the message to send.
   */
  const params = {
   QueueUrl: queue,
   MessageBody: JSON.stringify(message),
  };
  /**
   * Send the message to the specified SQS queue.
   * The sendMessage operation sends a message to the specified queue, and the promise resolves when the operation is complete.
   */
  await this.sqs.sendMessage(params).promise();
 }

 /**
  * @method consume
  * @description Consume messages from the specified SQS queue.
  * @param {string} queue - The URL of the SQS queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 async consume(queue: string): Promise<any[]> {
  /**
   * Create the parameters for the receiveMessage operation.
   * The QueueUrl specifies the queue to receive messages from, and the MaxNumberOfMessages specifies the maximum number of messages to receive.
   */
  const params = {
   QueueUrl: queue,
   MaxNumberOfMessages: 10,
  };
  /**
   * Receive messages from the specified SQS queue.
   * The receiveMessage operation retrieves one or more messages from the specified queue, and the promise resolves with the retrieved messages.
   */
  const result = await this.sqs.receiveMessage(params).promise();
  /**
   * Extract the messages from the result and parse the message bodies.
   * The result.Messages property contains an array of messages, and each message body is parsed from JSON.
   */
  const messages = result.Messages ? result.Messages.map((m) => JSON.parse(m.Body as string)) : [];
  /**
   * Return the array of parsed messages.
   * This array contains the messages that were retrieved from the specified SQS queue.
   */
  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified SQS queue.
  * @param {string} queue - The URL of the SQS queue.
  * @param {any} message - The message to remove, including the ReceiptHandle.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 async remove(queue: string, message: any): Promise<void> {
  /**
   * Create the parameters for the deleteMessage operation.
   * The QueueUrl specifies the queue to delete the message from, and the ReceiptHandle specifies the message to delete.
   */
  const params = {
   QueueUrl: queue,
   ReceiptHandle: message.ReceiptHandle,
  };
  /**
   * Delete the message from the specified SQS queue.
   * The deleteMessage operation deletes the specified message from the queue, and the promise resolves when the operation is complete.
   */
  await this.sqs.deleteMessage(params).promise();
 }
}
