// src/services/storage/storage.service.ts

import { S3StorageFactory } from './s3/s3.service.factory';
import { GoogleCloudStorageFactory } from './google-cloud/google.cloud.service.factory';
import { MicrosoftAzureStorageFactory } from './microsoft-azure/microsoft.azure.service.factory';
import { IStorageService } from '../../common/interfaces/storage.interface';
import { StorageType } from '../../common/enums/storage.enum';

/**
 * Context class for selecting and using a storage service.
 *
 * This class implements the Strategy pattern to allow the application to select a storage service type (S3, Google Cloud, or Azure)
 * and obtain a corresponding storage service instance through a factory pattern. The selection is based on the type provided during the
 * initialization of the StorageStrategy instance. It provides a unified interface to interact with different storage services without
 * coupling the application to a specific storage service implementation.
 *
 * @class
 *
 * @property {IStorageService} storageService - The selected storage service instance. This is a private property that holds the instance
 * of the storage service selected during initialization. The instance is created using a factory method corresponding to the specified type.
 *
 * @method constructor - Initializes the StorageStrategy instance with the specified storage type. It creates the storage service instance
 * using the appropriate factory based on the provided type. If an unsupported storage type is provided, it throws an error.
 *
 * @method getService - Returns the storage service instance. This method provides access to the selected storage service instance for
 * performing storage operations.
 *
 * @param {StorageType} type - The type of storage service to use. Should be one of the values defined in the StorageType enum.
 *
 * @throws {Error} Throws an error if an unsupported storage type is provided.
 *
 * @example
 * const storageStrategy = new StorageStrategy(StorageType.S3);
 * const storageService = storageStrategy.getService();
 *
 * @see {@link S3StorageFactory}
 * @see {@link GoogleCloudStorageFactory}
 * @see {@link MicrosoftAzureStorageFactory}
 * @see {@link IStorageService}
 *
 * @classdesc This class encapsulates the logic for selecting and using a specific storage service. It uses a factory pattern to create the
 * storage service instance based on the provided type and ensures that the application can easily switch between different storage services
 * without changing the core logic.
 *
 * @since 1.0.0
 *
 * @version 1.0.0
 *
 * @implements IStorageService
 *
 * @category Strategy
 *
 * @license MIT
 *
 * @repository https://github.com/example/repository
 *
 * @author Wasif Farooq
 */
export class StorageStrategy {
 /**
  * The selected storage service instance.
  *
  * This private property holds the instance of the selected storage service,
  * which is set based on the provided type during initialization. It is used internally
  * within the class to perform storage operations through the selected service.
  *
  * @private
  * @type {IStorageService}
  */
 private storageService: IStorageService;

 /**
  * Creates a new StorageStrategy.
  *
  * This constructor initializes the StorageStrategy instance based on the provided storage type.
  * It uses a switch-case statement to determine the appropriate factory to use for creating the storage service instance.
  * Each case corresponds to a different storage service type (S3, Google Cloud, Azure) and uses the respective factory to create the service instance.
  * If an unsupported storage type is provided, it throws an error indicating that the provided storage type is not supported.
  *
  * @param {StorageType} type - The type of storage service to use.
  *                             Should be one of the values defined in the StorageType enum.
  *
  * @throws {Error} If an unsupported storage type is provided.
  */
 constructor(type: StorageType) {
  /*
   * Initialize the storage service based on the provided type using a switch-case statement.
   * The switch-case structure is used to match the provided type with the corresponding storage service factory.
   * Each factory is responsible for creating an instance of the storage service configured with credentials and settings
   * retrieved from the application configuration.
   */
  switch (type) {
   case StorageType.S3:
    /*
     * Create an instance of S3 storage service using the S3StorageFactory.
     * This factory method returns an instance of S3Service configured with
     * credentials and settings retrieved from the application configuration.
     * The created instance is assigned to the storageService property.
     */
    this.storageService = new S3StorageFactory().createStorageService();
    break;
   case StorageType.GOOGLE:
    /*
     * Create an instance of Google Cloud storage service using the GoogleCloudStorageFactory.
     * This factory method returns an instance of GoogleCloudService configured with
     * credentials and settings retrieved from the application configuration.
     * The created instance is assigned to the storageService property.
     */
    this.storageService = new GoogleCloudStorageFactory().createStorageService();
    break;
   case StorageType.AZURE:
    /*
     * Create an instance of Microsoft Azure storage service using the MicrosoftAzureStorageFactory.
     * This factory method returns an instance of MicrosoftAzureService configured with
     * credentials and settings retrieved from the application configuration.
     * The created instance is assigned to the storageService property.
     */
    this.storageService = new MicrosoftAzureStorageFactory().createStorageService();
    break;
   default:
    /*
     * Throw an error if an unsupported storage type is provided.
     * This ensures that only supported storage types are used and helps prevent runtime errors
     * due to invalid storage type values. The error message clearly indicates that the provided storage type is not supported.
     */
    throw new Error('Unsupported storage type');
  }
 }

 /**
  * Gets the storage service instance.
  *
  * This method returns the storage service instance that was created based on the selected type.
  * It provides a unified interface to interact with the selected storage service, allowing the application to perform storage operations
  * without needing to know the specific details of the storage service implementation.
  *
  * @returns {IStorageService} The storage service instance based on the selected type.
  */
 public getService(): IStorageService {
  return this.storageService;
 }
}
