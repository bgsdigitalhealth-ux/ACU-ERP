import React, { useState } from 'react';
import { X, CheckCircle2, Coins } from 'lucide-react';
import { recordExpenseApi } from '../../../services/collegeFinanceApi';

interface RecordExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, particulars: string) => void;
}

export const RecordExpenseModal: React.FC<RecordExpenseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Laboratory & Research');
  const [category, setCategory] = useState('Lab Equipment Purchase');
  const [amount, setAmount] = useState('75000');
  const [invoiceNo, setInvoiceNo] = useState('PO-LAB-8812');
  const [vendorName, setVendorName] = useState('Scientific Instruments Corp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    setIsSubmitting(true);
    const numAmount = Number(amount);
    await recordExpenseApi({
      title,
      department,
      category,
      amount: numAmount,
      invoiceNo,
      vendorName,
    });
    setIsSubmitting(false);
    onSuccess(numAmount, `${title} [${department}]`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Record College Expense</h3>
              <p className="text-xs text-amber-100">Procurement, departmental and campus operational costs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Expense Particulars / Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Lab Equipment Purchase"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option>Laboratory & Research</option>
                <option>Central Library</option>
                <option>IT & Campus Infrastructure</option>
                <option>Faculty & Staff Welfare</option>
                <option>Sports & Cultural Facilities</option>
                <option>Civil & Electrical Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Expense Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option>Lab Equipment Purchase</option>
                <option>Library Books Procurement</option>
                <option>Campus Infrastructure</option>
                <option>Hardware & Network Upgrades</option>
                <option>Stationery & Consumables</option>
                <option>Hostel Maintenance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Vendor / Payee</label>
              <input
                type="text"
                placeholder="Vendor company or contractor"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">PO / Invoice Ref</label>
              <input
                type="text"
                placeholder="e.g. PO-LAB-8812"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Amount (₹) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
              <input
                type="number"
                required
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm font-bold text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording...' : 'Approve & Record Expense'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
