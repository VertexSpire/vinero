// src/services/logger/transporters/http.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { HttpTransporter } from './http.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class HttpTransporterFactory
 * @description Factory for creating HttpTransporter instances.
 */
export class HttpTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of HttpTransport.
  * @param {string} endpoint - The endpoint for logging.
  * @returns {TransportStream} - An HTTP transport.
  */
 public createTransport(endpoint: string): TransportStream {
  const configService: ConfigService = ConfigServiceFactory.getConfigService();
  const httpTransporter = new HttpTransporter(configService);
  return httpTransporter.createTransport(endpoint);
 }
}
