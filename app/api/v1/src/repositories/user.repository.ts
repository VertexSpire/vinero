// src/repositories/user.repository.ts

import { UserModel } from '../models/user.model';
import { User, UserStrategyField } from '../common/interfaces/user.interface';

/**
 * @class UserRepository
 * @description Repository class for user-related database operations. This class provides methods to perform
 * CRUD operations and queries on the users collection in the database. It serves as an abstraction layer
 * between the application and the database, encapsulating the data access logic.
 */
export class UserRepository {
 /**
  * @method findByStrategy
  * @description Finds a user by a specific strategy field and value. This method allows for flexible querying
  * based on different user attributes such as 'id', 'username', or 'email'.
  *
  * @param {UserStrategyField} strategyField - The field to search for (e.g., 'id', 'username', 'email'). This parameter specifies
  * the user attribute to query by.
  * @param {string} strategyId - The value of the specified field. This parameter specifies the value to search for in the specified field.
  * @returns {Promise<User | null>} - A promise that resolves to the found user document or null if no document is found.
  */
 public async findByStrategy(strategyField: UserStrategyField, strategyId: string): Promise<User | null> {
  const query: any = {};
  query[strategyField] = strategyId;
  return UserModel.findOne(query).exec();
 }

 /**
  * @method findUserByUsername
  * @description Finds a user by their username. This method queries the users collection for a document with the specified username
  * and returns it if found.
  *
  * @param {string} username - The username to search for. This parameter specifies the username to search for.
  * @returns {Promise<User | null>} - A promise that resolves to the found user document or null if no document is found.
  */
 public async findUserByUsername(username: string): Promise<User | null> {
  return UserModel.findOne({ username }).exec();
 }

 /**
  * @method createUser
  * @description Creates a new user in the database. This method takes user data, creates a new document in the users collection,
  * and returns the created document.
  *
  * @param {User} user - The user data to create. This parameter contains the information to be stored in the new user document.
  * @returns {Promise<User>} - A promise that resolves to the created user document.
  */
 public async createUser(user: User): Promise<User> {
  return UserModel.create(user);
 }

 /**
  * @method findByEmail
  * @description Finds a user by their email. This method queries the users collection for a document with the specified email
  * and returns it if found.
  *
  * @param {string} email - The email to search for. This parameter specifies the email to search for.
  * @returns {Promise<User | null>} - A promise that resolves to the found user document or null if no document is found.
  */
 public async findByEmail(email: string): Promise<User | null> {
  return UserModel.findOne({ email }).exec();
 }
}
