// src/services/token/token.service.ts

import jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

/**
 * @class TokenService
 * @description Service for handling JWT token-related operations. This service provides methods to generate and verify JWT tokens,
 * which are used for user authentication.
 */
export class TokenService {
  /**
   * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for JWT.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for TokenService. It initializes the service with an instance of ConfigService.
   *
   * @param {ConfigService} configService - The ConfigService instance. This parameter provides the service for accessing configuration settings.
   */
  constructor(configService: ConfigService) {
    /**
     * Assign the configuration service instance to the class property.
     * This ensures that the configuration service can be used to access settings for JWT.
     */
    this.configService = configService;
  }

  /**
   * @method generateToken
   * @description Generate a JWT token for the provided payload. This method creates a new JWT token containing the specified payload.
   *
   * @param {Record<string, any>} payload - The data to be included in the token. This parameter provides the payload to be embedded in the token.
   * @returns {string} - The generated JWT token. This token contains the encoded payload and can be used for authentication.
   * @throws Error if the JWT secret key is not configured.
   */
  public generateToken(payload: Record<string, any>): string {
    /**
     * Get the JWT secret key from the configuration service.
     * This key is used to sign the token and ensure its integrity.
     */
    const secret = this.configService.getValue<string>('jwtAuth.secretKey');

    /**
     * Validate that the secret key is present.
     * If the secret key is missing, throw an error.
     */
    if (!secret) {
      throw new Error('Incomplete JWT auth config');
    }

    /**
     * Define the options for signing the token.
     * The token is set to expire in 1 hour.
     */
    const options: jwt.SignOptions = {
      expiresIn: '1h', // Adjust as needed
    };

    /**
     * Sign and return the JWT token.
     * The token is created using the payload, secret key, and options.
     */
    return jwt.sign(payload, secret, options);
  }

  /**
   * @method verifyToken
   * @description Verify and decode a JWT token. This method checks the validity of the token and decodes its payload.
   *
   * @param {string} token - The JWT token to verify and decode. This parameter provides the token to be validated.
   * @returns {Record<string, any> | null} - The decoded payload if the token is valid; otherwise, returns null. This payload contains the data embedded in the token.
   * @throws Error if the JWT secret key is not configured.
   */
  public verifyToken(token: string): Record<string, any> | null {
    /**
     * Get the JWT secret key from the configuration service.
     * This key is used to verify the token's signature and ensure its integrity.
     */
    const secret = this.configService.getValue<string>('jwtAuth.secretKey');

    /**
     * Validate that the secret key is present.
     * If the secret key is missing, throw an error.
     */
    if (!secret) {
      throw new Error('Incomplete JWT auth config');
    }

    /**
     * Attempt to verify and decode the token.
     * If the token is valid, return the decoded payload.
     * If the token is invalid or expired, return null.
     */
    try {
      const decoded = jwt.verify(token, secret) as Record<string, any>;
      return decoded;
    } catch (error) {
      // Token is invalid or expired
      return null;
    }
  }
}
