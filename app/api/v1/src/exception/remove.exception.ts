// src/exception/remove.exception.ts

/**
 * Exception class for remove errors.
 *
 * This class extends the built-in Error class to provide custom properties and handling for errors related to remove operations.
 */
export class RemoveException extends Error {
 /**
  * Error code associated with the exception.
  *
  * This property allows developers to categorize different types of remove errors.
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
  * Creates a new RemoveException instance.
  *
  * @param message - The error message describing the exception in detail.
  * @param code - Optional. The error code associated with the exception (default: 'REMOVE_ERROR').
  * @param stackTrace - Optional. The stack trace string representing the location where the exception occurred
  *                     (default: current stack trace).
  *
  * This constructor initializes the RemoveException with an error message, an error code, and optionally a stack trace.
  * If no stack trace is provided, it defaults to capturing the current stack trace using Error().stack.
  */
 constructor(message: string, code: string = 'REMOVE_ERROR', stackTrace?: string) {
  /*
   * Calls the Error class constructor with the provided message.
   * This ensures that the error message is properly initialized.
   */
  super(message);

  /*
   * Assigns the error code to the instance property.
   * If no code is provided, defaults to 'REMOVE_ERROR'.
   * This allows developers to categorize different types of remove errors.
   */
  this.code = code;

  /*
   * Assigns the stack trace or captures the current stack trace if not provided.
   * This helps in debugging by providing context on where the exception occurred.
   */
  this.stackTrace = stackTrace || new Error().stack;
 }
}
