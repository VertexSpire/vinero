// src/services/auth/local-auth.service.factory.ts

import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { LocalAuthService } from './local-auth.service';
import { UserServiceFactory } from '../user/user.service.factory';
import { TokenServiceFactory } from '../token/token.service.factory';

/**
 * @class LocalAuthServiceFactory
 * @extends AuthServiceFactory
 * @description Factory class for creating instances of the LocalAuthService. This factory provides a method to
 * instantiate new LocalAuthService objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class LocalAuthServiceFactory extends AuthServiceFactory {
  /**
   * @method createAuthService
   * @description Creates and returns a new instance of LocalAuthService. This method abstracts the instantiation
   * process, allowing for easy creation of LocalAuthService objects without needing to directly call the constructor.
   *
   * @returns {LocalAuthService} - A new instance of LocalAuthService. This instance can be used to handle
   * authentication using the local strategy, managing user authentication and token generation.
   */
  public createAuthService(): LocalAuthService {
    /**
     * Create instances of the required services.
     * The UserService and TokenService instances are created here using their respective factories.
     */
    const userService = UserServiceFactory.createUserService();
    const tokenService = TokenServiceFactory.createTokenService();

    /**
     * Return a new instance of LocalAuthService with the created services.
     * The UserService and TokenService instances are passed to the LocalAuthService constructor.
     */
    return new LocalAuthService(userService, tokenService);
  }
}
