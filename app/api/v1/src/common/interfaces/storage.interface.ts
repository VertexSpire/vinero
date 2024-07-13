// src/common/interfaces/storage.interface.ts

/**
 * @interface IStorageService
 * @description Interface for storage service operations. This interface defines the standard methods required
 * for a storage service, including file upload, download, removal, and URL generation. It provides a consistent
 * contract for implementing various storage service providers.
 */
export interface IStorageService {
 /**
  * @method upload
  * @description Uploads a file to the storage service. This method takes a file buffer and optional upload options,
  * and returns a promise that resolves to the URL of the uploaded file.
  * @param {Buffer} file - The file buffer to upload. This parameter represents the binary data of the file to be uploaded.
  * @param {any} [options] - Additional options for the upload. This parameter allows for specifying any extra configurations
  * required by the storage service for the upload process.
  * @returns {Promise<string>} - A promise that resolves to the URL of the uploaded file. This URL can be used to access
  * the uploaded file.
  */
 upload(file: Buffer, options?: any): Promise<string>;

 /**
  * @method download
  * @description Downloads a file from the storage service. This method takes the name of the file to download and optional
  * download options, and returns a promise that resolves to the file buffer.
  * @param {string} fileName - The name of the file to download. This parameter specifies the identifier or path of the file
  * to be retrieved from the storage service.
  * @param {any} [options] - Additional options for the download. This parameter allows for specifying any extra configurations
  * required by the storage service for the download process.
  * @returns {Promise<Buffer>} - A promise that resolves to the file buffer. This buffer contains the binary data of the downloaded file.
  */
 download(fileName: string, options?: any): Promise<Buffer>;

 /**
  * @method remove
  * @description Removes a file from the storage service. This method takes the name of the file to remove and optional
  * removal options, and returns a promise that resolves when the file is removed.
  * @param {string} fileName - The name of the file to remove. This parameter specifies the identifier or path of the file
  * to be deleted from the storage service.
  * @param {any} [options] - Additional options for the removal. This parameter allows for specifying any extra configurations
  * required by the storage service for the removal process.
  * @returns {Promise<void>} - A promise that resolves when the file is removed. This indicates that the file has been successfully
  * deleted from the storage service.
  */
 remove(fileName: string, options?: any): Promise<void>;

 /**
  * @method getPreSignedUrl
  * @description Generates a pre-signed URL for uploading a file. This method takes the name of the file and optional
  * options for generating the URL, and returns a promise that resolves to the pre-signed URL.
  * @param {string} fileName - The name of the file. This parameter specifies the identifier or path of the file for which
  * the pre-signed URL is to be generated.
  * @param {any} [options] - Additional options for generating the URL. This parameter allows for specifying any extra configurations
  * required by the storage service for URL generation.
  * @returns {Promise<string>} - A promise that resolves to the pre-signed URL. This URL can be used to upload a file directly
  * to the storage service.
  */
 getPreSignedUrl(fileName: string, options?: any): Promise<string>;

 /**
  * @method uploadToPreSignedUrl
  * @description Uploads a file to a pre-signed URL. This method takes the pre-signed URL, a file buffer, and optional
  * upload options, and returns a promise that resolves when the file is uploaded.
  * @param {string} url - The pre-signed URL. This parameter specifies the URL to which the file will be uploaded.
  * @param {Buffer} file - The file buffer to upload. This parameter represents the binary data of the file to be uploaded.
  * @param {any} [options] - Additional options for the upload. This parameter allows for specifying any extra configurations
  * required by the storage service for the upload process.
  * @returns {Promise<void>} - A promise that resolves when the file is uploaded. This indicates that the file has been successfully
  * uploaded to the storage service using the pre-signed URL.
  */
 uploadToPreSignedUrl(url: string, file: Buffer, options?: any): Promise<void>;

 /**
  * @method getFileViewUrl
  * @description Gets a URL to view a file. This method takes the name of the file and optional options for generating the URL,
  * and returns a promise that resolves to the file view URL.
  * @param {string} fileName - The name of the file. This parameter specifies the identifier or path of the file for which
  * the view URL is to be generated.
  * @param {any} [options] - Additional options for generating the URL. This parameter allows for specifying any extra configurations
  * required by the storage service for URL generation.
  * @returns {Promise<string>} - A promise that resolves to the file view URL. This URL can be used to access and view the file
  * directly in a web browser or other application.
  */
 getFileViewUrl(fileName: string, options?: any): Promise<string>;
}
