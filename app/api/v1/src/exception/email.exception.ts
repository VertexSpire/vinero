// app/api/v1/src/exception/email.exception.ts

/**
 * @class EmailServiceException
 * @description Custom exception class for email service errors. This class extends the built-in Error class, adding
 * a specific name and additional context to exceptions thrown by email services. It provides a consistent way to handle
 * errors across different email service implementations.
 */
export class EmailServiceException extends Error {
  /**
   * @constructor
   * @description Initializes the EmailServiceException with the given message. The constructor sets the error name
   * to "EmailServiceException" and passes the message to the base Error class. This ensures that the exception has
   * a meaningful name and message, making it easier to understand and debug.
   * @param {string} message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'EmailServiceException';
  }
}
