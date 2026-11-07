import { Router } from 'express';
import {
  getCollegeFinanceDashboard,
  getTransactions,
  createTransaction,
  collectStudentFee,
  recordExpense,
} from '../controllers/collegeFinanceController.js';

const router = Router();

router.get('/dashboard', getCollegeFinanceDashboard);
router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.post('/collect-fee', collectStudentFee);
router.post('/record-expense', recordExpense);

export default router;

