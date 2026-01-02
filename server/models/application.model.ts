import { Schema, model, Types } from 'mongoose';

export interface IApplication {
  _id?: string;
  userId?: string | null;
  courseId: string;
  fullName: string;
  phone: string;
  email?: string | null;
  status?: 'pending' | 'approved' | 'rejected';
  appliedAt?: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId as any, ref: 'User', required: false },
    courseId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Course',
      required: true,
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: { createdAt: 'appliedAt', updatedAt: false } }
);

export const ApplicationModel = model<IApplication>(
  'Application',
  applicationSchema
);
