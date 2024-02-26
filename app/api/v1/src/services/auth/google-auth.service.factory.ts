// src/services/auth/google-auth.service.factory.ts
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { GoogleAuthService } from './google-auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Factory for creating GoogleAuthService instances.
 */
export class GoogleAuthServiceFactory extends AuthServiceFactory {
  /**
   * Create a new instance of GoogleAuthService.
   * @returns An instance of GoogleAuthService.
   */
  public createAuthService(): GoogleAuthService {
    const userService = new UserService(/* inject necessary dependencies here */);
    const tokenService = new TokenService(/* inject necessary dependencies here */);
    return new GoogleAuthService(userService, tokenService);
  }
}
