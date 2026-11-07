import mongoose from 'mongoose';

const AuditTrailSchema = new mongoose.Schema({
  stage: { type: String, required: true },
  actor: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  remarks: { type: String, default: '' },
});

const ChancellorProposalSchema = new mongoose.Schema(
  {
    proposalCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'New Program Proposals',
        'Policy / Regulation Amendments',
        'Major Expenditure Approvals',
        'MoU / Collaboration Requests',
        'Appointment / Promotion Cases',
      ],
    },
    department: { type: String, required: true },
    submittedBy: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    urgency: { type: String, enum: ['Urgent', 'High', 'Normal'], default: 'Normal' },
    budgetInvolved: { type: String, default: 'Nil' },
    description: { type: String, required: true },
    supportingDocs: [{ type: String }],
    
    // Scrutiny stage: Registrar
    registrarVerification: {
      status: { type: String, default: 'Verified & Recommended' },
      verifiedBy: { type: String, default: 'Dr. C. K. Subbaraya, Registrar' },
      date: { type: Date, default: Date.now },
      remarks: { type: String, default: 'Statutory compliance and regulation checks completed.' },
    },

    // Review stage: Vice-Chancellor
    vcRecommendation: {
      status: { type: String, default: 'Endorsed for Chancellor Action' },
      endorsedBy: { type: String, default: 'Prof. M. A. Shekar, Vice-Chancellor' },
      date: { type: Date, default: Date.now },
      remarks: { type: String, default: 'Academic and executive merit verified. Placed for Chancellor apex approval.' },
    },

    requiresChancellorAction: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['Pending Chancellor Action', 'Approved', 'Rejected', 'Returned for Correction'],
      default: 'Pending Chancellor Action',
    },

    // Final Apex Decision by Chancellor
    chancellorDecision: {
      decision: { type: String, enum: ['Approve', 'Reject', 'Return', null], default: null },
      remarks: { type: String, default: '' },
      decidedAt: { type: Date, default: null },
      digitalSignatureId: { type: String, default: null },
    },

    auditTrail: [AuditTrailSchema],
  },
  { timestamps: true }
);

export const ChancellorProposal =
  mongoose.models.ChancellorProposal ||
  mongoose.model('ChancellorProposal', ChancellorProposalSchema);

export default ChancellorProposal;

