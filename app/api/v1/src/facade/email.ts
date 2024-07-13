// app/api/v1/src/facade/email.ts

import { EmailServiceFactory } from '../services/email/email.service.factory';
import { EmailBuilder } from '../services/email/email.builder';
import { EmailConfig } from '../common/interfaces/email-config.interface';

/**
 * @function sendEmail
 * @description Facade function for sending an email. This function abstracts the complexities involved in constructing and sending an email.
 * It takes a comprehensive email configuration object that includes the type of email service to be used, the service-specific configuration,
 * and all necessary details for the email such as the sender, recipient, subject, body, and attachments.
 *
 * The function begins by destructuring the email configuration object to extract individual properties. It then uses the EmailServiceFactory
 * to create an appropriate email service instance based on the specified type (either 'smtp' or 'sendgrid'). Next, it constructs the email
 * using the EmailBuilder class, which follows the builder pattern to provide a fluent interface for setting various properties of the email.
 *
 * After building the email, the function calls the sendEmail method of the email service instance to send the email. If any errors occur
 * during the process, they are propagated to the caller, allowing for proper error handling and logging.
 *
 * This facade function simplifies the process of sending emails by providing a single, cohesive interface for clients to use, without
 * needing to worry about the underlying implementation details of different email services.
 *
 * @param {EmailConfig} emailConfig - The email configuration object
 * @returns {Promise<void>} - Returns a promise that resolves when the email is sent successfully
 * @throws {EmailServiceException} - Throws an exception if there is an error during the email sending process
 */
export async function sendEmail(emailConfig: EmailConfig): Promise<void> {
 // Destructure the email configuration object to extract individual properties
 const { type, config, from, to, cc, bcc, subject, text, html, attachments } = emailConfig;

 // Create an email service instance using the EmailServiceFactory
 const emailService = EmailServiceFactory.createEmailService(type, config);

 // Build the email using the EmailBuilder
 const emailBuilder = new EmailBuilder()
  .setFrom(from)
  .setTo(to)
  .setCc(cc || '')
  .setBcc(bcc || '')
  .setSubject(subject)
  .setText(text || '')
  .setHtml(html || '')
  .setAttachments(attachments || [])
  .build();

 // Send the email using the email service
 await emailService.sendEmail(emailBuilder);
}
