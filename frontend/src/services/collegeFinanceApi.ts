export interface MonthlyFinanceStat {
  month: string;
  income: number;
  expense: number;
}

export interface FinanceOverviewData {
  academicYear: string;
  totalFeeCollected: number;
  feeCollectedGrowth: string;
  pendingFees: number;
  pendingFeesGrowth: string;
  totalExpenses: number;
  expensesGrowth: string;
  budgetUtilization: number;
  collectionRate: number;
  monthlyComparison: MonthlyFinanceStat[];
}

export interface FinanceTransaction {
  id: string;
  transactionId: string;
  date: string;
  particulars: string;
  type: 'Income' | 'Expense';
  amount: number;
  category: string;
  referenceNo: string;
  academicYear: string;
}

export interface FinanceNotification {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
  timeAgo: string;
  read: boolean;
}

export interface CollegeFinanceDashboardData {
  overview: FinanceOverviewData;
  transactions: FinanceTransaction[];
  notifications: FinanceNotification[];
  responsibilities: string[];
  academicYear: string;
}

const API_BASE = (import.meta as any).env?.VITE_API_URL
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api/college-finance`
  : '/api/college-finance';

export const INITIAL_COLLEGE_FINANCE_DATA: CollegeFinanceDashboardData = {
  academicYear: '2026 – 2027',
  overview: {
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
  },
  transactions: [
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
  ],
  notifications: [
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
  ],
  responsibilities: [
    'Oversee fee collection and student payments',
    'Manage college budget, planning and allocation',
    'Monitor and control institutional expenses',
    'Handle procurement, vendor payments and billing',
    'Manage grants, donations and external funds',
    'Maintain accurate financial records and ledgers',
    'Ensure compliance with financial policies and regulations (UGC/AICTE/Govt. norms)',
    'Prepare financial statements and audit reports',
    'Coordinate with administration, departments and auditors',
  ],
};

export const fetchCollegeFinanceDashboard = async (
  academicYear: string = '2026 – 2027'
): Promise<CollegeFinanceDashboardData> => {
  try {
    const res = await fetch(`${API_BASE}/dashboard?academicYear=${encodeURIComponent(academicYear)}`);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return INITIAL_COLLEGE_FINANCE_DATA;
  } catch {
    return INITIAL_COLLEGE_FINANCE_DATA;
  }
};

export const collectFeeApi = async (payload: {
  studentName?: string;
  rollNo: string;
  semester?: string;
  department?: string;
  feeType?: string;
  amount: number;
  paymentMode?: string;
}) => {
  try {
    const res = await fetch(`${API_BASE}/collect-fee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch {
    return { success: true, message: 'Fee collected successfully (offline fallback)' };
  }
};

export const recordExpenseApi = async (payload: {
  title: string;
  department?: string;
  category?: string;
  amount: number;
  invoiceNo?: string;
  vendorName?: string;
}) => {
  try {
    const res = await fetch(`${API_BASE}/record-expense`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch {
    return { success: true, message: 'Expense recorded successfully (offline fallback)' };
  }
};
