import { FinanceSummary, FinanceTransaction } from '../models/Finance.js';

// In-memory data store with exact values from the College Finance Dashboard
let MEMORY_FINANCE_SUMMARY = {
  '2026 – 2027': {
    academicYear: '2026 – 2027',
    collegeName: 'City College of Engineering',
    totalFeeCollected: 43250000,
    feeCollectedGrowth: '+12.5% vs last year',
    pendingFees: 3275000,
    pendingFeesGrowth: '-6.8% vs last year',
    totalExpenses: 31020000,
    totalExpensesGrowth: '+8.1% vs last year',
    budgetUtilization: 78,
    collectionRate: 93,
  },
  '2025 – 2026': {
    academicYear: '2025 – 2026',
    collegeName: 'City College of Engineering',
    totalFeeCollected: 38450000,
    feeCollectedGrowth: '+10.2% vs last year',
    pendingFees: 3510000,
    pendingFeesGrowth: '-4.1% vs last year',
    totalExpenses: 28700000,
    totalExpensesGrowth: '+6.5% vs last year',
    budgetUtilization: 74,
    collectionRate: 91,
  },
  '2024 – 2025': {
    academicYear: '2024 – 2025',
    collegeName: 'City College of Engineering',
    totalFeeCollected: 34900000,
    feeCollectedGrowth: '+9.0% vs last year',
    pendingFees: 3660000,
    pendingFeesGrowth: '-2.5% vs last year',
    totalExpenses: 26900000,
    totalExpensesGrowth: '+5.8% vs last year',
    budgetUtilization: 72,
    collectionRate: 90,
  },
};

let MEMORY_MONTHLY_CHART = [
  { month: 'Apr', income: 42, expenses: 25 },
  { month: 'May', income: 38, expenses: 24 },
  { month: 'Jun', income: 35, expenses: 23 },
  { month: 'Jul', income: 43, expenses: 26 },
  { month: 'Aug', income: 42, expenses: 28 },
  { month: 'Sep', income: 47, expenses: 32 },
  { month: 'Oct', income: 52, expenses: 36 },
  { month: 'Nov', income: 58, expenses: 39 },
  { month: 'Dec', income: 60, expenses: 42 },
  { month: 'Jan', income: 62, expenses: 44 },
  { month: 'Feb', income: 66, expenses: 46 },
  { month: 'Mar', income: 70, expenses: 50 },
];

let MEMORY_TRANSACTIONS = [
  {
    id: 'TXN-001',
    date: '02 Nov 2026',
    particulars: 'Student Fee – B.Tech (Sem 3)',
    type: 'Income',
    amount: 125000,
    category: 'Student Fee',
    academicYear: '2026 – 2027',
  },
  {
    id: 'TXN-002',
    date: '01 Nov 2026',
    particulars: 'Lab Equipment Purchase',
    type: 'Expense',
    amount: 75000,
    category: 'Procurement',
    academicYear: '2026 – 2027',
  },
  {
    id: 'TXN-003',
    date: '31 Oct 2026',
    particulars: 'Hostel Fee – Batch 2025',
    type: 'Income',
    amount: 48000,
    category: 'Hostel Fee',
    academicYear: '2026 – 2027',
  },
  {
    id: 'TXN-004',
    date: '30 Oct 2026',
    particulars: 'Library Books Procurement',
    type: 'Expense',
    amount: 22500,
    category: 'Library',
    academicYear: '2026 – 2027',
  },
  {
    id: 'TXN-005',
    date: '29 Oct 2026',
    particulars: 'Grant – Research Project',
    type: 'Income',
    amount: 500000,
    category: 'Grant',
    academicYear: '2026 – 2027',
  },
];

const FINANCE_RESPONSIBILITIES = [
  'Oversee fee collection and student payments',
  'Manage college budget, planning and allocation',
  'Monitor and control institutional expenses',
  'Handle procurement, vendor payments and billing',
  'Manage grants, donations and external funds',
  'Maintain accurate financial records and ledgers',
  'Ensure compliance with financial policies and regulations (UGC/AICTE/Govt. norms)',
  'Prepare financial statements and audit reports',
  'Coordinate with administration, departments and auditors',
];

let MEMORY_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Fee of ₹1,25,000 received from Roll No. CSE2301',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Budget utilization reached 78%',
    time: '5 hours ago',
    type: 'warning',
  },
  {
    id: 'notif-3',
    title: 'Audit report for Q2 is due on 10 Nov 2026',
    time: '1 day ago',
    type: 'info',
  },
];

const WORKFLOW_STEPS = [
  { id: 'fee-collection', title: 'Fee Collection', icon: 'CreditCard' },
  { id: 'expense-tracking', title: 'Expense Tracking', icon: 'ShoppingCart' },
  { id: 'budget-control', title: 'Budget Control', icon: 'Coins' },
  { id: 'reports-audit', title: 'Reports & Audit', icon: 'BarChart3' },
  { id: 'compliance', title: 'Compliance', icon: 'ShieldCheck' },
];

