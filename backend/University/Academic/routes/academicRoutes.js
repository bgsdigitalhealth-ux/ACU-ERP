import { Router } from 'express';
import {
  getAssessments,
  createAssessment,
  getAcademicCalendar,
  seedDatabase,
} from '../controllers/academicController.js';

const router = Router();

router.get('/assessments', getAssessments);
router.post('/assessments', createAssessment);
router.get('/academic-calendar', getAcademicCalendar);
router.post('/seed', seedDatabase);

export default router;
