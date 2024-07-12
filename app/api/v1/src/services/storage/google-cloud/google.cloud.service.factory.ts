// src/services/storage/google-cloud/google.cloud.service.factory.ts

import { GoogleCloudService } from './google.cloud.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating Google Cloud storage services.
 */
export class GoogleCloudStorageFactory {
  /**
   * Creates a Google Cloud storage service.
   * @returns The Google Cloud storage service.
   */
  createStorageService(): IStorageService {
    const { bucketName, projectId, keyFilename } = storageConfig.google;
    return new GoogleCloudService(bucketName, projectId, keyFilename);
  }
}
