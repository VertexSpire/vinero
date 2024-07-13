// src/services/auth/github-auth.service.factory.ts

import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { GitHubAuthService } from './github-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * @class GitHubAuthServiceFactory
 * @extends AuthServiceFactory
 * @description Factory class for creating instances of the GitHubAuthService. This factory provides a method to
 * instantiate new GitHubAuthService objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class GitHubAuthServiceFactory extends AuthServiceFactory {
 /**
  * @method createAuthService
  * @description Creates and returns a new instance of GitHubAuthService. This method abstracts the instantiation
  * process, allowing for easy creation of GitHubAuthService objects without needing to directly call the constructor.
  *
  * @returns {GitHubAuthService} - A new instance of GitHubAuthService. This instance can be used to handle
  * authentication using GitHub's OAuth service, managing user authentication and token generation.
  */
 public createAuthService(): GitHubAuthService {
  /**
   * Create instances of the required services.
   * The UserService and TokenService instances are created here.
   * Necessary dependencies for these services should be injected.
   */
  const userService = new UserService(/* inject necessary dependencies here */);
  const tokenService = new TokenService(/* inject necessary dependencies here */);

  /**
   * Return a new instance of GitHubAuthService with the created services.
   * The UserService and TokenService instances are passed to the GitHubAuthService constructor.
   */
  return new GitHubAuthService(userService, tokenService);
 }
}
