import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Registrar Evaluation & Gazette Administration' },
  referenceId: { type: String, default: () => 'registrar-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const RegistrarModel = mongoose.models.RegistrarModel || mongoose.model('RegistrarModel', schema);
export default RegistrarModel;
