// src/services/auth/google-auth.service.factory.ts

import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { GoogleAuthService } from './google-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * @class GoogleAuthServiceFactory
 * @extends AuthServiceFactory
 * @description Factory class for creating instances of the GoogleAuthService. This factory provides a method to
 * instantiate new GoogleAuthService objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class GoogleAuthServiceFactory extends AuthServiceFactory {
 /**
  * @method createAuthService
  * @description Creates and returns a new instance of GoogleAuthService. This method abstracts the instantiation
  * process, allowing for easy creation of GoogleAuthService objects without needing to directly call the constructor.
  *
  * @returns {GoogleAuthService} - A new instance of GoogleAuthService. This instance can be used to handle
  * authentication using Google's OAuth service, managing user authentication and token generation.
  */
 public createAuthService(): GoogleAuthService {
  /**
   * Create instances of the required services.
   * The UserService and TokenService instances are created here.
   * Necessary dependencies for these services should be injected.
   */
  const userService = new UserService(/* inject necessary dependencies here */);
  const tokenService = new TokenService(/* inject necessary dependencies here */);

  /**
   * Return a new instance of GoogleAuthService with the created services.
   * The UserService and TokenService instances are passed to the GoogleAuthService constructor.
   */
  return new GoogleAuthService(userService, tokenService);
 }
}
