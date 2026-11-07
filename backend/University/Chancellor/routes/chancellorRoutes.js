import { Router } from 'express';
import {
  getOverview,
  getProposals,
  getProposalById,
  decideProposal,
  createProposal,
  getGovernanceRecords,
  getAdmsMetrics,
  getRecords,
  createRecord,
} from '../controllers/chancellorController.js';

const router = Router();

// Dashboard Overview
router.get('/', getOverview);
router.get('/overview', getOverview);

// Flowchart Proposals & Approvals
router.get('/proposals', getProposals);
router.get('/proposals/:id', getProposalById);
router.post('/proposals/:id/decision', decideProposal);
router.post('/proposals/:id/approve', (req, res) => {
  req.body.decision = 'Approve';
  decideProposal(req, res);
});
router.post('/proposals/:id/reject', (req, res) => {
  req.body.decision = 'Reject';
  decideProposal(req, res);
});
router.post('/proposals/:id/return', (req, res) => {
  req.body.decision = 'Return';
  decideProposal(req, res);
});
router.post('/proposals', createProposal);

// Subcontent Full Page Governance Records
router.get('/governance/:section', getGovernanceRecords);

// ADMS Parameter's Dashboard (Image 2)
router.get('/adms-metrics', getAdmsMetrics);

// Legacy routes
router.get('/records', getRecords);
router.post('/records', createRecord);

export default router;
