// src/services/user/user.service.factory.ts

import { UserService } from './user.service';
import { UserRepositoryFactory } from '../../repositories/user/user.repository.factory';

/**
 * @class UserServiceFactory
 * @description Factory for creating UserService instances. This factory provides a method to create instances of UserService,
 * which is responsible for managing user-related operations.
 */
export class UserServiceFactory {
 /**
  * @method createUserService
  * @description Create a new instance of UserService. This method uses the UserRepositoryFactory to create a user repository instance.
  * It then creates a new UserService with the user repository.
  *
  * @returns {UserService} - An instance of UserService. This instance is used to manage user-related operations.
  */
 public static createUserService(): UserService {
  /**
   * Create an instance of the user repository using the UserRepositoryFactory.
   * The user repository is used to perform database operations related to users.
   */
  const userRepository = UserRepositoryFactory.createUserRepository();

  /**
   * Create and return a new instance of UserService.
   * The UserService is initialized with the user repository instance.
   */
  return new UserService(userRepository);
 }
}
