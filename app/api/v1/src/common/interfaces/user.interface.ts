// src/interfaces/user.interface.ts

import { Document } from 'mongoose';
import { RoleSchema } from './role.interface';

/**
 * @interface User
 * @extends Document
 * @description Interface defining the schema for a User object. This interface extends the Mongoose Document
 * interface, which includes additional properties and methods for interacting with MongoDB documents. The User
 * interface defines the structure of user objects stored in the database, providing a standard format for
 * managing users within the application.
 *
 * Properties:
 * - username: A string representing the username of the user. This field is required and must be unique to identify
 *   each user within the system.
 * - password: A string representing the user's password. This field is required and should be stored securely.
 * - email: An optional string representing the user's email address. This field is used for communication and
 *   authentication purposes.
 * - firstName: An optional string representing the user's first name. This field is used to store the user's
 *   given name.
 * - lastName: An optional string representing the user's last name. This field is used to store the user's
 *   family name.
 * - dateOfBirth: An optional Date object representing the user's date of birth. This field is used to store
 *   the user's birth date.
 * - phoneNumber: An optional string representing the user's phone number. This field is used for contact purposes.
 * - address: An optional string representing the user's address. This field is used to store the user's residential
 *   address.
 * - profileImage: An optional string representing the URL of the user's profile image. This field is used to store
 *   a link to the user's profile picture.
 * - role: An optional string representing the user's primary role. This field is used to specify the user's main role
 *   within the system.
 * - roles: An optional array of RoleSchema IDs representing the user's roles. This field is used to specify multiple
 *   roles associated with the user.
 * - createdAt: An optional Date object representing the creation date of the user document. This field is automatically
 *   managed by Mongoose.
 * - updatedAt: An optional Date object representing the last update date of the user document. This field is automatically
 *   managed by Mongoose.
 */
export interface User extends Document {
  /**
   * @property {string} username - The username of the user. This field is required and must be unique to identify
   * each user within the system. It serves as the key attribute for users, allowing them to be referenced and managed
   * consistently.
   */
  username: string;

  /**
   * @property {string} password - The user's password. This field is required and should be stored securely.
   * It is used for authenticating the user within the system.
   */
  password: string;

  /**
   * @property {string} [email] - An optional string representing the user's email address. This field is used for
   * communication and authentication purposes, allowing the system to send notifications and verify the user's identity.
   */
  email?: string;

  /**
   * @property {string} [firstName] - An optional string representing the user's first name. This field is used to store
   * the user's given name, providing a way to address the user personally.
   */
  firstName?: string;

  /**
   * @property {string} [lastName] - An optional string representing the user's last name. This field is used to store
   * the user's family name, providing a way to address the user formally.
   */
  lastName?: string;

  /**
   * @property {Date} [dateOfBirth] - An optional Date object representing the user's date of birth. This field is used
   * to store the user's birth date, allowing the system to verify age and provide age-related services.
   */
  dateOfBirth?: Date;

  /**
   * @property {string} [phoneNumber] - An optional string representing the user's phone number. This field is used for
   * contact purposes, allowing the system or other users to reach out to the user via phone.
   */
  phoneNumber?: string;

  /**
   * @property {string} [address] - An optional string representing the user's address. This field is used to store the
   * user's residential address, providing a way to send physical mail or verify residency.
   */
  address?: string;

  /**
   * @property {string} [profileImage] - An optional string representing the URL of the user's profile image. This field
   * is used to store a link to the user's profile picture, allowing the user to have a visual representation within the system.
   */
  profileImage?: string;

  /**
   * @property {string} [role] - An optional string representing the user's primary role. This field is used to specify
   * the user's main role within the system, helping to define their permissions and responsibilities.
   */
  role?: string;

  /**
   * @property {RoleSchema['_id'][]} [roles] - An optional array of RoleSchema IDs representing the user's roles. This field
   * is used to specify multiple roles associated with the user, providing flexibility in defining user permissions.
   */
  roles?: RoleSchema['_id'][];

  /**
   * @property {Date} [createdAt] - An optional Date object representing the creation date of the user document. This field
   * is automatically managed by Mongoose and indicates when the user was first added to the system.
   */
  createdAt?: Date;

  /**
   * @property {Date} [updatedAt] - An optional Date object representing the last update date of the user document. This field
   * is automatically managed by Mongoose and indicates the most recent time the user's information was modified.
   */
  updatedAt?: Date;
}
