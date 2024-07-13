// src/services/logger/logger.service.builder.ts

import { LoggerService } from './logger.service';
import { ConfigService } from '../config/config.service';
import { ConsoleTransporterFactory } from './transporters/console.transporter.factory';
import { FileTransporterFactory } from './transporters/file.transporter.factory';
import { HttpTransporterFactory } from './transporters/http.transporter.factory';
import { MongoTransporterFactory } from './transporters/mongo.transporter.factory';
import { TransportStream } from 'winston';

/**
 * @class LoggerServiceBuilder
 * @description Builder class for creating LoggerService instances with different transports.
 */
export class LoggerServiceBuilder {
 /**
  * @property {TransportStream[]} transports - Array to store the different transports for logging.
  * @description The transports property holds an array of TransportStream instances. These instances define where log messages will be sent,
  * such as to the console, files, HTTP endpoints, or MongoDB databases. This array is built incrementally by the builder methods.
  */
 private transports: TransportStream[] = [];

 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  * @description The configService property holds an instance of ConfigService, which provides access to configuration settings.
  * These settings determine which logging transports are enabled and how they are configured.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for LoggerServiceBuilder class.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor initializes the LoggerServiceBuilder with the provided ConfigService instance. This instance
  * is used to access configuration settings that determine how the LoggerService will be built.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the LoggerServiceBuilder to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method addConsoleTransport
  * @description Add console transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  * @description This method checks if console logging is enabled in the configuration. If enabled, it creates a console transporter
  * and adds it to the transports array. This allows log messages to be output to the console.
  */
 public addConsoleTransport(): LoggerServiceBuilder {
  /**
   * Check if console logging is enabled by retrieving the 'console.enable' configuration value.
   * If console logging is enabled, proceed to add the console transport.
   */
  if (this.configService.getValue<boolean>('console.enable')) {
   try {
    /**
     * Create a new instance of ConsoleTransporter using the ConsoleTransporterFactory.
     * This transporter will handle logging messages to the console.
     */
    const consoleTransporter = ConsoleTransporterFactory.createTransporter();

    /**
     * Add the created console transporter to the transports array.
     * This ensures that log messages will be sent to the console.
     */
    this.transports.push(consoleTransporter.createTransport());
   } catch (error) {
    /**
     * Log an error message if there is an issue adding the console transport.
     * This helps in diagnosing any problems with the configuration or transporter creation.
     */
    console.error('Error adding console transport:', error);
   }
  }
  /**
   * Return the current instance of LoggerServiceBuilder to allow method chaining.
   * This enables multiple transports to be added in a fluent manner.
   */
  return this;
 }

 /**
  * @method addFileTransports
  * @description Add file transports to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  * @description This method checks if file logging is enabled in the configuration. If enabled, it creates file transporters
  * for error and combined logs and adds them to the transports array. This allows log messages to be saved to files.
  */
 public addFileTransports(): LoggerServiceBuilder {
  /**
   * Check if file logging is enabled by retrieving the 'file.enable' configuration value.
   * If file logging is enabled, proceed to add the file transports.
   */
  if (this.configService.getValue<boolean>('file.enable')) {
   try {
    /**
     * Create a new instance of FileTransporter using the FileTransporterFactory.
     * This transporter will handle logging messages to files.
     */
    const fileTransporter = FileTransporterFactory.createTransporter();

    /**
     * Add a file transporter for error logs to the transports array.
     * This ensures that error messages are logged to 'logs/error.log'.
     */
    this.transports.push(fileTransporter.createTransport('logs/error.log', 'error'));

    /**
     * Add a file transporter for combined logs to the transports array.
     * This ensures that all log messages are logged to 'logs/combined.log'.
     */
    this.transports.push(fileTransporter.createTransport('logs/combined.log'));
   } catch (error) {
    /**
     * Log an error message if there is an issue adding the file transports.
     * This helps in diagnosing any problems with the configuration or transporter creation.
     */
    console.error('Error adding file transports:', error);
   }
  }
  /**
   * Return the current instance of LoggerServiceBuilder to allow method chaining.
   * This enables multiple transports to be added in a fluent manner.
   */
  return this;
 }

