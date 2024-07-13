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
 *
 * This class provides methods to interact with Amazon S3, including upload, download,
 * remove, generate pre-signed URLs, upload to pre-signed URLs, and get file view URLs.
 */
export class S3Service implements IStorageService {
 /**
  * S3 client instance.
  * @private
  */
 private s3: S3;

 /**
  * Name of the S3 bucket.
  * @private
  */
 private bucketName: string;

 /**
  * Creates a new S3Service instance.
  *
  * @param bucketName - The name of the S3 bucket.
  * @param region - The region of the S3 bucket.
  * @param accessKeyId - The access key ID for the S3 bucket.
  * @param secretAccessKey - The secret access key for the S3 bucket.
  *
  * Initializes the S3 client with the provided credentials and bucket name.
  */
 constructor(bucketName: string, region: string, accessKeyId: string, secretAccessKey: string) {
  /*
   * Initialize private properties.
   *
   * Creates an S3 client instance with the specified region, access key ID, and secret access key.
   * Sets the bucketName to store the name of the S3 bucket.
   */
  this.bucketName = bucketName;
  this.s3 = new S3({
   region,
   accessKeyId,
   secretAccessKey,
  });
 }

 /**
  * Uploads a file to Amazon S3.
  *
  * @param file - The file content as a Buffer.
  * @param options - Optional parameters for upload (e.g., key, contentType).
  * @returns A Promise resolving to the URL of the uploaded object.
  * @throws UploadException if an error occurs during upload.
  */
 async upload(file: Buffer, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 upload operation.
    */
   const params = {
    Bucket: this.bucketName,
    Key: options.key,
    Body: file,
    ContentType: options.contentType,
   };

   /*
    * Perform S3 upload operation and return the uploaded object's URL.
    */
   const data = await this.s3.upload(params).promise();
   return data.Location;
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    */
   throw new UploadException(error.message);
  }
 }

 /**
  * Downloads a file from Amazon S3.
  *
  * @param fileName - The name of the file to download.
  * @param options - Optional parameters for download.
  * @returns A Promise resolving to the file content as a Buffer.
  * @throws DownloadException if an error occurs during download.
  */
 async download(fileName: string, options?: any): Promise<Buffer> {
  try {
   /*
    * Prepare parameters for S3 getObject operation.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
   };

   /*
    * Perform S3 getObject operation and return the file content as a Buffer.
    */
   const data = await this.s3.getObject(params).promise();
   return data.Body as Buffer;
  } catch (error) {
   /*
    * If an error occurs during download, throw a DownloadException with the error message.
    */
   throw new DownloadException(error.message);
  }
 }

 /**
  * Removes a file from Amazon S3.
  *
  * @param fileName - The name of the file to remove.
  * @param options - Optional parameters for removal.
  * @throws RemoveException if an error occurs during file removal.
  */
 async remove(fileName: string, options?: any): Promise<void> {
  try {
   /*
    * Prepare parameters for S3 deleteObject operation.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
   };

   /*
    * Perform S3 deleteObject operation to remove the file.
    */
   await this.s3.deleteObject(params).promise();
  } catch (error) {
   /*
    * If an error occurs during file removal, throw a RemoveException with the error message.
    */
   throw new RemoveException(error.message);
  }
 }

 /**
  * Generates a pre-signed URL for uploading a file to Amazon S3.
  *
  * @param fileName - The name of the file to generate the URL for.
  * @param options - Optional parameters for URL generation (e.g., expires).
  * @returns A Promise resolving to the pre-signed URL for upload.
  * @throws PreSignedUrlException if an error occurs during URL generation.
  */
 async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 getSignedUrl operation to generate a pre-signed URL for putObject.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
    Expires: options.expires || 60,
   };

   /*
    * Generate and return the pre-signed URL for upload.
    */
   return this.s3.getSignedUrl('putObject', params);
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    */
   throw new PreSignedUrlException(error.message);
  }
 }

 /**
  * Uploads a file to a pre-signed URL.
  *
  * @param url - The pre-signed URL to upload the file to.
  * @param file - The file content as a Buffer.
  * @param options - Optional parameters for upload (e.g., contentType).
  * @throws UploadException if an error occurs during upload.
  */
 async uploadToPreSignedUrl(url: string, file: Buffer, options?: any): Promise<void> {
  try {
   /*
    * Perform a PUT request to upload the file to the pre-signed URL using Axios.
    */
   await axios.put(url, file, {
    headers: {
     'Content-Type': options.contentType,
    },
   });
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    */
   throw new UploadException(error.message);
  }
 }

 /**
  * Generates a pre-signed URL for viewing a file from Amazon S3.
  *
  * @param fileName - The name of the file to generate the URL for.
  * @param options - Optional parameters for URL generation (e.g., expires).
  * @returns A Promise resolving to the pre-signed URL for file viewing.
  * @throws PreSignedUrlException if an error occurs during URL generation.
  */
 async getFileViewUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 getSignedUrl operation to generate a pre-signed URL for getObject.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
    Expires: options.expires || 60,
   };

   /*
    * Generate and return the pre-signed URL for file viewing.
    */
   return this.s3.getSignedUrl('getObject', params);
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    */
   throw new PreSignedUrlException(error.message);
  }
 }
}
