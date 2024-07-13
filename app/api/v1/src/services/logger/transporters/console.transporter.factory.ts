// src/services/logger/transporters/console.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { ConsoleTransporter } from './console.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class ConsoleTransporterFactory
 * @description Factory for creating ConsoleTransporter instances. This factory provides a method to create instances of ConsoleTransporter,
 * which is responsible for logging messages to the console based on configuration settings.
 */
export class ConsoleTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of ConsoleTransport. This method uses the ConfigServiceFactory to get the configuration service instance.
  * It then creates a new ConsoleTransporter with the logger configuration.
  *
  * @returns {TransportStream} - A console transport.
  */
 public createTransport(): TransportStream {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The ConfigService provides configuration settings that will be used to configure the ConsoleTransporter.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Create a new instance of ConsoleTransporter with the provided configuration service.
   * The ConsoleTransporter handles the creation of the console transport.
   */
  const consoleTransporter = new ConsoleTransporter(configService);

  /**
   * Return the created console transport by calling the createTransport method on the ConsoleTransporter instance.
   * This transport will handle logging messages to the console.
   */
  return consoleTransporter.createTransport();
 }
}
