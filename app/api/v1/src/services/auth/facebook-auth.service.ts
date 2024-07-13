// src/services/auth/facebook-auth.service.ts

import { SocialAuthService } from './abstract/social-auth.service';

/**
 * @class FacebookAuthService
 * @extends SocialAuthService
 * @description Facebook authentication service. This service extends the SocialAuthService to provide specific methods
 * for handling Facebook OAuth authentication. It includes methods to handle the callback from Facebook and perform
 * user authentication and token generation.
 */
export class FacebookAuthService extends SocialAuthService {
 /**
  * @method handleCallback
  * @description Handles the callback from the Facebook authentication provider. This method processes the callback
  * request, retrieves user information from Facebook, and generates a JWT token for the authenticated user.
  *
  * @param {any} req - Express request object. This parameter contains the request data sent by Facebook during the callback.
  * @returns {Promise<any>} - A promise that resolves to the authenticated user. This promise contains the user information
  * retrieved from Facebook and any additional data generated during the authentication process.
  */
 async handleCallback(req: any): Promise<any> {
  /**
   * Custom logic to handle the callback, retrieve user info, and generate JWT token.
   * The userService is used to authenticate the user with Facebook-specific data.
   * The tokenService is used to generate a JWT token for the authenticated user.
   */
  const user = await this.userService.authenticateUserByFacebook(/* pass required arguments here */);
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
