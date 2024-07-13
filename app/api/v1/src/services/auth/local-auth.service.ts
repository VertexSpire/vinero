// src/services/auth/local-auth.service.ts

import { AuthService } from './auth.interface';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

/**
 * @class LocalAuthService
 * @implements AuthService
 * @description Local Authentication Service. This service handles the logic for local user authentication,
 * including user login and registration. It uses the UserService for user-related operations and the TokenService
 * for generating access and refresh tokens.
 */
export class LocalAuthService implements AuthService {
  /**
   * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations.
   */
  private readonly userService: UserService;

  /**
   * @property {TokenService} tokenService - The TokenService instance. This service is used to generate access and refresh tokens.
   */
  private readonly tokenService: TokenService;

  /**
   * @constructor
   * @description Constructor for LocalAuthService. It initializes the service with instances of UserService and TokenService.
   *
   * @param {UserService} userService - The UserService instance. This parameter is required to perform user-related operations.
   * @param {TokenService} tokenService - The TokenService instance. This parameter is required to generate access and refresh tokens.
   */
  constructor(userService: UserService, tokenService: TokenService) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  /**
   * @method login
   * @description Login user locally and return user details along with access and refresh tokens. This method authenticates
   * the user using the provided username and password, and if successful, generates and returns access and refresh tokens.
   *
   * @param {string} username - The username of the user to log in. This parameter is required to identify the user.
   * @param {string} password - The password of the user to log in. This parameter is required to authenticate the user.
   * @returns {Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }>} - An object containing user details,
   * access token, and refresh token. If authentication fails, an error is thrown.
   */
  public async login(
    username: string,
    password: string,
  ): Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }> {
    /**
     * Logic to authenticate the user locally.
     * The userService is used to authenticate the user with the provided username and password.
     */
    const user = await this.userService.authenticateUser(username, password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    /**
     * Generate access and refresh tokens.
     * The tokenService is used to generate tokens for the authenticated user.
     */
    const accessToken = this.tokenService.generateToken({ userId: user.id, username: user.username });
    const refreshToken = this.tokenService.generateRefreshToken();

    return { user, accessToken, refreshToken };
  }

  /**
   * @method register
   * @description Register a new user locally and return user details along with access and refresh tokens. This method creates
   * a new user with the provided username, password, and email, and if successful, generates and returns access and refresh tokens.
   *
   * @param {string} username - The username of the new user. This parameter is required to create the user.
   * @param {string} password - The password of the new user. This parameter is required to authenticate the user.
   * @param {string} email - The email of the new user. This parameter is required to identify the user.
   * @returns {Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }>} - An object containing user details,
   * access token, and refresh token. If user creation fails, an error is thrown.
   */
  public async register(
    username: string,
    password: string,
    email: string,
  ): Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }> {
    /**
     * Logic to register the new user locally.
     * The userService is used to create a new user with the provided username, password, and email.
     */
    const newUser = await this.userService.createUser(username, password, email);

    /**
     * Generate access and refresh tokens for the new user.
     * The tokenService is used to generate tokens for the newly created user.
     */
    const accessToken = this.tokenService.generateToken({ userId: newUser.id, username: newUser.username });
    const refreshToken = this.tokenService.generateRefreshToken();

    return { user: newUser, accessToken, refreshToken };
  }
}
