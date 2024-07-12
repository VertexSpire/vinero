// src/services/storage/google-cloud/google.cloud.service.ts

import { Storage } from '@google-cloud/storage';
import axios from 'axios';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { UploadException } from '../../../exception/upload.exception';
import { DownloadException } from '../../../exception/download.exception';
import { RemoveException } from '../../../exception/remove.exception';
import { PreSignedUrlException } from '../../../exception/pre-signed-url.exception';

/**
 * Service class for Google Cloud storage operations.
 */
export class GoogleCloudService implements IStorageService {
  private storage: Storage;
  private bucketName: string;

  /**
   * Creates a new GoogleCloudService.
   * @param bucketName - The name of the Google Cloud bucket.
   * @param projectId - The Google Cloud project ID.
   * @param keyFilename - The path to the service account key file.
   */
  constructor(bucketName: string, projectId: string, keyFilename: string) {
    this.bucketName = bucketName;
    this.storage = new Storage({ projectId, keyFilename });
  }

  async upload(file: Buffer, options?: any): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileUpload = bucket.file(options.key);
      await fileUpload.save(file, {
        metadata: { contentType: options.contentType },
      });
      return `https://storage.googleapis.com/${this.bucketName}/${options.key}`;
    } catch (error) {
      throw new UploadException(error.message);
    }
  }

  async download(fileName: string, options?: any): Promise<Buffer> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      const [data] = await file.download();
      return data;
    } catch (error) {
      throw new DownloadException(error.message);
    }
  }

  async remove(fileName: string, options?: any): Promise<void> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      await file.delete();
    } catch (error) {
      throw new RemoveException(error.message);
    }
  }

  async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      const [url] = await file.getSignedUrl({
        action: 'write',
        expires: Date.now() + (options.expires || 60) * 1000,
        contentType: options.contentType,
      });
      return url;
    } catch (error) {
      throw new PreSignedUrlException(error.message);
    }
  }

  async uploadToPreSignedUrl(url: string, file: Buffer, options?: any): Promise<void> {
    try {
      await axios.put(url, file, {
        headers: {
          'Content-Type': options.contentType,
        },
      });
    } catch (error) {
      throw new UploadException(error.message);
    }
  }

  async getFileViewUrl(fileName: string, options?: any): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + (options.expires || 60) * 1000,
      });
      return url;
    } catch (error) {
      throw new PreSignedUrlException(error.message);
    }
  }
}
