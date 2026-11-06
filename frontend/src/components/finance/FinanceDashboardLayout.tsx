import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { FinanceQuickActionModal } from './FinanceQuickActionModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Home,
  CreditCard,
  Receipt,
  Users,
  Coins,
  ShoppingCart,
  Award,
  BarChart3,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Briefcase,
  UploadCloud,
  LogOut,
  Building2,
  GraduationCap,
  Target,
} from 'lucide-react';

interface FinanceDashboardLayoutProps {
  onLogout: () => void;
  collegeName?: string;
}

export const FinanceDashboardLayout: React.FC<FinanceDashboardLayoutProps> = ({
  onLogout,
  collegeName = 'City College of Engineering',
}) => {
  const {
    data,
    academicYear,
    setAcademicYear,
    searchQuery,
    setSearchQuery,
    activeNav,
    setActiveNav,
    toastMessage,
    openQuickAction,
  } = useFinance();

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    feeManagement: true,
    payments: false,
    studentAccounts: false,
    budget: false,
    expenses: false,
    grants: false,
    reports: false,
    compliance: false,
    settings: false,
  });

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { summary, monthlyChart, recentTransactions, responsibilities, notifications } = data;

  // Donut chart data for Fee Collection Overview
  const donutData = [
    { name: 'Collected', value: summary.totalFeeCollected, color: '#16a34a' },
    { name: 'Pending', value: summary.pendingFees, color: '#cbd5e1' },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fc] text-slate-800 flex flex-col font-sans select-none antialiased">
      <FinanceQuickActionModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-[#0f3470] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-blue-400/40 text-xs animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. TOP HEADER (Dark Blue Gradient matching Screenshot) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0d2a5e] via-[#123e85] to-[#184ea6] text-white px-4 sm:px-6 py-2.5 shadow-md flex items-center justify-between gap-4">
        {/* Left: College Emblem & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/20">
            <GraduationCap className="w-6 h-6 text-[#123e85]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white truncate">
                {collegeName}
              </h1>
              <span className="hidden md:inline text-white/40 font-light">|</span>
              <span className="hidden md:inline text-xs font-semibold text-blue-200">
                College Finance Management System
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-blue-100 tracking-wide">
                Finance Officer Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Right: Search, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Live Search Input */}
          <div className="relative hidden md:block w-72 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, fees, invoices, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 rounded-full border border-blue-300/40 focus:ring-2 focus:ring-blue-400 focus:outline-hidden shadow-xs transition-all"
            />
          </div>

          {/* Notification Bell */}
          <div className="relative cursor-pointer p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#123e85]" />
          </div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xs text-white">
              FO
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">Finance Officer</span>
              <span className="text-[10px] text-blue-200 font-medium leading-none">Accounts &amp; Treasury</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Logout / Switch Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. BODY: LEFT SIDEBAR + MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ==================== SIDEBAR ==================== */}
        <aside className="w-64 shrink-0 bg-[#0c244d] text-white/90 border-r border-[#163870] flex flex-col justify-between overflow-y-auto">
          <div className="p-3 space-y-1 text-xs">
            {/* Dashboard (Home) */}
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-bold transition-all cursor-pointer ${
                activeNav === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* Fee Management */}
            <div>
              <button
                onClick={() => toggleMenu('feeManagement')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-blue-300" />
                  <span>Fee Management</span>
                </div>
                {expandedMenus.feeManagement ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.feeManagement && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div
                    onClick={() => setActiveNav('fee-structure')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Fee Structure
                  </div>
                  <div
                    onClick={() => openQuickAction('collect-fee')}
                    className="py-1 hover:text-white cursor-pointer transition-colors text-emerald-300 font-bold"
                  >
                    &bull; Collect Fee
                  </div>
                  <div
                    onClick={() => setActiveNav('fee-concession')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Fee Concession / Waiver
                  </div>
                  <div
                    onClick={() => setActiveNav('payment-status')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Payment Status
                  </div>
                  <div
                    onClick={() => setActiveNav('fee-dues')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Fee Dues &amp; Reminders
                  </div>
                </div>
              )}
            </div>

            {/* Payments & Receipts */}
            <div>
              <button
                onClick={() => toggleMenu('payments')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-purple-300" />
                  <span>Payments &amp; Receipts</span>
                </div>
                {expandedMenus.payments ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.payments && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div
                    onClick={() => openQuickAction('generate-receipt')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Generate Receipt
                  </div>
                  <div
                    onClick={() => setActiveNav('payment-verification')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Payment Verification
                  </div>
                  <div
                    onClick={() => setActiveNav('receipt-history')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Receipt History
                  </div>
                  <div
                    onClick={() => setActiveNav('refunds')}
                    className="py-1 hover:text-white cursor-pointer transition-colors"
                  >
                    &bull; Refunds
                  </div>
                </div>
              )}
            </div>

            {/* Student Accounts */}
            <div>
              <button
                onClick={() => toggleMenu('studentAccounts')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-indigo-300" />
                  <span>Student Accounts</span>
                </div>
                {expandedMenus.studentAccounts ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.studentAccounts && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Student Ledger</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Fee Statement</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Account Adjustment</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Outstanding Dues</div>
                </div>
              )}
            </div>

            {/* Budget & Planning */}
            <div>
              <button
                onClick={() => toggleMenu('budget')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-emerald-300" />
                  <span>Budget &amp; Planning</span>
                </div>
                {expandedMenus.budget ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.budget && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Annual Budget</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Department Allocation</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Budget Tracking</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Revisions &amp; Approvals</div>
                </div>
              )}
            </div>

            {/* Expenses & Procurement */}
            <div>
              <button
                onClick={() => toggleMenu('expenses')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-4 h-4 text-amber-300" />
                  <span>Expenses &amp; Procurement</span>
                </div>
                {expandedMenus.expenses ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.expenses && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div
                    onClick={() => openQuickAction('record-expense')}
                    className="py-1 hover:text-white cursor-pointer transition-colors text-amber-300 font-bold"
                  >
                    &bull; Create Expense
                  </div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Procurement &amp; Vendor</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Approve Bills</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Expense Tracking</div>
                </div>
              )}
            </div>

            {/* Grants & Funds */}
            <div>
              <button
                onClick={() => toggleMenu('grants')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-cyan-300" />
                  <span>Grants &amp; Funds</span>
                </div>
                {expandedMenus.grants ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.grants && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Grant Proposals</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Fund Allocation</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Utilization &amp; Reports</div>
                </div>
              )}
            </div>

            {/* Reports & Analytics */}
            <div>
              <button
                onClick={() => toggleMenu('reports')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-rose-300" />
                  <span>Reports &amp; Analytics</span>
                </div>
                {expandedMenus.reports ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.reports && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Financial Reports</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Fee Collection Report</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Expense Report</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Budget Utilization</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Audit Reports</div>
                </div>
              )}
            </div>

            {/* Compliance & Audit */}
            <div>
              <button
                onClick={() => toggleMenu('compliance')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-teal-300" />
                  <span>Compliance &amp; Audit</span>
                </div>
                {expandedMenus.compliance ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.compliance && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Policy Compliance</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Internal / External Audit</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Audit Observations</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Regulatory Reports (UGC/AICTE)</div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <button
                onClick={() => toggleMenu('settings')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-slate-300" />
                  <span>Settings</span>
                </div>
                {expandedMenus.settings ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                )}
              </button>
              {expandedMenus.settings && (
                <div className="pl-9 pr-2 py-1 space-y-1 font-medium text-[11.5px] text-blue-200/90">
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Fee Categories</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Academic Year</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; Users &amp; Roles</div>
                  <div className="py-1 hover:text-white cursor-pointer transition-colors">&bull; System Configuration</div>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 text-[10px] text-blue-300/70 border-t border-white/10 text-center">
            Karnataka Higher Education ERP &bull; Finance Engine v3.4
          </div>
        </aside>

        {/* ==================== MAIN DASHBOARD BODY ==================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Welcome Banner + Academic Year Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Welcome, Finance Officer</span>
                <span>👋</span>
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Manage college finances, fee collection, expenses, budgets and reports in one place.
              </p>
            </div>

            {/* Academic Year Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Academic Year:</span>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="text-xs font-extrabold text-blue-700 bg-transparent outline-hidden cursor-pointer"
              >
                <option value="2026 – 2027">2026 – 2027</option>
                <option value="2025 – 2026">2025 – 2026</option>
                <option value="2024 – 2025">2024 – 2025</option>
              </select>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. ROW 1: 4 KPI CARDS + RESPONSIBILITIES CARD */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 4 KPI Cards (lg:col-span-8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
              {/* Card 1: Total Fee Collected */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Wallet className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block leading-tight">Total Fee Collected</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      ₹ {summary.totalFeeCollected.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{summary.feeCollectedGrowth}</span>
                </div>
              </div>

              {/* Card 2: Pending Fees */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                    <CreditCard className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block leading-tight">Pending Fees</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      ₹ {summary.pendingFees.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-rose-500">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{summary.pendingFeesGrowth}</span>
                </div>
              </div>

              {/* Card 3: Total Expenses */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Coins className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block leading-tight">Total Expenses</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      ₹ {summary.totalExpenses.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{summary.totalExpensesGrowth}</span>
                </div>
              </div>

              {/* Card 4: Budget Utilization */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                    <BarChart3 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block leading-tight">Budget Utilization</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {summary.budgetUtilization}%
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${summary.budgetUtilization}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* CHARTS ROW INSIDE THE 8-COLUMN GRID */}
              {/* ========================================================= */}
              {/* Chart 1: Income vs Expenses (Apr-Mar) */}
              <div className="sm:col-span-2 xl:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mt-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 gap-2">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">Income vs Expenses</h3>
                  <div className="flex items-center gap-4 text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]" />
                      <span>Income (Fees, Grants, etc.)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                      <span>Expenses (Salary, Infra, etc.)</span>
                    </div>
                  </div>
                </div>

                <div className="h-60 sm:h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyChart} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                        tickLine={false}
                        axisLine={false}
                        label={{
                          value: 'Amount (in ₹ Lakhs)',
                          angle: -90,
                          position: 'insideLeft',
                          fontSize: 10,
                          fill: '#64748b',
                          fontWeight: 700,
                          dy: 50,
                          dx: 15,
                        }}
                      />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `₹ ${val} Lakhs`,
                          name === 'income' ? 'Income' : 'Expenses',
                        ]}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '12px',
                          border: 'none',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 600,
                          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                        }}
                      />
                      <Bar dataKey="income" name="income" fill="#1d4ed8" radius={[4, 4, 0, 0]} maxBarSize={18} />
                      <Bar dataKey="expenses" name="expenses" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Fee Collection Overview (Donut Chart) */}
              <div className="sm:col-span-2 xl:col-span-1 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mt-1 flex flex-col justify-between">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Fee Collection Overview</h3>

                {/* Donut Chart with Centered Rate */}
                <div className="relative h-44 flex items-center justify-center my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        innerRadius={52}
                        outerRadius={74}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-black text-slate-900 leading-none">
                      {summary.collectionRate}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">Collected</span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="space-y-1.5 text-[11px] font-bold">
                  <div className="flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                      <span>Collected</span>
                    </div>
                    <span>₹ {summary.totalFeeCollected.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
                      <span>Pending</span>
                    </div>
                    <span>₹ {summary.pendingFees.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Collection Rate Pill */}
                <div className="mt-3 py-1.5 px-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center text-xs font-black flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Collection Rate: {summary.collectionRate}%</span>
                </div>
              </div>
            </div>

            {/* Right Column: Finance Officer Responsibilities Card (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Finance Officer Responsibilities
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 font-semibold">
                {responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2.5 leading-snug">
                    <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-700" />
                    </div>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. ROW 2: RECENT TRANSACTIONS + QUICK ACTIONS + NOTIFICATIONS */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Recent Transactions Table (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">Recent Transactions</h3>
                  <button
                    onClick={() => setActiveNav('receipt-history')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10.5px]">
                        <th className="py-2 font-bold">Date</th>
                        <th className="py-2 font-bold">Particulars</th>
                        <th className="py-2 font-bold text-center">Type</th>
                        <th className="py-2 font-bold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                      {recentTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 whitespace-nowrap text-slate-500 font-medium">{tx.date}</td>
                          <td className="py-2.5 max-w-[180px] truncate pr-2 font-bold text-slate-800" title={tx.particulars}>
                            {tx.particulars}
                          </td>
                          <td className="py-2.5 text-center whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                tx.type === 'Income'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {tx.type}
                            </span>
                          </td>
                          <td className="py-2.5 text-right whitespace-nowrap font-black text-slate-900">
                            ₹ {tx.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions 6-Card Grid (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Quick Actions</h3>

              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. Collect Fee */}
                <button
                  onClick={() => openQuickAction('collect-fee')}
                  className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Collect Fee</span>
                </button>

                {/* 2. Generate Receipt */}
                <button
                  onClick={() => openQuickAction('generate-receipt')}
                  className="bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Generate Receipt</span>
                </button>

                {/* 3. Record Expense */}
                <button
                  onClick={() => openQuickAction('record-expense')}
                  className="bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Coins className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Record Expense</span>
                </button>

                {/* 4. Manage Budget */}
                <button
                  onClick={() => openQuickAction('manage-budget')}
                  className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Manage Budget</span>
                </button>

                {/* 5. Upload Invoice */}
                <button
                  onClick={() => openQuickAction('upload-invoice')}
                  className="bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Upload Invoice</span>
                </button>

                {/* 6. Generate Report */}
                <button
                  onClick={() => openQuickAction('generate-report')}
                  className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-2xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Generate Report</span>
                </button>
              </div>
            </div>

            {/* Notifications Box (lg:col-span-3) */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">Notifications</h3>
                </div>
                <button
                  onClick={() => setActiveNav('notifications')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'success' && (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {notif.type === 'warning' && (
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {notif.type === 'info' && (
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Info className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 leading-snug">{notif.title}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 5. ROW 3: BOTTOM WORKFLOW BANNER (End-to-End Finance) */}
          {/* ========================================================= */}
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/90 rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Target className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 tracking-tight">End-to-End Finance Management</h4>
                <p className="text-xs text-slate-500 font-medium">
                  A complete solution for planning, tracking and reporting college finances.
                </p>
              </div>
            </div>

            {/* Workflow Step Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {/* Step 1 */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">Fee Collection</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />

              {/* Step 2 */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                <ShoppingCart className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">Expense Tracking</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />

              {/* Step 3 */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                <Coins className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">Budget Control</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />

              {/* Step 4 */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">Reports &amp; Audit</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />

              {/* Step 5 */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">Compliance</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
