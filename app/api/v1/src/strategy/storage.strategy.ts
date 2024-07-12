// src/strategy/storage.strategy.ts

import { S3StorageFactory } from '../services/storage/s3/s3.service.factory';
import { GoogleCloudStorageFactory } from '../services/storage/google-cloud/google.cloud.service.factory';
import { MicrosoftAzureStorageFactory } from '../services/storage/microsoft-azure/microsoft.azure.service.factory';
import { IStorageService } from '../common/interfaces/storage.interface';

/**
 * Enum for supported storage services.
 */
export enum StorageType {
  S3 = 'S3',
  GOOGLE = 'GOOGLE',
  AZURE = 'AZURE',
}

/**
 * Context class for selecting and using a storage service.
 */
export class StorageStrategy {
  private storageService: IStorageService;

  /**
   * Creates a new StorageStrategy.
   * @param type - The type of storage service to use.
   */
  constructor(type: StorageType) {
    switch (type) {
      case StorageType.S3:
        this.storageService = new S3StorageFactory().createStorageService();
        break;
      case StorageType.GOOGLE:
        this.storageService = new GoogleCloudStorageFactory().createStorageService();
        break;
      case StorageType.AZURE:
        this.storageService = new MicrosoftAzureStorageFactory().createStorageService();
        break;
      default:
        throw new Error('Unsupported storage type');
    }
  }

  /**
   * Gets the storage service.
   * @returns The storage service.
   */
  public getService(): IStorageService {
    return this.storageService;
  }
}
