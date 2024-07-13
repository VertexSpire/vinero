// src/services/logger/logger.service.ts

import { createLogger, format, Logger as WinstonLogger, TransportStream } from 'winston';
import { ConfigService } from '../config/config.service';

/**
 * @class LoggerService
 * @description Service for handling application logging. This service uses winston to log messages to the console, files, HTTP, and MongoDB based on configuration flags.
 */
export class LoggerService {
 /**
  * @property {WinstonLogger} logger - The winston logger instance. This instance is used to log messages.
  */
 private readonly logger: WinstonLogger;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the logger service.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the LoggerService class. It initializes the winston logger with the provided configuration.
  * @param {ConfigService} configService - The ConfigService instance.
  * @param {TransportStream[]} transports - The transports for winston logger.
  */
 constructor(configService: ConfigService, transports: TransportStream[]) {
  this.configService = configService; // Assign the ConfigService instance to the class property.

  this.logger = createLogger({
   level: this.getLogLevel(),
   format: this.getLogFormat(),
   transports: transports,
  });
 }

 /**
  * @method getLogLevel
  * @description Get the log level from the environment variables.
  * @returns {string} - The log level.
  */
 private getLogLevel(): string {
  return process.env.LOG_LEVEL || 'info';
 }

 /**
  * @method getLogFormat
  * @description Get the log format for winston.
  * @returns {winston.Logform.Format} - The log format.
  */
 private getLogFormat(): winston.Logform.Format {
  return format.combine(
   format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
   format.errors({ stack: true }),
   format.splat(),
   format.json(),
  );
 }

 /**
  * @method addTransport
  * @description Add a transport to the logger.
  * @param {TransportStream} transport - The transport to add.
  */
 public addTransport(transport: TransportStream): void {
  this.logger.add(transport);
 }

 /**
  * @method info
  * @description Log an info level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  */
 public info(message: string, ...meta: any[]): void {
  this.log('info', message, ...meta);
 }

 /**
  * @method error
  * @description Log an error level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  */
 public error(message: string, ...meta: any[]): void {
  this.log('error', message, ...meta);
 }

 /**
  * @method warn
  * @description Log a warn level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  */
 public warn(message: string, ...meta: any[]): void {
  this.log('warn', message, ...meta);
 }

 /**
  * @method debug
  * @description Log a debug level message.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  */
 public debug(message: string, ...meta: any[]): void {
  this.log('debug', message, ...meta);
 }

 /**
  * @method log
  * @description General method to log messages at a specified level.
  * @param {string} level - The log level.
  * @param {string} message - The message to log.
  * @param {...any[]} meta - Additional metadata to log.
  */
 private log(level: string, message: string, ...meta: any[]): void {
  if (this.configService.getValue<boolean>('enable')) {
   this.logger.log(level, message, ...meta);
  }
 }
}
