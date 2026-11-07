import mongoose from 'mongoose';

const AuditTrailSchema = new mongoose.Schema({
  stage: { type: String, required: true },
  actor: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  remarks: { type: String, default: '' },
  digitalSignatureId: { type: String, default: '' },
});

const ViceChancellorProposalSchema = new mongoose.Schema(
  {
    proposalCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Program / Curriculum Proposals',
        'College Affiliation / Renewal',
        'Recruitment / Appointments',
        'Research & MoU Proposals',
        'Budget / Major Expenditure',
        'Policy / Regulation Amendments',
        'New Program Proposals',
        'Faculty Appointments',
        'Budget Proposals',
        'MoU / Collaboration Requests',
        'Statutory Appeal / Grievance',
        'General Statutory Proposal',
      ],
    },
    department: { type: String, required: true },
    submittedBy: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    urgency: { type: String, enum: ['Urgent', 'High', 'Normal'], default: 'Normal' },
    budgetInvolved: { type: String, default: 'Nil' },
    description: { type: String, required: true },
    supportingDocs: [{ type: String }],

    // Statutory Delegated Authority Check
    delegatedAuthority: {
      type: String,
      enum: ['VC Final Authority', 'Requires Chancellor Assent', 'Board of Governors / Syndicate', 'Syndicate & Academic Council'],
      default: 'VC Final Authority',
    },

    status: {
      type: String,
      enum: ['Pending VC Action', 'Approved', 'Endorsed for Chancellor Assent', 'Rejected', 'Returned for Correction'],
      default: 'Pending VC Action',
    },

    vcDecision: {
      decision: { type: String, enum: ['Approve', 'Endorse for Chancellor', 'Reject', 'Return', null], default: null },
      remarks: { type: String, default: '' },
      decidedAt: { type: Date, default: null },
      digitalSignatureId: { type: String, default: null },
      delegatedClause: { type: String, default: 'Statute 14(2) of University Act' },
    },

    auditTrail: [AuditTrailSchema],
  },
  { timestamps: true }
);

export const ViceChancellorProposal =
  mongoose.models.ViceChancellorProposal ||
  mongoose.model('ViceChancellorProposal', ViceChancellorProposalSchema);

export default ViceChancellorProposal;