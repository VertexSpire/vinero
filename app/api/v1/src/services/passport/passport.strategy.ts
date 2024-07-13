// src/services/passport/passport.strategy.ts

import { PassportStatic } from 'passport';

/**
 * @interface PassportStrategy
 * @description Interface for Passport authentication strategies. This interface defines a contract for configuring
 * authentication strategies with the Passport instance, ensuring that all strategies adhere to a consistent structure.
 */
export interface PassportStrategy {
 /**
  * @method configureStrategy
  * @description Configure the authentication strategy. This method is responsible for setting up the strategy with
  * the Passport instance, ensuring that it is properly integrated and can be used for authentication.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  */
 configureStrategy(passport: PassportStatic): void;
}
