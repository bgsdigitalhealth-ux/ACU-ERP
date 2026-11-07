import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Vice Chancellor Academic Regulations & Governance' },
  referenceId: { type: String, default: () => 'vicechancellor-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const ViceChancellorModel = mongoose.models.ViceChancellorModel || mongoose.model('ViceChancellorModel', schema);
export default ViceChancellorModel;
