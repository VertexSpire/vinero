// src/services/auth/local-auth.service.factory.ts
import { AuthServiceFactory } from './abstract/auth.service.factory';
import { AuthStrategy } from './auth.interface';
import { LocalAuthService } from './local-auth.service';
import { UserServiceFactory } from '../user/user.service.factory';
import { TokenServiceFactory } from '../token/token.service.factory';

/**
 * Factory for creating LocalAuthService instances.
 */
export class LocalAuthServiceFactory extends AuthServiceFactory {
  /**
   * Create a new instance of LocalAuthService.
   * @returns An instance of LocalAuthService.
   */
  public createAuthService(): LocalAuthService {
    const userService = UserServiceFactory.createUserService();
    const tokenService = TokenServiceFactory.createTokenService();

    return new LocalAuthService(userService, tokenService);
  }
}
