import { UserModel } from '../models/user.model';
import { User, UserStrategyField } from '../common/interfaces/user.interface';
import { LoggerService } from '../services/logger.service';

/**
 * @class UserRepository
 * @description Repository class for user-related database operations. This class provides methods to interact with the user data stored in the database. It encapsulates all the necessary operations such as finding a user by different fields, creating a user, and logging these operations for monitoring and debugging purposes.
 *
 * @property {LoggerService} logger - The logger service instance used for logging operations within the repository.
 *
 * @method findByStrategy
 * @description Finds a user by a specific strategy field and value. This is useful for scenarios where users need to be identified based on various criteria such as email, username, or any custom field defined in the application.
 * @param {UserStrategyField} strategyField - The field used as the strategy to find the user (e.g., email, username).
 * @param {string} strategyId - The value of the strategy field to search for.
 * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
 *
 * @method findUserByUsername
 * @description Finds a user by their username. This is particularly useful for authentication and user lookup operations where the username is a unique identifier for the user.
 * @param {string} username - The username to search for.
 * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
 *
 * @method createUser
 * @description Creates a new user in the database. This method is essential for user registration processes where new users need to be added to the system.
 * @param {User} user - The user object containing user details to be saved in the database.
 * @returns {Promise<User>} - A promise that resolves to the created user object.
 *
 * @method findByEmail
 * @description Finds a user by their email. This method is useful for scenarios where users need to be identified or authenticated using their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
 *
 * @see UserModel
 * @see User
 * @see UserStrategyField
 * @see LoggerService
 *
 * @version 1.0.0
 * @since 2023-07-16
 *
 * @example
 * const userRepository = new UserRepository(new LoggerService());
 * const user = await userRepository.findByEmail('example@example.com');
 *
 * @author Wasif Farooq
 */
export class UserRepository {
 /**
  * @private
  * @property {LoggerService} logger - Instance of the logger service to log operations.
  */
 private logger: LoggerService;

 /**
  * @constructor
  * @param {LoggerService} logger - The logger service instance used for logging operations within the repository.
  */
 constructor(logger: LoggerService) {
  /**
   * Assign the passed logger instance to the private logger property.
   * This allows the repository to log messages using the provided logger service.
   */
  this.logger = logger;
 }

 /**
  * @method findByStrategy
  * @description Finds a user by a specific strategy field and value. This method logs the search operation and constructs a query object dynamically based on the provided strategy field and value. It then performs a database search using this query and logs the found user before returning it.
  * @param {UserStrategyField} strategyField - The field used as the strategy to find the user (e.g., email, username).
  * @param {string} strategyId - The value of the strategy field to search for.
  * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
  */
 public async findByStrategy(strategyField: UserStrategyField, strategyId: string): Promise<User | null> {
  /**
   * Log the strategy field and value being searched.
   * This provides context for the search operation in the logs.
   */
  this.logger.log(`Finding user by ${strategyField} with value ${strategyId}`);

  /**
   * Initialize an empty query object.
   * This will be used to construct the search criteria dynamically.
   */
  const query: any = {};

  /**
   * Dynamically set the field in the query object to the provided strategy field and value.
   * This allows flexible searching based on different user attributes.
   */
  query[strategyField] = strategyId;

  /**
   * Perform the database search using the constructed query object.
   * This searches the database for a user matching the specified criteria.
   */
  const user = await UserModel.findOne(query).exec();

  /**
   * Log the found user object.
   * This provides visibility into the result of the search operation.
   */
  this.logger.log(`User found: ${user}`);

  /**
   * Return the found user object or null.
   * This allows the calling code to handle the result of the search operation.
   */
  return user;
 }

 /**
  * @method findUserByUsername
  * @description Finds a user by their username. This method logs the search operation and constructs a query object based on the provided username. It then performs a database search using this query and logs the found user before returning it.
  * @param {string} username - The username to search for.
  * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
  */
 public async findUserByUsername(username: string): Promise<User | null> {
  /**
   * Log the username being searched.
   * This provides context for the search operation in the logs.
   */
  this.logger.log(`Finding user by username: ${username}`);

  /**
   * Perform the database search using the provided username as the query.
   * This searches the database for a user with the specified username.
   */
  const user = await UserModel.findOne({ username }).exec();

  /**
   * Log the found user object.
   * This provides visibility into the result of the search operation.
   */
  this.logger.log(`User found: ${user}`);

  /**
   * Return the found user object or null.
   * This allows the calling code to handle the result of the search operation.
   */
  return user;
 }

 /**
  * @method createUser
  * @description Creates a new user in the database. This method logs the user creation operation, saves the user object in the database, and logs the created user before returning it.
  * @param {User} user - The user object containing user details to be saved in the database.
  * @returns {Promise<User>} - A promise that resolves to the created user object.
  */
 public async createUser(user: User): Promise<User> {
  /**
   * Log the user object being created.
   * This provides visibility into the details of the user being added to the database.
   */
  this.logger.log(`Creating user: ${JSON.stringify(user)}`);

  /**
   * Save the user object in the database.
   * This adds the new user to the database.
   */
  const createdUser = await UserModel.create(user);

  /**
   * Log the created user object.
   * This provides visibility into the result of the user creation operation.
   */
  this.logger.log(`User created: ${createdUser}`);

  /**
   * Return the created user object.
   * This allows the calling code to handle the result of the user creation operation.
   */
  return createdUser;
 }

 /**
  * @method findByEmail
  * @description Finds a user by their email. This method logs the search operation and constructs a query object based on the provided email. It then performs a database search using this query and logs the found user before returning it.
  * @param {string} email - The email address to search for.
  * @returns {Promise<User | null>} - A promise that resolves to the found user object or null if no user is found.
  */
 public async findByEmail(email: string): Promise<User | null> {
  /**
   * Log the email address being searched.
   * This provides context for the search operation in the logs.
   */
  this.logger.log(`Finding user by email: ${email}`);

  /**
   * Perform the database search using the provided email as the query.
   * This searches the database for a user with the specified email address.
   */
  const user = await UserModel.findOne({ email }).exec();

  /**
   * Log the found user object.
   * This provides visibility into the result of the search operation.
   */
  this.logger.log(`User found: ${user}`);

  /**
   * Return the found user object or null.
   * This allows the calling code to handle the result of the search operation.
   */
  return user;
 }
}
