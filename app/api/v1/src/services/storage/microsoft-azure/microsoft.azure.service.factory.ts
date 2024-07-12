// src/services/storage/microsoft-azure/microsoft.azure.service.factory.ts

import { MicrosoftAzureService } from './microsoft.azure.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating Microsoft Azure storage services.
 */
export class MicrosoftAzureStorageFactory {
  /**
   * Creates a Microsoft Azure storage service.
   * @returns The Microsoft Azure storage service.
   */
  createStorageService(): IStorageService {
    const { accountName, accountKey, containerName } = storageConfig.azure;
    return new MicrosoftAzureService(accountName, accountKey, containerName);
  }
}
