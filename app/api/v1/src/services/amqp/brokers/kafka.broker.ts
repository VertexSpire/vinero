import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class KafkaBroker
 * @description Kafka broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using Kafka.
 * It utilizes the kafkajs library to interface with Kafka. The class relies on configuration and logging services to ensure proper setup and operation.
 */
export class KafkaBroker implements MessageQueueService {
 /**
  * @private
  * @description The Kafka instance for connecting to the Kafka cluster. It is initialized using configuration settings provided by ConfigService.
  * The Kafka instance is the main entry point to interact with Kafka, providing methods to create producers and consumers.
  */
 private kafka: Kafka;

 /**
  * @private
  * @description The producer instance for sending messages to Kafka topics. It is created from the Kafka instance.
  * Producers are responsible for sending records to Kafka topics. This producer is configured based on the Kafka instance created in the constructor.
  */
 private producer: Producer;

 /**
  * @private
  * @description The consumer instance for receiving messages from Kafka topics. It is created from the Kafka instance.
  * Consumers read records from Kafka topics. This consumer is configured with a group ID to identify the consumer group it belongs to.
  */
 private consumer: Consumer;

 /**
  * @private
  * @readonly
  * @description The ConfigService instance for accessing configuration settings. This service provides necessary configuration values for setting up Kafka.
  * ConfigService is used to fetch configuration values such as Kafka brokers, client ID, and group ID, which are crucial for Kafka setup.
  */
 private readonly configService: ConfigService;

 /**
  * @private
  * @readonly
  * @description The LoggerService instance for logging information, warnings, and errors. This service is used for tracking and debugging purposes.
  * LoggerService is used extensively throughout the class to log various actions, helping in debugging and monitoring the application's behavior.
  */
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for KafkaBroker class. It initializes the configService and logger instances and sets up the Kafka instance.
  * The constructor creates the Kafka instance using clientId and brokers information retrieved from the configService.
  * It also initializes the producer and consumer instances.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {LoggerService} loggerService - The LoggerService instance.
  */
 constructor(configService: ConfigService, loggerService: LoggerService) {
  this.configService = configService;
  this.logger = loggerService;

  // Initialize the Kafka instance with clientId and brokers from configuration service.
  this.kafka = new Kafka({
   clientId: this.configService.getValue<string>('kafka.clientId'),
   brokers: this.configService.getValue<string[]>('kafka.brokers'),
  });

  // Create the producer and consumer instances from the Kafka instance.
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
  * This method establishes connections for both the producer and consumer to the Kafka cluster. It ensures that the application can publish and consume messages.
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
   * This is crucial to ensure that the producer is ready to send messages.
   */
  await this.producer.connect();

  /**
   * Establish connection with the Kafka consumer.
   * This ensures that the consumer is ready to consume messages from the specified Kafka topics.
   * The consumer's connection is important for it to start receiving messages.
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
  * This method disconnects both the producer and consumer from the Kafka cluster, stopping any further message production or consumption.
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
   * The await keyword ensures the producer has completely disconnected before proceeding.
   */
  await this.producer.disconnect();

  /**
   * Disconnect the Kafka consumer.
   * This ensures that the consumer stops receiving messages from Kafka.
   * The await keyword ensures the consumer has completely disconnected before proceeding.
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
  * This method sends a message to a Kafka topic by converting the message to a JSON string and using the producer to send it.
  * The message is wrapped in an object with a value property to conform to Kafka's message format.
  * @param {string} topic - The name of the topic.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 public async publish(topic: string, message: any): Promise<void> {
  /**
   * Log the publishing action.
   * This provides visibility into the topic and message being published.
   * Logging the action helps in debugging and monitoring message flow.
   */
  this.logger.info(`Publishing message to topic: ${topic}`);

  /**
   * Publish the message to the specified Kafka topic.
   * The message is converted to a JSON string before being sent.
   * This ensures that the message is in the correct format for Kafka.
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
  * This method subscribes to a Kafka topic and processes messages from the beginning, adding them to an array.
  * It uses the consumer instance to subscribe and run a callback function for each received message.
  * @param {string} topic - The name of the topic.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 public async consume(topic: string): Promise<any[]> {
  const messages: any[] = [];

  /**
   * Log the consumption action.
   * This provides visibility into the topic from which messages are being consumed.
   * Logging the action helps in tracking message consumption and debugging.
   */
  this.logger.info(`Consuming messages from topic: ${topic}`);

  /**
   * Subscribe to the specified Kafka topic.
   * The fromBeginning option ensures that messages are consumed from the start of the topic.
   * This is useful for applications that need to process historical data.
   */
  await this.consumer.subscribe({ topic, fromBeginning: true });

  /**
   * Run the consumer to process messages from the topic.
   * Each message is parsed from JSON and added to the messages array.
   * This callback function runs for each received message, ensuring all messages are processed.
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
  * This method is a placeholder as Kafka does not support direct removal of messages. It logs a warning instead.
  * Kafka messages are immutable and cannot be directly deleted; this method acknowledges that limitation.
  * @param {string} topic - The name of the topic.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 public async remove(topic: string, message: any): Promise<void> {
  /**
   * Log a warning for unsupported operation.
   * Kafka does not support direct removal of messages, so this method serves as a placeholder.
   * This is important for developers to understand the limitations of Kafka.
   */
  this.logger.warn('Kafka does not support direct removal of messages.');
 }
}
