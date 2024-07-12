// app/api/v1/src/services/email/email.service.ts

import { EmailServiceInterface } from '../../interfaces/email-service.interface';
import { EmailBuilder } from './email.builder';
import { EmailServiceException } from '../../exception/email.exception';

/**
 * @class EmailService
 * @description Service for sending emails using different strategies. This class provides a unified interface for
 * sending emails, regardless of the underlying email service provider. It uses the strategy pattern to select the
 * appropriate email service at runtime.
 */
export class EmailService {
  /**
   * @property {EmailServiceInterface} strategy - The strategy to be used for sending emails. This property is set
   * by the setStrategy method and determines which email service implementation (e.g., SMTPService, SendGridService)
   * will be used to send emails. It implements the EmailServiceInterface, ensuring a consistent method signature
   * for sending emails.
   */
  private strategy: EmailServiceInterface;

  /**
   * @method setStrategy
   * @description Sets the email sending strategy. This method allows the client to specify which email service
   * implementation should be used to send emails. By setting the strategy at runtime, the EmailService can dynamically
   * switch between different email service providers.
   * @param {EmailServiceInterface} strategy - The email sending strategy
   */
  setStrategy(strategy: EmailServiceInterface) {
    /**
     * Sets the strategy to be used for sending emails. This property is private to ensure that the strategy can only
     * be set through this method, maintaining encapsulation and control over the email service configuration.
     */
    this.strategy = strategy;
  }

  /**
   * @method sendEmail
   * @description Sends an email using the selected strategy. This method delegates the email sending operation to
   * the strategy set by the setStrategy method. It constructs the email payload from the provided EmailBuilder object
   * and uses the strategy to send the email.
   *
   * The method captures any errors thrown by the strategy and wraps them in an EmailServiceException, providing a
   * consistent error handling mechanism across different email service implementations.
   *
   * @param {EmailBuilder} email - The email object constructed using the EmailBuilder
   * @returns {Promise<void>}
   * @throws {EmailServiceException}
   */
  async sendEmail(email: EmailBuilder): Promise<void> {
    try {
      /**
       * Uses the selected strategy to send the email. The strategy is responsible for constructing the email payload
       * and interacting with the underlying email service provider to send the email.
       */
      await this.strategy.sendEmail(email);
    } catch (error) {
      /**
       * Throws an EmailServiceException if the email sending fails, encapsulating the error message. This provides
       * a consistent error handling strategy, making it easier to manage and debug email sending failures.
       */
      throw new EmailServiceException(`EmailService: Failed to send email - ${error.message}`);
    }
  }
}
