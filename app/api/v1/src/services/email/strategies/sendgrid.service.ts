// app/api/v1/src/services/email/strategies/sendgrid.service.ts

import sgMail from '@sendgrid/mail';
import { EmailBuilder } from '../email.builder';
import { EmailServiceInterface } from '../../../interfaces/email-service.interface';
import { EmailServiceException } from '../../../exception/email.exception';

/**
 * @class SendGridService
 * @description Service for sending emails using SendGrid. This class implements the EmailServiceInterface, providing
 * the necessary functionality to send emails through SendGrid's API. It encapsulates the complexity of configuring and
 * interacting with the SendGrid service, offering a simple interface for email sending operations.
 */
export class SendGridService implements EmailServiceInterface {
  /**
   * @constructor
   * @description Initializes the SendGridService with the given API key. This constructor sets up the SendGrid service
   * by configuring the API key needed for authentication. The API key is stored as a private property to ensure it is
   * not accessible outside the class, maintaining security and encapsulation.
   * @param {string} apiKey - The API key for SendGrid
   */
  constructor(private apiKey: string) {
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
   * The method captures any errors thrown by the SendGrid service and wraps them in an EmailServiceException, providing
   * a consistent error handling mechanism across different email service implementations.
   *
   * @param {EmailBuilder} email - The email object constructed using the EmailBuilder
   * @returns {Promise<void>}
   * @throws {EmailServiceException}
   */
  async sendEmail(email: EmailBuilder): Promise<void> {
    try {
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
    } catch (error) {
      /**
       * Throws an EmailServiceException if the email sending fails, encapsulating the error message. This provides
       * a consistent error handling strategy, making it easier to manage and debug email sending failures.
       */
      throw new EmailServiceException(`SendGridService: Failed to send email - ${error.message}`);
    }
  }
}
