import { RoleModel } from '../models/role.model';
import { Role } from '../common/interfaces/role.interface';
import { LoggerService } from '../services/logger.service';

/**
 * @class RoleRepository
 * @description Repository class for role-related database operations. This class provides methods to perform
 * CRUD operations and queries on the roles collection in the database. It serves as an abstraction layer
 * between the application and the database, encapsulating the data access logic.
 * @property {LoggerService} logger - The logger service instance used for logging operations within the repository.
 * @remarks This class interacts directly with the RoleModel to fetch, create, update, and delete role documents.
 * The logger service is utilized to provide logging capabilities for monitoring the operations performed by this repository.
 * @version 1.0.0
 * @since 2024-07-16
 * @see {@link RoleModel}
 * @see {@link Role}
 * @see {@link LoggerService}
 * @author Wasif Farooq
 */
export class RoleRepository {
 /**
  * @property {LoggerService} logger - Instance of LoggerService for logging.
  * @private
  */
 private logger: LoggerService;

 /**
  * @constructor
  * @param {LoggerService} logger - The logger service instance used for logging operations within the repository.
  * @description Initializes the RoleRepository with a LoggerService instance. The LoggerService is used to log
  * various operations within the repository for monitoring and debugging purposes.
  */
 constructor(logger: LoggerService) {
  /**
   * @private
   * Initializes the logger property with the provided LoggerService instance.
   */
  this.logger = logger;
 }

 /**
  * @method findRoleByName
  * @description Finds a role document in the database by its name. This method queries the roles collection
  * for a document with the specified name and returns it if found.
  * @param {string} name - The name of the role to find. This parameter specifies the name of the role to search for.
  * @returns {Promise<Role | null>} - A promise that resolves to the found role document or null if no document is found.
  * @example
  * const role = await roleRepository.findRoleByName('Admin');
  * @throws {Error} Throws an error if the database query fails.
  */
 public async findRoleByName(name: string): Promise<Role | null> {
  /**
   * Logs the name of the role being searched.
   * This provides context for the search operation in the logs.
   */
  this.logger.log(`Finding role by name: ${name}`);

  /**
   * Queries the roles collection for a document with the specified name.
   * If found, it resolves to the role document; otherwise, it resolves to null.
   * Utilizes the RoleModel to interact with the database.
   */
  const role = await RoleModel.findOne({ name }).exec();

  /**
   * Logs the found role document.
   * This provides visibility into the result of the search operation.
   */
  this.logger.log(`Role found: ${role}`);

  return role;
 }

 /**
  * @method createRole
  * @description Creates a new role document in the database. This method takes role data, creates a new document
  * in the roles collection, and returns the created document.
  * @param {Role} roleData - The data for the new role. This parameter contains the information to be stored in the new role document.
  * @returns {Promise<Role>} - A promise that resolves to the created role document.
  * @example
  * const newRole = await roleRepository.createRole({ name: 'User', permissions: ['read'] });
  * @throws {Error} Throws an error if the role creation fails.
  */
 public async createRole(roleData: Role): Promise<Role> {
  /**
   * Logs the role data being created.
   * This provides visibility into the details of the role being added to the database.
   */
  this.logger.log(`Creating role: ${JSON.stringify(roleData)}`);

  /**
   * Creates a new role document in the roles collection using the provided role data.
   * Utilizes the RoleModel to interact with the database and create the document.
   * Resolves to the created role document.
   */
  const createdRole = await RoleModel.create(roleData);

  /**
   * Logs the created role document.
   * This provides visibility into the result of the role creation operation.
   */
  this.logger.log(`Role created: ${createdRole}`);

  return createdRole;
 }
}
