// src/services/amqp/brokers/sqs.broker.ts

import { SQS } from 'aws-sdk';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class SQSBroker
 * @description Amazon SQS broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using Amazon SQS.
 */
export class SQSBroker implements MessageQueueService {
 private sqs: SQS;
 private readonly configService: ConfigService;
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for SQSBroker class. It initializes the configService instance and sets up the SQS instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {LoggerService} loggerService - The LoggerService instance.
  */
 constructor(configService: ConfigService, loggerService: LoggerService) {
  this.configService = configService;
  this.logger = loggerService;

  this.sqs = new SQS({
   region: this.configService.getValue<string>('sqs.region'),
   accessKeyId: this.configService.getValue<string>('sqs.accessKeyId'),
   secretAccessKey: this.configService.getValue<string>('sqs.secretAccessKey'),
  });

  /**
   * Log initialization.
   * This helps in tracking that the SQSBroker has been properly initialized with necessary configurations.
   */
  this.logger.info('SQSBroker initialized with SQS instance.');
 }

 /**
  * @method connect
  * @description Connect to the SQS service.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 public async connect(): Promise<void> {
  /**
   * Log the connection action.
   * SQS does not require an explicit connection method, but this log ensures that we are aware of when the connection setup starts.
   */
  this.logger.info('Connecting to SQS.');
 }

 /**
  * @method disconnect
  * @description Disconnect from the SQS service.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 public async disconnect(): Promise<void> {
  /**
   * Log the disconnection action.
   * SQS does not require an explicit disconnection method, but this log ensures that we are aware of when the disconnection setup starts.
   */
  this.logger.info('Disconnecting from SQS.');
 }

 /**
  * @method publish
  * @description Publish a message to the specified queue.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 public async publish(queue: string, message: any): Promise<void> {
  /**
   * Log the publishing action.
   * This provides visibility into the queue and message being published.
   */
  this.logger.info(`Publishing message to SQS queue: ${queue}`);

  /**
   * Send the message to the specified SQS queue.
   * The message is converted to a JSON string before being sent.
   */
  await this.sqs
   .sendMessage({
    QueueUrl: this.configService.getValue<string>(`sqs.queues.${queue}`),
    MessageBody: JSON.stringify(message),
   })
   .promise();

  /**
   * Log successful message publishing.
   * This confirms that the message has been sent to the specified SQS queue.
   */
  this.logger.info(`Message published to SQS queue: ${queue}`);
 }

 /**
  * @method consume
  * @description Consume messages from the specified queue.
  * @param {string} queue - The name of the queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 public async consume(queue: string): Promise<any[]> {
  const messages: any[] = [];

  /**
   * Log the consumption action.
   * This provides visibility into the queue from which messages are being consumed.
   */
  this.logger.info(`Consuming messages from SQS queue: ${queue}`);

  /**
   * Receive messages from the specified SQS queue.
   * This step retrieves a batch of messages from the queue.
   */
  const result = await this.sqs
   .receiveMessage({
    QueueUrl: this.configService.getValue<string>(`sqs.queues.${queue}`),
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
   })
   .promise();

  /**
   * Process the received messages.
   * Each message is parsed from JSON and added to the messages array.
   */
  if (result.Messages) {
   for (const message of result.Messages) {
    messages.push(JSON.parse(message.Body || '{}'));
   }
  }

  /**
   * Log successful message consumption.
   * This confirms that messages have been consumed from the specified SQS queue.
   */
  this.logger.info(`Messages consumed from SQS queue: ${queue}`);

  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified queue.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 public async remove(queue: string, message: any): Promise<void> {
  /**
   * Log the removal action.
   * This provides visibility into the queue and message being removed.
   */
  this.logger.info(`Removing message from SQS queue: ${queue}`);

  /**
   * Remove the specified message from the queue.
   * The message receipt handle is required to delete the message from the queue.
   */
  await this.sqs
   .deleteMessage({
    QueueUrl: this.configService.getValue<string>(`sqs.queues.${queue}`),
    ReceiptHandle: message.ReceiptHandle,
   })
   .promise();

  /**
   * Log successful message removal.
   * This confirms that the message has been removed from the specified SQS queue.
   */
  this.logger.info(`Message removed from SQS queue: ${queue}`);
 }
}
