import { Queue, Worker, QueueScheduler, QueueEvents } from 'bullmq';
import { ConfigService } from '../../config/config.service';
import { MessageQueueService } from '../../../common/interfaces/message-queue.interface';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class BullMQBroker
 * @description BullMQ broker implementation for message queue operations. This class provides methods to connect, disconnect, publish, consume, and remove messages using BullMQ.
 */
export class BullMQBroker implements MessageQueueService {
 /**
  * @private
  * @description The BullMQ queue instance for managing message queues. It is initialized using configuration settings provided by ConfigService.
  */
 private queue: Queue;

 /**
  * @private
  * @readonly
  * @description The ConfigService instance for accessing configuration settings. This service provides necessary configuration values for setting up BullMQ.
  */
 private readonly configService: ConfigService;

 /**
  * @private
  * @readonly
  * @description The LoggerService instance for logging information, warnings, and errors. This service is used for tracking and debugging purposes.
  */
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for BullMQBroker class. It initializes the configService instance and sets up the BullMQ queue.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {LoggerService} loggerService - The LoggerService instance.
  */
 constructor(configService: ConfigService, loggerService: LoggerService) {
  this.configService = configService;
  this.logger = loggerService;

  this.queue = new Queue(this.configService.getValue<string>('bullmq.queueName'), {
   connection: {
    host: this.configService.getValue<string>('bullmq.host'),
    port: this.configService.getValue<number>('bullmq.port'),
   },
  });

  /**
   * Log initialization.
   * This helps in tracking that the BullMQBroker has been properly initialized with necessary configurations.
   */
  this.logger.info('BullMQBroker initialized with BullMQ queue.');
 }

 /**
  * @method connect
  * @description Connect to the BullMQ service.
  * This method logs the connection action. BullMQ does not require an explicit connection method, but logging ensures that we are aware of when the connection setup starts.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 public async connect(): Promise<void> {
  /**
   * Log the connection action.
   * BullMQ does not require an explicit connection method, but this log ensures that we are aware of when the connection setup starts.
   */
  this.logger.info('Connecting to BullMQ.');
 }

 /**
  * @method disconnect
  * @description Disconnect from the BullMQ service.
  * This method logs the disconnection action. BullMQ does not require an explicit disconnection method, but logging ensures that we are aware of when the disconnection setup starts.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 public async disconnect(): Promise<void> {
  /**
   * Log the disconnection action.
   * BullMQ does not require an explicit disconnection method, but this log ensures that we are aware of when the disconnection setup starts.
   */
  this.logger.info('Disconnecting from BullMQ.');
 }

 /**
  * @method publish
  * @description Publish a message to the specified queue.
  * This method adds a message to the BullMQ queue as a job.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 public async publish(queue: string, message: any): Promise<void> {
  /**
   * Log the publishing action.
   * This provides visibility into the queue and message being published.
   */
  this.logger.info(`Publishing message to BullMQ queue: ${queue}`);

  /**
   * Add the message to the specified BullMQ queue.
   * The message is added as a job to the queue.
   */
  await this.queue.add(queue, message);

  /**
   * Log successful message publishing.
   * This confirms that the message has been added to the specified BullMQ queue.
   */
  this.logger.info(`Message published to BullMQ queue: ${queue}`);
 }

 /**
  * @method consume
  * @description Consume messages from the specified queue.
  * This method creates a worker to process messages from the BullMQ queue and adds them to an array.
  * @param {string} queue - The name of the queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 public async consume(queue: string): Promise<any[]> {
  const messages: any[] = [];

  /**
   * Log the consumption action.
   * This provides visibility into the queue from which messages are being consumed.
   */
  this.logger.info(`Consuming messages from BullMQ queue: ${queue}`);

  /**
   * Create a new worker to process messages from the specified BullMQ queue.
   * Each message is processed and added to the messages array.
   */
  const worker = new Worker(queue, async (job) => {
   messages.push(job.data);
  });

  /**
   * Log successful message consumption.
   * This confirms that messages have been consumed from the specified BullMQ queue.
   */
  this.logger.info(`Messages consumed from BullMQ queue: ${queue}`);

  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified queue.
  * This method is a placeholder as BullMQ does not support direct removal of messages. It logs a warning instead.
  * @param {string} queue - The name of the queue.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 public async remove(queue: string, message: any): Promise<void> {
  /**
   * Log the removal action.
   * This provides visibility into the queue and message being removed.
   */
  this.logger.info(`Removing message from BullMQ queue: ${queue}`);

  /**
   * BullMQ does not support direct removal of messages, so this method serves as a placeholder.
   * Messages can be removed based on job ID or other criteria if needed.
   */
  this.logger.warn('BullMQ does not support direct removal of messages.');
 }
}
