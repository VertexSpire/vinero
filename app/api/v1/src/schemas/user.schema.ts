// src/schemas/UserSchema.ts
import mongoose, { Schema, Document } from 'mongoose';


const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserSchema>('User', userSchema);

