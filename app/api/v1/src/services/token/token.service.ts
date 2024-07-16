import jwt from 'jsonwebtoken'; // Importing the jsonwebtoken library to handle JWT operations.
import { ConfigService } from '../config/config.service'; // Importing the ConfigService to access configuration values.
import { ILogger } from '../logger/logger.interface'; // Importing the ILogger interface for logging.

/**
 * @class TokenService
 * @description Service for handling JWT token-related operations. This service provides methods to generate and verify JWT tokens,
 * which are used for user authentication. The service relies on a configuration service to retrieve the secret key used for signing the tokens,
 * and a logger service to log relevant events such as token generation and verification.
 * @property {ConfigService} configService - Instance of the ConfigService to access configuration values.
 * @property {ILogger} logger - Instance of the ILogger to handle logging of events.
 * @autor Wasif Farooq
 */
export class TokenService {
 /**
  * @private
  * @readonly
  * @property {ConfigService} configService - Service to access application configuration values.
  */
 private readonly configService: ConfigService;

 /**
  * @private
  * @readonly
  * @property {ILogger} logger - Service to log application events and errors.
  */
 private readonly logger: ILogger;

 /**
  * @constructor
  * @param {ConfigService} configService - Instance of ConfigService injected to access configuration settings.
  * @param {ILogger} logger - Instance of ILogger injected to enable logging within the service.
  * @description Initializes the TokenService with instances of ConfigService and ILogger.
  */
 constructor(configService: ConfigService, logger: ILogger) {
  this.configService = configService;
  /**
   * The configService parameter is assigned to the private property this.configService.
   * This allows the TokenService to access configuration values needed for token operations.
   */
  this.logger = logger;
  /**
   * The logger parameter is assigned to the private property this.logger.
   * This allows the TokenService to log important events and errors during its operations.
   */
 }

 /**
  * @public
  * @method generateToken
  * @description Generates a JWT token using the provided payload and a secret key from configuration.
  * @param {Record<string, any>} payload - The payload to be included in the JWT token.
  * @returns {string} - The generated JWT token.
  * @throws {Error} - Throws an error if the secret key is not configured.
  */
 public generateToken(payload: Record<string, any>): string {
  const secret = this.configService.getValue<string>('jwtAuth.secretKey');
  /**
   * Retrieves the JWT secret key from the configuration service.
   * The secret key is essential for signing the JWT token securely.
   */

  if (!secret) {
   /**
    * Checks if the secret key is configured.
    * If the secret key is not available, it logs an error and throws an exception.
    * This ensures that token generation does not proceed without the necessary secret key.
    */
   this.logger.error('JWT secret key is not configured');
   throw new Error('Incomplete JWT auth config');
  }

  const options: jwt.SignOptions = {
   expiresIn: '1h',
   /**
    * Defines the options for the JWT token.
    * The token is set to expire in 1 hour, which can be adjusted as needed.
    * This option ensures the token has a limited validity period for security purposes.
    */
  };

  const token = jwt.sign(payload, secret, options);
  /**
   * Generates the JWT token using the given payload, secret key, and options.
   * The jsonwebtoken library's sign method is used to create the token.
   * The generated token is then returned to the caller.
   */
  this.logger.log('Generated JWT token');
  /**
   * Logs the successful generation of the JWT token.
   * This helps in tracking the creation of tokens for debugging and monitoring purposes.
   */
  return token;
  /**
   * Returns the generated JWT token to the caller.
   * The token can then be used for user authentication in the application.
   */
 }

 /**
  * @public
  * @method verifyToken
  * @description Verifies the provided JWT token using the secret key from configuration.
  * @param {string} token - The JWT token to be verified.
  * @returns {Record<string, any> | null} - The decoded payload if the token is valid, otherwise null.
  * @throws {Error} - Throws an error if the secret key is not configured.
  */
 public verifyToken(token: string): Record<string, any> | null {
  const secret = this.configService.getValue<string>('jwtAuth.secretKey');
  /**
   * Retrieves the JWT secret key from the configuration service.
   * The secret key is essential for verifying the JWT token's authenticity.
   */

  if (!secret) {
   /**
    * Checks if the secret key is configured.
    * If the secret key is not available, it logs an error and throws an exception.
    * This ensures that token verification does not proceed without the necessary secret key.
    */
   this.logger.error('JWT secret key is not configured');
   throw new Error('Incomplete JWT auth config');
  }

  try {
   const decoded = jwt.verify(token, secret) as Record<string, any>;
   /**
    * Attempts to verify the JWT token using the secret key.
    * If the verification is successful, it logs the event and returns the decoded payload.
    * The decoded payload contains the original data that was signed into the token.
    */
   this.logger.log('Verified JWT token');
   return decoded;
   /**
    * Returns the decoded payload to the caller if the token is valid.
    * The decoded payload can then be used to authenticate the user and access their information.
    */
  } catch (error) {
   this.logger.warn('Invalid or expired JWT token');
   /**
    * If the token verification fails (e.g., the token is invalid or expired), it logs a warning.
    * This helps in identifying issues with token usage, such as attempted access with an expired token.
    */
   return null;
   /**
    * Returns null to indicate that the token is not valid.
    * This prevents unauthorized access and ensures that only valid tokens are accepted.
    */
  }
 }
}
