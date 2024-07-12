// src/exception/download.exception.ts

/**
 * Exception class for download errors.
 */
export class DownloadException extends Error {
  public code: string;
  public stackTrace: string;

  /**
   * Creates a new DownloadException.
   * @param message - The error message.
   * @param code - The error code (default: 'DOWNLOAD_ERROR').
   * @param stackTrace - The stack trace of the error (default: current stack trace).
   */
  constructor(message: string, code: string = 'DOWNLOAD_ERROR', stackTrace?: string) {
    super(message);
    this.code = code;
    this.stackTrace = stackTrace || new Error().stack;
  }
}
