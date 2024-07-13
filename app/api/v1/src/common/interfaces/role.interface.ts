// src/interfaces/role.interface.ts

import { Document } from 'mongoose';

/**
 * @interface RoleSchema
 * @extends Document
 * @description Interface defining the schema for a Role object. This interface extends the Mongoose Document
 * interface, which includes additional properties and methods for interacting with MongoDB documents. The RoleSchema
 * interface defines the structure of role objects stored in the database, providing a standard format for managing
 * roles within the application.
 *
 * Properties:
 * - name: A string representing the name of the role. This field is required and must be unique to identify
 *   each role within the system.
 * - description: An optional string providing a brief description of the role. This field can be used to
 *   give more context or details about what the role entails.
 * - permissions: An optional array of strings representing the permissions associated with the role. Each string
 *   should correspond to a permission that the role grants.
 */
export interface RoleSchema extends Document {
  /**
   * @property {string} name - The name of the role. This field is required and must be unique to identify
   * each role within the system. It serves as the key attribute for roles, allowing them to be referenced
   * and managed consistently.
   */
  name: string;

  /**
   * @property {string} [description] - An optional description of the role. This field can be used to provide
   * additional context or details about the role, explaining what responsibilities or access it grants within the system.
   * Including a description helps with managing and understanding the various roles available in the application.
   */
  description?: string;

  /**
   * @property {string[]} [permissions] - An optional array of strings representing the permissions associated with the role.
   * Each string should correspond to a permission that the role grants. This field allows for defining what actions or access
   * the role provides, making it easier to manage permissions at a role level.
   */
  permissions?: string[];
}
