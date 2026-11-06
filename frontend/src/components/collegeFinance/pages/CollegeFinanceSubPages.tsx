import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Printer,
  Plus,
  CheckCircle2,
  Clock,
  CreditCard,
  Receipt,
  Users,
  PieChart,
  ShoppingCart,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Settings,
  ChevronRight,
  Send,
  Sparkles,
  RefreshCw,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import {
  CollegeFinanceDashboardData,
  collectFeeApi,
  recordExpenseApi,
} from '../../../services/collegeFinanceApi';

interface CollegeFinanceSubPagesProps {
  activeTab: string;
  onBack: () => void;
  data: CollegeFinanceDashboardData;
  collegeName?: string;
  onRefresh?: () => void;
  onFeeCollected?: (amount: number, particulars: string) => void;
  onExpenseRecorded?: (amount: number, particulars: string) => void;
}

export const CollegeFinanceSubPages: React.FC<CollegeFinanceSubPagesProps> = ({
  activeTab,
  onBack,
  data,
  collegeName = 'City College of Engineering',
  onRefresh,
  onFeeCollected,
  onExpenseRecorded,
}) => {
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // 1. Fee Concession / Waiver State
  const [concessions, setConcessions] = useState([
    {
      id: 'CONC-2026-101',
      studentName: 'Rahul Sharma',
      rollNo: 'CSE23014',
      course: 'B.Tech - Computer Science',
      category: 'Merit-Based (CET Top 500)',
      originalFee: 125000,
      concessionPct: 25,
      waivedAmount: 31250,
      netPayable: 93750,
      approvedBy: 'Principal / Management',
      status: 'Approved',
      date: '02 Nov 2026',
    },
    {
      id: 'CONC-2026-102',
      studentName: 'Ananya Deshmukh',
      rollNo: 'ECE23089',
      course: 'B.Tech - Electronics & Comm',
      category: 'Sports Quota (National Level)',
      originalFee: 125000,
      concessionPct: 50,
      waivedAmount: 62500,
      netPayable: 62500,
      approvedBy: 'Sports Board & Principal',
      status: 'Approved',
      date: '31 Oct 2026',
    },
    {
      id: 'CONC-2026-103',
      studentName: 'Mohammed Tariq',
      rollNo: 'ME23045',
      course: 'B.Tech - Mechanical Engg',
      category: 'EWS / Need-Based',
      originalFee: 120000,
      concessionPct: 35,
      waivedAmount: 42000,
      netPayable: 78000,
      approvedBy: 'Under Verification',
      status: 'Pending Review',
      date: '30 Oct 2026',
    },
    {
      id: 'CONC-2026-104',
      studentName: 'Sneha Patel',
      rollNo: 'AIDS23012',
      course: 'B.Tech - AI & Data Science',
      category: 'Staff Ward Concession',
      originalFee: 130000,
      concessionPct: 40,
      waivedAmount: 52000,
      netPayable: 78000,
      approvedBy: 'HR & Finance Officer',
      status: 'Approved',
      date: '28 Oct 2026',
    },
    {
      id: 'CONC-2026-105',
      studentName: 'Vikas Gowda',
      rollNo: 'CIV23023',
      course: 'B.Tech - Civil Engg',
      category: 'Rural Talent Scholarship',
      originalFee: 110000,
      concessionPct: 20,
      waivedAmount: 22000,
      netPayable: 88000,
      approvedBy: 'Committee Review',
      status: 'Pending Review',
      date: '27 Oct 2026',
    },
    {
      id: 'CONC-2026-106',
      studentName: 'Priya Kulkarni',
      rollNo: 'MBA23008',
      course: 'MBA - Finance Management',
      category: 'Merit-Based (PGCET Rank 12)',
      originalFee: 150000,
      concessionPct: 30,
      waivedAmount: 45000,
      netPayable: 105000,
      approvedBy: 'Director & Finance Officer',
      status: 'Approved',
      date: '25 Oct 2026',
    },
  ]);

  // Inline Form state for new concession
  const [showAddConcession, setShowAddConcession] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newCourse, setNewCourse] = useState('B.Tech - Computer Science');
  const [newCategory, setNewCategory] = useState('Merit-Based (CET Top 500)');
  const [newFee, setNewFee] = useState(125000);
  const [newPct, setNewPct] = useState(25);

  // 2. Fee Collection Form State
  const [collStudentName, setCollStudentName] = useState('');
  const [collRollNo, setCollRollNo] = useState('');
  const [collDept, setCollDept] = useState('Computer Science & Engg (CSE)');
  const [collSem, setCollSem] = useState('Sem 3');
  const [collFeeType, setCollFeeType] = useState('Tuition Fee');
  const [collAmount, setCollAmount] = useState('125000');
  const [collMode, setCollMode] = useState('UPI / Net Banking');
  const [collSubmitting, setCollSubmitting] = useState(false);

  // 3. Create Expense Form State
  const [expTitle, setExpTitle] = useState('');
  const [expDept, setExpDept] = useState('Computer Science & Engg');
  const [expCat, setExpCat] = useState('Laboratory');
  const [expAmount, setExpAmount] = useState('45000');
  const [expVendor, setExpVendor] = useState('');
  const [expInvoiceNo, setExpInvoiceNo] = useState('');
  const [expSubmitting, setExpSubmitting] = useState(false);

  // 4. Budget Planning Allocation State
  const [departmentBudgets, setDepartmentBudgets] = useState([
    { dept: 'Computer Science & Engineering', allocated: 9500000, spent: 7800000 },
    { dept: 'Electronics & Communication', allocated: 7200000, spent: 5800000 },
    { dept: 'Mechanical Engineering', allocated: 5500000, spent: 4400000 },
    { dept: 'Civil Engineering', allocated: 4800000, spent: 3900000 },
    { dept: 'Artificial Intelligence & DS', allocated: 6000000, spent: 4800000 },
    { dept: 'Management Studies (MBA)', allocated: 3500000, spent: 2700000 },
    { dept: 'Central Library & Resources', allocated: 2500000, spent: 1800000 },
    { dept: 'Campus Infrastructure & Labs', allocated: 6000000, spent: 4820000 },
  ]);

  // Handle Add Concession
  const handleCreateConcession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newRollNo) return;
    const waived = Math.round((newFee * newPct) / 100);
    const net = newFee - waived;
    const item = {
      id: `CONC-2026-${Math.floor(110 + Math.random() * 890)}`,
      studentName: newStudentName,
      rollNo: newRollNo,
      course: newCourse,
      category: newCategory,
      originalFee: Number(newFee),
      concessionPct: Number(newPct),
      waivedAmount: waived,
      netPayable: net,
      approvedBy: 'Finance Officer (Auto-Verified)',
      status: 'Approved',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setConcessions([item, ...concessions]);
    setShowAddConcession(false);
    setNewStudentName('');
    setNewRollNo('');
    setSuccessBanner(`Concession application #${item.id} for ${item.studentName} created & approved successfully!`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  // Handle Collect Fee Form Submission
  const handleFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collRollNo || !collAmount) return;
    setCollSubmitting(true);
    const numAmt = Number(collAmount);
    await collectFeeApi({
      studentName: collStudentName,
      rollNo: collRollNo,
      department: collDept,
      semester: collSem,
      feeType: collFeeType,
      amount: numAmt,
      paymentMode: collMode,
    });
    setCollSubmitting(false);
    onFeeCollected?.(numAmt, `Student Fee – ${collRollNo} (${collDept} ${collSem})`);
    onRefresh?.();
    setSuccessBanner(`Fee payment of ₹ ${numAmt.toLocaleString('en-IN')} collected for ${collRollNo}! Receipt generated.`);
    setTimeout(() => setSuccessBanner(null), 5000);
    setCollRollNo('');
    setCollStudentName('');
  };

  // Handle Expense Submit
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expAmount) return;
    setExpSubmitting(true);
    const numAmt = Number(expAmount);
    await recordExpenseApi({
      title: expTitle,
      department: expDept,
      category: expCat,
      amount: numAmt,
      vendorName: expVendor,
      invoiceNo: expInvoiceNo,
    });
    setExpSubmitting(false);
    onExpenseRecorded?.(numAmt, `${expTitle} [${expDept}]`);
    onRefresh?.();
    setSuccessBanner(`Expense voucher of ₹ ${numAmt.toLocaleString('en-IN')} for "${expTitle}" recorded successfully!`);
    setTimeout(() => setSuccessBanner(null), 5000);
    setExpTitle('');
    setExpAmount('45000');
    setExpVendor('');
    setExpInvoiceNo('');
  };

  // Determine section title and icon based on activeTab
  const getSubPageMeta = () => {
    const tab = activeTab.toLowerCase();
    if (tab.includes('concession') || tab.includes('waiver')) {
      return {
        section: 'Fee Management',
        title: 'Fee Concession & Scholarship Waiver',
        description: 'Manage, verify and audit institutional tuition concessions, merit scholarships, and financial aid waivers.',
        icon: BadgeCheck,
      };
    }
    if (tab.includes('collect fee')) {
      return {
        section: 'Fee Management',
        title: 'Collect Student Fee Terminal',
        description: 'Process student semester tuition, lab, examination, and hostel fee collections with instant receipt generation.',
        icon: CreditCard,
      };
    }
    if (tab.includes('fee structure')) {
      return {
        section: 'Fee Management',
        title: 'College Fee Structure',
        description: 'Comprehensive academic fee schedule by program, department, quota, and semester.',
        icon: FileText,
      };
    }
    if (tab.includes('payment status') || tab.includes('fee dues')) {
      return {
        section: 'Fee Management',
        title: 'Student Payment Status & Outstanding Dues',
        description: 'Track student payment status, outstanding fees, and trigger automated SMS/Email reminders.',
        icon: Clock,
      };
    }
    if (tab.includes('generate receipt')) {
      return {
        section: 'Payments & Receipts',
        title: 'Generate Official Fee Receipt',
        description: 'Create and preview authorized college fee receipts with digital verification seals.',
        icon: Receipt,
      };
    }
    if (tab.includes('receipt history') || tab.includes('all-txns') || tab.includes('all transactions')) {
      return {
        section: 'Payments & Receipts',
        title: 'College Financial Transactions & Receipt History',
        description: 'Master ledger of all fee collection receipts, expenditure vouchers, and grant inflows.',
        icon: TrendingUp,
      };
    }
    if (tab.includes('budget') || tab.includes('allocation')) {
      return {
        section: 'Budget & Planning',
        title: 'Annual Budget & Department Allocation',
        description: 'Plan, allocate, and monitor departmental financial budgets against real-time institutional burn rate.',
        icon: PieChart,
      };
    }
    if (tab.includes('expense') || tab.includes('procurement')) {
      return {
        section: 'Expenses & Procurement',
        title: 'Institutional Expenses & Procurement',
        description: 'Record operating expenditures, vendor invoices, laboratory procurement, and utility bills.',
        icon: ShoppingCart,
      };
    }
    if (tab.includes('report') || tab.includes('analytics')) {
      return {
        section: 'Reports & Analytics',
        title: 'Financial Reports & Analytics',
        description: 'Generate compliance statements, fee collection summaries, income vs expenditure sheets, and audit files.',
        icon: TrendingUp,
      };
    }
    if (tab.includes('compliance') || tab.includes('audit')) {
      return {
        section: 'Compliance & Audit',
        title: 'Compliance & Audit Management',
        description: 'Track regulatory filings, AICTE/UGC mandates, statutory audit observations, and compliance certificates.',
        icon: ShieldCheck,
      };
    }
    if (tab.includes('student account') || tab.includes('ledger') || tab.includes('statement')) {
      return {
        section: 'Student Accounts',
        title: 'Student Accounts & Debit/Credit Ledger',
        description: 'Detailed student financial profiles, fee receipts history, balance adjustments, and account reconciliation.',
        icon: Users,
      };
    }
    if (tab.includes('grant') || tab.includes('fund')) {
      return {
        section: 'Grants & Funds',
        title: 'Research Grants & External Funds',
        description: 'Monitor DST, AICTE, VGST, and industry sponsored research grants, milestones, and utilization certificates.',
        icon: Landmark,
      };
    }
    return {
      section: 'Settings & Administration',
      title: activeTab,
      description: `Comprehensive administration and configuration for ${activeTab} across ${collegeName}.`,
      icon: Settings,
    };
  };

  const meta = getSubPageMeta();
  const PageIcon = meta.icon;

  // Filter concessions
  const filteredConcessions = concessions.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category.includes(categoryFilter);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="w-full min-h-full bg-[#f4f7fc] p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 select-none">
      {/* 1. Page Header & Breadcrumb Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
            <button
              onClick={onBack}
              className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Dashboard</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">{meta.section}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-600 font-bold">{activeTab}</span>
          </div>

          {/* Title with Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <PageIcon className="w-5 h-5 text-blue-600 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {meta.title}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-2xl">
                {meta.description} &bull; Academic Year: <span className="font-bold text-slate-800">{data.academicYear}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Dashboard Button & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onRefresh?.()}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync</span>
          </button>

          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xs animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs sm:text-sm font-bold">{successBanner}</p>
        </div>
      )}

      {/* =========================================================================
          VIEW 1: Fee Concession / Waiver Page (The exact request in the screenshot!)
          ========================================================================= */}
      {(activeTab.toLowerCase().includes('concession') || activeTab.toLowerCase().includes('waiver')) && (
        <div className="space-y-6">
          {/* Top 4 Concession KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Approved Waivers</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">₹ 18,45,000</h3>
                <span className="text-[11px] font-bold text-emerald-600">142 Students Benefitted</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Review</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">₹ 4,20,000</h3>
                <span className="text-[11px] font-bold text-amber-600">28 Applications in Queue</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Merit Scholarships</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">₹ 11,25,000</h3>
                <span className="text-[11px] font-bold text-blue-600">CET / JEE Top Rankers</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sports & EWS Quota</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">₹ 7,20,000</h3>
                <span className="text-[11px] font-bold text-purple-600">Needs & Sports Category</span>
              </div>
            </div>
          </div>

          {/* Add New Concession Inline Form */}
          {showAddConcession && (
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg space-y-4 animate-in slide-in-from-top-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-base text-slate-900">New Fee Concession / Waiver Application</h3>
                </div>
                <button
                  onClick={() => setShowAddConcession(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateConcession} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="e.g. Aditya Varma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Roll No / USN *</label>
                  <input
                    type="text"
                    required
                    value={newRollNo}
                    onChange={(e) => setNewRollNo(e.target.value)}
                    placeholder="e.g. 1CE23CS012"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Course & Branch</label>
                  <select
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="B.Tech - Computer Science">B.Tech - Computer Science</option>
                    <option value="B.Tech - Electronics & Comm">B.Tech - Electronics & Comm</option>
                    <option value="B.Tech - Mechanical Engg">B.Tech - Mechanical Engg</option>
                    <option value="B.Tech - Civil Engg">B.Tech - Civil Engg</option>
                    <option value="B.Tech - AI & Data Science">B.Tech - AI & Data Science</option>
                    <option value="MBA - Finance Management">MBA - Finance Management</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Concession Scheme / Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Merit-Based (CET Top 500)">Merit-Based (CET Top 500)</option>
                    <option value="Sports Quota (National Level)">Sports Quota (National Level)</option>
                    <option value="EWS / Need-Based">EWS / Need-Based</option>
                    <option value="Staff Ward Concession">Staff Ward Concession</option>
                    <option value="Rural Talent Scholarship">Rural Talent Scholarship</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Standard Annual Fee (₹)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Waiver Percentage (%)</label>
                  <select
                    value={newPct}
                    onChange={(e) => setNewPct(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value={15}>15% Concession</option>
                    <option value={20}>20% Concession</option>
                    <option value={25}>25% Concession</option>
                    <option value={30}>30% Concession</option>
                    <option value={50}>50% Concession</option>
                    <option value={100}>100% Full Scholarship</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddConcession(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Apply Waiver</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Action Bar: Search, Filters, Add Button, Export */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, roll no, application..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent font-bold text-blue-600 outline-none cursor-pointer"
                >
                  <option value="All">All Applications</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                <span>Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Merit">Merit-Based</option>
                  <option value="Sports">Sports Quota</option>
                  <option value="EWS">EWS / Need</option>
                  <option value="Staff">Staff Ward</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => {
                  const csv = concessions.map((c) => `${c.id},${c.studentName},${c.rollNo},${c.category},${c.waivedAmount},${c.status}`).join('\n');
                  const blob = new Blob([`Application,Student,RollNo,Category,WaivedAmt,Status\n${csv}`], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Fee_Concessions_${Date.now()}.csv`;
                  a.click();
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setShowAddConcession(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Concession Request</span>
              </button>
            </div>
          </div>

          {/* Full Interactive Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Application ID</th>
                    <th className="py-3.5 px-4">Student & Roll No</th>
                    <th className="py-3.5 px-4">Course</th>
                    <th className="py-3.5 px-4">Concession Scheme</th>
                    <th className="py-3.5 px-4 text-right">Original Fee</th>
                    <th className="py-3.5 px-4 text-center">Waiver %</th>
                    <th className="py-3.5 px-4 text-right">Waived Amount</th>
                    <th className="py-3.5 px-4 text-right">Net Payable</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredConcessions.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.rollNo}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {item.course}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-slate-100 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-slate-500">
                        ₹ {item.originalFee.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full text-[11px] border border-purple-200">
                          {item.concessionPct}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-emerald-600">
                        - ₹ {item.waivedAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900">
                        ₹ {item.netPayable.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'Approved' ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
                            <Clock className="w-3 h-3" />
                            Pending Review
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'Pending Review' ? (
                          <button
                            onClick={() => {
                              setConcessions(
                                concessions.map((c) =>
                                  c.id === item.id ? { ...c, status: 'Approved', approvedBy: 'Finance Officer' } : c
                                )
                              );
                              setSuccessBanner(`Concession #${item.id} approved successfully!`);
                              setTimeout(() => setSuccessBanner(null), 4000);
                            }}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`Certificate of Concession for ${item.studentName} (${item.id}) is verified and filed under Finance Record.`)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold cursor-pointer"
                          >
                            View Slip
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-xs text-slate-500 font-semibold flex items-center justify-between">
              <span>Showing {filteredConcessions.length} of {concessions.length} total concession records</span>
              <span className="text-[11px] text-slate-400">Compliant with State Higher Education Scholarships & UGC Guidelines</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: Collect Fee Full Page Terminal
          ========================================================================= */}
      {activeTab.toLowerCase().includes('collect fee') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fee Collection Terminal Form (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-lg text-slate-900">Student Fee Collection Terminal</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                Live Counter Active
              </span>
            </div>

            <form onSubmit={handleFeeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student Roll No / USN *</label>
                  <input
                    type="text"
                    required
                    value={collRollNo}
                    onChange={(e) => setCollRollNo(e.target.value)}
                    placeholder="e.g. 1CE23CS012"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={collStudentName}
                    onChange={(e) => setCollStudentName(e.target.value)}
                    placeholder="e.g. Aditya Varma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Department / Branch</label>
                  <select
                    value={collDept}
                    onChange={(e) => setCollDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Computer Science & Engg (CSE)">Computer Science & Engg (CSE)</option>
                    <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                    <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                    <option value="Civil Engineering (CV)">Civil Engineering (CV)</option>
                    <option value="Artificial Intelligence (AI&DS)">Artificial Intelligence (AI&DS)</option>
                    <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
                  <select
                    value={collSem}
                    onChange={(e) => setCollSem(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Sem 1">Sem 1 (First Year)</option>
                    <option value="Sem 2">Sem 2</option>
                    <option value="Sem 3">Sem 3 (Second Year)</option>
                    <option value="Sem 4">Sem 4</option>
                    <option value="Sem 5">Sem 5 (Third Year)</option>
                    <option value="Sem 6">Sem 6</option>
                    <option value="Sem 7">Sem 7 (Final Year)</option>
                    <option value="Sem 8">Sem 8</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fee Category / Component</label>
                  <select
                    value={collFeeType}
                    onChange={(e) => setCollFeeType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Tuition Fee">Tuition Fee</option>
                    <option value="Hostel & Mess Fee">Hostel & Mess Fee</option>
                    <option value="Examination Fee">Examination Fee</option>
                    <option value="Laboratory & Development Fee">Laboratory & Development Fee</option>
                    <option value="Library & Sports Fee">Library & Sports Fee</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Payment Mode</label>
                  <select
                    value={collMode}
                    onChange={(e) => setCollMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="UPI / Net Banking">UPI / Net Banking (Instant QR)</option>
                    <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                    <option value="NEFT / RTGS">NEFT / RTGS Wire Transfer</option>
                    <option value="Credit / Debit Card (POS)">Credit / Debit Card (POS)</option>
                    <option value="Bank Challan">Cash / Bank Challan</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Collection Amount (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">₹</span>
                    <input
                      type="number"
                      required
                      value={collAmount}
                      onChange={(e) => setCollAmount(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Auto-synced with college bank account & ledger</span>
                <button
                  type="submit"
                  disabled={collSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{collSubmitting ? 'Recording...' : 'Collect Fee & Generate Receipt'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Receipt Preview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receipt Preview</span>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                  REC-2026-LIVE
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-4 space-y-3 text-xs">
                <div className="text-center pb-2 border-b border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm leading-tight">{collegeName}</h4>
                  <p className="text-[10px] text-slate-500">Official Fee Counter &bull; Bangalore</p>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Roll No:</span>
                  <span className="font-bold text-slate-800">{collRollNo || '1CE23CS012'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-800">{collStudentName || 'Aditya Varma'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Fee Head:</span>
                  <span className="font-bold text-slate-800">{collFeeType}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Mode:</span>
                  <span className="font-bold text-slate-800">{collMode}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-600">₹ {Number(collAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Copy</span>
              </button>
              <button
                onClick={() => alert('Receipt PDF sent to student registered email and WhatsApp.')}
                className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Student</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: Fee Structure Full Page
          ========================================================================= */}
      {activeTab.toLowerCase().includes('fee structure') && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Program Filter:</span>
              <select className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 cursor-pointer">
                <option>All Engineering Programs (B.Tech)</option>
                <option>Postgraduate Programs (M.Tech / MBA)</option>
                <option>Doctoral Programs (Ph.D)</option>
              </select>
            </div>
            <button
              onClick={() => alert('Fee structure exported as official gazette PDF.')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Fee Schedule PDF</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600 uppercase">
                  <th className="py-3.5 px-4">Department / Program</th>
                  <th className="py-3.5 px-4">Govt / CET Quota</th>
                  <th className="py-3.5 px-4">Comed-K Quota</th>
                  <th className="py-3.5 px-4">Management Quota</th>
                  <th className="py-3.5 px-4">Exam & Lab Fee</th>
                  <th className="py-3.5 px-4 text-right">Annual Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {[
                  { dept: 'B.Tech - Computer Science & Engineering', cet: '₹ 85,000', comedk: '₹ 1,95,000', mgmt: '₹ 2,75,000', exam: '₹ 15,000', total: '₹ 1,25,000 – ₹ 2,90,000' },
                  { dept: 'B.Tech - Artificial Intelligence & Data Science', cet: '₹ 85,000', comedk: '₹ 1,85,000', mgmt: '₹ 2,50,000', exam: '₹ 15,000', total: '₹ 1,25,000 – ₹ 2,65,000' },
                  { dept: 'B.Tech - Electronics & Communication Engg', cet: '₹ 85,000', comedk: '₹ 1,75,000', mgmt: '₹ 2,25,000', exam: '₹ 15,000', total: '₹ 1,25,000 – ₹ 2,40,000' },
                  { dept: 'B.Tech - Mechanical Engineering', cet: '₹ 85,000', comedk: '₹ 1,35,000', mgmt: '₹ 1,60,000', exam: '₹ 15,000', total: '₹ 1,15,000 – ₹ 1,75,000' },
                  { dept: 'B.Tech - Civil Engineering', cet: '₹ 85,000', comedk: '₹ 1,25,000', mgmt: '₹ 1,50,000', exam: '₹ 15,000', total: '₹ 1,10,000 – ₹ 1,65,000' },
                  { dept: 'Master of Business Administration (MBA)', cet: '₹ 65,000', comedk: '₹ 1,45,000', mgmt: '₹ 2,00,000', exam: '₹ 20,000', total: '₹ 1,00,000 – ₹ 2,20,000' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.dept}</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">{row.cet}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{row.comedk}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{row.mgmt}</td>
                    <td className="py-3.5 px-4 text-slate-500">{row.exam}</td>
                    <td className="py-3.5 px-4 text-right font-black text-blue-700">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: Budget & Planning Full Page
          ========================================================================= */}
      {(activeTab.toLowerCase().includes('budget') || activeTab.toLowerCase().includes('allocation')) && (
        <div className="space-y-6">
          {/* Budget Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Sanctioned Annual Budget</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">₹ 4,50,00,000</h3>
              <span className="text-[11px] font-bold text-blue-600">FY 2026 – 2027</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Allocated to Departments</span>
              <h3 className="text-xl font-black text-purple-700 mt-1">₹ 4,50,00,000</h3>
              <span className="text-[11px] font-bold text-purple-600">100% Departmentalized</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Utilized to Date</span>
              <h3 className="text-xl font-black text-emerald-700 mt-1">₹ 3,10,20,000</h3>
              <span className="text-[11px] font-bold text-emerald-600">78% Burn Rate</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Remaining Reserves</span>
              <h3 className="text-xl font-black text-amber-700 mt-1">₹ 1,39,80,000</h3>
              <span className="text-[11px] font-bold text-amber-600">Sufficient for Q3/Q4</span>
            </div>
          </div>

          {/* Departmental Allocation Table with Live Meters */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-base text-slate-900">Departmental Budget Allocations & Utilization</h3>
                <p className="text-xs text-slate-500">Live monitoring of expenditure caps by cost center</p>
              </div>
              <button
                onClick={() => {
                  setDepartmentBudgets((prev) => [...prev]);
                  setSuccessBanner('Department budget allocations saved and updated in central ERP database!');
                  setTimeout(() => setSuccessBanner(null), 4000);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Allocations</span>
              </button>
            </div>

            <div className="space-y-4">
              {departmentBudgets.map((item, idx) => {
                const pct = Math.round((item.spent / item.allocated) * 100);
                return (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-bold text-slate-900 text-sm">{item.dept}</span>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-500">
                          Allocated: <b className="text-slate-800">₹ {item.allocated.toLocaleString('en-IN')}</b>
                        </span>
                        <span className="text-slate-500">
                          Spent: <b className="text-emerald-700">₹ {item.spent.toLocaleString('en-IN')}</b>
                        </span>
                        <span className="font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {pct}%
                        </span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct > 85 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: Create Expense & Procurement Full Page
          ========================================================================= */}
      {(activeTab.toLowerCase().includes('expense') || activeTab.toLowerCase().includes('procurement')) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-lg text-slate-900">Record Institutional Expense / Bill</h3>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full border border-amber-200">
                Voucher Entry
              </span>
            </div>

            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Expense Title / Description *</label>
                  <input
                    type="text"
                    required
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    placeholder="e.g. Dell High-Performance Server for AI Lab"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={expDept}
                    onChange={(e) => setExpDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Computer Science & Engg">Computer Science & Engg</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Campus Facilities & Maintenance">Campus Facilities & Maintenance</option>
                    <option value="Central Library">Central Library</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Expense Category</label>
                  <select
                    value={expCat}
                    onChange={(e) => setExpCat(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Laboratory">Laboratory & Research</option>
                    <option value="Operations">Operations & Administration</option>
                    <option value="Infrastructure">Infrastructure & Civil Work</option>
                    <option value="IT & Networking">IT & Networking</option>
                    <option value="Library Books">Library Books & Subscriptions</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Vendor Name</label>
                  <input
                    type="text"
                    value={expVendor}
                    onChange={(e) => setExpVendor(e.target.value)}
                    placeholder="e.g. Dell Technologies India"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Invoice / PO Number</label>
                  <input
                    type="text"
                    value={expInvoiceNo}
                    onChange={(e) => setExpInvoiceNo(e.target.value)}
                    placeholder="e.g. INV-DELL-8839"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Total Bill Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={expSubmitting}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{expSubmitting ? 'Recording...' : 'Record Expense Voucher'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Expense Guidelines */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Procurement Guidelines</h4>
            <ul className="text-xs text-slate-600 space-y-2.5 list-disc pl-4 font-medium">
              <li>Purchases above ₹ 50,000 require minimum 3 competitive quotations.</li>
              <li>GST compliance check is mandatory before releasing vendor payments.</li>
              <li>Asset tag numbers must be registered with Central Stores prior to voucher clearance.</li>
              <li>Audit sign-off required for capital expenditure items above ₹ 2,00,000.</li>
            </ul>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: All Transactions & Master Ledger Full Page
          ========================================================================= */}
      {(activeTab.toLowerCase().includes('receipt history') ||
        activeTab.toLowerCase().includes('all-txns') ||
        activeTab.toLowerCase().includes('all transactions') ||
        activeTab.toLowerCase().includes('payment verification') ||
        activeTab.toLowerCase().includes('statement')) && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-black text-base text-slate-900">Master Financial Transaction Ledger</h3>
              <p className="text-xs text-slate-500">Official audited transactions for Academic Year {data.academicYear}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filter:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Income">Income (Fees & Grants)</option>
                <option value="Expense">Expense (Bills & POs)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600 uppercase">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Particulars</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reference No</th>
                  <th className="py-3 px-4 text-center">Type</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {data.transactions
                  .filter((t) => categoryFilter === 'All' || t.type === categoryFilter)
                  .map((txn, idx) => (
                    <tr key={txn.id || idx} className="hover:bg-blue-50/30">
                      <td className="py-3 px-4 text-slate-500">{txn.date}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{txn.transactionId}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{txn.particulars}</td>
                      <td className="py-3 px-4 text-slate-600">{txn.category || 'General'}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{txn.referenceNo || 'N/A'}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            txn.type === 'Income'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-black text-slate-900">
                        {txn.type === 'Income' ? '+' : '-'} ₹ {txn.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 7: Universal Full Page for Any Other Subcontent
          ========================================================================= */}
      {!activeTab.toLowerCase().includes('concession') &&
        !activeTab.toLowerCase().includes('waiver') &&
        !activeTab.toLowerCase().includes('collect fee') &&
        !activeTab.toLowerCase().includes('fee structure') &&
        !activeTab.toLowerCase().includes('budget') &&
        !activeTab.toLowerCase().includes('allocation') &&
        !activeTab.toLowerCase().includes('expense') &&
        !activeTab.toLowerCase().includes('procurement') &&
        !activeTab.toLowerCase().includes('receipt history') &&
        !activeTab.toLowerCase().includes('all-txns') &&
        !activeTab.toLowerCase().includes('all transactions') && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">{activeTab} Management</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Institutional record ledger for {activeTab} across {collegeName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Exporting ${activeTab} data sheet...`)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => {
                    setSuccessBanner(`${activeTab} record saved & synced with central controller.`);
                    setTimeout(() => setSuccessBanner(null), 4000);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Update Record</span>
                </button>
              </div>
            </div>

            {/* General Subpage Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Operational Status</span>
                <h4 className="text-lg font-black text-emerald-700 mt-1">Verified & Active</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Updated for {data.academicYear}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Audit Compliance</span>
                <h4 className="text-lg font-black text-blue-700 mt-1">100% Compliant</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">UGC / AICTE Norms Met</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Authorized Authority</span>
                <h4 className="text-lg font-black text-slate-900 mt-1">Finance Officer</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{collegeName}</p>
              </div>
            </div>

            {/* General Subpage Ledger */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600 uppercase">
                    <th className="py-3 px-4">Parameter / Item</th>
                    <th className="py-3 px-4">Scope</th>
                    <th className="py-3 px-4">Last Verified Date</th>
                    <th className="py-3 px-4">Compliance Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {[
                    { item: `${activeTab} Primary Regulation Register`, scope: 'Institutional', date: '02 Nov 2026', status: 'Compliant' },
                    { item: `${activeTab} Departmental Distribution`, scope: 'All Branches', date: '30 Oct 2026', status: 'Active' },
                    { item: `${activeTab} Quarterly Reconciliation`, scope: 'Statutory Audit', date: '28 Oct 2026', status: 'Audited' },
                    { item: `${activeTab} Annual Archival & Filing`, scope: 'Apex Council', date: '25 Oct 2026', status: 'Submitted' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{row.item}</td>
                      <td className="py-3 px-4 text-slate-600">{row.scope}</td>
                      <td className="py-3 px-4 text-slate-500">{row.date}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => alert(`Viewing details for ${row.item}`)}
                          className="text-blue-600 hover:text-blue-800 font-bold text-xs cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
};
