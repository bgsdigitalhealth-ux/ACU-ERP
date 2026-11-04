import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    credits: { type: Number, default: 4 },
    incharge: { type: String, required: true },
    semester: { type: String, default: 'Phase 1' },
    programme: { type: String, default: 'MBBS' },
    department: { type: String, default: 'Physiology' },
    batch: { type: String, default: '2024MBBS01' },
    studentCount: { type: Number, default: 53 },
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', CourseSchema);