 /**
  * @method addHttpTransport
  * @description Add HTTP transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  * @description This method checks if HTTP logging is enabled in the configuration. If enabled, it retrieves the HTTP logging endpoint,
  * creates an HTTP transporter, and adds it to the transports array. This allows log messages to be sent to an HTTP endpoint.
  */
 public addHttpTransport(): LoggerServiceBuilder {
  /**
   * Check if HTTP logging is enabled by retrieving the 'http.enable' configuration value.
   * If HTTP logging is enabled, proceed to add the HTTP transport.
   */
  if (this.configService.getValue<boolean>('http.enable')) {
   try {
    /**
     * Retrieve the HTTP logging endpoint from the configuration.
     * This endpoint specifies where the log messages should be sent.
     */
    const httpLoggingEndpoint = this.configService.getValue<string>('http.endpoint');

    /**
     * Check if the HTTP logging endpoint is defined.
     * If the endpoint is defined, proceed to create and add the HTTP transporter.
     */
    if (httpLoggingEndpoint) {
     /**
      * Create a new instance of HttpTransporter using the HttpTransporterFactory.
      * This transporter will handle logging messages to the specified HTTP endpoint.
      */
     const httpTransporter = HttpTransporterFactory.createTransporter();

     /**
      * Add the created HTTP transporter to the transports array.
      * This ensures that log messages will be sent to the specified HTTP endpoint.
      */
     this.transports.push(httpTransporter.createTransport(httpLoggingEndpoint));
    }
   } catch (error) {
    /**
     * Log an error message if there is an issue adding the HTTP transport.
     * This helps in diagnosing any problems with the configuration or transporter creation.
     */
    console.error('Error adding HTTP transport:', error);
   }
  }
  /**
   * Return the current instance of LoggerServiceBuilder to allow method chaining.
   * This enables multiple transports to be added in a fluent manner.
   */
  return this;
 }

 /**
  * @method addMongoTransport
  * @description Add MongoDB transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  * @description This method checks if MongoDB logging is enabled in the configuration. If enabled, it retrieves the MongoDB URI and collection name,
  * creates a MongoDB transporter, and adds it to the transports array. This allows log messages to be saved to a MongoDB database.
  */
 public addMongoTransport(): LoggerServiceBuilder {
  /**
   * Check if MongoDB logging is enabled by retrieving the 'mongo.enable' configuration value.
   * If MongoDB logging is enabled, proceed to add the MongoDB transport.
   */
  if (this.configService.getValue<boolean>('mongo.enable')) {
   try {
    /**
     * Retrieve the MongoDB URI from the configuration.
     * This URI specifies the connection string for the MongoDB database.
     */
    const mongoUri = this.configService.getValue<string>('mongo.uri');

    /**
     * Retrieve the MongoDB collection name from the configuration.
     * This collection specifies where the log messages should be stored.
     */
    const mongoCollection = this.configService.getValue<string>('mongo.collection');

    /**
     * Check if both the MongoDB URI and collection name are defined.
     * If both are defined, proceed to create and add the MongoDB transporter.
     */
    if (mongoUri && mongoCollection) {
     /**
      * Create a new instance of MongoTransporter using the MongoTransporterFactory.
      * This transporter will handle logging messages to the specified MongoDB collection.
      */
     const mongoTransporter = MongoTransporterFactory.createTransporter();

     /**
      * Add the created MongoDB transporter to the transports array.
      * This ensures that log messages will be saved to the specified MongoDB collection.
      */
     this.transports.push(mongoTransporter.createTransport(mongoUri, mongoCollection));
    }
   } catch (error) {
    /**
     * Log an error message if there is an issue adding the MongoDB transport.
     * This helps in diagnosing any problems with the configuration or transporter creation.
     */
    console.error('Error adding MongoDB transport:', error);
   }
  }
  /**
   * Return the current instance of LoggerServiceBuilder to allow method chaining.
   * This enables multiple transports to be added in a fluent manner.
   */
  return this;
 }

 /**
  * @method build
  * @description Build and return the LoggerService instance.
  * @returns {LoggerService} - The created LoggerService instance.
  * @description This method creates a new instance of LoggerService using the accumulated transports in the transports array.
  * It finalizes the configuration of the LoggerService and returns the constructed instance, ready for use.
  */
 public build(): LoggerService {
  /**
   * Create and return a new instance of LoggerService.
   * The LoggerService is initialized with the configService and the accumulated transports.
   * This instance is now ready to handle logging operations as configured.
   */
  return new LoggerService(this.configService, this.transports);
 }
}
