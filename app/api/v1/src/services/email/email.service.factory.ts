// app/api/v1/src/services/email/email.service.factory.ts

import { EmailService } from './email.service';
import { SMTPServiceFactory } from './strategies/smtp.service.factory';
import { SendGridServiceFactory } from './strategies/sendgrid.service.factory';
import { EmailServiceInterface } from '../../interfaces/email-service.interface';

/**
 * @class EmailServiceFactory
 * @description Factory for creating EmailService instances with different strategies. This factory pattern encapsulates
 * the logic for instantiating EmailService objects with either SMTP or SendGrid strategies, based on the provided type.
 * This abstraction promotes modularity, testability, and ease of maintenance.
 */
export class EmailServiceFactory {
  /**
   * @method createEmailService
   * @description This static method is responsible for creating and returning a new instance of the EmailService class.
   * It takes two parameters: the type of email service and a configuration object. Based on the provided type, it selects
   * the appropriate email service strategy (either SMTP or SendGrid) and configures it with the necessary details.
   *
   * If the type is 'smtp', it creates an SMTPService instance using the SMTPServiceFactory. If the type is 'sendgrid',
   * it creates a SendGridService instance using the SendGridServiceFactory. This method abstracts the complexity of
   * service creation and configuration, ensuring that the EmailService instance is properly set up with the selected
   * strategy.
   *
   * @param {string} type - The type of email service ('smtp' or 'sendgrid')
   * @param {object} config - Configuration object for the email service
   * @returns {EmailService} - Returns a new instance of EmailService configured with the selected strategy
   */
  public static createEmailService(type: string, config: any): EmailService {
    /**
     * Creates a new EmailService instance. This instance will be configured with the appropriate strategy based on the
     * provided type, allowing it to send emails using either SMTP or SendGrid.
     */
    const emailService = new EmailService();

    /**
     * Selects the appropriate email service strategy based on the provided type. If the type is 'smtp', it creates
     * an SMTPService instance using the SMTPServiceFactory. If the type is 'sendgrid', it creates a SendGridService
     * instance using the SendGridServiceFactory.
     */
    let strategy: EmailServiceInterface;

    if (type === 'smtp') {
      /**
       * Creates an SMTPService instance with the provided configuration. The SMTPServiceFactory is used to abstract
       * the creation and configuration logic, ensuring consistency and modularity.
       */
      strategy = SMTPServiceFactory.createSMTPService(config);
    } else if (type === 'sendgrid') {
      /**
       * Creates a SendGridService instance with the provided API key. The SendGridServiceFactory is used to abstract
       * the creation and configuration logic, ensuring consistency and modularity.
       */
      strategy = SendGridServiceFactory.createSendGridService(config.apiKey);
    } else {
      /**
       * Throws an error if the provided type is invalid. This ensures that only supported email service types are used,
       * promoting robustness and reliability.
       */
      throw new Error('Invalid email service type');
    }

    /**
     * Sets the selected strategy in the EmailService instance. This configuration ensures that the EmailService can
     * use the specified strategy to send emails.
     */
    emailService.setStrategy(strategy);

    return emailService;
  }
}
