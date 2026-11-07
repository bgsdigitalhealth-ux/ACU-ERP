import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Principal College Governance & Executive Administration' },
  referenceId: { type: String, default: () => 'principal-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const PrincipalModel = mongoose.models.PrincipalModel || mongoose.model('PrincipalModel', schema);
export default PrincipalModel;
