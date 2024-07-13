// src/services/auth/abstract/auth.service.factory.ts
import { AuthService } from '../auth.service';

/**
 * Abstract class for the factory that creates instances of authentication services.
 */
export abstract class AuthServiceFactory {
 /**
  * Abstract method to create a new instance of AuthService.
  * @returns An instance of AuthService.
  */
 abstract createAuthService(): AuthService;
}
