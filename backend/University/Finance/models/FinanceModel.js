import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Consolidated University Treasury & Grant Reconciliations' },
  referenceId: { type: String, default: () => 'finance-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const FinanceModel = mongoose.models.FinanceModel || mongoose.model('FinanceModel', schema);
export default FinanceModel;
