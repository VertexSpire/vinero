// src/interfaces/Permission.ts

import { Document } from 'mongoose';

/**
 * @interface Permission
 * @extends Document
 * @description Interface defining the schema for a Permission object. This interface extends the Mongoose Document
 * interface, which includes additional properties and methods for interacting with MongoDB documents. The Permission
 * interface defines the structure of permission objects stored in the database, providing a standard format for
 * managing permissions within the application.
 *
 * Properties:
 * - name: A string representing the name of the permission. This field is required and must be unique to identify
 *   each permission within the system.
 * - description: An optional string providing a brief description of the permission. This field can be used to
 *   give more context or details about what the permission entails.
 */
export interface Permission extends Document {
  /**
   * @property {string} name - The name of the permission. This field is required and must be unique to identify
   * each permission within the system. It serves as the key attribute for permissions, allowing them to be referenced
   * and managed consistently.
   */
  name: string;

  /**
   * @property {string} [description] - An optional description of the permission. This field can be used to provide
   * additional context or details about the permission, explaining what actions or access it grants within the system.
   * Including a description helps with managing and understanding the various permissions available in the application.
   */
  description?: string;
}
