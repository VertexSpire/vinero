// src/services/amqp/brokers/rabbitmq.broker.ts

import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class RabbitMQBroker
 * @description RabbitMQ broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using RabbitMQ.
 */
export class RabbitMQBroker implements MessageQueueService {
 private connection: Connection | null = null;
 private channel: Channel | null = null;
 private readonly configService: ConfigService;
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for RabbitMQBroker class. It initializes the configService instance and sets up the RabbitMQ connection and channel.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {LoggerService} loggerService - The LoggerService instance.
  */
 constructor(configService: ConfigService, loggerService: LoggerService) {
  this.configService = configService;
  this.logger = loggerService;

  /**
   * Log initialization.
   * This helps in tracking that the RabbitMQBroker has been properly initialized with necessary configurations.
   */
  this.logger.info('RabbitMQBroker initialized with configuration service and logger service.');
 }

 /**
  * @method connect
  * @description Connect to the RabbitMQ service.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 public async connect(): Promise<void> {
  /**
   * Log the start of the connection process.
   * This step ensures that we are aware of when the connection to RabbitMQ starts.
   */
  this.logger.info('Connecting to RabbitMQ.');

  /**
   * Establish connection with RabbitMQ.
   * The connection is created using the amqp library and the connection URI from the configuration service.
   */
  this.connection = await amqp.connect(this.configService.getValue<string>('rabbitmq.uri'));

  /**
   * Create a channel for communication with RabbitMQ.
   * This channel is used to send and receive messages from RabbitMQ queues.
   */
  this.channel = await this.connection.createChannel();

  /**
   * Log successful connection.
   * This confirms that the connection and channel to RabbitMQ have been established.
   */
  this.logger.info('Connected to RabbitMQ.');
 }

 /**
  * @method disconnect
  * @description Disconnect from the RabbitMQ service.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 public async disconnect(): Promise<void> {
  /**
   * Log the start of the disconnection process.
   * This step ensures that we are aware of when the disconnection from RabbitMQ starts.
   */
  this.logger.info('Disconnecting from RabbitMQ.');

  /**
   * Close the channel if it exists.
   * This ensures that the channel is properly closed before disconnecting.
   */
  if (this.channel) {
   await this.channel.close();
  }

  /**
   * Close the connection if it exists.
   * This ensures that the connection to RabbitMQ is properly closed.
   */
  if (this.connection) {
   await this.connection.close();
  }

  /**
   * Log successful disconnection.
   * This confirms that the connection and channel to RabbitMQ have been closed.
   */
  this.logger.info('Disconnected from RabbitMQ.');
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
  this.logger.info(`Publishing message to queue: ${queue}`);

  /**
   * Ensure the channel is available.
   * The channel is required to send messages to RabbitMQ.
   */
  if (!this.channel) {
   throw new Error('Channel is not available');
  }

  /**
   * Assert that the queue exists.
   * This step ensures that the queue is created if it does not already exist.
   */
  await this.channel.assertQueue(queue);

  /**
   * Send the message to the specified queue.
   * The message is converted to a Buffer before being sent.
   */
  this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  /**
   * Log successful message publishing.
   * This confirms that the message has been sent to the specified RabbitMQ queue.
   */
  this.logger.info(`Message published to queue: ${queue}`);
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
  this.logger.info(`Consuming messages from queue: ${queue}`);

  /**
   * Ensure the channel is available.
   * The channel is required to receive messages from RabbitMQ.
   */
  if (!this.channel) {
   throw new Error('Channel is not available');
  }

  /**
   * Assert that the queue exists.
   * This step ensures that the queue is created if it does not already exist.
   */
  await this.channel.assertQueue(queue);

  /**
   * Consume messages from the specified queue.
   * Each message is parsed from JSON and added to the messages array.
   */
  await this.channel.consume(queue, (msg: ConsumeMessage | null) => {
   if (msg) {
    messages.push(JSON.parse(msg.content.toString()));
    this.channel?.ack(msg);
   }
  });

  /**
   * Log successful message consumption.
   * This confirms that messages have been consumed from the specified RabbitMQ queue.
   */
  this.logger.info(`Messages consumed from queue: ${queue}`);

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
  this.logger.info(`Removing message from queue: ${queue}`);

  /**
   * Log a warning for unsupported operation.
   * RabbitMQ does not support direct removal of messages, so this method serves as a placeholder.
   */
  this.logger.warn('RabbitMQ does not support direct removal of messages.');
 }
}
