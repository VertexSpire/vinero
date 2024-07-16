// src/services/amqp/brokers/kafka.broker.ts

import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class KafkaBroker
 * @description Kafka broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using Kafka.
 */
export class KafkaBroker implements MessageQueueService {
 private kafka: Kafka;
 private producer: Producer;
 private consumer: Consumer;
 private readonly configService: ConfigService;
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for KafkaBroker class. It initializes the configService instance and sets up the Kafka instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {LoggerService} loggerService - The LoggerService instance.
  */
 constructor(configService: ConfigService, loggerService: LoggerService) {
  this.configService = configService;
  this.logger = loggerService;

  this.kafka = new Kafka({
   clientId: this.configService.getValue<string>('kafka.clientId'),
   brokers: this.configService.getValue<string[]>('kafka.brokers'),
  });

  this.producer = this.kafka.producer();
  this.consumer = this.kafka.consumer({ groupId: this.configService.getValue<string>('kafka.groupId') });

  /**
   * Log initialization.
   * This helps in tracking that the KafkaBroker has been properly initialized with necessary configurations.
   */
  this.logger.info('KafkaBroker initialized with Kafka client, producer, and consumer.');
 }

 /**
  * @method connect
  * @description Connect to the Kafka service.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 public async connect(): Promise<void> {
  /**
   * Log the start of the connection process.
   * This step ensures that we are aware of when the connection to Kafka starts.
   */
  this.logger.info('Connecting Kafka producer and consumer.');

  /**
   * Establish connection with the Kafka producer.
   * The await keyword ensures that the function waits for the connection to be established before proceeding.
   */
  await this.producer.connect();

  /**
   * Establish connection with the Kafka consumer.
   * This ensures that the consumer is ready to consume messages from the specified Kafka topics.
   */
  await this.consumer.connect();

  /**
   * Log successful connection.
   * This confirms that both the producer and consumer are connected to Kafka.
   */
  this.logger.info('Kafka producer and consumer connected.');
 }

 /**
  * @method disconnect
  * @description Disconnect from the Kafka service.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 public async disconnect(): Promise<void> {
  /**
   * Log the start of the disconnection process.
   * This step ensures that we are aware of when the disconnection from Kafka starts.
   */
  this.logger.info('Disconnecting Kafka producer and consumer.');

  /**
   * Disconnect the Kafka producer.
   * This ensures that the producer stops sending messages to Kafka.
   */
  await this.producer.disconnect();

  /**
   * Disconnect the Kafka consumer.
   * This ensures that the consumer stops receiving messages from Kafka.
   */
  await this.consumer.disconnect();

  /**
   * Log successful disconnection.
   * This confirms that both the producer and consumer are disconnected from Kafka.
   */
  this.logger.info('Kafka producer and consumer disconnected.');
 }

 /**
  * @method publish
  * @description Publish a message to the specified topic.
  * @param {string} topic - The name of the topic.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 public async publish(topic: string, message: any): Promise<void> {
  /**
   * Log the publishing action.
   * This provides visibility into the topic and message being published.
   */
  this.logger.info(`Publishing message to topic: ${topic}`);

  /**
   * Publish the message to the specified Kafka topic.
   * The message is converted to a JSON string before being sent.
   */
  await this.producer.send({
   topic,
   messages: [{ value: JSON.stringify(message) }],
  });

  /**
   * Log successful message publishing.
   * This confirms that the message has been sent to the specified Kafka topic.
   */
  this.logger.info(`Message published to topic: ${topic}`);
 }

 /**
  * @method consume
  * @description Consume messages from the specified topic.
  * @param {string} topic - The name of the topic.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 public async consume(topic: string): Promise<any[]> {
  const messages: any[] = [];

  /**
   * Log the consumption action.
   * This provides visibility into the topic from which messages are being consumed.
   */
  this.logger.info(`Consuming messages from topic: ${topic}`);

  /**
   * Subscribe to the specified Kafka topic.
   * The fromBeginning option ensures that messages are consumed from the start of the topic.
   */
  await this.consumer.subscribe({ topic, fromBeginning: true });

  /**
   * Run the consumer to process messages from the topic.
   * Each message is parsed from JSON and added to the messages array.
   */
  await this.consumer.run({
   eachMessage: async ({ message }) => {
    messages.push(JSON.parse(message.value?.toString() || '{}'));
   },
  });

  /**
   * Log successful message consumption.
   * This confirms that messages have been consumed from the specified Kafka topic.
   */
  this.logger.info(`Messages consumed from topic: ${topic}`);

  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified topic.
  * @param {string} topic - The name of the topic.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 public async remove(topic: string, message: any): Promise<void> {
  /**
   * Log a warning for unsupported operation.
   * Kafka does not support direct removal of messages, so this method serves as a placeholder.
   */
  this.logger.warn('Kafka does not support direct removal of messages.');
 }
}
