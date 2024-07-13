// app/api/v1/src/exception/email.validation.exception.ts

/**
 * @class EmailValidationException
 * @description Custom exception class for email validation errors. This class extends the built-in Error class,
 * adding a specific name, a custom error code, and additional context to exceptions thrown during email validation.
 * It provides a consistent way to handle validation errors across different email service implementations.
 */
export class EmailValidationException extends Error {
 /**
  * @constructor
  * @description Initializes the EmailValidationException with the given message and code. The constructor sets the
  * error name to "EmailValidationException", assigns the provided error code, and passes the message to the base
  * Error class. This ensures that the exception has a meaningful name, message, and code, making it easier to
  * understand and debug validation errors.
  * @param {string} message - The error message
  * @param {string} code - The error code
  */
 constructor(
  message: string,
  public code: string,
 ) {
  super(message);
  this.name = 'EmailValidationException';
 }
}
