import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Direct Admission & Document Verification' },
  referenceId: { type: String, default: () => 'admission-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const AdmissionModel = mongoose.models.AdmissionModel || mongoose.model('AdmissionModel', schema);
export default AdmissionModel;
