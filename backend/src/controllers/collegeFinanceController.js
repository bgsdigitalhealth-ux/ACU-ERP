import {
  CollegeFinanceTransaction,
  CollegeFinanceNotification,
  CollegeFinanceOverview,
} from '../models/CollegeFinance.js';

// Dynamic in-memory state ensuring high-performance fallback
let IN_MEMORY_OVERVIEW = {
  academicYear: '2026 – 2027',
  totalFeeCollected: 43250000,
  feeCollectedGrowth: '+12.5% vs last year',
  pendingFees: 3275000,
  pendingFeesGrowth: '-6.8% vs last year',
  totalExpenses: 31020000,
  expensesGrowth: '+8.1% vs last year',
  budgetUtilization: 78,
  collectionRate: 93,
  monthlyComparison: [
    { month: 'Apr', income: 35, expense: 24 },
    { month: 'May', income: 32, expense: 22 },
    { month: 'Jun', income: 28, expense: 20 },
    { month: 'Jul', income: 40, expense: 26 },
    { month: 'Aug', income: 38, expense: 25 },
    { month: 'Sep', income: 44, expense: 30 },
    { month: 'Oct', income: 52, expense: 32 },
    { month: 'Nov', income: 58, expense: 34 },
    { month: 'Dec', income: 60, expense: 38 },
    { month: 'Jan', income: 64, expense: 40 },
    { month: 'Feb', income: 68, expense: 45 },
    { month: 'Mar', income: 72, expense: 48 },
  ],
};

let IN_MEMORY_TRANSACTIONS = [
  {
    id: 'txn-1',
    transactionId: 'TXN-2026-001',
    date: '02 Nov 2026',
    particulars: 'Student Fee – B.Tech (Sem 3)',
    type: 'Income',
    amount: 125000,
    category: 'Tuition Fee',
    referenceNo: 'REC-BTECH-2301',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-2',
    transactionId: 'TXN-2026-002',
    date: '01 Nov 2026',
    particulars: 'Lab Equipment Purchase',
    type: 'Expense',
    amount: 75000,
    category: 'Laboratory',
    referenceNo: 'PO-LAB-8812',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-3',
    transactionId: 'TXN-2026-003',
    date: '31 Oct 2026',
    particulars: 'Hostel Fee – Batch 2025',
    type: 'Income',
    amount: 48000,
    category: 'Hostel & Mess',
    referenceNo: 'REC-HST-5519',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-4',
    transactionId: 'TXN-2026-004',
    date: '30 Oct 2026',
    particulars: 'Library Books Procurement',
    type: 'Expense',
    amount: 22500,
    category: 'Library',
    referenceNo: 'PO-LIB-4409',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-5',
    transactionId: 'TXN-2026-005',
    date: '29 Oct 2026',
    particulars: 'Grant – Research Project',
    type: 'Income',
    amount: 500000,
    category: 'Research Grant',
    referenceNo: 'GRT-DST-2026',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-6',
    transactionId: 'TXN-2026-006',
    date: '28 Oct 2026',
    particulars: 'Campus Wi-Fi Optical Fiber Expansion',
    type: 'Expense',
    amount: 64000,
    category: 'Infrastructure',
    referenceNo: 'PO-IT-3104',
    academicYear: '2026 – 2027',
  },
  {
    id: 'txn-7',
    transactionId: 'TXN-2026-007',
    date: '27 Oct 2026',
    particulars: 'Examination Fee – Supplementary Batch',
    type: 'Income',
    amount: 86000,
    category: 'Examination',
    referenceNo: 'REC-EXAM-9941',
    academicYear: '2026 – 2027',
  },
];

let IN_MEMORY_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'success',
    message: 'Fee of ₹ 1,25,000 received from Roll No. CSE2301',
    timeAgo: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'warning',
    message: 'Budget utilization reached 78%',
    timeAgo: '5 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'info',
    message: 'Audit report for Q2 is due on 10 Nov 2026',
    timeAgo: '1 day ago',
    read: false,
  },
];

