import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Abstract base class for authentication services.
 */
export abstract class AuthService {
  protected readonly userService: UserService;
  protected readonly tokenService: TokenService;

  /**
   * Constructor for AuthService.
   * @param userService - The UserService instance.
   * @param tokenService - The TokenService instance.
   */
  constructor(userService: UserService, tokenService: TokenService) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  /**
   * Abstract method to handle the callback after successful authentication.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public abstract async handleCallback(req: any, res: any): Promise<void>;

  /**
   * Abstract method to initiate the login process for the authentication service.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public abstract async login(req: any, res: any): Promise<void>;

  // Additional abstract methods specific to authentication services can be added here
}
