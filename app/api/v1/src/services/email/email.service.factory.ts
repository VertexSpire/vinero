import { EmailService } from './email.service';
import { SMTPServiceFactory } from './strategies/smtp.service.factory';
import { SendGridServiceFactory } from './strategies/sendgrid.service.factory';
import { EmailServiceInterface } from '../../interfaces/email-service.interface';
import { LoggerServiceFactory } from '../../logger/logger.service.factory';

/**
 * The EmailServiceFactory class is responsible for creating instances of the EmailService.
 * It dynamically selects the appropriate email sending strategy (SMTP or SendGrid) based on the provided type.
 * The factory also initializes a logger using the LoggerServiceFactory.
 * This approach ensures that the EmailService is configured with the correct strategy and logging mechanism.
 *
 * @class EmailServiceFactory
 * @classdesc Factory class to create EmailService instances with different strategies.
 * @version 1.0.0
 * @since 2024-07-16
 *
 * @author Wasif Farooq
 */
export class EmailServiceFactory {
 /**
  * Creates an instance of EmailService with the specified strategy and logger configuration.
  *
  * This method first initializes the logger using the LoggerServiceFactory based on the provided logger configuration.
  * It then creates an instance of EmailService, passing the logger instance to its constructor.
  * Depending on the provided type, it sets the appropriate email service strategy (either SMTP or SendGrid).
  * Finally, it returns the configured instance of EmailService.
  *
  * @static
  * @param {string} type - The type of email service to create ('smtp' or 'sendgrid').
  * @param {any} emailConfig - Configuration object for the email service.
  * @param {any} loggerConfig - Configuration object for the logger.
  * @returns {EmailService} - A configured instance of EmailService.
  * @throws {Error} Throws an error if the email service type is invalid.
  *
  * @memberof EmailServiceFactory
  */
 public static createEmailService(type: string, emailConfig: any, loggerConfig: any): EmailService {
  /**
   * Initializes the logger instance using LoggerServiceFactory.
   * The logger type and configuration are provided by the loggerConfig parameter.
   */
  const logger = LoggerServiceFactory.createLogger(loggerConfig.type, loggerConfig);

  /**
   * Creates a new instance of EmailService, passing the initialized logger.
   */
  const emailService = new EmailService(logger);

  /**
   * Declares a variable to hold the strategy implementation.
   * The strategy must conform to the EmailServiceInterface.
   */
  let strategy: EmailServiceInterface;

  /**
   * Checks the provided type and initializes the appropriate email service strategy.
   * If the type is 'smtp', it uses SMTPServiceFactory to create the SMTP service.
   * If the type is 'sendgrid', it uses SendGridServiceFactory to create the SendGrid service.
   * Throws an error if the type is neither 'smtp' nor 'sendgrid'.
   */
  if (type === 'smtp') {
   strategy = SMTPServiceFactory.createSMTPService(emailConfig);
  } else if (type === 'sendgrid') {
   strategy = SendGridServiceFactory.createSendGridService(emailConfig.apiKey);
  } else {
   throw new Error('Invalid email service type');
  }

  /**
   * Sets the chosen strategy on the emailService instance.
   * This allows the EmailService to use the strategy for sending emails.
   */
  emailService.setStrategy(strategy);

  /**
   * Returns the configured instance of EmailService.
   */
  return emailService;
 }
}
