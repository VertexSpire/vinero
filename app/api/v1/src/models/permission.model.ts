// src/schemas/permission.model.ts

import mongoose, { Schema } from 'mongoose';
import { Permission } from '../common/interfaces/permission.interface';

/**
 * @constant permissionSchema
 * @description Mongoose schema for the Permission model. This schema defines the structure of the permission documents
 * stored in the MongoDB database. It includes fields for the name and description of the permission, with validation
 * and uniqueness constraints applied.
 *
 * Fields:
 * - name: A string representing the name of the permission. This field is required and must be unique to prevent duplicate
 *   permission names.
 * - description: An optional string providing a brief description of the permission.
 */
const permissionSchema: Schema = new Schema({
  /**
   * @property {string} name - The name of the permission. This field is required and must be unique to ensure that each
   * permission has a distinct name. The 'required' constraint ensures that a value must be provided for this field, and
   * the 'unique' constraint enforces the uniqueness of the value in the collection.
   */
  name: { type: String, required: true, unique: true },

  /**
   * @property {string} [description] - An optional description of the permission. This field can be used to provide additional
   * context or details about the permission, explaining what actions or access it grants within the system.
   */
  description: { type: String },
});

/**
 * @function model
 * @description Creates and exports the Mongoose model for the Permission schema. This model provides an interface for
 * interacting with the Permission documents in the MongoDB database, allowing for CRUD operations and queries.
 *
 * The model is created by passing the schema and the model name ('Permission') to the mongoose.model method.
 *
 * @returns {mongoose.Model<Permission>} - The Mongoose model for the Permission schema.
 */
export default mongoose.model<Permission>('Permission', permissionSchema);
