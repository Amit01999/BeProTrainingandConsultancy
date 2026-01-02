import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  role: 'admin' | 'student';
  fullName: string;
  email?: string | null;
  phone?: string | null;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const UserModel = model<IUser>('User', userSchema);
