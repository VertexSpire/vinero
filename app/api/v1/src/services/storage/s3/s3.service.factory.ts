// src/services/storage/s3/s3.service.factory.ts

import { S3Service } from './s3.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating S3 storage services.
 *
 * This factory class provides a method to create an instance of the S3 storage service
 * based on configuration settings.
 */
export class S3StorageFactory {
  /**
   * Creates an S3 storage service.
   *
   * @returns The S3 storage service instance implementing the IStorageService interface.
   */
  createStorageService(): IStorageService {
    /*
     * Retrieve S3 storage configuration values from the application's storage configuration.
     */
    const { bucketName, region, accessKeyId, secretAccessKey } = storageConfig.s3;

    /*
     * Create and return a new instance of the S3Service class with the retrieved configuration values.
     * This instance will be used for performing S3 storage operations.
     */
    return new S3Service(bucketName, region, accessKeyId, secretAccessKey);
  }
}
