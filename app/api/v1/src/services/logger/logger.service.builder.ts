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
  */
 private transports: TransportStream[] = [];

 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for LoggerServiceBuilder class.
  * @param {ConfigService} configService - The ConfigService instance.
  */
 constructor(configService: ConfigService) {
  this.configService = configService; // Assign the ConfigService instance to the class property.
 }

 /**
  * @method addConsoleTransport
  * @description Add console transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  */
 public addConsoleTransport(): LoggerServiceBuilder {
  if (this.configService.getValue<boolean>('console.enable')) {
   try {
    const consoleTransporter = ConsoleTransporterFactory.createTransporter();
    this.transports.push(consoleTransporter.createTransport());
   } catch (error) {
    console.error('Error adding console transport:', error);
   }
  }
  return this;
 }

 /**
  * @method addFileTransports
  * @description Add file transports to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  */
 public addFileTransports(): LoggerServiceBuilder {
  if (this.configService.getValue<boolean>('file.enable')) {
   try {
    const fileTransporter = FileTransporterFactory.createTransporter();
    this.transports.push(fileTransporter.createTransport('logs/error.log', 'error'));
    this.transports.push(fileTransporter.createTransport('logs/combined.log'));
   } catch (error) {
    console.error('Error adding file transports:', error);
   }
  }
  return this;
 }

 /**
  * @method addHttpTransport
  * @description Add HTTP transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  */
 public addHttpTransport(): LoggerServiceBuilder {
  if (this.configService.getValue<boolean>('http.enable')) {
   try {
    const httpLoggingEndpoint = this.configService.getValue<string>('http.endpoint');
    if (httpLoggingEndpoint) {
     const httpTransporter = HttpTransporterFactory.createTransporter();
     this.transports.push(httpTransporter.createTransport(httpLoggingEndpoint));
    }
   } catch (error) {
    console.error('Error adding HTTP transport:', error);
   }
  }
  return this;
 }

 /**
  * @method addMongoTransport
  * @description Add MongoDB transport to the builder.
  * @returns {LoggerServiceBuilder} - The current instance of LoggerServiceBuilder.
  */
 public addMongoTransport(): LoggerServiceBuilder {
  if (this.configService.getValue<boolean>('mongo.enable')) {
   try {
    const mongoUri = this.configService.getValue<string>('mongo.uri');
    const mongoCollection = this.configService.getValue<string>('mongo.collection');
    if (mongoUri && mongoCollection) {
     const mongoTransporter = MongoTransporterFactory.createTransporter();
     this.transports.push(mongoTransporter.createTransport(mongoUri, mongoCollection));
    }
   } catch (error) {
    console.error('Error adding MongoDB transport:', error);
   }
  }
  return this;
 }

 /**
  * @method build
  * @description Build and return the LoggerService instance.
  * @returns {LoggerService} - The created LoggerService instance.
  */
 public build(): LoggerService {
  return new LoggerService(this.configService, this.transports);
 }
}
