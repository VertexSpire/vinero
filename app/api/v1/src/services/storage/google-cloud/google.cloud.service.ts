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
 *
 * This class provides methods to interact with Google Cloud Storage, including upload, download,
 * remove, generate pre-signed URLs, upload to pre-signed URLs, and get file view URLs.
 */
export class GoogleCloudService implements IStorageService {
 /**
  * Google Cloud Storage client instance.
  * @private
  */
 private storage: Storage;

 /**
  * Name of the Google Cloud Storage bucket.
  * @private
  */
 private bucketName: string;

 /**
  * Creates a new GoogleCloudService instance.
  *
  * @param bucketName - The name of the Google Cloud bucket.
  * @param projectId - The Google Cloud project ID.
  * @param keyFilename - The path to the service account key file.
  *
  * Initializes the Google Cloud Storage client with the provided project ID and service account key.
  */
 constructor(bucketName: string, projectId: string, keyFilename: string) {
  /*
   * Initialize private properties.
   *
   * Sets up the bucketName to store the name of the Google Cloud Storage bucket.
   * Initializes the Storage client using the projectId and keyFilename.
   */
  this.bucketName = bucketName;
  this.storage = new Storage({ projectId, keyFilename });
 }

 /**
  * Uploads a file to Google Cloud Storage.
  *
  * @param file - The file content as a Buffer.
  * @param options - Optional parameters for upload (e.g., key, contentType).
  * @returns A Promise resolving to the public URL of the uploaded file.
  * @throws UploadException if an error occurs during upload.
  */
 async upload(file: Buffer, options?: any): Promise<string> {
  try {
   /*
    * Access the bucket and file object to perform the upload operation.
    */
   const bucket = this.storage.bucket(this.bucketName);
   const fileUpload = bucket.file(options.key);

   /*
    * Save the file to Google Cloud Storage with metadata.
    */
   await fileUpload.save(file, {
    metadata: { contentType: options.contentType },
   });

   /*
    * Return the public URL of the uploaded file.
    */
   return `https://storage.googleapis.com/${this.bucketName}/${options.key}`;
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    */
   throw new UploadException(error.message);
  }
 }

 /**
  * Downloads a file from Google Cloud Storage.
  *
  * @param fileName - The name of the file to download.
  * @param options - Optional parameters for download.
  * @returns A Promise resolving to the file content as a Buffer.
  * @throws DownloadException if an error occurs during download.
  */
 async download(fileName: string, options?: any): Promise<Buffer> {
  try {
   /*
    * Access the bucket and file object to perform the download operation.
    */
   const bucket = this.storage.bucket(this.bucketName);
   const file = bucket.file(fileName);

   /*
    * Download the file content from Google Cloud Storage.
    */
   const [data] = await file.download();

   /*
    * Return the file content as a Buffer.
    */
   return data;
  } catch (error) {
   /*
    * If an error occurs during download, throw a DownloadException with the error message.
    */
   throw new DownloadException(error.message);
  }
 }

 /**
  * Removes a file from Google Cloud Storage.
  *
  * @param fileName - The name of the file to remove.
  * @param options - Optional parameters for removal.
  * @throws RemoveException if an error occurs during file removal.
  */
 async remove(fileName: string, options?: any): Promise<void> {
  try {
   /*
    * Access the bucket and file object to perform the file removal operation.
    */
   const bucket = this.storage.bucket(this.bucketName);
   const file = bucket.file(fileName);

   /*
    * Delete the file from Google Cloud Storage.
    */
   await file.delete();
  } catch (error) {
   /*
    * If an error occurs during file removal, throw a RemoveException with the error message.
    */
   throw new RemoveException(error.message);
  }
 }

 /**
  * Generates a pre-signed URL for uploading or downloading a file to/from Google Cloud Storage.
  *
  * @param fileName - The name of the file to generate the URL for.
  * @param options - Optional parameters for URL generation (e.g., expires, contentType).
  * @returns A Promise resolving to the pre-signed URL.
  * @throws PreSignedUrlException if an error occurs during URL generation.
  */
 async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Access the bucket and file object to generate a pre-signed URL.
    */
   const bucket = this.storage.bucket(this.bucketName);
   const file = bucket.file(fileName);

   /*
    * Generate a pre-signed URL with specified actions, expiration, and content type.
    */
   const [url] = await file.getSignedUrl({
    action: 'write',
    expires: Date.now() + (options.expires || 60) * 1000,
    contentType: options.contentType,
   });

   /*
    * Return the generated pre-signed URL.
    */
   return url;
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
    * Perform a PUT request to upload the file to the pre-signed URL.
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
  * Generates a pre-signed URL for viewing a file in Google Cloud Storage.
  *
  * @param fileName - The name of the file to generate the URL for.
  * @param options - Optional parameters for URL generation (e.g., expires).
  * @returns A Promise resolving to the pre-signed URL for file viewing.
  * @throws PreSignedUrlException if an error occurs during URL generation.
  */
 async getFileViewUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Access the bucket and file object to generate a pre-signed URL for file viewing.
    */
   const bucket = this.storage.bucket(this.bucketName);
   const file = bucket.file(fileName);

   /*
    * Generate a pre-signed URL for read access with specified expiration.
    */
   const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + (options.expires || 60) * 1000,
   });

   /*
    * Return the generated pre-signed URL for file viewing.
    */
   return url;
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    */
   throw new PreSignedUrlException(error.message);
  }
 }
}
