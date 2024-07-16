// src/repositories/permission.repository.ts

import { PermissionModel } from '../models/permission.model'; // Importing the PermissionModel for interacting with the permissions collection in the database
import { Permission } from '../common/interfaces/permission.interface'; // Importing the Permission interface for type checking
import { Logger } from '../services/logger.service'; // Importing the Logger service for logging operations

/**
 * @class PermissionRepository
 * @description Repository class for permission-related database operations. This class provides methods to perform
 * CRUD operations and queries on the permissions collection in the database. It serves as an abstraction layer
 * between the application and the database, encapsulating the data access logic.
 *
 * The PermissionRepository class is responsible for handling data access and manipulation tasks related to permissions.
 * By centralizing the data access logic, this class ensures that the rest of the application interacts with the database
 * in a consistent and reliable manner. It also simplifies testing and maintenance by decoupling the data access layer from
 * the business logic.
 *
 * This class uses a logger to record significant events and operations, which aids in debugging and monitoring the application's behavior.
 * The logger is injected into the class through the constructor, following the dependency injection principle.
 *
 * @property {Logger} logger - The logger instance used for logging operations. This property holds the logger that is used to log important events
 * and operations in the repository.
 *
 * @see PermissionModel
 * @see Permission
 * @see Logger
 *
 * @autor Wasif Farooq
 */
export class PermissionRepository {
 /**
  * @private
  * @property {Logger} logger - The logger instance used for logging operations. This property holds the logger that is used to log important events
  * and operations in the repository.
  */
 private logger: Logger;

 /**
  * @constructor
  * @description Constructs a new instance of the PermissionRepository class. Initializes the logger property with the provided logger instance.
  *
  * @param {Logger} logger - The logger instance to be used for logging operations. This parameter is required to initialize the logger property
  * which will be used throughout the class for logging various operations.
  */
 constructor(logger: Logger) {
  /**
   * Initializing the logger property with the provided logger instance.
   * This enables the PermissionRepository class to log various operations,
   * such as finding and creating permissions, which is crucial for
   * debugging and monitoring purposes.
   */
  this.logger = logger;
 }

 /**
  * @method findPermissionByName
  * @description Finds a permission document in the database by its name. This method queries the permissions collection
  * for a document with the specified name and returns it if found.
  *
  * This method is useful for retrieving specific permission details based on the permission name, which can be used for authorization
  * and access control checks within the application. It logs the search operation to provide insight into the actions being performed.
  *
  * @param {string} name - The name of the permission to find. This parameter specifies the name of the permission to search for.
  * @returns {Promise<Permission | null>} - A promise that resolves to the found permission document or null if no document is found.
  *
  * @example
  * const permission = await permissionRepository.findPermissionByName('admin');
  * if (permission) {
  *   // Permission found, proceed with authorization
  * } else {
  *   // Permission not found, handle accordingly
  * }
  */
 public async findPermissionByName(name: string): Promise<Permission | null> {
  /**
   * Logging the operation of finding a permission by its name.
   * This log entry provides visibility into the function's operation,
   * helping to trace and debug the flow of data within the application.
   */
  this.logger.info(`Finding permission by name: ${name}`);

  /**
   * Querying the database for a permission document with the specified name
   * and returning the result. If a document with the given name exists, it
   * will be returned; otherwise, null will be returned.
   */
  return PermissionModel.findOne({ name }).exec();
 }

 /**
  * @method createPermission
  * @description Creates a new permission document in the database. This method takes permission data, creates a new document
  * in the permissions collection, and returns the created document.
  *
  * This method is essential for adding new permissions to the system. It ensures that new permissions are stored in the database
  * and logs the creation process for auditing purposes. The provided permission data should adhere to the Permission interface.
  *
  * @param {Permission} permissionData - The data for the new permission. This parameter contains the information to be stored in the new permission document.
  * @returns {Promise<Permission>} - A promise that resolves to the created permission document.
  *
  * @example
  * const newPermission = await permissionRepository.createPermission({ name: 'editor', description: 'Can edit content' });
  * console.log('Created permission:', newPermission);
  */
 public async createPermission(permissionData: Permission): Promise<Permission> {
  /**
   * Logging the operation of creating a new permission with the provided data.
   * This log entry captures the details of the permission being created,
   * which is useful for tracking and auditing purposes.
   */
  this.logger.info(`Creating new permission: ${JSON.stringify(permissionData)}`);

  /**
   * Creating a new permission document in the database with the provided data
   * and returning the created document. This operation inserts the new permission
   * into the permissions collection and resolves the promise with the new document.
   */
  return PermissionModel.create(permissionData);
 }
}
