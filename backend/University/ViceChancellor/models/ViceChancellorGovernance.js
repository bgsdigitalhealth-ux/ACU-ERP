import mongoose from 'mongoose';

const ViceChancellorGovernanceSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      index: true,
    },
    referenceCode: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, default: 'Vice-Chancellor Secretariat' },
    date: { type: String, required: true },
    status: { type: String, default: 'Active' },
    summary: { type: String, required: true },
    metricOrValue: { type: String, default: '' },
    leadOfficer: { type: String, default: 'Vice-Chancellor' },
    tags: [{ type: String }],
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const ViceChancellorGovernance =
  mongoose.models.ViceChancellorGovernance ||
  mongoose.model('ViceChancellorGovernance', ViceChancellorGovernanceSchema);

export default ViceChancellorGovernance;

