import { collegeFinanceService } from '../services/collegeFinanceService.js';
import {
  validateTransactionInput,
  validateFeeCollectionInput,
  validateExpenseInput,
} from '../validations/collegeFinanceValidation.js';

export const getCollegeFinanceDashboard = async (req, res) => {
  try {
    const { academicYear = '2026 – 2027' } = req.query || {};
    const data = await collegeFinanceService.getDashboardData(academicYear);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { search = '', type = 'all', limit = 50 } = req.query || {};
    const data = await collegeFinanceService.getTransactionsList(search, type, limit);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const validation = validateTransactionInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const result = await collegeFinanceService.recordTransaction(req.body);
    res.status(201).json({
      success: true,
      message: 'Transaction recorded successfully',
      data: result.transaction,
      overview: result.overview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const collectStudentFee = async (req, res) => {
  try {
    const validation = validateFeeCollectionInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const { rollNo, semester, department, feeType, amount } = req.body;
    const particulars = `Student Fee – ${rollNo} (${department || 'B.Tech'} Sem ${semester || '3'})`;
    const result = await collegeFinanceService.recordTransaction({
      particulars,
      type: 'Income',
      amount,
      category: feeType || 'Tuition Fee',
      referenceNo: `REC-${rollNo}-${Date.now().toString().slice(-4)}`,
    });
    res.status(201).json({
      success: true,
      message: 'Student fee collected successfully',
      data: result.transaction,
      overview: result.overview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recordExpense = async (req, res) => {
  try {
    const validation = validateExpenseInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const { title, department, category, amount, invoiceNo } = req.body;
    const particulars = `${title}${department ? ` [${department}]` : ''}`;
    const result = await collegeFinanceService.recordTransaction({
      particulars,
      type: 'Expense',
      amount,
      category: category || 'General Expense',
      referenceNo: invoiceNo || `INV-VND-${Date.now().toString().slice(-4)}`,
    });
    res.status(201).json({
      success: true,
      message: 'Expense recorded successfully',
      data: result.transaction,
      overview: result.overview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

