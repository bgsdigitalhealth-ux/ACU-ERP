import React, { useState, useEffect } from 'react';
import {
  Home,
  CreditCard,
  Receipt,
  Users,
  PieChart,
  ShoppingCart,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
} from 'lucide-react';
import {
  fetchCollegeFinanceDashboard,
  CollegeFinanceDashboardData,
  INITIAL_COLLEGE_FINANCE_DATA,
} from '../../services/collegeFinanceApi';
import { CollegeFinanceDashboard } from './CollegeFinanceDashboard';
import { CollectFeeModal } from './modals/CollectFeeModal';
import { GenerateReceiptModal } from './modals/GenerateReceiptModal';
import { RecordExpenseModal } from './modals/RecordExpenseModal';
import { ManageBudgetModal } from './modals/ManageBudgetModal';
import { GenerateReportModal } from './modals/GenerateReportModal';
import { AllTransactionsModal } from './modals/AllTransactionsModal';

interface CollegeFinanceDashboardLayoutProps {
  onLogout: () => void;
  collegeName?: string;
}

interface NavSubItem {
  name: string;
  action?: string;
}

interface NavSection {
  id: string;
  title: string;
  icon: React.ElementType;
  items: NavSubItem[];
}

export const CollegeFinanceDashboardLayout: React.FC<CollegeFinanceDashboardLayoutProps> = ({
  onLogout,
  collegeName = 'City College of Engineering',
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | string>('dashboard');
  const [data, setData] = useState<CollegeFinanceDashboardData>(INITIAL_COLLEGE_FINANCE_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    feeManagement: true,
    paymentsReceipts: false,
    studentAccounts: false,
    budgetPlanning: false,
    expensesProcurement: false,
    grantsFunds: false,
    reportsAnalytics: false,
    complianceAudit: false,
    settings: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Modals for sub-items
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);
  const [isGenerateReceiptOpen, setIsGenerateReceiptOpen] = useState(false);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [isManageBudgetOpen, setIsManageBudgetOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [isAllTransactionsOpen, setIsAllTransactionsOpen] = useState(false);

  useEffect(() => {
    fetchCollegeFinanceDashboard().then((res) => {
      if (res) setData(res);
    });
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const navSections: NavSection[] = [
    {
      id: 'feeManagement',
      title: 'Fee Management',
      icon: CreditCard,
      items: [
        { name: 'Fee Structure' },
        { name: 'Collect Fee', action: 'collect-fee' },
        { name: 'Fee Concession / Waiver' },
        { name: 'Payment Status' },
        { name: 'Fee Dues & Reminders' },
      ],
    },
    {
      id: 'paymentsReceipts',
      title: 'Payments & Receipts',
      icon: Receipt,
      items: [
        { name: 'Generate Receipt', action: 'generate-receipt' },
        { name: 'Payment Verification' },
        { name: 'Receipt History', action: 'all-txns' },
        { name: 'Refunds' },
      ],
    },
    {
      id: 'studentAccounts',
      title: 'Student Accounts',
      icon: Users,
      items: [
        { name: 'Student Ledger' },
        { name: 'Fee Statement' },
        { name: 'Account Adjustment' },
        { name: 'Outstanding Dues' },
      ],
    },
    {
      id: 'budgetPlanning',
      title: 'Budget & Planning',
      icon: PieChart,
      items: [
        { name: 'Annual Budget', action: 'manage-budget' },
        { name: 'Department Allocation', action: 'manage-budget' },
        { name: 'Budget Tracking', action: 'manage-budget' },
        { name: 'Revisions & Approvals' },
      ],
    },
    {
      id: 'expensesProcurement',
      title: 'Expenses & Procurement',
      icon: ShoppingCart,
      items: [
        { name: 'Create Expense', action: 'record-expense' },
        { name: 'Procurement & Vendor' },
        { name: 'Approve Bills' },
        { name: 'Expense Tracking', action: 'all-txns' },
      ],
    },
    {
      id: 'grantsFunds',
      title: 'Grants & Funds',
      icon: Landmark,
      items: [
        { name: 'Grant Proposals' },
        { name: 'Fund Allocation' },
        { name: 'Utilization & Reports', action: 'generate-report' },
      ],
    },
    {
      id: 'reportsAnalytics',
      title: 'Reports & Analytics',
      icon: TrendingUp,
      items: [
        { name: 'Financial Reports', action: 'generate-report' },
        { name: 'Fee Collection Report', action: 'generate-report' },
        { name: 'Expense Report', action: 'generate-report' },
        { name: 'Budget Utilization', action: 'manage-budget' },
        { name: 'Audit Reports', action: 'generate-report' },
      ],
    },
    {
      id: 'complianceAudit',
      title: 'Compliance & Audit',
      icon: ShieldCheck,
      items: [
        { name: 'Policy Compliance' },
        { name: 'Internal / External Audit', action: 'generate-report' },
        { name: 'Audit Observations' },
        { name: 'Regulatory Reports (UGC/AICTE)', action: 'generate-report' },
      ],
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      items: [
        { name: 'Fee Categories' },
        { name: 'Academic Year' },
        { name: 'Users & Roles' },
        { name: 'System Configuration' },
      ],
    },
  ];

  const handleSubItemClick = (sub: NavSubItem) => {
    if (sub.action === 'collect-fee') setIsCollectFeeOpen(true);
    else if (sub.action === 'generate-receipt') setIsGenerateReceiptOpen(true);
    else if (sub.action === 'record-expense') setIsRecordExpenseOpen(true);
    else if (sub.action === 'manage-budget') setIsManageBudgetOpen(true);
    else if (sub.action === 'generate-report') setIsGenerateReportOpen(true);
    else if (sub.action === 'all-txns') setIsAllTransactionsOpen(true);
    else {
      setActiveTab(sub.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] flex flex-col select-none">
      {/* 1. Top Navbar matching Mockup: Royal Blue Gradient Banner */}
      <header className="h-16 bg-gradient-to-r from-[#003b95] via-[#0052cc] to-[#0066ee] text-white px-4 sm:px-6 flex items-center justify-between shadow-md relative z-30 shrink-0">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* College Crest Logo */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs border border-white/30">
            <img
              src="/karnataka-seal.png"
              alt="College Crest"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-black tracking-tight leading-tight truncate">
              {collegeName}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-blue-100 font-medium leading-none mt-0.5">
              College Finance Management System
            </p>
          </div>

          {/* Vertical Divider & Page Title */}
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/25">
            <span className="text-base font-black tracking-tight text-white/95">
              Finance Officer Dashboard
            </span>
          </div>
        </div>

        {/* Center/Right: Search, Notification, User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Input matching Mockup */}
          <div className="hidden sm:flex items-center relative w-64 md:w-80">
            <Search className="w-4 h-4 text-blue-200 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, fees, invoices, transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-900 placeholder:text-blue-200 focus:placeholder:text-slate-400 text-xs rounded-full border border-white/25 focus:border-white focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Notification Bell with Badge */}
          <button
            onClick={() => setIsAllTransactionsOpen(true)}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-[#0052cc]" />
          </button>

          {/* User Profile Pill Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 py-1 px-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
            >
              <div className="w-7 h-7 rounded-full bg-white text-[#0052cc] flex items-center justify-center font-bold text-xs shadow-xs">
                FO
              </div>
              <span className="hidden md:inline text-xs font-bold text-white">Finance Officer</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-800">Finance Officer</p>
                  <p className="text-[10px] text-slate-400 font-medium">finance.college@bgs.edu.in</p>
                </div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout / Back to Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Body: Sidebar + Dynamic Dashboard Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar matching Mockup: Deep Navy / Midnight Blue */}
        <aside
          className={`w-64 bg-[#0a1b42] text-slate-300 flex flex-col shrink-0 border-r border-[#142857] transition-all duration-300 z-20 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'
          }`}
        >
          {/* Scrollable Nav Area */}
          <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 text-xs">
            {/* Dashboard Home Active Item */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#2563eb] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* 9 Collapsible Accordion Sections matching Mockup */}
            {navSections.map((sec) => {
              const Icon = sec.icon;
              const isExpanded = expandedSections[sec.id];

              return (
                <div key={sec.id} className="pt-1">
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 font-bold min-w-0">
                      <Icon className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-105 transition-transform" />
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Sub-items list matching mockup */}
                  {isExpanded && (
                    <div className="ml-6 pl-2 border-l border-slate-700/60 mt-1 space-y-1">
                      {sec.items.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubItemClick(sub)}
                          className={`w-full text-left py-1 px-2 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                            activeTab === sub.name
                              ? 'bg-blue-600/30 text-blue-300 font-bold'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-500" />
                          <span className="truncate">{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[#142857] bg-[#071330] flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">{collegeName}</span>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' ? (
            <CollegeFinanceDashboard
              data={data}
              collegeName={collegeName}
              onSelectYear={(yr) => {
                fetchCollegeFinanceDashboard(yr).then((res) => {
                  if (res) setData(res);
                });
              }}
            />
          ) : (
            <div className="p-6 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{activeTab}</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Manage college records for {activeTab} &bull; Academic Year: {data.academicYear}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>

              {/* Sub-view Content Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <AllTransactionsModal
                  isOpen={true}
                  onClose={() => setActiveTab('dashboard')}
                  transactions={data.transactions}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <CollectFeeModal
        isOpen={isCollectFeeOpen}
        onClose={() => setIsCollectFeeOpen(false)}
        onSuccess={(amt, part) => {
          setData((prev) => ({
            ...prev,
            overview: {
              ...prev.overview,
              totalFeeCollected: prev.overview.totalFeeCollected + amt,
              pendingFees: Math.max(0, prev.overview.pendingFees - amt),
            },
            transactions: [
              {
                id: 'txn-' + Date.now(),
                transactionId: 'TXN-' + Date.now().toString().slice(-6),
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                particulars: part,
                type: 'Income',
                amount: amt,
                category: 'Tuition Fee',
                referenceNo: 'REC-' + Date.now().toString().slice(-4),
                academicYear: data.academicYear,
              },
              ...prev.transactions,
            ],
          }));
        }}
      />
      <GenerateReceiptModal
        isOpen={isGenerateReceiptOpen}
        onClose={() => setIsGenerateReceiptOpen(false)}
        collegeName={collegeName}
      />
      <RecordExpenseModal
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
        onSuccess={(amt, part) => {
          setData((prev) => ({
            ...prev,
            overview: {
              ...prev.overview,
              totalExpenses: prev.overview.totalExpenses + amt,
            },
            transactions: [
              {
                id: 'txn-' + Date.now(),
                transactionId: 'TXN-' + Date.now().toString().slice(-6),
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                particulars: part,
                type: 'Expense',
                amount: amt,
                category: 'Operations',
                referenceNo: 'PO-' + Date.now().toString().slice(-4),
                academicYear: data.academicYear,
              },
              ...prev.transactions,
            ],
          }));
        }}
      />
      <ManageBudgetModal
        isOpen={isManageBudgetOpen}
        onClose={() => setIsManageBudgetOpen(false)}
        onUpdateUtilization={(util) => {
          setData((prev) => ({
            ...prev,
            overview: { ...prev.overview, budgetUtilization: util },
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
        transactions={data.transactions}
      />
    </div>
  );
};
