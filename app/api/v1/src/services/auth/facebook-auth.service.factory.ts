// src/services/auth/facebook-auth.service.factory.ts

import { AuthStrategy } from './auth.interface';
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { FacebookAuthService } from './facebook-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * @class FacebookAuthServiceFactory
 * @extends AuthServiceFactory
 * @description Factory class for creating instances of the FacebookAuthService. This factory provides a method to
 * instantiate new FacebookAuthService objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class FacebookAuthServiceFactory extends AuthServiceFactory {
 /**
  * @method createAuthService
  * @description Creates and returns a new instance of FacebookAuthService. This method abstracts the instantiation
  * process, allowing for easy creation of FacebookAuthService objects without needing to directly call the constructor.
  *
  * @returns {FacebookAuthService} - A new instance of FacebookAuthService. This instance can be used to handle
  * authentication using Facebook's OAuth service, managing user authentication and token generation.
  */
 public createAuthService(): FacebookAuthService {
  /**
   * Create instances of the required services.
   * The UserService and TokenService instances are created here.
   * Necessary dependencies for these services should be injected.
   */
  const userService = new UserService(/* inject necessary dependencies here */);
  const tokenService = new TokenService(/* inject necessary dependencies here */);

  /**
   * Return a new instance of FacebookAuthService with the created services.
   * The UserService and TokenService instances are passed to the FacebookAuthService constructor.
   */
  return new FacebookAuthService(userService, tokenService);
 }
}
