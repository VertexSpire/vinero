// src/interfaces/role.interface.ts
import { Document } from 'mongoose';

/**
 * Role schema definition.
 */
export interface RoleSchema extends Document {
  name: string;
  description?: string;
  permissions?: string[];
}
