// src/repositories/permission.repository.ts

import { PermissionModel } from '../models/permission.model';
import { Permission } from '../common/interfaces/permission.interface';

/**
 * @class PermissionRepository
 * @description Repository class for permission-related database operations. This class provides methods to perform
 * CRUD operations and queries on the permissions collection in the database. It serves as an abstraction layer
 * between the application and the database, encapsulating the data access logic.
 */
export class PermissionRepository {
  /**
   * @method findPermissionByName
   * @description Finds a permission document in the database by its name. This method queries the permissions collection
   * for a document with the specified name and returns it if found.
   *
   * @param {string} name - The name of the permission to find. This parameter specifies the name of the permission to search for.
   * @returns {Promise<Permission | null>} - A promise that resolves to the found permission document or null if no document is found.
   */
  public async findPermissionByName(name: string): Promise<Permission | null> {
    return PermissionModel.findOne({ name }).exec();
  }

  /**
   * @method createPermission
   * @description Creates a new permission document in the database. This method takes permission data, creates a new document
   * in the permissions collection, and returns the created document.
   *
   * @param {Permission} permissionData - The data for the new permission. This parameter contains the information to be stored in the new permission document.
   * @returns {Promise<Permission>} - A promise that resolves to the created permission document.
   */
  public async createPermission(permissionData: Permission): Promise<Permission> {
    return PermissionModel.create(permissionData);
  }
}
