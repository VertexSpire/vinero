// src/services/logger/transporters/console.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { ConsoleTransporter } from './console.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class ConsoleTransporterFactory
 * @description Factory for creating ConsoleTransporter instances.
 */
export class ConsoleTransporterFactory implements TransporterFactory {
  /**
   * @method createTransport
   * @description Create a new instance of ConsoleTransport.
   * @returns {TransportStream} - A console transport.
   */
  public createTransport(): TransportStream {
    const configService: ConfigService = ConfigServiceFactory.getConfigService();
    const consoleTransporter = new ConsoleTransporter(configService);
    return consoleTransporter.createTransport();
  }
}
