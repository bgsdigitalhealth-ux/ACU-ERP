import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Internal Assessment' },
    courseCode: { type: String, required: true, default: 'PHY101' },
    courseName: { type: String, required: true, default: 'Human Physiology I & II' },
    batch: { type: String, required: true, default: '2024MBBS01' },
    maxMarks: { type: Number, default: 20 },
    weightage: { type: Number, default: 10 },
    assignedDate: { type: String, default: '' },
    dueDate: { type: String, required: true },
    status: { type: String, default: 'ACTIVE' },
    bloomsLevel: { type: String, default: "L3 - Apply (Bloom's Taxonomy)" },
    competencyCode: { type: String, default: 'PY5.4 (NMC GMER 2024)' },
    questionCount: { type: Number, default: 5 },
    description: { type: String, default: '' },
    createdBy: { type: String, default: 'Prof. Dr. Mohammed Ismail Razee, MD' },
  },
  { timestamps: true }
);

export const Assessment = mongoose.model('Assessment', AssessmentSchema);

