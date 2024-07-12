// app/api/v1/src/services/email/strategies/sendgrid.service.factory.ts

import { SendGridService } from './sendgrid.service';

/**
 * @class SendGridServiceFactory
 * @description Factory for creating SendGridService instances. This factory pattern encapsulates the instantiation
 * logic for SendGridService, making it easy to manage and maintain. By abstracting the creation process, we can ensure
 * that all instances of SendGridService are created consistently with the necessary configuration.
 */
export class SendGridServiceFactory {
  /**
   * @method createSendGridService
   * @description This static method is responsible for creating and returning a new instance of the SendGridService class.
   * It takes an API key as its parameter, which is necessary for authenticating with the SendGrid email service.
   *
   * The method ensures that the SendGridService instance is properly configured with the required API key, which allows
   * the service to send emails through SendGrid's API. This method promotes modularity and ease of maintenance by
   * encapsulating the creation and configuration logic for the SendGridService. The use of the factory pattern here
   * also supports dependency injection and testing, as it provides a single point of creation for the service instances.
   *
   * @param {string} apiKey - The API key for SendGrid
   * @returns {SendGridService} - Returns a new instance of SendGridService configured with the provided API key
   */
  public static createSendGridService(apiKey: string): SendGridService {
    /**
     * The new instance of SendGridService is created and returned with the provided API key. This instance will be
     * able to send emails using the SendGrid service, authenticated with the specified API key.
     */
    return new SendGridService(apiKey);
  }
}
