// src/services/logger/transporters/file.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class FileTransporter
 * @description Transporter class for logging to files. This class creates a file transport using the winston logging library.
 * It logs messages to specified log files with a configurable log level and format.
 */
export class FileTransporter {
 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings. These settings
  * can be used to customize the behavior of the file transport, such as enabling or disabling certain log levels or formatting options.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for FileTransporter class. It initializes the FileTransporter with the provided ConfigService instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property of the class. This instance
  * will be used to access configuration settings needed to configure the file transport.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the FileTransporter class to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method createTransport
  * @description Create a new file transport for logging. This method uses the winston transports.File class to create a file transport.
  * It configures the transport with the specified filename and log level.
  * @param {string} filename - The name of the log file.
  * @param {string} [level] - The log level for this transport.
  * @returns {TransportStream} - The created file transport.
  * @description The createTransport method creates and configures a new file transport for logging. It sets up the transport to log messages
  * to the specified file with the given log level.
  */
 public createTransport(filename: string, level?: string): TransportStream {
  /**
   * Create and return a new instance of transports.File.
   * The filename parameter specifies the name of the log file.
   * The level parameter specifies the log level for this transport.
   * The format.combine function from winston is used to create a combined log format for the file transport.
   * format.timestamp adds a timestamp to the log entries.
   * format.json formats the log entries as JSON.
   */
  return new transports.File({
   /**
    * The filename property specifies the name of the log file.
    * This determines the file where the log entries will be saved.
    */
   filename,
   /**
    * The level property specifies the log level for this transport.
    * This determines the severity of log messages that will be saved to the file.
    */
   level,
   /**
    * The format.combine function from winston is used to create a combined log format for the file transport.
    * This allows multiple format functions to be used together to format the log entries.
    */
   format: format.combine(
    /**
     * The format.timestamp function adds a timestamp to the log entries.
     * This helps in tracking when each log entry was created.
     */
    format.timestamp(),
    /**
     * The format.json function formats the log entries as JSON.
     * This provides a structured and easy-to-parse format for the log entries.
     */
    format.json(),
   ),
  });
 }
}
