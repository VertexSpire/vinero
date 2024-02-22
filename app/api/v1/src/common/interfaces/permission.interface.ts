// src/interfaces/Permission.ts
import { Document } from 'mongoose';

/**
 * Permission schema definition.
 */
export interface Permission extends Document {
  name: string;
  description?: string;
}
