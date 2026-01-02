import { Schema, model, Types } from 'mongoose';

export interface ICourse {
  _id?: string;
  title: string;
  titleBn?: string | null;
  category: string;
  level?: string | null;
  duration?: string | null;
  fee?: string | null;
  description?: string | null;
  descriptionBn?: string | null;
  features?: string[];
  isFeatured?: boolean;
  createdAt?: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    category: { type: String, required: true },
    level: { type: String },
    duration: { type: String },
    fee: { type: String },
    description: { type: String },
    descriptionBn: { type: String },
    features: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const CourseModel = model<ICourse>('Course', courseSchema);
