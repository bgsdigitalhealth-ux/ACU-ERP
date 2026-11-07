import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Chancellor Apex Decrees & Statutory Approvals' },
  referenceId: { type: String, default: () => 'chancellor-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const ChancellorModel = mongoose.models.ChancellorModel || mongoose.model('ChancellorModel', schema);
export default ChancellorModel;