/**
 * GET /api/finance/dashboard
 * Dynamic controller returning complete finance dashboard state
 */
export const getFinanceDashboard = async (req, res) => {
  try {
    const academicYear = req.query.academicYear || '2026 – 2027';
    const searchQuery = (req.query.search || '').trim().toLowerCase();

    // Fetch from MongoDB if available, otherwise use resilient memory fallback
    let summary = MEMORY_FINANCE_SUMMARY[academicYear] || MEMORY_FINANCE_SUMMARY['2026 – 2027'];
    try {
      const dbSummary = await FinanceSummary.findOne({ academicYear });
      if (dbSummary) {
        summary = dbSummary;
      }
    } catch {
      // In-memory fallback is active
    }

    let transactions = [...MEMORY_TRANSACTIONS];
    try {
      const dbTxns = await FinanceTransaction.find({ academicYear }).sort({ createdAt: -1 });
      if (dbTxns && dbTxns.length > 0) {
        transactions = dbTxns;
      }
    } catch {
      // In-memory fallback
    }

    // Apply live search filter if provided
    if (searchQuery) {
      transactions = transactions.filter(
        (t) =>
          t.particulars.toLowerCase().includes(searchQuery) ||
          t.type.toLowerCase().includes(searchQuery) ||
          (t.category && t.category.toLowerCase().includes(searchQuery)) ||
          t.amount.toString().includes(searchQuery)
      );
    }

    res.json({
      status: 'success',
      academicYear,
      summary,
      monthlyChart: MEMORY_MONTHLY_CHART,
      collectionOverview: {
        collected: summary.totalFeeCollected,
        pending: summary.pendingFees,
        collectionRate: summary.collectionRate,
      },
      recentTransactions: transactions,
      responsibilities: FINANCE_RESPONSIBILITIES,
      notifications: MEMORY_NOTIFICATIONS,
      workflowSteps: WORKFLOW_STEPS,
      academicYears: ['2026 – 2027', '2025 – 2026', '2024 – 2025'],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Finance API] Error getting dashboard:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * GET /api/finance/transactions
 */
export const getFinanceTransactions = async (req, res) => {
  try {
    const { type, academicYear, search } = req.query;
    let list = [...MEMORY_TRANSACTIONS];

    if (academicYear) {
      list = list.filter((t) => t.academicYear === academicYear);
    }
    if (type) {
      list = list.filter((t) => t.type.toLowerCase() === type.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.particulars.toLowerCase().includes(q) || t.amount.toString().includes(q));
    }

    res.json({ status: 'success', total: list.length, transactions: list });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * POST /api/finance/transactions
 * Create a new dynamic transaction (Fee collection, Expense record, Grant)
 */
export const createFinanceTransaction = async (req, res) => {
  try {
    const { particulars, type, amount, category, academicYear = '2026 – 2027' } = req.body;

    if (!particulars || !type || !amount) {
      return res.status(400).json({ status: 'error', message: 'Particulars, type and amount are required' });
    }

    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      particulars,
      type: type === 'Expense' ? 'Expense' : 'Income',
      amount: Number(amount),
      category: category || (type === 'Expense' ? 'Operational Expense' : 'Fee Collection'),
      academicYear,
    };

    MEMORY_TRANSACTIONS.unshift(newTxn);

    // Update dynamic summary totals
    if (MEMORY_FINANCE_SUMMARY[academicYear]) {
      if (newTxn.type === 'Income') {
        MEMORY_FINANCE_SUMMARY[academicYear].totalFeeCollected += newTxn.amount;
        if (MEMORY_FINANCE_SUMMARY[academicYear].pendingFees > newTxn.amount) {
          MEMORY_FINANCE_SUMMARY[academicYear].pendingFees -= Math.round(newTxn.amount * 0.1);
        }
      } else {
        MEMORY_FINANCE_SUMMARY[academicYear].totalExpenses += newTxn.amount;
      }

      // Recalculate collection rate and utilization
      const total =
        MEMORY_FINANCE_SUMMARY[academicYear].totalFeeCollected +
        MEMORY_FINANCE_SUMMARY[academicYear].pendingFees;
      MEMORY_FINANCE_SUMMARY[academicYear].collectionRate = Math.round(
        (MEMORY_FINANCE_SUMMARY[academicYear].totalFeeCollected / total) * 100
      );
    }

    // Add a live notification
    MEMORY_NOTIFICATIONS.unshift({
      id: `notif-${Date.now()}`,
      title: `${newTxn.type} of ₹${Number(amount).toLocaleString('en-IN')} recorded: ${particulars}`,
      time: 'Just now',
      type: newTxn.type === 'Income' ? 'success' : 'warning',
    });

    try {
      await FinanceTransaction.create(newTxn);
    } catch {
      // Memory store already updated
    }

    res.status(201).json({
      status: 'success',
      message: 'Transaction recorded successfully',
      transaction: newTxn,
      updatedSummary: MEMORY_FINANCE_SUMMARY[academicYear],
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
