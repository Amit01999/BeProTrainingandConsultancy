import { Schema, model } from 'mongoose';

export interface ICourseDetailSection {
  heading: string;
  content: string[];
}

export interface ICourse {
  _id?: string;
  slug: string;
  title: string;
  titleBn?: string | null;
  category: string;
  programTags?: string[];
  level?: string | null;
  duration?: string | null;
  fee?: string | null;
  originalPrice?: number;
  discountedPrice?: number;
  description?: string | null;
  descriptionBn?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  icon?: string | null;
  features?: string[];
  details?: ICourseDetailSection[];
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const detailSectionSchema = new Schema<ICourseDetailSection>(
  {
    heading: { type: String, required: true },
    content: { type: [String], default: [] },
  },
  { _id: false },
);

const courseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    titleBn: { type: String },
    category: { type: String, required: true, index: true },
    programTags: { type: [String], default: [] },
    level: { type: String },
    duration: { type: String },
    fee: { type: String },
    originalPrice: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    description: { type: String },
    descriptionBn: { type: String },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    gradientFrom: { type: String },
    gradientTo: { type: String },
    icon: { type: String },
    features: { type: [String], default: [] },
    details: { type: [detailSectionSchema], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CourseModel = model<ICourse>('Course', courseSchema);
