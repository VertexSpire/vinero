// src/services/token/token.service.ts

import jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

/**
 * Service for handling JWT token-related operations.
 */
export class TokenService {
  private readonly configService: ConfigService;

  /**
   * Constructor for TokenService.
   * @param configService - The ConfigService instance.
   */
  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  /**
   * Generate a JWT token for the provided payload.
   * @param payload - The data to be included in the token.
   * @returns The generated JWT token.
   */
  public generateToken(payload: Record<string, any>): string {
    const secret = this.configService.getValue<string>('jwtAuth.secretKey');
    if (!secret) {
      throw new Error('Incomplete JWT auth config');
    }

    const options: jwt.SignOptions = {
      expiresIn: '1h', // Adjust as needed
    };

    return jwt.sign(payload, secret, options);
  }

  /**
   * Verify and decode a JWT token.
   * @param token - The JWT token to verify and decode.
   * @returns The decoded payload if the token is valid.
   */
  public verifyToken(token: string): Record<string, any> | null {
    const secret = this.configService.getValue<string>('jwtAuth.secretKey');
    if (!secret) {
      throw new Error('Incomplete JWT auth config');
    }

    try {
      const decoded = jwt.verify(token, secret) as Record<string, any>;
      return decoded;
    } catch (error) {
      // Token is invalid or expired
      return null;
    }
  }
}
