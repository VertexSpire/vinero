// src/services/user/user.service.ts

import { UserRepository } from '../../repositories/user/user.repository';

/**
 * @class UserService
 * @description Service for managing user-related operations. This service provides methods for retrieving and authenticating users.
 */
export class UserService {
 /**
  * @property {UserRepository} userRepository - The UserRepository instance. This repository is used to perform database operations related to users.
  */
 private readonly userRepository: UserRepository;

 /**
  * @constructor
  * @description Constructor for the UserService class. It initializes the service with an instance of UserRepository.
  *
  * @param {UserRepository} userRepository - The UserRepository instance. This parameter provides the repository for user-related database operations.
  */
 constructor(userRepository: UserRepository) {
  /**
   * Assign the user repository instance to the class property.
   * This ensures that the user repository can be used to perform database operations related to users.
   */
  this.userRepository = userRepository;
 }

 /**
  * @method getUserById
  * @description Get a user by their ID. This method retrieves a user from the database using their unique ID.
  *
  * @param {string} userId - The ID of the user to retrieve. This parameter provides the unique ID of the user.
  * @returns {Promise<User | null>} - A Promise that resolves to the user or null if not found. This user object contains the user's data.
  */
 public async getUserById(userId: string): Promise<User | null> {
  return this.userRepository.getUserById(userId);
 }

 /**
  * @method getUserByGoogle
  * @description Authenticate user by Google strategy. This method retrieves or creates a user based on their Google profile information.
  *
  * @param {string} googleUserId - Google user ID. This parameter provides the unique ID of the user from Google.
  * @param {any} profile - User profile from the Google strategy. This parameter provides the user's profile information from Google.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  */
 public async getUserByGoogle(googleUserId: string, profile: any): Promise<User> {
  return this.getOrCreateUser('googleId', googleUserId, profile);
 }

 /**
  * @method getUserByFacebook
  * @description Authenticate user by Facebook strategy. This method retrieves or creates a user based on their Facebook profile information.
  *
  * @param {string} facebookUserId - Facebook user ID. This parameter provides the unique ID of the user from Facebook.
  * @param {any} profile - User profile from the Facebook strategy. This parameter provides the user's profile information from Facebook.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  */
 public async getUserByFacebook(facebookUserId: string, profile: any): Promise<User> {
  return this.getOrCreateUser('facebookId', facebookUserId, profile);
 }

 /**
  * @method getUserByGitHub
  * @description Authenticate user by GitHub strategy. This method retrieves or creates a user based on their GitHub profile information.
  *
  * @param {string} githubUserId - GitHub user ID. This parameter provides the unique ID of the user from GitHub.
  * @param {any} profile - User profile from the GitHub strategy. This parameter provides the user's profile information from GitHub.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  */
 public async getUserByGitHub(githubUserId: string, profile: any): Promise<User> {
  return this.getOrCreateUser('githubId', githubUserId, profile);
 }

 /**
  * @method getUserByTwitter
  * @description Authenticate user by Twitter strategy. This method retrieves or creates a user based on their Twitter profile information.
  *
  * @param {string} twitterUserId - Twitter user ID. This parameter provides the unique ID of the user from Twitter.
  * @param {any} profile - User profile from the Twitter strategy. This parameter provides the user's profile information from Twitter.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  */
 public async getUserByTwitter(twitterUserId: string, profile: any): Promise<User> {
  return this.getOrCreateUser('twitterId', twitterUserId, profile);
 }

 /**
  * @method getOrCreateUser
  * @description Unified function to authenticate user by strategy. This method retrieves or creates a user based on their profile information from a specific authentication strategy.
  *
  * @param {string} strategyField - The field used for the authentication strategy (e.g., 'googleId'). This parameter specifies the strategy-specific ID field.
  * @param {string} field - The strategy ID (e.g., Google ID). This parameter provides the unique ID of the user from the strategy provider.
  * @param {any} profile - User profile from the authentication strategy. This parameter provides the user's profile information from the strategy provider.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  */
 private async getOrCreateUser(strategyField: string, field: string, profile: any): Promise<User> {
  /**
   * Extract email from the profile.
   * The email is used as a unique identifier for the user.
   */
  const email: string = profile.email || '';

  /**
   * Splitting displayName into first name and last name.
   * The display name is split to separate the first name and last name of the user.
   */
  const displayNameParts = profile.displayName?.split(' ') || [];
  const firstName = displayNameParts[0] || '';
  const lastName = displayNameParts.slice(1).join(' ') || '';

  /**
   * Check if a user with the given email already exists.
   * The user repository checks if the user is already present in the database.
   */
  const existingUser = await this.userRepository.findByEmail(email);

  /**
   * If the user exists, return the existing user.
   * This means the user is already authenticated and present in the database.
   */
  if (existingUser) {
   return existingUser;
  }

  /**
   * Create a new user with the profile information.
   * The new user object is populated with the user's profile data.
   */
  const newUser: User = {
   username: email,
   email: email,
   [strategyField]: field, // Store the strategy-specific ID
   firstName,
   lastName,
   displayName: profile.displayName || '',
   // Additional fields can be populated here based on the profile
  };

  /**
   * Save the new user in the database.
   * The user repository creates a new user record in the database.
   */
  return this.userRepository.createUser(newUser);
 }
}
