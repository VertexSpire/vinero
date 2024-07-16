import { UserRepository } from '../repositories/user.repository';
import { LoggerServiceFactory } from './logger.service.factory';

/**
 * @class UserRepositoryFactory
 * @description Factory class for creating instances of the UserRepository. This class encapsulates the logic for instantiating UserRepository objects, ensuring that all necessary dependencies, such as the LoggerService, are properly provided.
 *
 * @method createUserRepository
 * @description Creates and returns a new instance of the UserRepository. This method uses the LoggerServiceFactory to obtain an instance of LoggerService, which is then passed to the UserRepository constructor.
 * @returns {UserRepository} - A new instance of UserRepository.
 *
 * @see UserRepository
 * @see LoggerServiceFactory
 *
 * @version 1.0.0
 * @since 2023-07-16
 *
 * @example
 * const userRepository = UserRepositoryFactory.createUserRepository();
 *
 * @author Wasif Farooq
 */
export class UserRepositoryFactory {
 /**
  * @method createUserRepository
  * @description Creates and returns a new instance of the UserRepository. This method uses the LoggerServiceFactory to obtain an instance of LoggerService, which is then passed to the UserRepository constructor.
  *
  * @returns {UserRepository} - A new instance of UserRepository.
  */
 public static createUserRepository(): UserRepository {
  /**
   * Obtain an instance of LoggerService using the LoggerServiceFactory.
   * This ensures that the UserRepository will have a properly configured logger.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Create and return a new instance of UserRepository.
   * The loggerService instance is passed to the UserRepository constructor.
   */
  return new UserRepository(loggerService);
 }
}
