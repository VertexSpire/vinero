// src/factories/role.repository.factory.ts

import { RoleRepository } from '../repositories/role.repository';

/**
 * @class RoleRepositoryFactory
 * @description Factory class for creating instances of the RoleRepository. This factory provides a method to
 * instantiate new RoleRepository objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class RoleRepositoryFactory {
 /**
  * @method createRoleRepository
  * @description Creates and returns a new instance of the RoleRepository. This method abstracts the instantiation
  * process, allowing for easy creation of RoleRepository objects without needing to directly call the constructor.
  *
  * @returns {RoleRepository} - A new instance of RoleRepository. This instance can be used to interact with
  * the roles collection in the database, performing CRUD operations and queries.
  */
 public static createRoleRepository(): RoleRepository {
  return new RoleRepository();
 }
}
