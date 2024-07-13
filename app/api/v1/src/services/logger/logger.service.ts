// src/services/logger/logger.service.ts

import { createLogger, format, Logger as WinstonLogger, TransportStream } from 'winston';
import { ConfigService } from '../config/config.service';

/**
 * @class LoggerService
 * @description Service for handling application logging. This service uses winston to log messages to various destinations such as the console, files, HTTP endpoints, and MongoDB.
 * It is designed to be highly configurable through environment variables and external configuration services. By centralizing the logging logic within this service,
 * we ensure consistent logging behavior across the entire application.
 */
export class LoggerService {
 /**
  * @property {WinstonLogger} logger - The winston logger instance. This instance is used to log messages.
  * @description The winston logger instance is the core component responsible for handling all logging operations. It is configured with various transports and formats
  * to ensure that log messages are correctly processed and outputted to the desired destinations. The configuration of this logger is dynamic and can be adjusted
  * through external settings to accommodate different logging requirements.
  */
 private readonly logger: WinstonLogger;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the logger service.
  * @description ConfigService is a crucial dependency for the LoggerService, providing access to configuration settings that determine how the logger behaves.
  * It allows the LoggerService to dynamically adapt to different environments and configurations without hardcoding values, thereby enhancing flexibility and maintainability.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the LoggerService class. It initializes the winston logger with the provided configuration.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {TransportStream[]} transports - The transports for winston logger.
  * @description The constructor sets up the LoggerService by initializing the winston logger with the specified transports and configurations. The transports parameter
  * allows the caller to specify multiple logging destinations, making the LoggerService versatile and capable of meeting various logging needs. This initialization
  * process ensures that the logger is ready to handle log messages as soon as the LoggerService instance is created.
  */
 constructor(configService: ConfigService, transports: TransportStream[]) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the LoggerService to access configuration settings.
   */
  this.configService = configService;

