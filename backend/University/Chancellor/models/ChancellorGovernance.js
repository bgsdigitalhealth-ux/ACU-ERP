import mongoose from 'mongoose';

const ChancellorGovernanceSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      index: true,
      enum: [
        'policies',
        'statutes',
        'ordinances',
        'academic-programs',
        'curriculum-approval',
        'exam-evaluation',
        'vc-reports',
        'registrar-updates',
        'hr-appointments',
        'annual-budget',
        'major-expenditures',
        'audit-compliance',
        'research-projects',
        'grants-funding',
        'collaborations-mous',
        'executive-council',
        'academic-council',
        'syndicate-meetings',
        'approvals-resolutions',
        'communication',
      ],
    },
    referenceCode: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, default: 'University Secretariat' },
    date: { type: String, required: true },
    status: { type: String, default: 'Approved' },
    summary: { type: String, required: true },
    amountOrMetric: { type: String, default: '' },
    leadPerson: { type: String, default: 'Authorized Officer' },
    tags: [{ type: String }],
    documentUrl: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const ChancellorGovernance =
  mongoose.models.ChancellorGovernance ||
  mongoose.model('ChancellorGovernance', ChancellorGovernanceSchema);

export default ChancellorGovernance;

