// app/api/v1/src/services/email/strategies/smtp.service.factory.ts

import { SMTPService } from './smtp.service';

/**
 * @class SMTPServiceFactory
 * @description Factory for creating SMTPService instances. This factory pattern encapsulates the instantiation
 * logic for SMTPService, making it easy to manage and maintain. By abstracting the creation process, we can ensure
 * that all instances of SMTPService are created consistently with the necessary configuration.
 */
export class SMTPServiceFactory {
 /**
  * @method createSMTPService
  * @description This static method is responsible for creating and returning a new instance of the SMTPService class.
  * It takes a configuration object as its parameter, which includes necessary details for establishing a connection
  * to the SMTP server. The configuration object contains the following properties:
  * - host: A string representing the SMTP server's hostname.
  * - port: A number specifying the port on which the SMTP server is listening.
  * - user: A string representing the username for authentication with the SMTP server.
  * - pass: A string representing the password for authentication with the SMTP server.
  *
  * Upon invocation, the method instantiates a new SMTPService object, passing the provided configuration object to
  * the constructor of the SMTPService class. This setup ensures that the SMTPService instance is properly configured
  * with the necessary details to send emails through the specified SMTP server. This method abstracts the creation
  * process and encapsulates the configuration details, promoting modularity and ease of maintenance in the codebase.
  *
  * @param {object} config - Configuration object for SMTP
  * @param {string} config.host - The SMTP host
  * @param {number} config.port - The SMTP port
  * @param {string} config.user - The SMTP user
  * @param {string} config.pass - The SMTP password
  * @returns {SMTPService} - Returns a new instance of SMTPService
  */
 public static createSMTPService(config: { host: string; port: number; user: string; pass: string }): SMTPService {
  /**
   * The new instance of SMTPService is created and returned with the provided configuration. This instance will be
   * able to send emails using the SMTP protocol, authenticated with the specified server details.
   */
  return new SMTPService(config);
 }
}
