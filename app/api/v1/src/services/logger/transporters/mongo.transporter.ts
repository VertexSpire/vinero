// src/services/logger/transporters/mongo.transporter.ts

import { transports, TransportStream, format } from 'winston';
import { ConfigService } from '../../config/config.service';
import * as MongoDB from 'winston-mongodb';

/**
 * @class MongoTransporter
 * @description Transporter class for logging to MongoDB.
 */
export class MongoTransporter {
  /**
   * @property {ConfigService} configService - The ConfigService instance to access configuration settings.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for MongoTransporter class.
   * @param {ConfigService} configService - The ConfigService instance.
   */
  constructor(configService: ConfigService) {
    this.configService = configService; // Assign the ConfigService instance to the class property.
  }

  /**
   * @method createTransport
   * @description Create a new MongoDB transport for logging.
   * @param {string} uri - The MongoDB URI.
   * @param {string} collection - The MongoDB collection name.
   * @returns {TransportStream} - The created MongoDB transport.
   */
  public createTransport(uri: string, collection: string): TransportStream {
    return new MongoDB.MongoDB({
      db: uri, // The MongoDB URI.
      collection, // The MongoDB collection name.
      format: format.combine(
        format.timestamp(), // Add timestamp to the log entries.
        format.json(), // Format the log entries as JSON.
      ),
    });
  }
}
