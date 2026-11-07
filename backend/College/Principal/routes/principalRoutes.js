import { Router } from 'express';
import { getOverview, getRecords, createRecord } from '../controllers/principalController.js';

const router = Router();
router.get('/', getOverview);
router.get('/overview', getOverview);
router.get('/records', getRecords);
router.post('/records', createRecord);
export default router;
