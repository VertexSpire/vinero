import { RoleRepository } from '../repositories/role.repository';
import { LoggerServiceFactory } from './logger.service.factory';

/**
 * @class RoleRepositoryFactory
 * @description Factory class for creating instances of the RoleRepository. This factory provides a method to
 * instantiate new RoleRepository objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 * @remarks This factory class ensures that each RoleRepository is created with a properly configured logger service,
 * promoting consistency and reducing boilerplate code. The factory pattern also makes it easier to manage dependencies
 * and configurations in a centralized manner.
 * @version 1.0.0
 * @since 2024-07-16
 * @see {@link RoleRepository}
 * @see {@link LoggerServiceFactory}
 * author Wasif Farooq
 */
export class RoleRepositoryFactory {
 /**
  * @method createRoleRepository
  * @description Creates and returns a new instance of the RoleRepository. This method abstracts the instantiation
  * process, allowing for easy creation of RoleRepository objects without needing to directly call the constructor.
  * @returns {RoleRepository} - A new instance of RoleRepository. This instance can be used to interact with
  * the roles collection in the database, performing CRUD operations and queries.
  * @example
  * const roleRepository = RoleRepositoryFactory.createRoleRepository();
  * @throws {Error} Throws an error if the LoggerServiceFactory fails to create a logger service.
  */
 public static createRoleRepository(): RoleRepository {
  /**
   * Obtain an instance of LoggerService using the LoggerServiceFactory.
   * This ensures that the RoleRepository will have a properly configured logger.
   * The logger service is a critical dependency for the RoleRepository, providing necessary logging capabilities.
   */
  const loggerService = LoggerServiceFactory.createLoggerService();

  /**
   * Creates and returns a new instance of RoleRepository.
   * The loggerService instance is passed to the RoleRepository constructor.
   * This encapsulates the creation logic, promoting consistency and maintainability across the application.
   */
  return new RoleRepository(loggerService);
 }
}
