import { UserRepository } from '../../repositories/user/user.repository';
import { Logger } from '../../logging/logger'; // Import the Logger interface or class

/**
 * @class UserService
 * @description Service for managing user-related operations. This service provides methods for retrieving and authenticating users.
 * The UserService class is responsible for the business logic related to user operations. It interacts with the UserRepository
 * to perform database operations and utilizes the Logger to log relevant information and errors.
 *
 * @property {UserRepository} userRepository - The UserRepository instance. This repository is used to perform database operations related to users.
 * @property {Logger} logger - The Logger instance. This logger is used to log messages and errors.
 *
 * @example
 * const userService = new UserService(new UserRepository(), new Logger());
 * userService.getUserById('123');
 *
 * @see UserRepository
 * @see Logger
 *
 * @version 1.0.0
 * @since 2024-07-16
 *
 * @license MIT
 *
 * @maintainer Wasif Farooq
 * @created 2024-07-16
 */
export class UserService {
 /**
  * @property {UserRepository} userRepository - The UserRepository instance. This repository is used to perform database operations related to users.
  */
 private readonly userRepository: UserRepository;

 /**
  * @property {Logger} logger - The Logger instance. This logger is used to log messages and errors.
  */
 private readonly logger: Logger;

 /**
  * @constructor
  * @description Constructor for the UserService class. It initializes the service with an instance of UserRepository and Logger.
  * This constructor takes two parameters, a UserRepository and a Logger. It assigns these parameters to the class properties
  * to enable the service to perform user-related operations and logging.
  *
  * @param {UserRepository} userRepository - The UserRepository instance. This parameter provides the repository for user-related database operations.
  * @param {Logger} logger - The Logger instance. This parameter provides the logger for logging operations.
  */
 constructor(userRepository: UserRepository, logger: Logger) {
  /**
   * Assign the user repository instance to the class property.
   * This ensures that the user repository can be used to perform database operations related to users.
   */
  this.userRepository = userRepository;

  /**
   * Assign the logger instance to the class property.
   * This ensures that the logger can be used to log messages and errors.
   */
  this.logger = logger;
 }

 /**
  * @method getUserById
  * @description Get a user by their ID. This method retrieves a user from the database using their unique ID.
  * This function interacts with the UserRepository to fetch user data. It also logs the operation for monitoring purposes.
  *
  * @param {string} userId - The ID of the user to retrieve. This parameter provides the unique ID of the user.
  * @returns {Promise<User | null>} - A Promise that resolves to the user or null if not found. This user object contains the user's data.
  *
  * @example
  * const user = await userService.getUserById('123');
  * console.log(user);
  *
  * @throws Will throw an error if the user retrieval fails.
  */
 public async getUserById(userId: string): Promise<User | null> {
  /**
   * Log the retrieval attempt with the user ID.
   * This message helps in tracking the operation performed and identifying issues if the retrieval fails.
   */
  this.logger.info(`Retrieving user by ID: ${userId}`);

  /**
   * Retrieve the user from the repository.
   * This call interacts with the database through the UserRepository to fetch the user data.
   */
  return this.userRepository.getUserById(userId);
 }

 /**
  * @method getOrCreateUser
  * @description Unified function to authenticate user by strategy. This method retrieves or creates a user based on their profile information from a specific authentication strategy.
  * This method first attempts to find an existing user based on the provided email. If no user is found, it creates a new user with the provided profile information.
  *
  * @param {string} strategyField - The field used for the authentication strategy (e.g., 'googleId'). This parameter specifies the strategy-specific ID field.
  * @param {string} field - The strategy ID (e.g., Google ID). This parameter provides the unique ID of the user from the strategy provider.
  * @param {any} profile - User profile from the authentication strategy. This parameter provides the user's profile information from the strategy provider.
  * @returns {Promise<User>} - A Promise that resolves to the authenticated user. This user object contains the user's data.
  *
  * @example
  * const user = await userService.getOrCreateUser('googleId', '12345', profile);
  * console.log(user);
  *
  * @throws Will throw an error if the user creation or retrieval fails.
  */
 private async getOrCreateUser(strategyField: string, field: string, profile: any): Promise<User> {
  /**
   * Log the authentication attempt with the strategy field and ID.
   * This message provides context on which authentication strategy is being used and the specific ID.
   */
  this.logger.info(`Authenticating user by ${strategyField}: ${field}`);

  /**
   * Extract email and name details from the profile.
   * This step processes the profile information to retrieve necessary fields like email and display name.
   */
  const email: string = profile.email || '';
  const displayNameParts = profile.displayName?.split(' ') || [];
  const firstName = displayNameParts[0] || '';
  const lastName = displayNameParts.slice(1).join(' ') || '';

  /**
   * Attempt to find an existing user by email.
   * This checks the database for any existing user with the provided email to avoid duplicates.
   */
  const existingUser = await this.userRepository.findByEmail(email);

  /**
   * If user exists, log the existence and return the user.
   * This step ensures that existing users are not duplicated and logs the event for auditing.
   */
  if (existingUser) {
   this.logger.info(`User already exists: ${email}`);
   return existingUser;
  }

  /**
   * Create a new user object with the profile information.
   * This prepares the data for a new user based on the profile details received.
   */
  const newUser: User = {
   username: email,
   email: email,
   [strategyField]: field,
   firstName,
   lastName,
   displayName: profile.displayName || '',
  };

  /**
   * Log the creation of a new user and return the newly created user.
   * This message helps track the creation of new users and the data associated with them.
   */
  this.logger.info(`Creating new user: ${email}`);
  return this.userRepository.createUser(newUser);
 }
}
