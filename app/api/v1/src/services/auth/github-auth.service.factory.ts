// src/services/auth/github-auth.service.factory.ts
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { GitHubAuthService } from './github-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Factory for creating GitHubAuthService instances.
 */
export class GitHubAuthServiceFactory extends AuthServiceFactory {
  /**
   * Create a new instance of GitHubAuthService.
   * @returns An instance of GitHubAuthService.
   */
  public createAuthService(): GitHubAuthService {
    const userService = new UserService(/* inject necessary dependencies here */);
    const tokenService = new TokenService(/* inject necessary dependencies here */);
    return new GitHubAuthService(userService, tokenService);
  }
}
