// app/api/v1/src/services/email/strategies/smtp.service.ts

import nodemailer from 'nodemailer';
import { EmailBuilder } from '../email.builder';
import { EmailServiceInterface } from '../../../interfaces/email-service.interface';
import { EmailServiceException } from '../../../exception/email.exception';

/**
 * @class SMTPService
 * @description Service for sending emails using SMTP. This class implements the EmailServiceInterface, providing
 * the necessary functionality to send emails through an SMTP server. It encapsulates the complexity of configuring
 * and interacting with the SMTP server, offering a simple interface for email sending operations.
 */
export class SMTPService implements EmailServiceInterface {
 /**
  * @property {nodemailer.Transporter} transporter - The Nodemailer transporter for sending emails. This transporter
  * object is configured with the SMTP server details provided in the configuration. It handles the actual sending
  * of the email by communicating with the SMTP server.
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
  */
 constructor(private config: { host: string; port: number; user: string; pass: string }) {
  /**
   * Creates a transporter object using the provided configuration. This transporter will be used to send emails
   * through the specified SMTP server. By setting up the transporter in the constructor, we ensure that the service
   * is immediately ready to send emails upon instantiation.
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
  */
 async sendEmail(email: EmailBuilder): Promise<void> {
  try {
   /**
    * Constructs the email payload from the EmailBuilder object and sends the email using Nodailer's sendMail method.
    * The payload includes all necessary fields such as from, to, cc, bcc, subject, text, html, and attachments,
    * ensuring that the email is correctly constructed and delivered.
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
  } catch (error) {
   /**
    * Throws an EmailServiceException if the email sending fails, encapsulating the error message. This provides
    * a consistent error handling strategy, making it easier to manage and debug email sending failures.
    */
   throw new EmailServiceException(`SMTPService: Failed to send email - ${error.message}`);
  }
 }
}
