// src/services/logger/transporters/console.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class ConsoleTransporter
 * @description Transporter class for logging to the console. This class creates a console transport using the winston logging library.
 * It formats the log messages to be colorized and simple, making it easy to read in the console. The configuration settings for this
 * transporter are provided by the ConfigService instance.
 */
export class ConsoleTransporter {
 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings. These settings
  * can be used to customize the behavior of the console transport, such as enabling or disabling certain log levels or formatting options.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for ConsoleTransporter class. It initializes the ConsoleTransporter with the provided ConfigService instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property of the class. This instance
  * will be used to access configuration settings needed to configure the console transport.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the ConsoleTransporter class to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method createTransport
  * @description Create a new console transport for logging. This method uses the winston transports.Console class to create a console transport.
  * It formats the log messages using colorize and simple formats for readability.
  * @returns {TransportStream} - The created console transport.
  * @description The createTransport method creates and configures a new console transport for logging. It combines colorize and simple formats
  * to make the console output easy to read and visually distinguish different log levels.
  */
 public createTransport(): TransportStream {
  /**
   * Create and return a new instance of transports.Console.
   * The format.combine function from winston is used to create a combined log format for the console transport.
   * format.colorize adds colors to the log output, making it easier to distinguish different log levels.
   * format.simple provides a simple format for the console output, displaying only the log level and message.
   */
  return new transports.Console({
   format: format.combine(
    /**
     * Colorize the output for better readability.
     * This adds colors to the log output, making it easier to distinguish different log levels.
     */
    format.colorize(),
    /**
     * Use simple format for the console output.
     * This provides a simple format for the console output, displaying only the log level and message.
     */
    format.simple(),
   ),
  });
 }
}
