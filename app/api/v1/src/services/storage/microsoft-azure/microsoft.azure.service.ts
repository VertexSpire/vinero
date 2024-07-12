// src/services/storage/microsoft-azure/microsoft.azure.service.ts

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import axios from 'axios';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { UploadException } from '../../../exception/upload.exception';
import { DownloadException } from '../../../exception/download.exception';
import { RemoveException } from '../../../exception/remove.exception';
import { PreSignedUrlException } from '../../../exception/pre-signed-url.exception';

/**
 * Service class for Microsoft Azure storage operations.
 */
export class MicrosoftAzureService implements IStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  /**
   * Creates a new MicrosoftAzureService.
   * @param accountName - The Azure storage account name.
   * @param accountKey - The Azure storage account key.
   * @param containerName - The name of the Azure blob container.
   */
  constructor(accountName: string, accountKey: string, containerName: string) {
    const credential = new StorageSharedKeyCredential(accountName, accountKey);
    this.blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credential);
    this.containerName = containerName;
  }

  async upload(file: Buffer, options?: any): Promise<string> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(options.key);
      await blockBlobClient.upload(file, file.length, {
        blobHTTPHeaders: {
          blobContentType: options.contentType,
        },
      });
      return blockBlobClient.url;
    } catch (error) {
      throw new UploadException(error.message);
    }
  }

  async download(fileName: string, options?: any): Promise<Buffer> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobClient = containerClient.getBlobClient(fileName);
      const downloadBlockBlobResponse = await blobClient.download();
      return Buffer.from(await streamToBuffer(downloadBlockBlobResponse.readableStreamBody));
    } catch (error) {
      throw new DownloadException(error.message);
    }
  }

  async remove(fileName: string, options?: any): Promise<void> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobClient = containerClient.getBlobClient(fileName);
      await blobClient.delete();
    } catch (error) {
      throw new RemoveException(error.message);
    }
  }

  async getPreSignedUrl(fileName: string, options?: any): Promise<string> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobClient = containerClient.getBlobClient(fileName);
      const sasToken = await generateBlobSASQueryParameters(
        {
          containerName: this.containerName,
          blobName: fileName,
          permissions: BlobSASPermissions.parse('r'),
          expiresOn: new Date(new Date().valueOf() + (options.expires || 60) * 1000),
        },
        this.blobServiceClient.credential,
      ).toString();
      return `${blobClient.url}?${sasToken}`;
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
      return this.getPreSignedUrl(fileName, { expires: options.expires });
    } catch (error) {
      throw new PreSignedUrlException(error.message);
    }
  }
}

/**
 * Helper function to stream Azure blob download to buffer.
 * @param readableStream - The readable stream to convert to buffer.
 * @returns A promise that resolves to a buffer.
 */
async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}
