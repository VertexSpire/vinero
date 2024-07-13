// src/services/logger/transporters/mongo.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { MongoTransporter } from './mongo.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class MongoTransporterFactory
 * @description Factory for creating MongoTransporter instances.
 */
export class MongoTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of MongoTransport.
  * @param {string} uri - The MongoDB URI.
  * @param {string} collection - The MongoDB collection name.
  * @returns {TransportStream} - A MongoDB transport.
  */
 public createTransport(uri: string, collection: string): TransportStream {
  const configService: ConfigService = ConfigServiceFactory.getConfigService();
  const mongoTransporter = new MongoTransporter(configService);
  return mongoTransporter.createTransport(uri, collection);
 }
}
