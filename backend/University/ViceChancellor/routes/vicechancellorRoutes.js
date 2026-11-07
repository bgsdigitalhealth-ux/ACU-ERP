import { Router } from 'express';
import {
  getOverview,
  getProposals,
  getProposalById,
  decideProposal,
  getGovernanceRecords,
  getAnalytics,
  getRecords,
  createRecord,
} from '../controllers/vicechancellorController.js';

const router = Router();

// Overview
router.get('/', getOverview);
router.get('/overview', getOverview);

// Proposals & Approvals
router.get('/proposals', getProposals);
router.get('/proposals/:id', getProposalById);
router.post('/proposals/:id/decision', decideProposal);

// Subcontent Full Page Records
router.get('/governance/:section', getGovernanceRecords);

// Analytics (Images 2 & 3)
router.get('/analytics', getAnalytics);

// Legacy
router.get('/records', getRecords);
router.post('/records', createRecord);

export default router;
