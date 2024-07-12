// src/services/storage/s3/s3.service.ts

import { S3 } from 'aws-sdk';
import axios from 'axios';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { UploadException } from '../../../exception/upload.exception';
import { DownloadException } from '../../../exception/download.exception';
import { RemoveException } from '../../../exception/remove.exception';
import { PreSignedUrlException } from '../../../exception/pre-signed-url.exception';

/**
 * Service class for Amazon S3 storage operations.
 */
export class S3Service implements IStorageService {
  private s3: S3;
  private bucketName: string;

  /**
   * Creates a new S3Service.
   * @param bucketName - The name of the S3 bucket.
   * @param region - The region of the S3 bucket.
   * @param accessKeyId - The access key ID for the S3 bucket.
   * @param secretAccessKey - The secret access key for the S3 bucket.
   */
  constructor(bucketName: string, region: string, accessKeyId: string, secretAccessKey: string) {
    this.bucketName = bucketName;
    this.s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  async upload(file: Buffer, options?: any): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: options.key,
        Body: file,
        ContentType: options.contentType,
      };
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw new UploadException(error.message);
    }
  }

  async download(fileName: string, options?: any): Promise<Buffer> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
      };
      const data = await this.s3.getObject(params).promise();
      return data.Body as Buffer;
    } catch (error) {
      throw new DownloadException(error.message);
    }
  }

  async remove(fileName: string, options?: any): Promise<void> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
      };
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new RemoveException(error.message);
    }
  }

  async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Expires: options.expires || 60,
      };
      return this.s3.getSignedUrl('putObject', params);
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
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Expires: options.expires || 60,
      };
      return this.s3.getSignedUrl('getObject', params);
    } catch (error) {
      throw new PreSignedUrlException(error.message);
    }
  }
}
