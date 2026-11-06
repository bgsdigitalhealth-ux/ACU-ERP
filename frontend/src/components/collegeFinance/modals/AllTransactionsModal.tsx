import React, { useState } from 'react';
import { X, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FinanceTransaction } from '../../../services/collegeFinanceApi';

interface AllTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: FinanceTransaction[];
}

export const AllTransactionsModal: React.FC<AllTransactionsModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Income' | 'Expense'>('all');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.particulars.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.referenceNo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#003b95] via-[#0052cc] to-[#0066ee] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-base leading-tight">All College Financial Transactions</h3>
            <p className="text-xs text-blue-100">Live ledger records for Academic Year 2026 – 2027</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by particulars, reference or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-gray-300 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  typeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setTypeFilter('Income')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  typeFilter === 'Income' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setTypeFilter('Expense')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  typeFilter === 'Expense' ? 'bg-rose-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Expenses
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Particulars</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Ref No</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id || t.transactionId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-600 whitespace-nowrap">{t.date}</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{t.particulars}</td>
                  <td className="py-3 px-3 text-slate-500">{t.category || 'General'}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{t.referenceNo || '—'}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                        t.type === 'Income'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {t.type === 'Income' ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-rose-700" />
                      )}
                      <span>{t.type}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-black text-slate-900 whitespace-nowrap">
                    ₹ {Number(t.amount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No transactions match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span>Showing {filtered.length} of {transactions.length} total entries</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
