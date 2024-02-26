// src/services/auth/twitter-auth.service.factory.ts
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { TwitterAuthService } from './twitter-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Factory for creating TwitterAuthService instances.
 */
export class TwitterAuthServiceFactory extends AuthServiceFactory {
  /**
   * Create a new instance of TwitterAuthService.
   * @returns An instance of TwitterAuthService.
   */
  public createAuthService(): TwitterAuthService {
    const userService = new UserService(/* inject necessary dependencies here */);
    const tokenService = new TokenService(/* inject necessary dependencies here */);
    return new TwitterAuthService(userService, tokenService);
  }
}
