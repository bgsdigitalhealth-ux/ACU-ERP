import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Vice Principal Academic Operations & Timetable Management' },
  referenceId: { type: String, default: () => 'viceprincipal-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const VicePrincipalModel = mongoose.models.VicePrincipalModel || mongoose.model('VicePrincipalModel', schema);
export default VicePrincipalModel;
