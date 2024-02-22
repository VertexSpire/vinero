// src/services/passport/passport.strategy.ts
import { PassportStatic } from 'passport';

/**
 * Interface for Passport authentication strategies.
 */
export interface PassportStrategy {
  /**
   * Configure the authentication strategy.
   * @param passport - The Passport instance.
   */
  configureStrategy(passport: PassportStatic): void;
}
