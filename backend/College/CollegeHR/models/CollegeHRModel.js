import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Personnel Records & Attendance Rosters' },
  referenceId: { type: String, default: () => 'collegehr-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const CollegeHRModel = mongoose.models.CollegeHRModel || mongoose.model('CollegeHRModel', schema);
export default CollegeHRModel;
