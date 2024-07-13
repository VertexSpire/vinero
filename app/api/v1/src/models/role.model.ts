// src/schemas/role.model.ts

import mongoose, { Schema } from 'mongoose';
import { Role } from '../common/interfaces/role.interface';

/**
 * @constant roleSchema
 * @description Mongoose schema for the Role model. This schema defines the structure of the role documents
 * stored in the MongoDB database. It includes fields for the name, description, and permissions of the role,
 * with validation and uniqueness constraints applied.
 *
 * Fields:
 * - name: A string representing the name of the role. This field is required and must be unique to prevent duplicate
 *   role names.
 * - description: An optional string providing a brief description of the role.
 * - permissions: An array of strings representing the permissions associated with the role.
 */
const roleSchema: Schema = new Schema({
 /**
  * @property {string} name - The name of the role. This field is required and must be unique to ensure that each
  * role has a distinct name. The 'required' constraint ensures that a value must be provided for this field, and
  * the 'unique' constraint enforces the uniqueness of the value in the collection.
  */
 name: { type: String, required: true, unique: true },

 /**
  * @property {string} [description] - An optional description of the role. This field can be used to provide additional
  * context or details about the role, explaining what responsibilities or access it grants within the system.
  */
 description: { type: String },

 /**
  * @property {string[]} [permissions] - An array of strings representing the permissions associated with the role.
  * Each string should correspond to a permission that the role grants. This field allows for defining what actions or access
  * the role provides, making it easier to manage permissions at a role level.
  */
 permissions: [{ type: String }],
});

/**
 * @function model
 * @description Creates and exports the Mongoose model for the Role schema. This model provides an interface for
 * interacting with the Role documents in the MongoDB database, allowing for CRUD operations and queries.
 *
 * The model is created by passing the schema and the model name ('Role') to the mongoose.model method.
 *
 * @returns {mongoose.Model<Role>} - The Mongoose model for the Role schema.
 */
export default mongoose.model<Role>('Role', roleSchema);
