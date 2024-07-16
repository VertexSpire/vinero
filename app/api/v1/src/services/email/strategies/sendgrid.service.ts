import sgMail from '@sendgrid/mail';
import { EmailBuilder } from '../email.builder';
import { EmailServiceInterface } from '../../../interfaces/email-service.interface';
import { EmailServiceException } from '../../../exception/email.exception';
import { LoggerService } from '../../logger/logger.service';

/**
 * @class SendGridService
 * @description Service for sending emails using SendGrid. This class implements the EmailServiceInterface, providing
 * the necessary functionality to send emails through SendGrid's API. It encapsulates the complexity of configuring and
 * interacting with the SendGrid service, offering a simple interface for email sending operations.
 *
 * The SendGridService class is designed to handle email sending through the SendGrid platform. It abstracts the
 * configuration and interaction with the SendGrid API, ensuring that emails are sent efficiently and reliably.
 * This class utilizes the SendGrid mail library to send emails and logs the operations using a provided logger service.
 *
 * By implementing the EmailServiceInterface, this class adheres to a standard contract for email services, making it
 * interchangeable with other email service implementations. This design promotes flexibility and scalability in the
 * email sending functionality of the application.
 *
 * @implements {EmailServiceInterface}
 * @see {@link https://github.com/sendgrid/sendgrid-nodejs} for more information on the SendGrid Node.js library.
 * @see {@link EmailBuilder} for constructing email objects to be sent using this service.
 * @see {@link EmailServiceException} for handling errors related to email sending.
 * @see {@link LoggerService} for logging email sending operations.
 * @see {@link EmailServiceInterface} for the interface implemented by this service.
 *
 * @classdesc This class is part of the email services module and is responsible for sending emails using the SendGrid
 * API. It ensures secure handling of the API key and provides detailed logging for email sending operations.
 *
 * @example
 * const sendGridService = new SendGridService(apiKey, loggerService);
 * const email = new EmailBuilder().setTo('example@example.com').setSubject('Test Email').setText('Hello World!');
 * sendGridService.sendEmail(email);
 *
 * @since 1.0.0
 * @version 1.0.0
 * @see {@link https://docs.sendgrid.com/} for SendGrid API documentation.
 *
 * @typedef {Object} EmailPayload
 * @property {string} from - The sender's email address
 * @property {string} to - The recipient's email address
 * @property {string} [cc] - The CC email addresses
 * @property {string} [bcc] - The BCC email addresses
 * @property {string} subject - The subject of the email
 * @property {string} [text] - The plain text content of the email
 * @property {string} [html] - The HTML content of the email
 * @property {Array<Object>} [attachments] - The attachments for the email
 *
 * @property {LoggerService} logger - The logger service instance used for logging operations within this class.
 *
 * @property {string} apiKey - The SendGrid API key used for authenticating requests.
 *
 * @summary Sends emails using the SendGrid API with detailed logging and error handling.
 *
 * @license MIT
 * @tutorial none
 * @author
 * @license MIT
 * @version 1.0.0
 */
export class SendGridService implements EmailServiceInterface {
 /**
  * @constructor
  * @description Initializes the SendGridService with the given API key and logger. This constructor sets up the SendGrid service
  * by configuring the API key needed for authentication. The API key is stored as a private property to ensure it is
  * not accessible outside the class, maintaining security and encapsulation.
  *
  * The constructor method is responsible for setting up the SendGrid service with the provided API key. It ensures that the
  * service is ready to send emails by setting the API key using the SendGrid library. The logger service is also initialized
  * to provide logging functionality for email operations.
  *
  * By setting the API key in the constructor, we guarantee that the service is ready to interact with SendGrid as soon as it
  * is instantiated. This ensures that all email operations performed by this service instance are authenticated with the
  * provided API key.
  *
  * @param {string} apiKey - The API key for SendGrid
  * @param {LoggerService} logger - The logger service for logging operations
  */
 constructor(
  private apiKey: string,
  private logger: LoggerService,
 ) {
  /**
   * Sets the API key for SendGrid. This ensures that all email operations performed by this service instance
   * are authenticated with the provided API key. By setting the API key in the constructor, we guarantee that
   * the service is ready to interact with SendGrid as soon as it is instantiated.
   */
  sgMail.setApiKey(apiKey);
 }

 /**
  * @method sendEmail
  * @description Sends an email using SendGrid. This method constructs the email payload from the provided EmailBuilder
  * object and uses the SendGrid service to send the email. It handles the complexities of interacting with the SendGrid
  * API, ensuring that the email is properly formatted and sent.
  *
  * The sendEmail method is responsible for constructing the email payload from the EmailBuilder object and sending the email
  * using the SendGrid service. It ensures that the email is correctly formatted by including all necessary fields such as from,
  * to, cc, bcc, subject, text, html, and attachments. The method handles the complexities of interacting with the SendGrid API,
  * making it easy to send emails without having to deal with the underlying API details.
  *
  * The method captures any errors thrown by the SendGrid service and wraps them in an EmailServiceException, providing
  * a consistent error handling mechanism across different email service implementations. This ensures that any errors encountered
  * during the email sending process are properly logged and handled.
  *
  * @param {EmailBuilder} email - The email object constructed using the EmailBuilder
  * @returns {Promise<void>}
  * @throws {EmailServiceException}
  */
 async sendEmail(email: EmailBuilder): Promise<void> {
  try {
   /**
    * Logs the email sending operation, indicating that an email is being sent to the specified recipient.
    * This provides a trace of email sending operations, which is useful for debugging and monitoring purposes.
    */
   this.logger.log(`Sending email to ${email.to}`);
   /**
    * Constructs the email payload from the EmailBuilder object and sends the email using SendGrid's send method.
    * The payload includes all necessary fields such as from, to, cc, bcc, subject, text, html, and attachments,
    * ensuring that the email is correctly constructed and delivered.
    */
   await sgMail.send({
    from: email.from,
    to: email.to,
    cc: email.cc,
    bcc: email.bcc,
    subject: email.subject,
    text: email.text,
    html: email.html,
    attachments: email.attachments,
   });
   /**
    * Logs the successful email sending operation, indicating that the email has been sent to the specified recipient.
    * This provides a trace of successful email sending operations, which is useful for auditing and monitoring purposes.
    */
   this.logger.log(`Email sent to ${email.to}`);
  } catch (error) {
   /**
    * Logs the email sending failure, including the error message. This provides a trace of email sending failures,
    * which is useful for debugging and monitoring purposes.
    */
   this.logger.error(`SendGridService: Failed to send email - ${error.message}`);
   /**
    * Throws an EmailServiceException if the email sending fails, encapsulating the error message. This provides
    * a consistent error handling strategy, making it easier to manage and debug email sending failures.
    */
   throw new EmailServiceException(`SendGridService: Failed to send email - ${error.message}`);
  }
 }
}
