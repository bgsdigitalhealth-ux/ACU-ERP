import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, default: 'College Library OPAC & Book Issue Records' },
  referenceId: { type: String, default: () => 'library-' + Date.now() },
  status: { type: String, default: 'Active' },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export const LibraryModel = mongoose.models.LibraryModel || mongoose.model('LibraryModel', schema);
export default LibraryModel;
