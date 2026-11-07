import { vicechancellorService } from '../services/vicechancellorService.js';

export const getOverview = async (req, res) => {
  try {
    const { academicYear } = req.query;
    const data = await vicechancellorService.getOverview(academicYear);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProposals = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const data = await vicechancellorService.getProposals({ category, status, search });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await vicechancellorService.getProposalById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Proposal not found' });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const decideProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, remarks, digitalSignatureId } = req.body;
    if (!['Approve', 'Endorse for Chancellor', 'Reject', 'Return'].includes(decision)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid decision. Must be Approve, Endorse for Chancellor, Reject, or Return.',
      });
    }

    const data = await vicechancellorService.decideProposal(id, {
      decision,
      remarks,
      digitalSignatureId,
    });
    res.json({ success: true, data, message: `Vice Chancellor decision processed: ${decision}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernanceRecords = async (req, res) => {
  try {
    const { section } = req.params;
    const { search } = req.query;
    const data = await vicechancellorService.getGovernanceRecords(section, search);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { academicYear } = req.query;
    const data = await vicechancellorService.getAnalytics(academicYear);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Legacy compatibility
export const getRecords = getProposals;
export const createRecord = async (req, res) => res.json({ success: true });

export default {
  getOverview,
  getProposals,
  getProposalById,
  decideProposal,
  getGovernanceRecords,
  getAnalytics,
  getRecords,
  createRecord,
};
