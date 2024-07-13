// src/schemas/user.model.ts

import mongoose, { Schema } from 'mongoose';
import { RoleSchema } from './role.model';
import { User } from '../common/interfaces/user.interface';

/**
 * @constant userSchema
 * @description Mongoose schema for the User model. This schema defines the structure of the user documents
 * stored in the MongoDB database. It includes fields for the user's username, password, email, personal information,
 * and roles, with validation and default values applied.
 *
 * Fields:
 * - username: A string representing the username of the user. This field is required.
 * - password: A string representing the user's password. This field is required.
 * - email: An optional string representing the user's email address.
 * - firstName: An optional string representing the user's first name.
 * - lastName: An optional string representing the user's last name.
 * - dateOfBirth: An optional Date object representing the user's date of birth.
 * - phoneNumber: An optional string representing the user's phone number.
 * - address: An optional string representing the user's address.
 * - profileImage: An optional string representing the URL of the user's profile image.
 * - role: A string representing the user's primary role. Defaults to 'user'.
 * - roles: An array of RoleSchema ObjectIds representing the user's roles.
 * - createdAt: A Date object representing the creation date of the user document. Defaults to the current date.
 * - updatedAt: A Date object representing the last update date of the user document. Defaults to the current date.
 */
const userSchema: Schema = new Schema({
  /**
   * @property {string} username - The username of the user. This field is required to identify each user uniquely.
   */
  username: { type: String, required: true },

  /**
   * @property {string} password - The user's password. This field is required to authenticate the user.
   */
  password: { type: String, required: true },

  /**
   * @property {string} [email] - An optional string representing the user's email address. This field is used for
   * communication and authentication purposes.
   */
  email: { type: String },

  /**
   * @property {string} [firstName] - An optional string representing the user's first name. This field is used to store
   * the user's given name.
   */
  firstName: { type: String },

  /**
   * @property {string} [lastName] - An optional string representing the user's last name. This field is used to store
   * the user's family name.
   */
  lastName: { type: String },

  /**
   * @property {Date} [dateOfBirth] - An optional Date object representing the user's date of birth. This field is used
   * to store the user's birth date.
   */
  dateOfBirth: { type: Date },

  /**
   * @property {string} [phoneNumber] - An optional string representing the user's phone number. This field is used for
   * contact purposes.
   */
  phoneNumber: { type: String },

  /**
   * @property {string} [address] - An optional string representing the user's address. This field is used to store the
   * user's residential address.
   */
  address: { type: String },

  /**
   * @property {string} [profileImage] - An optional string representing the URL of the user's profile image. This field
   * is used to store a link to the user's profile picture.
   */
  profileImage: { type: String },

  /**
   * @property {string} [role='user'] - A string representing the user's primary role. Defaults to 'user'.
   */
  role: { type: String, default: 'user' },

  /**
   * @property {RoleSchema['_id'][]} [roles] - An array of RoleSchema ObjectIds representing the user's roles. This field
   * allows for defining multiple roles associated with the user.
   */
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

  /**
   * @property {Date} [createdAt=Date.now] - A Date object representing the creation date of the user document. Defaults to
   * the current date.
   */
  createdAt: { type: Date, default: Date.now },

  /**
   * @property {Date} [updatedAt=Date.now] - A Date object representing the last update date of the user document. Defaults to
   * the current date.
   */
  updatedAt: { type: Date, default: Date.now },
});

/**
 * @function model
 * @description Creates and exports the Mongoose model for the User schema. This model provides an interface for
 * interacting with the User documents in the MongoDB database, allowing for CRUD operations and queries.
 *
 * The model is created by passing the schema and the model name ('User') to the mongoose.model method.
 *
 * @returns {mongoose.Model<User>} - The Mongoose model for the User schema.
 */
export default mongoose.model<User>('User', userSchema);
