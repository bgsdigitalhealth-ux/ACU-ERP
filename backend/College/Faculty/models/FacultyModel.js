import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Faculty Workload, Attendance & Internal Marks Log' },
  referenceId: { type: String, default: () => 'faculty-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const FacultyModel = mongoose.models.FacultyModel || mongoose.model('FacultyModel', schema);
export default FacultyModel;
