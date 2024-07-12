// src/strategy/storage.strategy.ts

import { S3StorageFactory } from '../services/storage/s3/s3.service.factory';
import { GoogleCloudStorageFactory } from '../services/storage/google-cloud/google.cloud.service.factory';
import { MicrosoftAzureStorageFactory } from '../services/storage/microsoft-azure/microsoft.azure.service.factory';
import { IStorageService } from '../common/interfaces/storage.interface';

/**
 * Enum for supported storage services.
 *
 * Defines constants for different types of storage services that can be used.
 */
export enum StorageType {
  S3 = 'S3',
  GOOGLE = 'GOOGLE',
  AZURE = 'AZURE',
}

/**
 * Context class for selecting and using a storage service.
 *
 * This class allows the application to select a storage service type (S3, Google Cloud, or Azure)
 * and obtain a corresponding storage service instance through a factory pattern.
 */
export class StorageStrategy {
  /**
   * The selected storage service instance.
   *
   * This private property holds the instance of the selected storage service,
   * which is set based on the provided type during initialization.
   */
  private storageService: IStorageService;

  /**
   * Creates a new StorageStrategy.
   *
   * @param type - The type of storage service to use.
   *                Should be one of the values defined in the StorageType enum.
   * @throws Error if an unsupported storage type is provided.
   */
  constructor(type: StorageType) {
    /*
     * Initialize the storage service based on the provided type using a switch-case statement.
     */
    switch (type) {
      case StorageType.S3:
        /*
         * Create an instance of S3 storage service using the S3StorageFactory.
         * This factory method returns an instance of S3Service configured with
         * credentials and settings retrieved from the application configuration.
         */
        this.storageService = new S3StorageFactory().createStorageService();
        break;
      case StorageType.GOOGLE:
        /*
         * Create an instance of Google Cloud storage service using the GoogleCloudStorageFactory.
         * This factory method returns an instance of GoogleCloudService configured with
         * credentials and settings retrieved from the application configuration.
         */
        this.storageService = new GoogleCloudStorageFactory().createStorageService();
        break;
      case StorageType.AZURE:
        /*
         * Create an instance of Microsoft Azure storage service using the MicrosoftAzureStorageFactory.
         * This factory method returns an instance of MicrosoftAzureService configured with
         * credentials and settings retrieved from the application configuration.
         */
        this.storageService = new MicrosoftAzureStorageFactory().createStorageService();
        break;
      default:
        /*
         * Throw an error if an unsupported storage type is provided.
         */
        throw new Error('Unsupported storage type');
    }
  }

  /**
   * Gets the storage service instance.
   *
   * @returns The storage service instance based on the selected type.
   */
  public getService(): IStorageService {
    return this.storageService;
  }
}
