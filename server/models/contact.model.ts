import { Schema, model } from 'mongoose';

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt?: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const ContactModel = model<IContact>('Contact', contactSchema);
