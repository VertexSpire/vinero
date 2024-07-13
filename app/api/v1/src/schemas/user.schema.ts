// src/schemas/UserSchema.ts

import mongoose, { Schema, Document } from 'mongoose';

/**
 * @interface UserSchema
 * @extends Document
 * @description Interface representing the structure of the user documents stored in the MongoDB database.
 * It extends the Mongoose Document interface, providing additional properties and methods for interacting
 * with MongoDB documents.
 */
export interface UserSchema extends Document {
 username: string;
 password: string;
}

/**
 * @constant userSchema
 * @description Mongoose schema for the User model. This schema defines the structure of the user documents
 * stored in the MongoDB database. It includes fields for the user's username and password, with validation
 * constraints applied.
 *
 * Fields:
 * - username: A string representing the username of the user. This field is required.
 * - password: A string representing the user's password. This field is required.
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
});

/**
 * @function model
 * @description Creates and exports the Mongoose model for the User schema. This model provides an interface for
 * interacting with the User documents in the MongoDB database, allowing for CRUD operations and queries.
 *
 * The model is created by passing the schema and the model name ('User') to the mongoose.model method.
 *
 * @returns {mongoose.Model<UserSchema>} - The Mongoose model for the User schema.
 */
export default mongoose.model<UserSchema>('User', userSchema);
