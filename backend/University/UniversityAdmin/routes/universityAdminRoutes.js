import { Router } from 'express';
import { getDashboard, getModules } from '../controllers/universityAdminController.js';

const router = Router();
router.get('/dashboard', getDashboard);
router.get('/modules', getModules);
export default router;
