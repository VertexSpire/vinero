// src/services/auth/facebook-auth.service.factory.ts
import { AuthStrategy } from './auth.interface';
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { FacebookAuthService } from './facebook-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Factory for creating FacebookAuthService instances.
 */
export class FacebookAuthServiceFactory extends AuthServiceFactory {
  /**
   * Create a new instance of FacebookAuthService.
   * @returns An instance of FacebookAuthService.
   */
  public createAuthService(): FacebookAuthService {
    const userService = new UserService(/* inject necessary dependencies here */);
    const tokenService = new TokenService(/* inject necessary dependencies here */);
    return new FacebookAuthService(userService, tokenService);
  }
}