  /**
   * The createLogger function from winston is called to create a new logger instance.
   * The logger is configured with a log level, format, and transports.
   * These configurations determine how and where log messages will be outputted.
   */
  this.logger = createLogger({
   /**
    * The log level is determined by calling the getLogLevel method.
    * This level specifies the minimum severity of messages to be logged.
    */
   level: this.getLogLevel(),

   /**
    * The log format is determined by calling the getLogFormat method.
    * This format specifies how log messages are structured and presented.
    */
   format: this.getLogFormat(),

   /**
    * The transports parameter, which is an array of TransportStream instances, is used here.
    * These transports define the different destinations where log messages will be sent.
    */
   transports: transports,
  });
 }

 /**
  * @method getLogLevel
  * @description Get the log level from the environment variables.
  * @returns {string} - The log level.
  * @description This method retrieves the log level from environment variables, defaulting to 'info' if not set. Log levels dictate the severity of messages to log.
  * By dynamically fetching the log level, the LoggerService can adjust the verbosity of logging output without requiring code changes, which is useful for different
  * environments such as development, testing, and production.
  */
 private getLogLevel(): string {
  /**
   * The log level is retrieved from the environment variables using process.env.LOG_LEVEL.
   * If the LOG_LEVEL environment variable is not set, the default value 'info' is used.
   * This approach allows for dynamic configuration of the log level without changing the code.
   */
  return process.env.LOG_LEVEL || 'info';
 }

 /**
  * @method getLogFormat
  * @description Get the log format for winston.
  * @returns {winston.Logform.Format} - The log format.
  * @description This method defines the format for log messages, combining timestamp, error stack traces, splat for string interpolation, and JSON formatting.
  * The use of a consistent log format helps in parsing and analyzing log files, whether manually or through automated tools. This format ensures that important
  * information such as timestamps and error details are always included in the logs.
  */
 private getLogFormat(): winston.Logform.Format {
  /**
   * The format.combine function from winston is used to create a combined log format.
   * format.timestamp adds a timestamp to each log message with the specified format.
   * format.errors includes stack traces in the log messages, which is useful for debugging errors.
   * format.splat allows string interpolation in log messages, making them more informative.
   * format.json formats the log messages as JSON, which is a standard format for structured logging.
   */
  return format.combine(
   format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp to log entries.
   format.errors({ stack: true }), // Include error stack traces.
   format.splat(), // Enable string interpolation.
   format.json(), // Format log entries as JSON.
  );
 }

 /**
  * @method addTransport
  * @description Add a transport to the logger.
  * @param {TransportStream} transport - The transport to add.
  * @description This method allows dynamically adding new transports to the logger, enabling flexibility in logging destinations (e.g., console, file, HTTP, MongoDB).
  * By adding transports at runtime, the LoggerService can be extended to support new logging requirements without modifying the core logging logic. This feature is
  * particularly useful for microservices or applications that need to log to different destinations based on the deployment environment.
  */
 public addTransport(transport: TransportStream): void {
  /**
   * The add method of the winston logger instance is called to add a new transport.
   * This allows for dynamically extending the logger to log messages to additional destinations.
   * The transport parameter is an instance of TransportStream, defining where the log messages will be sent.
   */
  this.logger.add(transport);
 }

 /**
  * @method info
  * @description Log an info level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  * @description Logs an informational message, typically used for general application information such as start-up messages or routine operations. Informational logs
  * provide insight into the normal functioning of the application and can be used to trace application flow and state during standard operations.
  */
 public info(message: string, ...meta: any[]): void {
  /**
   * The log method is called with 'info' as the log level.
   * This logs the provided message and any additional metadata at the info level.
   * Info level logs are used to record general information about the application's operation.
   */
  this.log('info', message, ...meta);
 }

 /**
  * @method error
  * @description Log an error level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  * @description Logs an error message, used for logging error conditions, exceptions, or critical issues that need immediate attention. Error logs are crucial for
  * diagnosing problems and understanding failures within the application. They often include stack traces and other relevant details to aid in troubleshooting.
  */
 public error(message: string, ...meta: any[]): void {
  /**
   * The log method is called with 'error' as the log level.
   * This logs the provided message and any additional metadata at the error level.
   * Error level logs are used to record significant issues or exceptions that require immediate attention.
   */
  this.log('error', message, ...meta);
 }

 /**
  * @method warn
  * @description Log a warn level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  * @description Logs a warning message, used to indicate potentially harmful situations or important issues that are not necessarily errors. Warnings highlight
  * conditions that may require attention or could lead to errors if not addressed, serving as early indicators of potential problems.
  */
 public warn(message: string, ...meta: any[]): void {
  /**
   * The log method is called with 'warn' as the log level.
   * This logs the provided message and any additional metadata at the warn level.
   * Warn level logs are used to indicate potential issues or important events that are not necessarily errors.
   */
  this.log('warn', message, ...meta);
 }

 /**
  * @method debug
  * @description Log a debug level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  * @description Logs a debug message, useful for developers during the debugging process to track the flow and state of the application. Debug logs are typically
  * verbose and contain detailed information about the application's behavior, which is essential for diagnosing issues during development and testing phases.
  */
 public debug(message: string, ...meta: any[]): void {
  /**
   * The log method is called with 'debug' as the log level.
   * This logs the provided message and any additional metadata at the debug level.
   * Debug level logs are used to record detailed information useful for diagnosing and troubleshooting issues.
   */
  this.log('debug', message, ...meta);
 }

 /**
  * @method log
  * @description General method to log messages at a specified level.
  * @param {string} level - The log level.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  * @description This method is a general-purpose logger that logs messages at the specified log level. It checks if logging is enabled before logging the message.
  * By centralizing the logging logic in this method, we ensure consistent logging behavior and reduce redundancy in the LoggerService.
  */
 private log(level: string, message: string, ...meta: any[]): void {
  /**
   * The getValue method of the configService is called to check if logging is enabled.
   * If logging is enabled, the logger logs the message and any additional metadata at the specified log level.
   * This conditional logging approach ensures that logs are only generated when enabled by the configuration, optimizing performance and flexibility.
   */
  if (this.configService.getValue<boolean>('enable')) {
   this.logger.log(level, message, ...meta); // Log the message at the specified level.
  }
 }
}
