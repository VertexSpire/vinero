import { AuthService } from './auth.service';

/**
 * Abstract base class for social authentication services.
 */
export abstract class SocialAuthService extends AuthService {
  /**
   * Constructor for SocialAuthService.
   * @param userService - The UserService instance.
   * @param tokenService - The TokenService instance.
   */
  constructor(userService: UserService, tokenService: TokenService) {
    super(userService, tokenService);
  }

  /**
   * Abstract method to handle the callback after successful authentication.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public abstract async handleCallback(req: any, res: any): Promise<void>;
}
