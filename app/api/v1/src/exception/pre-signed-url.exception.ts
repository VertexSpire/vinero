// src/exception/pre-signed-url.exception.ts

/**
 * Exception class for pre-signed URL errors.
 */
export class PreSignedUrlException extends Error {
  public code: string;
  public stackTrace: string;

  /**
   * Creates a new PreSignedUrlException.
   * @param message - The error message.
   * @param code - The error code (default: 'PRE_SIGNED_URL_ERROR').
   * @param stackTrace - The stack trace of the error (default: current stack trace).
   */
  constructor(message: string, code: string = 'PRE_SIGNED_URL_ERROR', stackTrace?: string) {
    super(message);
    this.code = code;
    this.stackTrace = stackTrace || new Error().stack;
  }
}
