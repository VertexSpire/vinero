// src/services/logger/transporters/file.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';

/**
 * @class FileTransporter
 * @description Transporter class for logging to files.
 */
export class FileTransporter {
  /**
   * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for FileTransporter class.
   * @param {ConfigService} configService - The ConfigService instance.
   */
  constructor(configService: ConfigService) {
    this.configService = configService; // Assign the ConfigService instance to the class property.
  }

  /**
   * @method createTransport
   * @description Create a new file transport for logging.
   * @param {string} filename - The name of the log file.
   * @param {string} [level] - The log level for this transport.
   * @returns {TransportStream} - The created file transport.
   */
  public createTransport(filename: string, level?: string): TransportStream {
    return new transports.File({
      filename, // The name of the log file.
      level, // The log level for this transport.
      format: format.combine(
        format.timestamp(), // Add timestamp to the log entries.
        format.json(), // Format the log entries as JSON.
      ),
    });
  }
}
