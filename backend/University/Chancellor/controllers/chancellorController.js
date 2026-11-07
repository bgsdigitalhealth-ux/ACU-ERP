import { chancellorService } from '../services/chancellorService.js';

export const getOverview = async (req, res) => {
  try {
    const { academicYear } = req.query;
    const data = await chancellorService.getOverview(academicYear);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProposals = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const data = await chancellorService.getProposals({ category, status, search });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await chancellorService.getProposalById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Proposal not found' });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const decideProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, remarks, digitalSignatureId } = req.body;
    if (!['Approve', 'Reject', 'Return'].includes(decision)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid decision type. Must be Approve, Reject, or Return.',
      });
    }

    const data = await chancellorService.decideProposal(id, {
      decision,
      remarks,
      digitalSignatureId,
    });
    res.json({ success: true, data, message: `Proposal successfully processed with decision: ${decision}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProposal = async (req, res) => {
  try {
    const data = await chancellorService.createProposal(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernanceRecords = async (req, res) => {
  try {
    const { section } = req.params;
    const { search } = req.query;
    const data = await chancellorService.getGovernanceRecords(section, search);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdmsMetrics = async (req, res) => {
  try {
    const { academicYear } = req.query;
    const data = await chancellorService.getAdmsMetrics(academicYear);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Legacy alias handlers for backwards-compatibility
export const getRecords = getProposals;
export const createRecord = createProposal;

export default {
  getOverview,
  getProposals,
  getProposalById,
  decideProposal,
  createProposal,
  getGovernanceRecords,
  getAdmsMetrics,
  getRecords,
  createRecord,
};
