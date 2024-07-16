import nodemailer from 'nodemailer';
import { EmailBuilder } from '../email.builder';
import { EmailServiceInterface } from '../../../interfaces/email-service.interface';
import { EmailServiceException } from '../../../exception/email.exception';
import { Logger } from '../../../services/logger/logger.service';

/**
 * @class SMTPService
 * @description Service for sending emails using SMTP. This class implements the EmailServiceInterface, providing
 * the necessary functionality to send emails through an SMTP server. It encapsulates the complexity of configuring
 * and interacting with the SMTP server, offering a simple interface for email sending operations.
 * @implements {EmailServiceInterface}
 *
 * The SMTPService class is responsible for handling the entire process of sending an email using the SMTP protocol.
 * By leveraging the Nodemailer library, this class abstracts the configuration and management of the SMTP server details,
 * providing a streamlined interface for sending emails. This ensures that the application can send emails without
 * needing to manage the low-level details of the SMTP protocol.
 *
 * @property {nodemailer.Transporter} transporter - The Nodemailer transporter for sending emails. This transporter
 * object is configured with the SMTP server details provided in the configuration. It handles the actual sending
 * of the email by communicating with the SMTP server.
 *
 * @property {object} config - The configuration object for SMTP
 * @property {string} config.host - The SMTP host
 * @property {number} config.port - The SMTP port
 * @property {string} config.user - The SMTP user
 * @property {string} config.pass - The SMTP password
 *
 * @property {Logger} logger - The logger instance for logging
 *
 * The SMTPService class is designed to be instantiated with a configuration object that contains the necessary
 * details for connecting to an SMTP server. This includes the host, port, user, and password. Additionally,
 * it requires a Logger instance for logging purposes.
 *
 * @see nodemailer
 * @see EmailBuilder
 * @see EmailServiceInterface
 * @see EmailServiceException
 * @see Logger
 *
 * @autor Wasif Farooq
 */
export class SMTPService implements EmailServiceInterface {
 /**
  * @property {nodemailer.Transporter} transporter
  * @description The Nodemailer transporter instance used to send emails. This transporter is configured
  * with the SMTP server details provided in the configuration object passed to the constructor.
  *
  * The transporter handles the connection to the SMTP server and the sending of the email. By using
  * the transporter, the SMTPService class abstracts away the complexities of the SMTP protocol,
  * providing a simple interface for sending emails.
  */
 private transporter: nodemailer.Transporter;

 /**
  * @constructor
  * @description Initializes the SMTPService with the given configuration. This constructor sets up the Nodemailer
  * transporter with the provided SMTP server details, ensuring that the service is ready to send emails through
  * the specified SMTP server.
  * @param {object} config - The configuration object for SMTP
  * @param {string} config.host - The SMTP host
  * @param {number} config.port - The SMTP port
  * @param {string} config.user - The SMTP user
  * @param {string} config.pass - The SMTP password
  * @param {Logger} logger - The logger instance for logging
  *
  * The constructor of the SMTPService class takes in a configuration object and a logger instance.
  * It uses the configuration object to set up the Nodemailer transporter, ensuring that it is correctly
  * configured to send emails through the specified SMTP server. The logger instance is used to log
  * important information and errors related to the email sending process.
  */
 constructor(
  private config: { host: string; port: number; user: string; pass: string },
  private logger: Logger,
 ) {
  /**
   * Creates a transporter object using the provided configuration. This transporter will be used to send emails
   * through the specified SMTP server. By setting up the transporter in the constructor, we ensure that the service
   * is immediately ready to send emails upon instantiation.
   *
   * The Nodemailer transporter is configured using the host, port, user, and password provided in the configuration
   * object. This ensures that the SMTPService class is able to connect to the SMTP server and send emails as needed.
   * @type {nodemailer.Transporter}
   */
  this.transporter = nodemailer.createTransport({
   host: config.host,
   port: config.port,
   auth: {
    user: config.user,
    pass: config.pass,
   },
  });

  // Logging the initialization of the SMTPService with the provided configuration.
  this.logger.log('SMTPService initialized with config: ', config);
 }

 /**
  * @method sendEmail
  * @description Sends an email using SMTP. This method constructs the email payload from the provided EmailBuilder
  * object and uses the Nodemailer transporter to send the email. It handles the complexities of interacting with the
  * SMTP server, ensuring that the email is properly formatted and sent.
  *
  * The method captures any errors thrown by the Nodemailer transporter and wraps them in an EmailServiceException,
  * providing a consistent error handling mechanism across different email service implementations.
  *
  * @param {EmailBuilder} email - The email object constructed using the EmailBuilder
  * @returns {Promise<void>}
  * @throws {EmailServiceException}
  *
  * The sendEmail method is responsible for sending an email using the SMTP protocol. It takes an EmailBuilder
  * object as a parameter, which contains all the necessary information to construct the email. The method uses
  * the Nodemailer transporter to send the email, handling any errors that occur during the process and wrapping
  * them in an EmailServiceException.
  */
 async sendEmail(email: EmailBuilder): Promise<void> {
  try {
   // Logging the recipient of the email before sending it.
   this.logger.log('Sending email to: ', email.to);

   /**
    * Constructs the email payload from the EmailBuilder object and sends the email using Nodailer's sendMail method.
    * The payload includes all necessary fields such as from, to, cc, bcc, subject, text, html, and attachments,
    * ensuring that the email is correctly constructed and delivered.
    *
    * The email payload is constructed using the properties of the EmailBuilder object. This includes the sender's
    * address, the recipient's address, CC and BCC addresses, the subject of the email, the plain text and HTML
    * versions of the email body, and any attachments. The payload is then sent using the Nodemailer transporter's
    * sendMail method.
    */
   await this.transporter.sendMail({
    from: email.from,
    to: email.to,
    cc: email.cc,
    bcc: email.bcc,
    subject: email.subject,
    text: email.text,
    html: email.html,
    attachments: email.attachments,
   });

   // Logging the successful sending of the email.
   this.logger.log('Email sent successfully to: ', email.to);
  } catch (error) {
   // Logging the error that occurred while trying to send the email.
   this.logger.error('Failed to send email: ', error.message);

   /**
    * Throws an EmailServiceException if the email sending fails, encapsulating the error message. This provides
    * a consistent error handling strategy, making it easier to manage and debug email sending failures.
    *
    * If an error occurs while sending the email, it is caught and logged. An EmailServiceException is then thrown,
    * encapsulating the error message. This ensures that the error handling is consistent across different email
    * service implementations and provides a clear indication of the failure.
    */
   throw new EmailServiceException(`SMTPService: Failed to send email - ${error.message}`);
  }
 }
}
