import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'Doctoral Research Grants & Sponsored Projects' },
  referenceId: { type: String, default: () => 'research-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const ResearchModel = mongoose.models.ResearchModel || mongoose.model('ResearchModel', schema);
export default ResearchModel;
