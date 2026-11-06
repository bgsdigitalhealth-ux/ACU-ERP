import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  Coins,
  BarChart3,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Briefcase,
  Check,
  Receipt,
  UploadCloud,
  PieChart as PieIcon,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  Target,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  CollegeFinanceDashboardData,
  FinanceTransaction,
} from '../../services/collegeFinanceApi';
import { CollectFeeModal } from './modals/CollectFeeModal';
import { GenerateReceiptModal } from './modals/GenerateReceiptModal';
import { RecordExpenseModal } from './modals/RecordExpenseModal';
import { ManageBudgetModal } from './modals/ManageBudgetModal';
import { UploadInvoiceModal } from './modals/UploadInvoiceModal';
import { GenerateReportModal } from './modals/GenerateReportModal';
import { AllTransactionsModal } from './modals/AllTransactionsModal';

interface CollegeFinanceDashboardProps {
  data: CollegeFinanceDashboardData;
  collegeName?: string;
  onRefresh?: () => void;
  onSelectYear?: (year: string) => void;
}

export const CollegeFinanceDashboard: React.FC<CollegeFinanceDashboardProps> = ({
  data,
  collegeName = 'City College of Engineering',
  onRefresh,
  onSelectYear,
}) => {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(data.academicYear || '2026 – 2027');

  // Modals state
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);
  const [isGenerateReceiptOpen, setIsGenerateReceiptOpen] = useState(false);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [isManageBudgetOpen, setIsManageBudgetOpen] = useState(false);
  const [isUploadInvoiceOpen, setIsUploadInvoiceOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [isAllTransactionsOpen, setIsAllTransactionsOpen] = useState(false);

  // Dynamic local state for instant real-time reactive feedback
  const [dashboardData, setDashboardData] = useState<CollegeFinanceDashboardData>(data);

  // Sync if parent updates
  React.useEffect(() => {
    setDashboardData(data);
  }, [data]);

  const { overview, transactions, notifications, responsibilities } = dashboardData;

  // Donut chart data for Fee Collection Overview
  const feeDonutData = [
    { name: 'Collected', value: overview.totalFeeCollected, color: '#16a34a' },
    { name: 'Pending', value: overview.pendingFees, color: '#e2e8f0' },
  ];

  const handleFeeCollectedSuccess = (amount: number, particulars: string) => {
    const newTxn: FinanceTransaction = {
      id: 'txn-' + Date.now(),
      transactionId: 'TXN-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      particulars,
      type: 'Income',
      amount,
      category: 'Tuition Fee',
      referenceNo: 'REC-' + Date.now().toString().slice(-4),
      academicYear: selectedAcademicYear,
    };

    setDashboardData((prev) => {
      const updatedTotal = prev.overview.totalFeeCollected + amount;
      const updatedPending = Math.max(0, prev.overview.pendingFees - amount);
      const updatedRate = Math.min(100, Math.round((updatedTotal / (updatedTotal + updatedPending)) * 100));

      return {
        ...prev,
        overview: {
          ...prev.overview,
          totalFeeCollected: updatedTotal,
          pendingFees: updatedPending,
          collectionRate: updatedRate,
        },
        transactions: [newTxn, ...prev.transactions],
        notifications: [
          {
            id: 'notif-' + Date.now(),
            type: 'success',
            message: `Fee of ₹ ${amount.toLocaleString('en-IN')} received: ${particulars}`,
            timeAgo: 'Just now',
            read: false,
          },
          ...prev.notifications,
        ],
      };
    });
    onRefresh?.();
  };

  const handleExpenseRecordedSuccess = (amount: number, particulars: string) => {
    const newTxn: FinanceTransaction = {
      id: 'txn-' + Date.now(),
      transactionId: 'TXN-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      particulars,
      type: 'Expense',
      amount,
      category: 'Operations',
      referenceNo: 'PO-' + Date.now().toString().slice(-4),
      academicYear: selectedAcademicYear,
    };

    setDashboardData((prev) => {
      const updatedExpenses = prev.overview.totalExpenses + amount;
      const updatedUtil = Math.min(100, Math.round((updatedExpenses / 40000000) * 100));

      return {
        ...prev,
        overview: {
          ...prev.overview,
          totalExpenses: updatedExpenses,
          budgetUtilization: updatedUtil,
        },
        transactions: [newTxn, ...prev.transactions],
        notifications: [
          {
            id: 'notif-' + Date.now(),
            type: 'warning',
            message: `Expense of ₹ ${amount.toLocaleString('en-IN')} recorded: ${particulars}`,
            timeAgo: 'Just now',
            read: false,
          },
          ...prev.notifications,
        ],
      };
    });
    onRefresh?.();
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 bg-[#f4f7fc] min-h-full select-none">
      {/* 1. Header Row: Welcome + Academic Year Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>Welcome, Finance Officer</span>
            <span>👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manage college finances, fee collection, expenses, budgets and reports in one place.
          </p>
        </div>

        {/* Academic Year Selector matching Mockup */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-300/80 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Academic Year:</span>
          <select
            value={selectedAcademicYear}
            onChange={(e) => {
              setSelectedAcademicYear(e.target.value);
              onSelectYear?.(e.target.value);
            }}
            className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer pr-1"
          >
            <option value="2026 – 2027">2026 – 2027</option>
            <option value="2025 – 2026">2025 – 2026</option>
            <option value="2024 – 2025">2024 – 2025</option>
          </select>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards matching Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Fee Collected */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6 text-emerald-600 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Total Fee Collected</p>
            <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap">
              ₹ {overview.totalFeeCollected.toLocaleString('en-IN')}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              <span>{overview.feeCollectedGrowth}</span>
            </span>
          </div>
        </div>

        {/* Card 2: Pending Fees */}
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6 text-rose-500 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Pending Fees</p>
            <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap">
              ₹ {overview.pendingFees.toLocaleString('en-IN')}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 mt-0.5">
              <ArrowDown className="w-3 h-3 stroke-[2.5]" />
              <span>{overview.pendingFeesGrowth}</span>
            </span>
          </div>
        </div>

        {/* Card 3: Total Expenses */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6 text-blue-600 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Total Expenses</p>
            <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap">
              ₹ {overview.totalExpenses.toLocaleString('en-IN')}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              <span>{overview.expensesGrowth}</span>
            </span>
          </div>
        </div>

        {/* Card 4: Budget Utilization */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6 text-purple-600 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Budget Utilization</p>
            <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {overview.budgetUtilization}%
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1.5 border border-purple-100">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${overview.budgetUtilization}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: 3 Blocks matching Mockup (Income vs Expense Chart | Fee Donut Chart | Responsibilities) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart 1: Income vs Expenses (5 cols) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <h3 className="text-sm font-black text-slate-900">Income vs Expenses</h3>
            <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span>Income (Fees, Grants, etc.)</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                <span>Expenses (Salary, Infra, etc.)</span>
              </span>
            </div>
          </div>

          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={overview.monthlyComparison}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                barGap={2}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `₹ ${val} Lakhs`,
                    name === 'income' ? 'Income' : 'Expenses',
                  ]}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="income" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={14} />
                <Bar dataKey="expense" fill="#f97316" radius={[3, 3, 0, 0]} maxBarSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold text-center mt-1">
            Amount (in ₹ Lakhs)
          </div>
        </div>

        {/* Chart 2: Fee Collection Overview Donut (3.5 cols) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-black text-slate-900 pb-1">Fee Collection Overview</h3>

          <div className="relative w-full h-[155px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill="#16a34a" />
                  <Cell fill="#e2e8f0" />
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`₹ ${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{ borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">{overview.collectionRate}%</span>
              <span className="text-[10px] font-bold text-slate-500 mt-0.5">Collected</span>
            </div>
          </div>

          {/* Amounts side-by-side */}
          <div className="space-y-1.5 text-xs pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#16a34a]" />
                <span className="text-slate-600 font-semibold">Collected</span>
              </div>
              <span className="font-bold text-slate-900">₹ {overview.totalFeeCollected.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#cbd5e1]" />
                <span className="text-slate-600 font-semibold">Pending</span>
              </div>
              <span className="font-bold text-slate-900">₹ {overview.pendingFees.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Bottom Green Badge */}
          <div className="mt-3 py-1 px-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-800">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Collection Rate: {overview.collectionRate}%</span>
          </div>
        </div>

        {/* Card 3: Finance Officer Responsibilities (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-blue-100/90 shadow-xs overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white px-4 py-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-black tracking-tight">Finance Officer Responsibilities</h3>
          </div>

          <div className="p-3.5 space-y-2 flex-1 overflow-y-auto max-h-[240px]">
            {responsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug">
                <div className="w-4 h-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-blue-700 stroke-[3]" />
                </div>
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Row 3: Recent Transactions | Quick Actions | Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Recent Transactions Table (5 cols) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900">Recent Transactions</h3>
            <button
              onClick={() => setIsAllTransactionsOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto my-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                  <th className="py-1.5 px-2">Date</th>
                  <th className="py-1.5 px-2">Particulars</th>
                  <th className="py-1.5 px-2">Type</th>
                  <th className="py-1.5 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {transactions.slice(0, 5).map((t) => (
                  <tr key={t.id || t.transactionId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-2 text-slate-500 whitespace-nowrap text-[11px]">{t.date}</td>
                    <td className="py-2 px-2 text-slate-800 font-bold max-w-[150px] truncate">{t.particulars}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          t.type === 'Income'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right font-black text-slate-900 whitespace-nowrap text-[11px]">
                      ₹ {Number(t.amount).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 font-semibold border-t border-slate-100">
            <span>Showing recent 5 ledger entries</span>
            <button
              onClick={() => setIsCollectFeeOpen(true)}
              className="text-blue-600 font-bold hover:underline cursor-pointer"
            >
              + Collect Fee
            </button>
          </div>
        </div>

        {/* Center: Quick Actions (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-2.5 my-2 flex-1">
            {/* 1. Collect Fee */}
            <button
              onClick={() => setIsCollectFeeOpen(true)}
              className="p-3 bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200 shadow-2xs group-hover:scale-110 transition-transform">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Collect Fee</span>
            </button>

            {/* 2. Generate Receipt */}
            <button
              onClick={() => setIsGenerateReceiptOpen(true)}
              className="p-3 bg-sky-50/60 hover:bg-sky-100/70 border border-sky-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200 shadow-2xs group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Generate Receipt</span>
            </button>

            {/* 3. Record Expense */}
            <button
              onClick={() => setIsRecordExpenseOpen(true)}
              className="p-3 bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200 shadow-2xs group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Record Expense</span>
            </button>

            {/* 4. Manage Budget */}
            <button
              onClick={() => setIsManageBudgetOpen(true)}
              className="p-3 bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:scale-110 transition-transform">
                <PieIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Manage Budget</span>
            </button>

            {/* 5. Upload Invoice */}
            <button
              onClick={() => setIsUploadInvoiceOpen(true)}
              className="p-3 bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-200 shadow-2xs group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Upload Invoice</span>
            </button>

            {/* 6. Generate Report */}
            <button
              onClick={() => setIsGenerateReportOpen(true)}
              className="p-3 bg-indigo-50/60 hover:bg-indigo-100/70 border border-indigo-200/80 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200 shadow-2xs group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Generate Report</span>
            </button>
          </div>
        </div>

        {/* Right: Notifications Widget (3 cols) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Notifications</span>
            </h3>
            <button
              onClick={() => setIsAllTransactionsOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 my-2 flex-1">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex items-start gap-2.5 text-xs">
                <div className="mt-0.5 shrink-0">
                  {notif.type === 'success' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.2]" />
                  )}
                  {notif.type === 'warning' && (
                    <AlertCircle className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                  )}
                  {notif.type === 'info' && (
                    <Info className="w-4 h-4 text-blue-500 stroke-[2.2]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 leading-snug">{notif.message}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{notif.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10.5px] text-slate-400 font-semibold border-t border-slate-100 text-center">
            Automated alerts synced with Treasury
          </div>
        </div>
      </div>

      {/* 5. Bottom Banner: End-to-End Finance Management Process Flow */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">End-to-End Finance Management</h4>
            <p className="text-xs text-slate-500 font-medium">
              A complete solution for planning, tracking and reporting college finances.
            </p>
          </div>
        </div>

        {/* Process Flow Stepper with Arrows */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Step 1: Fee Collection */}
          <button
            onClick={() => setIsCollectFeeOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-purple-700" />
            <span>Fee Collection</span>
          </button>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          {/* Step 2: Expense Tracking */}
          <button
            onClick={() => setIsRecordExpenseOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-blue-700" />
            <span>Expense Tracking</span>
          </button>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          {/* Step 3: Budget Control */}
          <button
            onClick={() => setIsManageBudgetOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-700" />
            <span>Budget Control</span>
          </button>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          {/* Step 4: Reports & Audit */}
          <button
            onClick={() => setIsGenerateReportOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-indigo-700" />
            <span>Reports &amp; Audit</span>
          </button>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          {/* Step 5: Compliance */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Compliance</span>
          </div>
        </div>
      </div>

      {/* Interactive Action Modals */}
      <CollectFeeModal
        isOpen={isCollectFeeOpen}
        onClose={() => setIsCollectFeeOpen(false)}
        onSuccess={handleFeeCollectedSuccess}
      />
      <GenerateReceiptModal
        isOpen={isGenerateReceiptOpen}
        onClose={() => setIsGenerateReceiptOpen(false)}
        collegeName={collegeName}
      />
      <RecordExpenseModal
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
        onSuccess={handleExpenseRecordedSuccess}
      />
      <ManageBudgetModal
        isOpen={isManageBudgetOpen}
        onClose={() => setIsManageBudgetOpen(false)}
        onUpdateUtilization={(util) => {
          setDashboardData((prev) => ({
            ...prev,
            overview: { ...prev.overview, budgetUtilization: util },
          }));
        }}
      />
      <UploadInvoiceModal
        isOpen={isUploadInvoiceOpen}
        onClose={() => setIsUploadInvoiceOpen(false)}
        onSuccess={(f) => {
          setDashboardData((prev) => ({
            ...prev,
            notifications: [
              {
                id: 'notif-' + Date.now(),
                type: 'info',
                message: `Invoice file uploaded: ${f}`,
                timeAgo: 'Just now',
                read: false,
              },
              ...prev.notifications,
            ],
          }));
        }}
      />
      <GenerateReportModal
        isOpen={isGenerateReportOpen}
        onClose={() => setIsGenerateReportOpen(false)}
        collegeName={collegeName}
      />
      <AllTransactionsModal
        isOpen={isAllTransactionsOpen}
        onClose={() => setIsAllTransactionsOpen(false)}
        transactions={transactions}
      />
    </div>
  );
};
