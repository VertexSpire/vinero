// src/services/auth/github-auth.service.ts

import { SocialAuthService } from './abstract/social-auth.service';

/**
 * @class GitHubAuthService
 * @extends SocialAuthService
 * @description GitHub authentication service. This service extends the SocialAuthService to provide specific methods
 * for handling GitHub OAuth authentication. It includes methods to handle the callback from GitHub and perform
 * user authentication and token generation.
 */
export class GitHubAuthService extends SocialAuthService {
 /**
  * @method handleCallback
  * @description Handles the callback from the GitHub authentication provider. This method processes the callback
  * request, retrieves user information from GitHub, and generates a JWT token for the authenticated user.
  *
  * @param {any} req - Express request object. This parameter contains the request data sent by GitHub during the callback.
  * @returns {Promise<any>} - A promise that resolves to the authenticated user. This promise contains the user information
  * retrieved from GitHub and any additional data generated during the authentication process.
  */
 async handleCallback(req: any): Promise<any> {
  /**
   * Custom logic to handle the callback, retrieve user info, and generate JWT token.
   * The userService is used to authenticate the user with GitHub-specific data.
   * The tokenService is used to generate a JWT token for the authenticated user.
   */
  const user = await this.userService.authenticateUserByGitHub(/* pass required arguments here */);
  const token = this.tokenService.generateToken(user);

  /**
   * Custom logic to send the token in the response, possibly set it as a cookie, etc.
   * For example, the token is set in the response JSON.
   */
  res.json({ token });

  /**
   * Return the authenticated user if needed.
   * The authenticated user is returned to allow further processing or response handling.
   */
  return user;
 }
}
