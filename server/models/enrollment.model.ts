import { Schema, model, Types } from 'mongoose';

export type EnrollmentStatus =
  | 'initiated'
  | 'pending'
  | 'verified'
  | 'rejected';

export interface IEnrollment {
  _id?: string;
  userId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  transactionId?: string | null;
  senderNumber?: string | null;
  amount?: number;
  screenshotUrl?: string | null;
  screenshotPublicId?: string | null;
  status: EnrollmentStatus;
  notes?: string | null;
  paidAt?: Date | null;
  verifiedAt?: Date | null;
  verifiedBy?: Types.ObjectId | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    // Optional at persistence level — populated once the user submits
    // payment info. An 'initiated' enrollment won't have these yet.
    transactionId: { type: String, trim: true },
    senderNumber: { type: String, trim: true },
    amount: { type: Number },
    screenshotUrl: { type: String },
    screenshotPublicId: { type: String },
    status: {
      type: String,
      enum: ['initiated', 'pending', 'verified', 'rejected'],
      default: 'initiated',
      index: true,
    },
    notes: { type: String },
    paidAt: { type: Date },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

// Enforce "one enrollment record per user per course" at the DB layer.
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const EnrollmentModel = model<IEnrollment>('Enrollment', enrollmentSchema);
