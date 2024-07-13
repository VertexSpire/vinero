// src/services/logger/transporters/mongo.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { MongoTransporter } from './mongo.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class MongoTransporterFactory
 * @description Factory for creating MongoTransporter instances. This factory provides a method to create instances of MongoTransporter,
 * which is responsible for logging messages to a MongoDB database based on configuration settings.
 */
export class MongoTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of MongoTransport. This method uses the ConfigServiceFactory to get the configuration service instance.
  * It then creates a new MongoTransporter with the logger configuration.
  *
  * @param {string} uri - The MongoDB URI to connect to.
  * @param {string} collection - The MongoDB collection to store logs in.
  * @returns {TransportStream} - A MongoDB transport.
  */
 public createTransport(uri: string, collection: string): TransportStream {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The ConfigService provides configuration settings that will be used to configure the MongoTransporter.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Create a new instance of MongoTransporter with the provided configuration service.
   * The MongoTransporter handles the creation of the MongoDB transport.
   */
  const mongoTransporter = new MongoTransporter(configService);

  /**
   * Return the created MongoDB transport by calling the createTransport method on the MongoTransporter instance.
   * This transport will handle logging messages to the specified MongoDB collection.
   */
  return mongoTransporter.createTransport(uri, collection);
 }
}
