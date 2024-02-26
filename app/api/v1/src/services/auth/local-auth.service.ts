// src/services/auth/local-auth.service.ts

import { AuthService } from './auth.interface';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * Local Authentication Service.
 */
export class LocalAuthService implements AuthService {
  private readonly userService: UserService;
  private readonly tokenService: TokenService;

  /**
   * Constructor for LocalAuthService.
   * @param userService - The UserService instance.
   * @param tokenService - The TokenService instance.
   */
  constructor(userService: UserService, tokenService: TokenService) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  /**
   * Login user locally and return user details along with access and refresh tokens.
   * @param username - The username of the user to log in.
   * @param password - The password of the user to log in.
   * @returns An object containing user details, access token, and refresh token.
   */
  public async login(
    username: string,
    password: string,
  ): Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }> {
    // Your logic to authenticate the user locally
    const user = await this.userService.authenticateUser(username, password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Generate access and refresh tokens
    const accessToken = this.tokenService.generateToken({ userId: user.id, username: user.username });
    const refreshToken = this.tokenService.generateRefreshToken();

    return { user, accessToken, refreshToken };
  }

  /**
   * Register a new user locally and return user details along with access and refresh tokens.
   * @param username - The username of the new user.
   * @param password - The password of the new user.
   * @param email - The email of the new user.
   * @returns An object containing user details, access token, and refresh token.
   */
  public async register(
    username: string,
    password: string,
    email: string,
  ): Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }> {
    // Your logic to register the new user locally
    const newUser = await this.userService.createUser(username, password, email);

    // Generate access and refresh tokens for the new user
    const accessToken = this.tokenService.generateToken({ userId: newUser.id, username: newUser.username });
    const refreshToken = this.tokenService.generateRefreshToken();

    return { user: newUser, accessToken, refreshToken };
  }
}
