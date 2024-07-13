// src/factories/permission.repository.factory.ts

import { PermissionRepository } from '../repositories/permission.repository';

/**
 * @class PermissionRepositoryFactory
 * @description Factory class for creating instances of the PermissionRepository. This factory provides a method to
 * instantiate new PermissionRepository objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class PermissionRepositoryFactory {
  /**
   * @method createPermissionRepository
   * @description Creates and returns a new instance of the PermissionRepository. This method abstracts the instantiation
   * process, allowing for easy creation of PermissionRepository objects without needing to directly call the constructor.
   *
   * @returns {PermissionRepository} - A new instance of PermissionRepository. This instance can be used to interact with
   * the permissions collection in the database, performing CRUD operations and queries.
   */
  public static createPermissionRepository(): PermissionRepository {
    return new PermissionRepository();
  }
}
