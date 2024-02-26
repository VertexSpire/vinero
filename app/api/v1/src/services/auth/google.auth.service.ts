// src/services/auth/google-auth.service.ts
import { SocialAuthService } from './abstract/social-auth.service';

/**
 * Google authentication service.
 */
export class GoogleAuthService extends SocialAuthService {
  /**
   * Handle the callback from the Google authentication provider.
   * @param req - Express request object.
   * @returns A Promise that resolves to the authenticated user.
   */
  async handleCallback(req: any): Promise<any> {
    // Custom logic to handle the callback, retrieve user info, and generate JWT token
    const user = await this.userService.authenticateUserByGoogle(/* pass required arguments here */);
    const token = this.tokenService.generateToken(user);

    // Custom logic to send the token in the response, possibly set it as a cookie, etc.
    // Example: Setting token in response JSON
    res.json({ token });

    // Return the authenticated user if needed
    return user;
  }
}
