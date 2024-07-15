// src/services/amqp/brokers/rabbitmq.broker.ts

import amqp, { Connection, Channel, Message } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';

/**
 * @class RabbitMQBroker
 * @description RabbitMQ broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using RabbitMQ.
 */
export class RabbitMQBroker implements MessageQueueService {
 /**
  * @property {Connection} connection - The RabbitMQ connection instance.
  * @description This property holds the RabbitMQ connection instance.
  */
 private connection: Connection | null = null;

 /**
  * @property {Channel} channel - The RabbitMQ channel instance.
  * @description This property holds the RabbitMQ channel instance.
  */
 private channel: Channel | null = null;

 /**
  * @property {ConfigService} configService - The ConfigService instance.
  * @description This property holds the ConfigService instance to access configuration settings.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for RabbitMQBroker class. It initializes the configService instance.
  * @param {ConfigService} configService - The ConfigService instance.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the RabbitMQBroker class to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method connect
  * @description Connect to the RabbitMQ service.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 public async connect(): Promise<void> {
  /**
   * Get the RabbitMQ URL from the configuration service.
   * This URL is used to establish a connection to the RabbitMQ server.
   */
  const url = this.configService.getValue<string>('rabbitmq.url');

  /**
   * Establish a connection to the RabbitMQ server.
   * The connection is stored in the connection property.
   */
  this.connection = await amqp.connect(url);

  /**
   * Create a channel on the RabbitMQ connection.
   * The channel is stored in the channel property and is used for message operations.
   */
  this.channel = await this.connection.createChannel();
 }

 /**
  * @method disconnect
  * @description Disconnect from the RabbitMQ service.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 public async disconnect(): Promise<void> {
  /**
   * Close the RabbitMQ channel if it exists.
   * This ensures that all resources are properly released.
   */
  if (this.channel) {
   await this.channel.close();
  }

  /**
   * Close the RabbitMQ connection if it exists.
   * This ensures that all resources are properly released.
   */
  if (this.connection) {
   await this.connection.close();
  }
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
   * Ensure the channel is available before publishing the message.
   * This prevents errors from occurring if the channel is not initialized.
   */
  if (!this.channel) {
   throw new Error('Channel is not initialized');
  }

  /**
   * Assert the queue exists before sending the message.
   * This creates the queue if it does not already exist.
   */
  await this.channel.assertQueue(queue);

  /**
   * Send the message to the specified queue.
   * The message is sent as a Buffer to ensure proper encoding.
   */
  this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
 }

 /**
  * @method consume
  * @description Consume messages from the specified queue.
  * @param {string} queue - The name of the queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 public async consume(queue: string): Promise<any[]> {
  /**
   * Ensure the channel is available before consuming messages.
   * This prevents errors from occurring if the channel is not initialized.
   */
  if (!this.channel) {
   throw new Error('Channel is not initialized');
  }

  /**
   * Assert the queue exists before consuming messages.
   * This creates the queue if it does not already exist.
   */
  await this.channel.assertQueue(queue);

  /**
   * Create an array to store the consumed messages.
   * This array is returned at the end of the method.
   */
  const messages: any[] = [];

  /**
   * Consume messages from the queue.
   * The messages are added to the messages array.
   */
  await this.channel.consume(queue, (msg: Message | null) => {
   if (msg) {
    messages.push(JSON.parse(msg.content.toString()));
    this.channel?.ack(msg);
   }
  });

  /**
   * Return the array of consumed messages.
   * The messages array contains all messages that were consumed from the queue.
   */
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
   * Ensure the channel is available before removing the message.
   * This prevents errors from occurring if the channel is not initialized.
   */
  if (!this.channel) {
   throw new Error('Channel is not initialized');
  }

  /**
   * Assert the queue exists before removing messages.
   * This creates the queue if it does not already exist.
   */
  await this.channel.assertQueue(queue);

  /**
   * Get all messages from the queue.
   * This step is necessary to find the message to remove.
   */
  const messages: any[] = await this.consume(queue);

  /**
   * Find the index of the message to remove.
   * This ensures the correct message is removed from the queue.
   */
  const index = messages.findIndex((msg) => JSON.stringify(msg) === JSON.stringify(message));

  /**
   * If the message is found, remove it from the queue.
   * This is done by acknowledging all previous messages and rejecting the target message.
   */
  if (index !== -1) {
   for (let i = 0; i < index; i++) {
    const msg = messages[i];
    this.channel.ack(msg);
   }
   const msg = messages[index];
   this.channel.nack(msg, false, false);
  }
 }
}
