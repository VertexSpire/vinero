// src/services/storage/google-cloud/google.cloud.service.factory.ts

import { GoogleCloudService } from './google.cloud.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating Google Cloud storage services.
 *
 * This factory class provides a method to create an instance of the Google Cloud storage service
 * based on configuration settings.
 */
export class GoogleCloudStorageFactory {
 /**
  * Creates a Google Cloud storage service.
  *
  * @returns The Google Cloud storage service instance implementing the IStorageService interface.
  */
 createStorageService(): IStorageService {
  /*
   * Retrieve Google Cloud storage configuration values from the application's storage configuration.
   */
  const { bucketName, projectId, keyFilename } = storageConfig.google;

  /*
   * Create and return a new instance of the GoogleCloudService class with the retrieved configuration values.
   * This instance will be used for performing Google Cloud storage operations.
   */
  return new GoogleCloudService(bucketName, projectId, keyFilename);
 }
}
