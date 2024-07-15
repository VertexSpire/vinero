// src/config/amqp.ts

/**
 * @file amqp.ts
 * @description Configuration file for AMQP services. This file provides the configuration settings for different message brokers such as RabbitMQ, SQS, Kafka, and BullMQ.
 */

/**
 * @constant {Object} amqpConfig
 * @description Configuration settings for AMQP services. This object contains the configuration settings for RabbitMQ, SQS, Kafka, and BullMQ. Each broker type has its own nested object with specific configuration settings.
 */
export const amqpConfig = {
 /**
  * @property {Object} rabbitmq
  * @description Configuration settings for RabbitMQ. This object contains the host, port, username, and password required to connect to the RabbitMQ server.
  * The host and port define the network location of the RabbitMQ server, while the username and password are used for authentication.
  */
 rabbitmq: {
  /**
   * @property {string} host
   * @description The hostname or IP address of the RabbitMQ server. This property specifies the network address of the RabbitMQ server that the application will connect to.
   * If not provided, it defaults to 'localhost', meaning the RabbitMQ server is running on the same machine as the application.
   */
  host: process.env.RABBITMQ_HOST || 'localhost',

  /**
   * @property {number} port
   * @description The port number on which the RabbitMQ server is listening. This property specifies the port used for the network connection to the RabbitMQ server.
   * If not provided, it defaults to 5672, which is the standard port for RabbitMQ.
   */
  port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),

  /**
   * @property {string} username
   * @description The username for authenticating with the RabbitMQ server. This property specifies the username credential required for connecting to RabbitMQ.
   * If not provided, it defaults to 'guest', which is a common default username for RabbitMQ.
   */
  username: process.env.RABBITMQ_USERNAME || 'guest',

  /**
   * @property {string} password
   * @description The password for authenticating with the RabbitMQ server. This property specifies the password credential required for connecting to RabbitMQ.
   * If not provided, it defaults to 'guest', which is a common default password for RabbitMQ.
   */
  password: process.env.RABBITMQ_PASSWORD || 'guest',
 },

 /**
  * @property {Object} sqs
  * @description Configuration settings for AWS SQS. This object contains the accessKeyId, secretAccessKey, and region required to connect to the AWS SQS service.
  * The accessKeyId and secretAccessKey are used for authentication, while the region specifies the geographical location of the SQS service.
  */
 sqs: {
  /**
   * @property {string} accessKeyId
   * @description The AWS access key ID for authenticating with the SQS service. This property specifies the access key credential required for connecting to SQS.
   * If not provided, it defaults to an empty string. It is recommended to set this value through environment variables for security reasons.
   */
  accessKeyId: process.env.SQS_ACCESS_KEY_ID || '',

  /**
   * @property {string} secretAccessKey
   * @description The AWS secret access key for authenticating with the SQS service. This property specifies the secret access key credential required for connecting to SQS.
   * If not provided, it defaults to an empty string. It is recommended to set this value through environment variables for security reasons.
   */
  secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY || '',

  /**
   * @property {string} region
   * @description The AWS region where the SQS service is located. This property specifies the geographical location of the SQS service.
   * If not provided, it defaults to 'us-east-1', which is one of the most commonly used AWS regions.
   */
  region: process.env.SQS_REGION || 'us-east-1',
 },

 /**
  * @property {Object} kafka
  * @description Configuration settings for Kafka. This object contains the clientId, brokers, and groupId required to connect to the Kafka cluster.
  * The clientId identifies the client, the brokers are the Kafka brokers to connect to, and the groupId is used for consumer group coordination.
  */
 kafka: {
  /**
   * @property {string} clientId
   * @description The client ID for the Kafka client. This property specifies a unique identifier for the Kafka client.
   * If not provided, it defaults to 'my-app', which can be changed to a more meaningful name specific to the application.
   */
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',

  /**
   * @property {string[]} brokers
   * @description The list of Kafka brokers to connect to. This property specifies the addresses of the Kafka brokers in the cluster.
   * If not provided, it defaults to ['localhost:9092'], which assumes a Kafka broker running on the local machine.
   */
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),

  /**
   * @property {string} groupId
   * @description The consumer group ID for the Kafka consumer. This property specifies the group ID used for coordinating consumer groups in Kafka.
   * If not provided, it defaults to 'my-group', which can be changed to a more meaningful name specific to the application.
   */
  groupId: process.env.KAFKA_GROUP_ID || 'my-group',
 },

 /**
  * @property {Object} bullmq
  * @description Configuration settings for BullMQ. This object contains the queueName, host, and port required to connect to the BullMQ service.
  * The queueName specifies the name of the queue, while the host and port define the network location of the Redis server used by BullMQ.
  */
 bullmq: {
  /**
   * @property {string} queueName
   * @description The name of the BullMQ queue. This property specifies the name of the queue used by BullMQ.
   * If not provided, it defaults to 'my-queue', which can be changed to a more meaningful name specific to the application.
   */
  queueName: process.env.BULLMQ_QUEUE_NAME || 'my-queue',

  /**
   * @property {string} host
   * @description The hostname or IP address of the Redis server used by BullMQ. This property specifies the network address of the Redis server.
   * If not provided, it defaults to 'localhost', meaning the Redis server is running on the same machine as the application.
   */
  host: process.env.BULLMQ_HOST || 'localhost',

  /**
   * @property {number} port
   * @description The port number on which the Redis server used by BullMQ is listening. This property specifies the port used for the network connection to the Redis server.
   * If not provided, it defaults to 6379, which is the standard port for Redis.
   */
  port: parseInt(process.env.BULLMQ_PORT || '6379', 10),
 },
};
