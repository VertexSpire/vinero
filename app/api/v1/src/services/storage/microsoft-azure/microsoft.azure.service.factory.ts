import { MicrosoftAzureService } from './microsoft.azure.service';
import { IStorageService } from '../../../common/interfaces/storage.interface';
import { storageConfig } from '../../../config/storage';

/**
 * Factory class for creating Microsoft Azure storage services.
 *
 * This factory class provides a method to create an instance of the Microsoft Azure storage service
 * based on configuration settings.
 *
 * @class
 * @public
 * @classdesc This class is responsible for instantiating the MicrosoftAzureService class with appropriate
 * configuration values retrieved from the application's configuration files.
 * @see {@link MicrosoftAzureService}
 * @see {@link https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction}
 * @see {@link storageConfig}
 * @implements {IStorageService}
 * @typedef {Object} StorageConfig
 * @property {string} accountName - The Azure storage account name.
 * @property {string} accountKey - The Azure storage account key.
 * @property {string} containerName - The name of the Azure blob container.
 * @returns {MicrosoftAzureService} A new instance of the MicrosoftAzureService class.
 * @example
 * const storageServiceFactory = new MicrosoftAzureStorageFactory();
 * const azureService = storageServiceFactory.createStorageService();
 * azureService.upload(fileBuffer, { key: 'example.txt', contentType: 'text/plain' });
 * @throws {Error} If storage configuration is missing or incorrect.
 * @see {@link MicrosoftAzureService}
 * @see {@link storageConfig}
 * @exports MicrosoftAzureStorageFactory
 * @author Wasif Farooq
 */
export class MicrosoftAzureStorageFactory {
 /**
  * Creates a Microsoft Azure storage service.
  *
  * @returns {IStorageService} The Microsoft Azure storage service instance implementing the IStorageService interface.
  */
 createStorageService(): IStorageService {
  /*
   * Retrieve Microsoft Azure storage configuration values from the application's storage configuration.
   */
  const { accountName, accountKey, containerName } = storageConfig.azure;

  /*
   * Create and return a new instance of the MicrosoftAzureService class with the retrieved configuration values.
   * This instance will be used for performing Microsoft Azure storage operations.
   */
  return new MicrosoftAzureService(accountName, accountKey, containerName);
 }
}
