// src/services/logger/transporters/console.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class ConsoleTransporter
 * @description Transporter class for logging to the console.
 */
export class ConsoleTransporter {
  /**
   * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for ConsoleTransporter class.
   * @param {ConfigService} configService - The ConfigService instance.
   */
  constructor(configService: ConfigService) {
    this.configService = configService; // Assign the ConfigService instance to the class property.
  }

  /**
   * @method createTransport
   * @description Create a new console transport for logging.
   * @returns {TransportStream} - The created console transport.
   */
  public createTransport(): TransportStream {
    return new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize the output.
        format.simple(), // Use simple format for the console output.
      ),
    });
  }
}
