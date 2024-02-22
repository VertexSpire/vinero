// src/schemas/permission.model.ts
import mongoose, { Schema } from 'mongoose';
import { Permission } from '../common/interfaces/permission.interface';

const permissionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.model<Permission>('Permission', permissionSchema);
