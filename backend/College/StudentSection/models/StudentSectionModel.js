import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Student Records, TC & Bonafide Issuance' },
  referenceId: { type: String, default: () => 'studentsection-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const StudentSectionModel = mongoose.models.StudentSectionModel || mongoose.model('StudentSectionModel', schema);
export default StudentSectionModel;
