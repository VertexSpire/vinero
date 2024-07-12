// src/exception/remove.exception.ts

/**
 * Exception class for remove errors.
 */
export class RemoveException extends Error {
  public code: string;
  public stackTrace: string;

  /**
   * Creates a new RemoveException.
   * @param message - The error message.
   * @param code - The error code (default: 'REMOVE_ERROR').
   * @param stackTrace - The stack trace of the error (default: current stack trace).
   */
  constructor(message: string, code: string = 'REMOVE_ERROR', stackTrace?: string) {
    super(message);
    this.code = code;
    this.stackTrace = stackTrace || new Error().stack;
  }
}
