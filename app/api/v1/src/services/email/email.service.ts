import { EmailServiceInterface } from '../../interfaces/email-service.interface';
import { EmailBuilder } from './email.builder';
import { EmailServiceException } from '../../exception/email.exception';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class EmailService
 * @description This class handles the process of sending emails using a specified strategy. It logs the process of sending emails and handles any exceptions that may occur. The strategy for sending emails can be set dynamically at runtime.
 * @property {EmailServiceInterface} strategy - The strategy pattern is used to allow different email sending mechanisms to be plugged in.
 * @property {LoggerService} logger - Service used to log the email sending process and any errors.
 * @method setStrategy - Sets the email sending strategy.
 * @method sendEmail - Sends an email using the currently set strategy.
 * @throws {EmailServiceException} - Throws an exception if the email sending process fails.
 * @autor Wasif Farooq
 */
export class EmailService {
 /**
  * @property {EmailServiceInterface} strategy - The strategy pattern is used to allow different email sending mechanisms to be plugged in.
  * This private property holds the current email sending strategy.
  */
 private strategy: EmailServiceInterface;

 /**
  * @property {LoggerService} logger - Service used to log the email sending process and any errors.
  * This private property holds the logger instance used for logging.
  */
 private logger: LoggerService;

 /**
  * @constructor
  * @param {LoggerService} logger - The logger service instance used for logging.
  * This constructor initializes the EmailService with a logger service.
  */
 constructor(logger: LoggerService) {
  /**
   * Assigns the provided logger service to the logger property.
   */
  this.logger = logger;
 }

 /**
  * @method setStrategy
  * @description Sets the email sending strategy.
  * @param {EmailServiceInterface} strategy - The email sending strategy to be used.
  * This method allows the client to change the email sending strategy dynamically.
  */
 setStrategy(strategy: EmailServiceInterface) {
  /**
   * Assigns the provided strategy to the strategy property.
   */
  this.strategy = strategy;
 }

 /**
  * @method sendEmail
  * @description Sends an email using the currently set strategy.
  * @param {EmailBuilder} email - The email to be sent.
  * @returns {Promise<void>} - A promise that resolves when the email has been sent.
  * This method logs the process of sending an email, attempts to send the email using the current strategy, and logs the result. If an error occurs, it logs the error and throws an EmailServiceException.
  * @throws {EmailServiceException} - Throws an exception if the email sending process fails.
  */
 async sendEmail(email: EmailBuilder): Promise<void> {
  try {
   /**
    * Logs the start of the email sending process with the recipient and subject.
    */
   this.logger.info('Sending email', { to: email.to, subject: email.subject });

   /**
    * Attempts to send the email using the current strategy.
    */
   await this.strategy.sendEmail(email);

   /**
    * Logs the success of the email sending process with the recipient and subject.
    */
   this.logger.info('Email sent successfully', { to: email.to, subject: email.subject });
  } catch (error) {
   /**
    * Logs the failure of the email sending process with the error message.
    */
   this.logger.error('Failed to send email', { error: error.message });

   /**
    * Throws an EmailServiceException with a detailed error message.
    */
   throw new EmailServiceException(`EmailService: Failed to send email - ${error.message}`);
  }
 }
}
