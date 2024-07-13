// src/services/logger/transporters/http.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class HttpTransporter
 * @description Transporter class for logging to an HTTP endpoint.
 */
export class HttpTransporter {
  /**
   * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for HttpTransporter class.
   * @param {ConfigService} configService - The ConfigService instance.
   */
  constructor(configService: ConfigService) {
    this.configService = configService; // Assign the ConfigService instance to the class property.
  }

  /**
   * @method createTransport
   * @description Create a new HTTP transport for logging.
   * @param {string} endpoint - The endpoint for logging.
   * @returns {TransportStream} - The created HTTP transport.
   */
  public createTransport(endpoint: string): TransportStream {
    return new transports.Http({
      host: endpoint, // The logging endpoint.
      format: format.combine(
        format.timestamp(), // Add timestamp to the log entries.
        format.json(), // Format the log entries as JSON.
      ),
    });
  }
}
