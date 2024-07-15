// src/services/amqp/brokers/kafka.broker.ts

import { KafkaService } from '../../../common/interfaces/message-queue.interface';
import { ConfigService } from '../../config/config.service';
import { Kafka, Producer, Consumer } from 'kafkajs';

/**
 * @class KafkaBroker
 * @description Service for handling Kafka operations. This class provides methods to connect, disconnect, publish, consume, and remove messages from Kafka topics.
 */
export class KafkaBroker implements KafkaService {
 /**
  * @property {Kafka} kafka - The Kafka instance.
  * @description This property holds an instance of Kafka, which is used to interact with the Kafka service.
  */
 private kafka: Kafka;

 /**
  * @property {Producer} producer - The Kafka producer instance.
  * @description This property holds an instance of Kafka producer, which is used to send messages to Kafka topics.
  */
 private producer: Producer;

 /**
  * @property {Consumer} consumer - The Kafka consumer instance.
  * @description This property holds an instance of Kafka consumer, which is used to receive messages from Kafka topics.
  */
 private consumer: Consumer;

 /**
  * @property {ConfigService} configService - The ConfigService instance for accessing configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings for the Kafka service.
  */
 private configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for KafkaBroker class. It initializes the Kafka service with the provided configuration settings.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property and initializes the Kafka instance with the configured brokers.
  */
 constructor(configService: ConfigService) {
  this.configService = configService;
  /**
   * Initialize the Kafka instance with the brokers from the configuration service.
   * This instance will be used to create producer and consumer instances for interacting with Kafka topics.
   */
  this.kafka = new Kafka({ brokers: this.configService.getValue<string[]>('kafka.brokers') });
  /**
   * Initialize the Kafka producer instance.
   * This instance will be used to send messages to Kafka topics.
   */
  this.producer = this.kafka.producer();
  /**
   * Initialize the Kafka consumer instance.
   * This instance will be used to receive messages from Kafka topics.
   */
  this.consumer = this.kafka.consumer({ groupId: 'my-group' });
 }

 /**
  * @method connect
  * @description Connect to the Kafka service by connecting the producer and consumer instances.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 async connect(): Promise<void> {
  /**
   * Connect the Kafka producer instance.
   * This method establishes a connection to the Kafka brokers for sending messages.
   */
  await this.producer.connect();
  /**
   * Connect the Kafka consumer instance.
   * This method establishes a connection to the Kafka brokers for receiving messages.
   */
  await this.consumer.connect();
 }

 /**
  * @method disconnect
  * @description Disconnect from the Kafka service by disconnecting the producer and consumer instances.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 async disconnect(): Promise<void> {
  /**
   * Disconnect the Kafka producer instance.
   * This method closes the connection to the Kafka brokers for sending messages.
   */
  await this.producer.disconnect();
  /**
   * Disconnect the Kafka consumer instance.
   * This method closes the connection to the Kafka brokers for receiving messages.
   */
  await this.consumer.disconnect();
 }

 /**
  * @method publish
  * @description Publish a message to the specified Kafka topic.
  * @param {string} topic - The name of the Kafka topic.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 async publish(topic: string, message: any): Promise<void> {
  /**
   * Send the message to the specified Kafka topic.
   * The send method publishes the message to the Kafka topic, and the promise resolves when the operation is complete.
   */
  await this.producer.send({
   topic,
   messages: [{ value: JSON.stringify(message) }],
  });
 }

 /**
  * @method consume
  * @description Consume messages from the specified Kafka topic.
  * @param {string} topic - The name of the Kafka topic.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 async consume(topic: string): Promise<any[]> {
  /**
   * Subscribe to the specified Kafka topic.
   * The subscribe method registers the consumer to receive messages from the Kafka topic.
   */
  await this.consumer.subscribe({ topic });
  /**
   * Initialize an array to store consumed messages.
   * This array will hold the messages received from the Kafka topic.
   */
  const messages: any[] = [];
  /**
   * Run the consumer to process messages from the Kafka topic.
   * The run method starts the consumer to receive and process messages.
   */
  await this.consumer.run({
   eachMessage: async ({ message }) => {
    /**
     * Parse and store the message.
     * The message.value contains the message data, which is parsed from JSON and added to the messages array.
     */
    messages.push(JSON.parse(message.value!.toString()));
   },
  });
  /**
   * Return the array of consumed messages.
   * This array contains the messages that were received from the specified Kafka topic.
   */
  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified Kafka topic. Note: Kafka does not support removing a specific message from the topic.
  * @param {string} topic - The name of the Kafka topic.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 async remove(topic: string, message: any): Promise<void> {
  /**
   * Log a warning that Kafka does not support removing a specific message from the topic.
   * This method logs a warning to indicate that the remove operation is not supported by Kafka.
   */
  console.warn('Kafka does not support removing a specific message from the topic');
 }
}
