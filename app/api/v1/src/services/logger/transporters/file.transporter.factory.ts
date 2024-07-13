// src/services/logger/transporters/file.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { FileTransporter } from './file.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class FileTransporterFactory
 * @description Factory for creating FileTransporter instances.
 */
export class FileTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of FileTransport.
  * @param {string} filename - The name of the log file.
  * @param {string} [level] - The log level for this transport.
  * @returns {TransportStream} - A file transport.
  */
 public createTransport(filename: string, level?: string): TransportStream {
  const configService: ConfigService = ConfigServiceFactory.getConfigService();
  const fileTransporter = new FileTransporter(configService);
  return fileTransporter.createTransport(filename, level);
 }
}
