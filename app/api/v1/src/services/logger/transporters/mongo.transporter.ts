// src/services/logger/transporters/mongo.transporter.ts

import { transports, TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import 'winston-mongodb'; // Ensure winston-mongodb is imported for MongoDB transport.

/**
 * @class MongoTransporter
 * @description Transporter class for logging to a MongoDB database. This class creates a MongoDB transport using the winston logging library.
 * It sends log messages to a specified MongoDB collection, which can be configured using the ConfigService instance.
 */
export class MongoTransporter {
 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings. These settings
  * can be used to customize the behavior of the MongoDB transport, such as the database URI and collection name.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for MongoTransporter class. It initializes the MongoTransporter with the provided ConfigService instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property of the class. This instance
  * will be used to access configuration settings needed to configure the MongoDB transport.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the MongoTransporter class to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method createTransport
  * @description Create a new MongoDB transport for logging. This method uses the winston transports.MongoDB class to create a MongoDB transport.
  * It configures the transport with the specified database URI and collection name.
  * @param {string} uri - The MongoDB URI to connect to.
  * @param {string} collection - The MongoDB collection to store logs in.
  * @returns {TransportStream} - The created MongoDB transport.
  * @description The createTransport method creates and configures a new MongoDB transport for logging. It sets up the transport to send log
  * messages to the specified MongoDB collection.
  */
 public createTransport(uri: string, collection: string): TransportStream {
  /**
   * Create and return a new instance of transports.MongoDB.
   * The db property specifies the MongoDB URI for connecting to the database.
   * The collection property specifies the MongoDB collection for storing log messages.
   * The level property specifies the log level for this transport.
   */
  return new transports.MongoDB({
   /**
    * The db property specifies the MongoDB URI for connecting to the database.
    * This determines the database where the log entries will be stored.
    */
   db: uri,
   /**
    * The collection property specifies the MongoDB collection for storing log messages.
    * This determines the collection where the log entries will be stored.
    */
   collection: collection,
   /**
    * The level property specifies the log level for this transport.
    * This determines the severity of log messages that will be stored in the database.
    */
   level: 'info',
  });
 }
}
