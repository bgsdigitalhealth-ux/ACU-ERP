import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Department Curriculum Delivery & Clinical Postings' },
  referenceId: { type: String, default: () => 'hod-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const HODModel = mongoose.models.HODModel || mongoose.model('HODModel', schema);
export default HODModel;
