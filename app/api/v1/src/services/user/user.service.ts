// src/services/user/user.service.ts
import { UserRepository } from '../../repositories/user.repository';

/**
 * Service for managing user-related operations.
 */
export class UserService {
  private readonly userRepository: UserRepository;

  /**
   * Constructor for the UserService class.
   * @param userRepository - The UserRepository instance.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Get a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns A Promise that resolves to the user or null if not found.
   */
  public async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  /**
   * Authenticate user by Google strategy.
   * @param googleUserId - Google user ID.
   * @param profile - User profile from the Google strategy.
   * @returns A Promise that resolves to the authenticated user.
   */
  public async authenticateUserByGoogle(googleUserId: string, profile: any): Promise<User> {
    return this.getUser('googleId', googleUserId, profile);
  }

  /**
   * Authenticate user by Facebook strategy.
   * @param facebookUserId - Facebook user ID.
   * @param profile - User profile from the Facebook strategy.
   * @returns A Promise that resolves to the authenticated user.
   */
  public async authenticateUserByFacebook(facebookUserId: string, profile: any): Promise<User> {
    return this.getUser('facebookId', facebookUserId, profile);
  }

  /**
   * Authenticate user by GitHub strategy.
   * @param githubUserId - GitHub user ID.
   * @param profile - User profile from the GitHub strategy.
   * @returns A Promise that resolves to the authenticated user.
   */
  public async authenticateUserByGitHub(githubUserId: string, profile: any): Promise<User> {
    return this.getUser('githubId', githubUserId, profile);
  }

  /**
   * Authenticate user by Twitter strategy.
   * @param twitterUserId - Twitter user ID.
   * @param profile - User profile from the Twitter strategy.
   * @returns A Promise that resolves to the authenticated user.
   */
  public async authenticateUserByTwitter(twitterUserId: string, profile: any): Promise<User> {
    return this.getUser('twitterId', twitterUserId, profile);
  }

  /**
   * Unified function to authenticate user by strategy.
   * @param strategyField - The field used for the authentication strategy (e.g., 'googleId').
   * @param field - The strategy ID (e.g., Google ID).
   * @param profile - User profile from the authentication strategy.
   * @returns A Promise that resolves to the authenticated user.
   */
  private async getUser(strategyField: string, field: string, profile: any): Promise<User> {
    // Splitting displayName into first name and last name
    const displayNameParts = profile.displayName?.split(' ') || [];
    const firstName = displayNameParts[0] || '';
    const lastName = displayNameParts.slice(1).join(' ') || '';

    const existingUser = await this.userRepository.findByEmail(profile.email);

    if (existingUser) {
      return existingUser;
    }

    const newUser: User = {
      username: profile.email,
      email: profile.email,
      [strategyField]: field, // Store the strategy-specific ID
      firstName,
      lastName,
      displayName: profile.displayName || '',
      // Additional fields can be populated here based on the profile
    };

    return this.userRepository.createUser(newUser);
  }
}
