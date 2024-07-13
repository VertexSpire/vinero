// src/services/logger/transporters/file.transporter.factory.ts

import { TransportStream } from 'winston';
import { ConfigService } from '../../config/config.service';
import { ConfigServiceFactory } from '../../config/config.service.factory';
import { FileTransporter } from './file.transporter';
import { TransporterFactory } from './transporter.factory';

/**
 * @class FileTransporterFactory
 * @description Factory for creating FileTransporter instances. This factory provides a method to create instances of FileTransporter,
 * which is responsible for logging messages to files based on configuration settings.
 */
export class FileTransporterFactory implements TransporterFactory {
 /**
  * @method createTransport
  * @description Create a new instance of FileTransport. This method uses the ConfigServiceFactory to get the configuration service instance.
  * It then creates a new FileTransporter with the logger configuration.
  *
  * @param {string} filename - The name of the log file.
  * @param {string} [level] - The log level for this transport.
  * @returns {TransportStream} - A file transport.
  */
 public createTransport(filename: string, level?: string): TransportStream {
  /**
   * Get an instance of the configuration service using the ConfigServiceFactory.
   * The ConfigService provides configuration settings that will be used to configure the FileTransporter.
   */
  const configService: ConfigService = ConfigServiceFactory.getConfigService();

  /**
   * Create a new instance of FileTransporter with the provided configuration service.
   * The FileTransporter handles the creation of the file transport.
   */
  const fileTransporter = new FileTransporter(configService);

  /**
   * Return the created file transport by calling the createTransport method on the FileTransporter instance.
   * This transport will handle logging messages to the specified log file.
   */
  return fileTransporter.createTransport(filename, level);
 }
}
