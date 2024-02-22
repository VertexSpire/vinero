// src/schemas/role.model.ts
import mongoose, { Schema } from 'mongoose';
import { Role } from '../common/interfaces/role.interface';

const roleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: [{ type: String }],
});

export default mongoose.model<Role>('Role', roleSchema);
