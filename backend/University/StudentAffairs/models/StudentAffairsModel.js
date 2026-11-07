import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Student Welfare & Grievance Redressal Board' },
  referenceId: { type: String, default: () => 'studentaffairs-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const StudentAffairsModel = mongoose.models.StudentAffairsModel || mongoose.model('StudentAffairsModel', schema);
export default StudentAffairsModel;
