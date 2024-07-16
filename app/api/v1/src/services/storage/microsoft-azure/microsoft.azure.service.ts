import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import axios from 'axios';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { UploadException } from '../../../exception/upload.exception';
import { DownloadException } from '../../../exception/download.exception';
import { RemoveException } from '../../../exception/remove.exception';
import { PreSignedUrlException } from '../../../exception/pre-signed-url.exception';

/**
 * Service class for Microsoft Azure storage operations.
 *
 * This class provides methods to interact with Azure Blob Storage, including upload, download,
 * remove, generate pre-signed URLs, upload to pre-signed URLs, and get file view URLs.
 *
 * @class
 * @implements {IStorageService}
 * @public
 * @classdesc This class serves as the service layer for performing various operations with Azure Blob Storage.
 * It leverages Azure SDK to facilitate the interaction with the storage account and container.
 * @see {@link https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview}
 * @author Wasif Farooq
 */
export class MicrosoftAzureService implements IStorageService {
 /**
  * Azure Blob Service client instance.
  *
  * This client is used to interact with the Azure Blob Storage service.
  *
  * @private
  * @type {BlobServiceClient}
  */
 private blobServiceClient: BlobServiceClient;

 /**
  * Name of the Azure Blob Storage container.
  *
  * This is the container where all blobs will be stored.
  *
  * @private
  * @type {string}
  */
 private containerName: string;

 /**
  * Creates a new MicrosoftAzureService instance.
  *
  * @param {string} accountName - The Azure storage account name.
  * @param {string} accountKey - The Azure storage account key.
  * @param {string} containerName - The name of the Azure blob container.
  *
  * Initializes the Blob Service client with the provided account credentials and container name.
  *
  * @constructor
  */
 constructor(accountName: string, accountKey: string, containerName: string) {
  /*
   * Initialize private properties.
   *
   * Creates a StorageSharedKeyCredential using the Azure storage account name and key.
   * Initializes the BlobServiceClient with the account URL and the created credential.
   * Sets the containerName to store the name of the Azure Blob Storage container.
   */
  const credential = new StorageSharedKeyCredential(accountName, accountKey);
  this.blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credential);
  this.containerName = containerName;
 }

 /**
  * Uploads a file to Azure Blob Storage.
  *
  * @param {Buffer} file - The file content as a Buffer.
  * @param {any} [options] - Optional parameters for upload (e.g., key, contentType).
  * @returns {Promise<string>} A Promise resolving to the URL of the uploaded blob.
  * @throws {UploadException} if an error occurs during upload.
  */
 async upload(file: Buffer, options?: any): Promise<string> {
  try {
   /*
    * Access the container client and block blob client to perform the upload operation.
    */
   const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
   const blockBlobClient = containerClient.getBlockBlobClient(options.key);

   /*
    * Upload the file to Azure Blob Storage with specified headers.
    */
   await blockBlobClient.upload(file, file.length, {
    blobHTTPHeaders: {
     blobContentType: options.contentType,
    },
   });

   /*
    * Return the URL of the uploaded blob.
    */
   return blockBlobClient.url;
  } catch (error) {
   /*
    * If an error occurs during upload, throw an UploadException with the error message.
    */
   throw new UploadException(error.message);
  }
 }

 /**
  * Downloads a file from Azure Blob Storage.
  *
  * @param {string} fileName - The name of the file to download.
  * @param {any} [options] - Optional parameters for download.
  * @returns {Promise<Buffer>} A Promise resolving to the file content as a Buffer.
  * @throws {DownloadException} if an error occurs during download.
  */
 async download(fileName: string, options?: any): Promise<Buffer> {
  try {
   /*
    * Access the container client and blob client to perform the download operation.
    */
   const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
   const blobClient = containerClient.getBlobClient(fileName);

   /*
    * Download the file content from Azure Blob Storage and convert it to a Buffer.
    */
   const downloadBlockBlobResponse = await blobClient.download();
   return Buffer.from(await streamToBuffer(downloadBlockBlobResponse.readableStreamBody));
  } catch (error) {
   /*
    * If an error occurs during download, throw a DownloadException with the error message.
    */
   throw new DownloadException(error.message);
  }
 }

 /**
  * Removes a file from Azure Blob Storage.
  *
  * @param {string} fileName - The name of the file to remove.
  * @param {any} [options] - Optional parameters for removal.
  * @returns {Promise<void>}
  * @throws {RemoveException} if an error occurs during file removal.
  */
 async remove(fileName: string, options?: any): Promise<void> {
  try {
   /*
    * Access the container client and blob client to perform the file removal operation.
    */
   const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
   const blobClient = containerClient.getBlobClient(fileName);

   /*
    * Delete the file from Azure Blob Storage.
    */
   await blobClient.delete();
  } catch (error) {
   /*
    * If an error occurs during file removal, throw a RemoveException with the error message.
    */
   throw new RemoveException(error.message);
  }
 }

 /**
  * Generates a pre-signed URL for accessing a file in Azure Blob Storage.
  *
  * @param {string} fileName - The name of the file to generate the URL for.
  * @param {any} [options] - Optional parameters for URL generation (e.g., expires).
  * @returns {Promise<string>} A Promise resolving to the pre-signed URL.
  * @throws {PreSignedUrlException} if an error occurs during URL generation.
  */
 async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Access the container client and blob client to generate a pre-signed URL.
    */
   const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
   const blobClient = containerClient.getBlobClient(fileName);

   /*
    * Generate a Shared Access Signature (SAS) token for read access with specified expiration.
    */
   const sasToken = await generateBlobSASQueryParameters(
    {
     containerName: this.containerName,
     blobName: fileName,
     permissions: BlobSASPermissions.parse('r'),
     expiresOn: new Date(new Date().valueOf() + (options.expires || 60) * 1000),
    },
    this.blobServiceClient.credential,
   ).toString();

   /*
    * Return the generated pre-signed URL with the SAS token appended.
    */
   return `${blobClient.url}?${sasToken}`;
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
  * @param {string} url - The pre-signed URL to upload the file to.
  * @param {Buffer} file - The file content as a Buffer.
  * @param {any} [options] - Optional parameters for upload (e.g., contentType).
  * @returns {Promise<void>}
  * @throws {UploadException} if an error occurs during upload.
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
  * Generates a pre-signed URL for viewing a file in Azure Blob Storage.
  *
  * @param {string} fileName - The name of the file to generate the URL for.
  * @param {any} [options] - Optional parameters for URL generation (e.g., expires).
  * @returns {Promise<string>} A Promise resolving to the pre-signed URL for file viewing.
  * @throws {PreSignedUrlException} if an error occurs during URL generation.
  */
 async getFileViewUrl(fileName: string, options?: any): Promise<string> {
  try {
   /*
    * Generate a pre-signed URL for read access using the getPreSignedUrl method.
    */
   return this.getPreSignedUrl(fileName, { expires: options.expires });
  } catch (error) {
   /*
    * If an error occurs during URL generation, throw a PreSignedUrlException with the error message.
    */
   throw new PreSignedUrlException(error.message);
  }
 }
}
