// src/services/logger/transporters/http.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class HttpTransporter
 * @description Transporter class for logging to an HTTP endpoint. This class creates an HTTP transport using the winston logging library.
 * It sends log messages to a specified HTTP endpoint, which can be configured using the ConfigService instance.
 */
export class HttpTransporter {
 /**
  * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
  * @description This property holds an instance of ConfigService, which provides access to configuration settings. These settings
  * can be used to customize the behavior of the HTTP transport, such as the endpoint URL and other options.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for HttpTransporter class. It initializes the HttpTransporter with the provided ConfigService instance.
  * @param {ConfigService} configService - The ConfigService instance.
  * @description The constructor assigns the provided ConfigService instance to the configService property of the class. This instance
  * will be used to access configuration settings needed to configure the HTTP transport.
  */
 constructor(configService: ConfigService) {
  /**
   * The configService parameter is assigned to the configService property of the class.
   * This property is used throughout the HttpTransporter class to access configuration settings.
   */
  this.configService = configService;
 }

 /**
  * @method createTransport
  * @description Create a new HTTP transport for logging. This method uses the winston transports.Http class to create an HTTP transport.
  * It configures the transport with the specified endpoint and other options.
  * @param {string} endpoint - The HTTP endpoint to send logs to.
  * @returns {TransportStream} - The created HTTP transport.
  * @description The createTransport method creates and configures a new HTTP transport for logging. It sets up the transport to send log
  * messages to the specified HTTP endpoint.
  */
 public createTransport(endpoint: string): TransportStream {
  /**
   * Create and return a new instance of transports.Http.
   * The format.json function from winston is used to format the log messages as JSON.
   * The HTTP transport is configured to send log messages to the specified endpoint.
   */
  return new transports.Http({
   /**
    * The format.json function formats the log messages as JSON.
    * This ensures that the log entries are structured and easy to parse.
    */
   format: format.json(),
   /**
    * The host property specifies the HTTP endpoint to send logs to.
    * This determines the server where the log entries will be sent.
    */
   host: endpoint,
  });
 }
}
