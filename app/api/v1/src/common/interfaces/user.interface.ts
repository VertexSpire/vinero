// src/interfaces/user.interface.ts
import { Document } from 'mongoose';
import { RoleSchema } from './role.interface';

/**
 * User schema definition.
 */
export interface User extends Document {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
  role?: string;
  roles?: RoleSchema['_id'][];
  createdAt?: Date;
  updatedAt?: Date;
}
