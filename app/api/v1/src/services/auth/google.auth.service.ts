// src/services/auth/google-auth.service.ts

import { SocialAuthService } from './abstract/social-auth.service';

/**
 * @class GoogleAuthService
 * @extends SocialAuthService
 * @description Google authentication service. This service extends the SocialAuthService to provide specific methods
 * for handling Google OAuth authentication. It includes methods to handle the callback from Google and perform
 * user authentication and token generation.
 */
export class GoogleAuthService extends SocialAuthService {
  /**
   * @method handleCallback
   * @description Handles the callback from the Google authentication provider. This method processes the callback
   * request, retrieves user information from Google, and generates a JWT token for the authenticated user.
   *
   * @param {any} req - Express request object. This parameter contains the request data sent by Google during the callback.
   * @returns {Promise<any>} - A promise that resolves to the authenticated user. This promise contains the user information
   * retrieved from Google and any additional data generated during the authentication process.
   */
  async handleCallback(req: any): Promise<any> {
    /**
     * Custom logic to handle the callback, retrieve user info, and generate JWT token.
     * The userService is used to authenticate the user with Google-specific data.
     * The tokenService is used to generate a JWT token for the authenticated user.
     */
    const user = await this.userService.authenticateUserByGoogle(/* pass required arguments here */);
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
