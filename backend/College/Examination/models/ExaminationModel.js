import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Formative Exam Hall Allocation & Invigilation' },
  referenceId: { type: String, default: () => 'examination-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const ExaminationModel = mongoose.models.ExaminationModel || mongoose.model('ExaminationModel', schema);
export default ExaminationModel;
