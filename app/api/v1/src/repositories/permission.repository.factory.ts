// src/factories/permission.repository.factory.ts

import { PermissionRepository } from '../repositories/permission.repository'; // Importing the PermissionRepository to create its instances
import { LoggerServiceFactory } from '../factories/logger.service.factory'; // Importing the LoggerServiceFactory to create logger instances

/**
 * @class PermissionRepositoryFactory
 * @description Factory class for creating instances of the PermissionRepository. This factory provides a method to
 * instantiate new PermissionRepository objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 *
 * The PermissionRepositoryFactory class is responsible for centralizing the creation logic for PermissionRepository instances.
 * By using this factory, we can ensure that all instances of PermissionRepository are created in a consistent manner,
 * with the necessary dependencies injected. This promotes better maintainability and testability of the code.
 *
 * Additionally, by abstracting the instantiation process, this factory allows for easier modifications and extensions
 * of the creation logic without affecting the rest of the application.
 *
 * @see PermissionRepository
 * @see LoggerServiceFactory
 *
 * @autor Wasif Farooq
 */
export class PermissionRepositoryFactory {
 /**
  * @method createPermissionRepository
  * @description Creates and returns a new instance of the PermissionRepository. This method abstracts the instantiation
  * process, allowing for easy creation of PermissionRepository objects without needing to directly call the constructor.
  *
  * This method ensures that the PermissionRepository is created with the required Logger instance, promoting the use
  * of dependency injection and improving the testability and maintainability of the application. By using a factory
  * method, we encapsulate the creation logic, making it easier to manage and update if needed.
  *
  * @returns {PermissionRepository} - A new instance of PermissionRepository. This instance can be used to interact with
  * the permissions collection in the database, performing CRUD operations and queries.
  *
  * @example
  * const permissionRepository = PermissionRepositoryFactory.createPermissionRepository();
  * permissionRepository.findPermissionByName('admin').then(permission => {
  *   console.log('Permission found:', permission);
  * });
  */
 public static createPermissionRepository(): PermissionRepository {
  /**
   * Creating a new instance of Logger by calling the createLogger method
   * from the LoggerServiceFactory. This instance will be passed to the
   * PermissionRepository constructor to ensure logging functionality.
   */
  const logger = LoggerServiceFactory.createLogger();

  /**
   * Returning a new instance of PermissionRepository with the created
   * logger instance. This encapsulates the creation logic, ensuring that
   * the PermissionRepository is properly configured with its dependencies.
   */
  return new PermissionRepository(logger);
 }
}
