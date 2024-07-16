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
 * It encapsulates the complexity of working with the AWS SDK and offers a simplified
 * interface for common storage operations.
 *
 * @class S3Service
 * @implements {IStorageService}
 * @property {S3} s3 - The S3 client instance used for interacting with the S3 service.
 * @property {string} bucketName - The name of the S3 bucket where files will be stored.
 * @author Wasif Farooq
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
  * This constructor sets up the S3 client configuration which will be used for
  * all subsequent operations on the S3 bucket.
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
  *
  * This method takes the file content and uploads it to the specified S3 bucket.
  * The options parameter allows for additional configurations such as setting the
  * file key and content type. If the upload fails, an UploadException is thrown.
  */
 async upload(file: Buffer, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 upload operation.
    * The parameters include the bucket name, file key, file content, and content type.
    */
   const params = {
    Bucket: this.bucketName,
    Key: options.key,
    Body: file,
    ContentType: options.contentType,
   };

   /*
    * Perform S3 upload operation and return the uploaded object's URL.
    * The upload method of the S3 client is called with the prepared parameters.
    */
   const data = await this.s3.upload(params).promise();
   return data.Location;
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the upload process.
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
  *
  * This method retrieves the file content from the specified S3 bucket. The file name
  * parameter indicates which file to download. If the download fails, a DownloadException is thrown.
  */
 async download(fileName: string, options?: any): Promise<Buffer> {
  try {
   /*
    * Prepare parameters for S3 getObject operation.
    * The parameters include the bucket name and file key.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
   };

   /*
    * Perform S3 getObject operation and return the file content as a Buffer.
    * The getObject method of the S3 client is called with the prepared parameters.
    */
   const data = await this.s3.getObject(params).promise();
   return data.Body as Buffer;
  } catch (error) {
   /*
    * If an error occurs during download, throw a DownloadException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the download process.
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
  *
  * This method deletes the specified file from the S3 bucket. The file name parameter indicates
  * which file to delete. If the removal fails, a RemoveException is thrown.
  */
 async remove(fileName: string, options?: any): Promise<void> {
  try {
   /*
    * Prepare parameters for S3 deleteObject operation.
    * The parameters include the bucket name and file key.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
   };

   /*
    * Perform S3 deleteObject operation to remove the file.
    * The deleteObject method of the S3 client is called with the prepared parameters.
    */
   await this.s3.deleteObject(params).promise();
  } catch (error) {
   /*
    * If an error occurs during file removal, throw a RemoveException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the removal process.
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
  *
  * This method generates a pre-signed URL that can be used to upload a file to the S3 bucket.
  * The file name parameter indicates which file the URL is for. If the URL generation fails,
  * a PreSignedUrlException is thrown.
  */
 async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 getSignedUrl operation to generate a pre-signed URL for putObject.
    * The parameters include the bucket name, file key, and expiration time for the URL.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
    Expires: options.expires || 60,
   };

   /*
    * Generate and return the pre-signed URL for upload.
    * The getSignedUrl method of the S3 client is called with the prepared parameters.
    */
   return this.s3.getSignedUrl('putObject', params);
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the URL generation process.
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
  *
  * This method uploads a file to the specified pre-signed URL using Axios. The file content
  * and optional content type are provided as parameters. If the upload fails, an UploadException is thrown.
  */
 async uploadToPreSignedUrl(url: string, file: Buffer, options?: any): Promise<void> {
  try {
   /*
    * Perform a PUT request to upload the file to the pre-signed URL using Axios.
    * The PUT request includes the file content and content type in the headers.
    */
   await axios.put(url, file, {
    headers: {
     'Content-Type': options.contentType,
    },
   });
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the upload process.
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
  *
  * This method generates a pre-signed URL that can be used to view a file in the S3 bucket.
  * The file name parameter indicates which file the URL is for. If the URL generation fails,
  * a PreSignedUrlException is thrown.
  */
 async getFileViewUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Prepare parameters for S3 getSignedUrl operation to generate a pre-signed URL for getObject.
    * The parameters include the bucket name, file key, and expiration time for the URL.
    */
   const params = {
    Bucket: this.bucketName,
    Key: fileName,
    Expires: options.expires || 60,
   };

   /*
    * Generate and return the pre-signed URL for file viewing.
    * The getSignedUrl method of the S3 client is called with the prepared parameters.
    */
   return this.s3.getSignedUrl('getObject', params);
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    * This ensures that the caller is informed of any issues that occurred during the URL generation process.
    */
   throw new PreSignedUrlException(error.message);
  }
 }
}
