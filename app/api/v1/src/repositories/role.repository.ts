// src/repositories/role.repository.ts

import { RoleModel } from '../models/role.model';
import { Role } from '../common/interfaces/role.interface';

/**
 * @class RoleRepository
 * @description Repository class for role-related database operations. This class provides methods to perform
 * CRUD operations and queries on the roles collection in the database. It serves as an abstraction layer
 * between the application and the database, encapsulating the data access logic.
 */
export class RoleRepository {
  /**
   * @method findRoleByName
   * @description Finds a role document in the database by its name. This method queries the roles collection
   * for a document with the specified name and returns it if found.
   *
   * @param {string} name - The name of the role to find. This parameter specifies the name of the role to search for.
   * @returns {Promise<Role | null>} - A promise that resolves to the found role document or null if no document is found.
   */
  public async findRoleByName(name: string): Promise<Role | null> {
    return RoleModel.findOne({ name }).exec();
  }

  /**
   * @method createRole
   * @description Creates a new role document in the database. This method takes role data, creates a new document
   * in the roles collection, and returns the created document.
   *
   * @param {Role} roleData - The data for the new role. This parameter contains the information to be stored in the new role document.
   * @returns {Promise<Role>} - A promise that resolves to the created role document.
   */
  public async createRole(roleData: Role): Promise<Role> {
    return RoleModel.create(roleData);
  }
}
