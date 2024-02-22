// src/schemas/user.model.ts
import mongoose, { Schema } from 'mongoose';
import { RoleSchema } from './role.model';
import { User } from '../common/interfaces/user.interface';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String },
  address: { type: String },
  profileImage: { type: String },
  role: { type: String, default: 'user' },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<User>('User', userSchema);
