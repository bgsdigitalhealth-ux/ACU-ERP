import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'University Centralized Leave Sanctions' },
  referenceId: { type: String, default: () => 'leaveadmin-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const LeaveAdminModel = mongoose.models.LeaveAdminModel || mongoose.model('LeaveAdminModel', schema);
export default LeaveAdminModel;
