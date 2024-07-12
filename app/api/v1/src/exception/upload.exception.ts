// src/exception/upload.exception.ts

/**
 * Exception class for upload errors.
 */
export class UploadException extends Error {
  public code: string;
  public stackTrace: string;

  /**
   * Creates a new UploadException.
   * @param message - The error message.
   * @param code - The error code (default: 'UPLOAD_ERROR').
   * @param stackTrace - The stack trace of the error (default: current stack trace).
   */
  constructor(message: string, code: string = 'UPLOAD_ERROR', stackTrace?: string) {
    super(message);
    this.code = code;
    this.stackTrace = stackTrace || new Error().stack;
  }
}
