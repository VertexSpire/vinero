// src/services/logger/transporters/http.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { HttpTransporter } from './http.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class HttpTransporterFactory
 * @description Factory for creating HttpTransporter instances. This factory provides a method to create instances of HttpTransporter,
 * which is responsible for logging messages to an HTTP endpoint based on configuration settings.
 */
export class HttpTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of HttpTransport. This method uses the ConfigServiceFactory to get the configuration service instance.
  * It then creates a new HttpTransporter with the logger configuration.
  *
  * @param {string} endpoint - The HTTP endpoint to send logs to.
  * @returns {TransportStream} - An HTTP transport.
  */
 public createTransport(endpoint: string): TransportStream {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The ConfigService provides configuration settings that will be used to configure the HttpTransporter.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Create a new instance of HttpTransporter with the provided configuration service.
   * The HttpTransporter handles the creation of the HTTP transport.
   */
  const httpTransporter = new HttpTransporter(configService);

  /**
   * Return the created HTTP transport by calling the createTransport method on the HttpTransporter instance.
   * This transport will handle logging messages to the specified HTTP endpoint.
   */
  return httpTransporter.createTransport(endpoint);
 }
}
