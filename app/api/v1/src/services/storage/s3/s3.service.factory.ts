// src/services/storage/s3/s3.service.factory.ts

import { S3Service } from './s3.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating S3 storage services.
 */
export class S3StorageFactory {
  /**
   * Creates an S3 storage service.
   * @returns The S3 storage service.
   */
  createStorageService(): IStorageService {
    const { bucketName, region, accessKeyId, secretAccessKey } = storageConfig.s3;
    return new S3Service(bucketName, region, accessKeyId, secretAccessKey);
  }
}