const RESPONSIBILITIES = [
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

// GET: Full College Finance Dashboard
export const getCollegeFinanceDashboard = async (req, res) => {
  try {
    const { academicYear = '2026 – 2027' } = req.query || {};

    let overview = null;
    let transactions = [];
    let notifications = [];

    try {
      overview = await CollegeFinanceOverview.findOne({ academicYear }).lean();
      transactions = await CollegeFinanceTransaction.find({ academicYear })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
      notifications = await CollegeFinanceNotification.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    } catch {
      // MongoDB offline fallback
    }

    if (!overview) {
      overview = IN_MEMORY_OVERVIEW;
    }

    if (!transactions || transactions.length === 0) {
      transactions = IN_MEMORY_TRANSACTIONS;
    }

    if (!notifications || notifications.length === 0) {
      notifications = IN_MEMORY_NOTIFICATIONS;
    }

    res.json({
      success: true,
      data: {
        overview,
        transactions,
        notifications,
        responsibilities: RESPONSIBILITIES,
        academicYear,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve college finance dashboard',
      error: error.message,
      data: {
        overview: IN_MEMORY_OVERVIEW,
        transactions: IN_MEMORY_TRANSACTIONS,
        notifications: IN_MEMORY_NOTIFICATIONS,
        responsibilities: RESPONSIBILITIES,
      },
    });
  }
};

// GET: Transactions list with search and filter
export const getTransactions = async (req, res) => {
  try {
    const { search = '', type = 'all', limit = 50 } = req.query || {};

    let list = IN_MEMORY_TRANSACTIONS;

    try {
      const query = {};
      if (type && type !== 'all') {
        query.type = type;
      }
      if (search) {
        query.particulars = { $regex: search, $options: 'i' };
      }
      const dbTxns = await CollegeFinanceTransaction.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .lean();

      if (dbTxns && dbTxns.length > 0) {
        list = dbTxns;
      }
    } catch {
      // Filter in memory
      if (type !== 'all') {
        list = list.filter((t) => t.type.toLowerCase() === type.toLowerCase());
      }
      if (search) {
        list = list.filter((t) =>
          t.particulars.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { particulars, type, amount, category = 'General', referenceNo = '' } = req.body || {};

    if (!particulars || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Particulars, type (Income/Expense), and amount are required.',
      });
    }

    const numAmount = Number(amount);
    const dateFormatted = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newTxn = {
      id: 'txn-' + Date.now(),
      transactionId: 'TXN-' + Date.now().toString().slice(-6),
      date: dateFormatted,
      particulars,
      type,
      amount: numAmount,
      category,
      referenceNo: referenceNo || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      academicYear: '2026 – 2027',
    };

    // Update in-memory state
    IN_MEMORY_TRANSACTIONS.unshift(newTxn);

    if (type === 'Income') {
      IN_MEMORY_OVERVIEW.totalFeeCollected += numAmount;
      if (IN_MEMORY_OVERVIEW.pendingFees >= numAmount) {
        IN_MEMORY_OVERVIEW.pendingFees -= numAmount;
      }
      const total = IN_MEMORY_OVERVIEW.totalFeeCollected + IN_MEMORY_OVERVIEW.pendingFees;
      IN_MEMORY_OVERVIEW.collectionRate = Math.min(
        100,
        Math.round((IN_MEMORY_OVERVIEW.totalFeeCollected / total) * 100)
      );

      IN_MEMORY_NOTIFICATIONS.unshift({
        id: 'notif-' + Date.now(),
        type: 'success',
        message: `Income of ₹ ${numAmount.toLocaleString('en-IN')} received: ${particulars}`,
        timeAgo: 'Just now',
        read: false,
      });
    } else {
      IN_MEMORY_OVERVIEW.totalExpenses += numAmount;
      const budgetBase = 40000000;
      IN_MEMORY_OVERVIEW.budgetUtilization = Math.min(
        100,
        Math.round((IN_MEMORY_OVERVIEW.totalExpenses / budgetBase) * 100)
      );

      IN_MEMORY_NOTIFICATIONS.unshift({
        id: 'notif-' + Date.now(),
        type: 'warning',
        message: `Expense of ₹ ${numAmount.toLocaleString('en-IN')} recorded: ${particulars}`,
        timeAgo: 'Just now',
        read: false,
      });
    }

    try {
      await CollegeFinanceTransaction.create(newTxn);
    } catch {
      // MongoDB offline fallback
    }

    res.status(201).json({
      success: true,
      message: 'Transaction recorded successfully',
      data: newTxn,
      overview: IN_MEMORY_OVERVIEW,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Collect Fee (Quick Action 1)
export const collectStudentFee = async (req, res) => {
  try {
    const { studentName, rollNo, semester, department, feeType, amount, paymentMode } = req.body || {};

    if (!rollNo || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Roll number and amount are required.',
      });
    }

    const numAmount = Number(amount);
    const particulars = `Student Fee – ${rollNo} (${department || 'B.Tech'} Sem ${semester || '3'})`;

    return createTransaction(
      {
        body: {
          particulars,
          type: 'Income',
          amount: numAmount,
          category: feeType || 'Tuition Fee',
          referenceNo: `REC-${rollNo}-${Date.now().toString().slice(-4)}`,
        },
      },
      res
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Record Expense (Quick Action 3)
export const recordExpense = async (req, res) => {
  try {
    const { title, department, category, amount, invoiceNo, vendorName } = req.body || {};

    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Expense title and amount are required.',
      });
    }

    const numAmount = Number(amount);
    const particulars = `${title}${department ? ` [${department}]` : ''}`;

    return createTransaction(
      {
        body: {
          particulars,
          type: 'Expense',
          amount: numAmount,
          category: category || 'General Expense',
          referenceNo: invoiceNo || `INV-VND-${Date.now().toString().slice(-4)}`,
        },
      },
      res
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
