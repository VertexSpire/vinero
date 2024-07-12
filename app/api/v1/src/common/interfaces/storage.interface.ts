// src/common/interfaces/storage.interface.ts

/**
 * Interface for storage service operations.
 */
export interface IStorageService {
  /**
   * Uploads a file.
   * @param file - The file buffer to upload.
   * @param options - Additional options for the upload.
   * @returns A promise that resolves to the URL of the uploaded file.
   */
  upload(file: Buffer, options?: any): Promise<string>;

  /**
   * Downloads a file.
   * @param fileName - The name of the file to download.
   * @param options - Additional options for the download.
   * @returns A promise that resolves to the file buffer.
   */
  download(fileName: string, options?: any): Promise<Buffer>;

  /**
   * Removes a file.
   * @param fileName - The name of the file to remove.
   * @param options - Additional options for the removal.
   * @returns A promise that resolves when the file is removed.
   */
  remove(fileName: string, options?: any): Promise<void>;

  /**
   * Generates a pre-signed URL for uploading a file.
   * @param fileName - The name of the file.
   * @param options - Additional options for generating the URL.
   * @returns A promise that resolves to the pre-signed URL.
   */
  getPreSignedUrl(fileName: string, options?: any): Promise<string>;

  /**
   * Uploads a file to a pre-signed URL.
   * @param url - The pre-signed URL.
   * @param file - The file buffer to upload.
   * @param options - Additional options for the upload.
   * @returns A promise that resolves when the file is uploaded.
   */
  uploadToPreSignedUrl(url: string, file: Buffer, options?: any): Promise<void>;

  /**
   * Gets a URL to view a file.
   * @param fileName - The name of the file.
   * @param options - Additional options for generating the URL.
   * @returns A promise that resolves to the file view URL.
   */
  getFileViewUrl(fileName: string, options?: any): Promise<string>;
}
