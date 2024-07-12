// src/exception/download.exception.ts

/**
 * Exception class for handling errors related to download operations.
 *
 * This class extends the built-in Error class to provide customized properties and handling mechanisms
 * specifically tailored for download-related exceptions.
 */
export class DownloadException extends Error {
  /**
   * Error code associated with the exception.
   *
   * This property allows developers to categorize different types of download errors.
   * It provides a standardized way to identify and handle specific error scenarios within the application.
   */
  public code: string;

  /**
   * Stack trace captured at the time of the exception.
   *
   * The stack trace provides a detailed snapshot of the call stack at the moment the exception occurred.
   * It assists developers in tracing back the sequence of function calls and understanding the context
   * in which the error originated.
   */
  public stackTrace: string;

  /**
   * Creates a new DownloadException instance.
   *
   * @param message - The error message describing the exception in detail.
   * @param code - Optional. The error code associated with the exception (default: 'DOWNLOAD_ERROR').
   * @param stackTrace - Optional. The stack trace string representing the location where the exception occurred
   *                     (default: current stack trace).
   *
   * This constructor initializes the DownloadException with an error message, an error code, and optionally a stack trace.
   * If no stack trace is provided, it defaults to capturing the current stack trace using Error().stack.
   */
  constructor(message: string, code: string = 'DOWNLOAD_ERROR', stackTrace?: string) {
    /*
     * Calls the Error class constructor with the provided message.
     * This ensures that the error message is properly initialized.
     */
    super(message);

    /*
     * Assigns the error code to the instance property.
     * If no code is provided, defaults to 'DOWNLOAD_ERROR'.
     * This allows developers to categorize different types of download errors.
     */
    this.code = code;

    /*
     * Assigns the stack trace or captures the current stack trace if not provided.
     * This helps in debugging by providing context on where the exception occurred.
     */
    this.stackTrace = stackTrace || new Error().stack;
  }
}
