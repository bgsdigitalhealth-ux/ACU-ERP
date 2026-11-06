import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import {
  X,
  CreditCard,
  Receipt,
  Coins,
  Building2,
  UploadCloud,
  FileBarChart,
  CheckCircle2,
} from 'lucide-react';

export const FinanceQuickActionModal: React.FC = () => {
  const { quickAction, closeQuickAction, recordTransaction, academicYear } = useFinance();

  const [particulars, setParticulars] = useState('');
  const [amount, setAmount] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [rollNo, setRollNo] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [paymentMode, setPaymentMode] = useState('Net Banking / NEFT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quickAction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    setIsSubmitting(true);
    let title = particulars;
    let type: 'Income' | 'Expense' = 'Income';

    if (quickAction === 'collect-fee' || quickAction === 'generate-receipt') {
      type = 'Income';
      title = particulars || `Student Fee – ${rollNo || 'B.Tech Sem 3'}`;
    } else if (quickAction === 'record-expense' || quickAction === 'upload-invoice') {
      type = 'Expense';
      title = particulars || (vendorName ? `Vendor Payment – ${vendorName}` : 'Operational Equipment Purchase');
    } else if (quickAction === 'manage-budget') {
      type = 'Expense';
      title = `Budget Reallocation – ${department}`;
    } else {
      type = 'Income';
      title = particulars || 'Institutional Financial Report Audit Adjustment';
    }

    await recordTransaction({
      particulars: title,
      type,
      amount: Number(amount),
      category: config.defaultCategory,
    });
    setIsSubmitting(false);
  };

  const getModalConfig = () => {
    switch (quickAction) {
      case 'collect-fee':
        return {
          title: 'Collect Student Fee',
          subtitle: 'Record student tuition, hostel or exam fee receipt',
          icon: CreditCard,
          type: 'Income' as const,
          defaultCategory: 'Student Fee',
          color: 'from-blue-600 to-indigo-700',
        };
      case 'generate-receipt':
        return {
          title: 'Generate Fee Receipt',
          subtitle: 'Issue formal university payment verification receipt',
          icon: Receipt,
          type: 'Income' as const,
          defaultCategory: 'Receipt Issuance',
          color: 'from-purple-600 to-indigo-700',
        };
      case 'record-expense':
        return {
          title: 'Record Institutional Expense',
          subtitle: 'Log procurement, lab hardware or department billing',
          icon: Coins,
          type: 'Expense' as const,
          defaultCategory: 'Procurement',
          color: 'from-amber-500 to-orange-600',
        };
      case 'manage-budget':
        return {
          title: 'Department Budget Allocation',
          subtitle: 'Review & adjust department financial allocations',
          icon: Building2,
          type: 'Expense' as const,
          defaultCategory: 'Budget Allocation',
          color: 'from-emerald-600 to-teal-700',
        };
      case 'upload-invoice':
        return {
          title: 'Upload Vendor Invoice',
          subtitle: 'Process vendor bills for accounts payable clearance',
          icon: UploadCloud,
          type: 'Expense' as const,
          defaultCategory: 'Vendor Invoice',
          color: 'from-blue-500 to-cyan-600',
        };
      case 'generate-report':
        return {
          title: 'Generate Financial Audit Report',
          subtitle: 'Export UGC/AICTE accredited finance statement',
          icon: FileBarChart,
          type: 'Income' as const,
          defaultCategory: 'Financial Statement',
          color: 'from-indigo-600 to-violet-700',
        };
      default:
        return {
          title: 'Record Finance Action',
          subtitle: 'College treasury and financial ledger entry',
          icon: CreditCard,
          type: 'Income' as const,
          defaultCategory: 'General',
          color: 'from-blue-600 to-indigo-700',
        };
    }
  };

  const config = getModalConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden select-none">
        {/* Header with vibrant gradient */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${config.color} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">{config.title}</h3>
              <p className="text-xs text-white/80 font-medium">{config.subtitle}</p>
            </div>
          </div>
          <button
            onClick={closeQuickAction}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
            <span>Academic Year: <strong className="text-slate-800">{academicYear}</strong></span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                config.type === 'Income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {config.type} Entry
            </span>
          </div>

          {(quickAction === 'collect-fee' || quickAction === 'generate-receipt') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Roll No.</label>
                <input
                  type="text"
                  placeholder="e.g. CSE2301"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium bg-white"
                >
                  <option>Net Banking / NEFT</option>
                  <option>UPI / QR Pay</option>
                  <option>Demand Draft (DD)</option>
                  <option>Card Payment</option>
                  <option>Bank Challan</option>
                </select>
              </div>
            </div>
          )}

          {(quickAction === 'record-expense' || quickAction === 'upload-invoice') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vendor / Payee Name</label>
              <input
                type="text"
                placeholder="e.g. Sigma Scientific Instruments Pvt Ltd"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Particulars / Description</label>
            <input
              type="text"
              required
              placeholder={
                config.type === 'Income'
                  ? 'e.g. Student Fee – B.Tech (Sem 3)'
                  : 'e.g. Physics Lab Equipment Purchase'
              }
              value={particulars}
              onChange={(e) => setParticulars(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 125000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-bold text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium bg-white"
              >
                <option>Computer Science & Engineering</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
                <option>Basic Sciences & Humanities</option>
                <option>Central Library</option>
                <option>College Administration</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeQuickAction}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Recording...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Record {config.type}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
