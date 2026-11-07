import mongoose from 'mongoose';

const recruitmentSchema = new mongoose.Schema(
  {
    requisitionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    positions: { type: Number, default: 1 },
    qualification: { type: String, required: true },
    experienceMinYears: { type: Number, default: 3 },
    applicationDeadline: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Screening', 'Interviews', 'Filled', 'Closed'], default: 'Open' },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Recruitment = mongoose.models.Recruitment || mongoose.model('Recruitment', recruitmentSchema);
export default Recruitment;

