import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Infrastructure & Department Management' },
  referenceId: { type: String, default: () => 'collegeadmin-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const CollegeAdminModel = mongoose.models.CollegeAdminModel || mongoose.model('CollegeAdminModel', schema);
export default CollegeAdminModel;
