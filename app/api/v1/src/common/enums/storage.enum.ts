// src/common/enums/storage.enum.ts
/**
 * Enum for supported storage services.
 *
 * Defines constants for different types of storage services that can be used.
 * These constants are used to specify the desired storage service type when initializing the StorageStrategy.
 *
 * @enum {string}
 * @property {string} S3 - Represents the Amazon S3 storage service.
 * @property {string} GOOGLE - Represents the Google Cloud storage service.
 * @property {string} AZURE - Represents the Microsoft Azure storage service.
 *
 * @author Wasif Farooq
 */
export enum StorageType {
 S3 = 'S3',
 GOOGLE = 'GOOGLE',
 AZURE = 'AZURE',
}
