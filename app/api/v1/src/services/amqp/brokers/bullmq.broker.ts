// src/services/amqp/brokers/bullmq.broker.ts

import { BullMQService } from '../../../common/interfaces/message-queue.interface';
import { ConfigService } from '../../config/config.service';
import { Queue, Worker, QueueScheduler, Job } from 'bullmq';

/**
 * @class BullMQBroker
 * @description Service for handling BullMQ operations. This class provides methods to connect, disconnect, publish, consume, and remove messages from BullMQ queues.
 */
export class BullMQBroker implements BullMQService {
 /**
  * @property {ConfigService} configService - The ConfigService instance for accessing configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings for the BullMQ service.
  */
 private configService: ConfigService;

 /**
  * @property {Map<string, Queue>} queueMap - A map of BullMQ queues.
  * @description This map stores BullMQ queue instances, keyed by queue name.
  */
 private queueMap: Map<string, Queue> = new Map();

 /**
  * @property {Map<string, QueueScheduler>} schedulerMap - A map of BullMQ queue schedulers.
  * @description This map stores BullMQ queue scheduler instances, keyed by queue name.
  */
 private schedulerMap: Map<string, QueueScheduler> = new Map();

 /**
  * @property {Map<string, Worker>} workerMap - A map of BullMQ workers.
  * @description This map stores BullMQ worker instances, keyed by queue name.
  */
 private workerMap: Map<string, Worker> = new Map();

 /**
  * @constructor
  * @description Constructor for BullMQBroker class. It initializes the BullMQ service with the provided configuration settings.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property.
  */
 constructor(configService: ConfigService) {
  this.configService = configService;
 }

 /**
  * @method connect
  * @description Connect to the BullMQ service. BullMQ is managed via Redis and does not require explicit connection handling.
  * @returns {Promise<void>} - A promise that resolves when the connection is established.
  */
 async connect(): Promise<void> {
  /**
   * Log a message indicating that the connection to BullMQ has been established.
   * Since BullMQ is managed via Redis, this method does not need to perform any actual connection steps.
   */
  console.log('Connected to BullMQ');
 }

 /**
  * @method disconnect
  * @description Disconnect from the BullMQ service. BullMQ is managed via Redis and does not require explicit disconnection handling.
  * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
  */
 async disconnect(): Promise<void> {
  /**
   * Log a message indicating that the disconnection from BullMQ has been completed.
   * Since BullMQ is managed via Redis, this method does not need to perform any actual disconnection steps.
   */
  console.log('Disconnected from BullMQ');
 }

 /**
  * @method publish
  * @description Publish a message to the specified BullMQ queue.
  * @param {string} queueName - The name of the queue.
  * @param {any} message - The message to publish.
  * @returns {Promise<void>} - A promise that resolves when the message is published.
  */
 async publish(queueName: string, message: any): Promise<void> {
  /**
   * Check if the queue already exists in the queueMap.
   * If not, create a new queue and scheduler for the specified queue name.
   */
  if (!this.queueMap.has(queueName)) {
   const queue = new Queue(queueName, { connection: this.configService.getValue('bullmq.redis') });
   this.queueMap.set(queueName, queue);
   this.schedulerMap.set(
    queueName,
    new QueueScheduler(queueName, { connection: this.configService.getValue('bullmq.redis') }),
   );
  }
  /**
   * Get the queue from the queueMap.
   * This ensures that the queue is properly initialized before adding a message.
   */
  const queue = this.queueMap.get(queueName)!;
  /**
   * Add the message to the queue.
   * The add method publishes the message to the specified queue, and the promise resolves when the operation is complete.
   */
  await queue.add('job', message);
 }

 /**
  * @method consume
  * @description Consume messages from the specified BullMQ queue.
  * @param {string} queueName - The name of the queue.
  * @returns {Promise<any[]>} - A promise that resolves to an array of messages.
  */
 async consume(queueName: string): Promise<any[]> {
  /**
   * Check if the worker already exists in the workerMap.
   * If not, create a new worker for the specified queue name.
   */
  if (!this.workerMap.has(queueName)) {
   const worker = new Worker(queueName, async (job: Job) => job.data, {
    connection: this.configService.getValue('bullmq.redis'),
   });
   this.workerMap.set(queueName, worker);
  }
  /**
   * Get the worker from the workerMap.
   * This ensures that the worker is properly initialized before consuming messages.
   */
  const worker = this.workerMap.get(queueName)!;
  /**
   * Initialize an array to store consumed messages.
   * This array will hold the messages received from the BullMQ queue.
   */
  const messages: any[] = [];
  /**
   * Listen for the 'completed' event on the worker.
   * When a job is completed, the message is added to the messages array.
   */
  worker.on('completed', (job: Job) => {
   messages.push(job.returnvalue);
  });
  /**
   * Return the array of consumed messages.
   * This array contains the messages that were received from the specified BullMQ queue.
   */
  return messages;
 }

 /**
  * @method remove
  * @description Remove a message from the specified BullMQ queue.
  * @param {string} queueName - The name of the queue.
  * @param {any} message - The message to remove.
  * @returns {Promise<void>} - A promise that resolves when the message is removed.
  */
 async remove(queueName: string, message: any): Promise<void> {
  /**
   * Check if the queue already exists in the queueMap.
   * If not, create a new queue for the specified queue name.
   */
  if (!this.queueMap.has(queueName)) {
   this.queueMap.set(queueName, new Queue(queueName, { connection: this.configService.getValue('bullmq.redis') }));
  }
  /**
   * Get the queue from the queueMap.
   * This ensures that the queue is properly initialized before removing a message.
   */
  const queue = this.queueMap.get(queueName)!;
  /**
   * Get all jobs from the queue.
   * This step is necessary to find the job that matches the specified message.
   */
  const jobs = await queue.getJobs();
  /**
   * Find the job that matches the specified message.
   * The find method searches the jobs array for a job with data that matches the message.
   */
  const job = jobs.find((j) => j.data === message);
  /**
   * If a matching job is found, remove it from the queue.
   * The remove method deletes the job from the queue, and the promise resolves when the operation is complete.
   */
  if (job) {
   await job.remove();
  }
 }
}
