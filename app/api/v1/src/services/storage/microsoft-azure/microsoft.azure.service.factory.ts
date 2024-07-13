// src/services/storage/microsoft-azure/microsoft.azure.service.factory.ts

import { MicrosoftAzureService } from './microsoft.azure.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating Microsoft Azure storage services.
 *
 * This factory class provides a method to create an instance of the Microsoft Azure storage service
 * based on configuration settings.
 */
export class MicrosoftAzureStorageFactory {
 /**
  * Creates a Microsoft Azure storage service.
  *
  * @returns The Microsoft Azure storage service instance implementing the IStorageService interface.
  */
 createStorageService(): IStorageService {
  /*
   * Retrieve Microsoft Azure storage configuration values from the application's storage configuration.
   */
  const { accountName, accountKey, containerName } = storageConfig.azure;

  /*
   * Create and return a new instance of the MicrosoftAzureService class with the retrieved configuration values.
   * This instance will be used for performing Microsoft Azure storage operations.
   */
  return new MicrosoftAzureService(accountName, accountKey, containerName);
 }
}
