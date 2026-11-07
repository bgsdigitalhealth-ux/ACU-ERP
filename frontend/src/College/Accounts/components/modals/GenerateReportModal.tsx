import React, { useState } from 'react';
import { X, Download, CheckCircle2, BarChart2 } from 'lucide-react';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName?: string;
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  isOpen,
  onClose,
  collegeName = 'City College of Engineering',
}) => {
  const [reportType, setReportType] = useState('Income vs Expense Summary');
  const [dateRange, setDateRange] = useState('Current Academic Year (2026 – 2027)');
  const [format, setFormat] = useState('PDF');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Financial Report Generator</h3>
              <p className="text-xs text-purple-200">Generate executive audits, fee reports and balance sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Select Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option>Income vs Expense Summary</option>
              <option>Fee Collection &amp; Dues Detailed Report</option>
              <option>Department Budget Utilization Statement</option>
              <option>Annual Financial Balance Sheet</option>
              <option>Statutory Regulatory Compliance Audit (UGC/AICTE)</option>
              <option>Vendor Procurement &amp; Invoices Ledger</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Reporting Period</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option>Current Academic Year (2026 – 2027)</option>
                <option>Quarter 2 (Jul - Sep 2026)</option>
                <option>Quarter 3 (Oct - Dec 2026)</option>
                <option>Last 30 Days</option>
                <option>Previous Academic Year (2025 – 2026)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Export Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option>PDF (Print Quality)</option>
                <option>Excel (.xlsx)</option>
                <option>CSV (Raw Data)</option>
              </select>
            </div>
          </div>

          <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-xs space-y-1">
            <p className="font-bold text-purple-900">Institution: {collegeName}</p>
            <p className="text-purple-700 text-[11px]">Department of Higher Education, Govt. of Karnataka</p>
            <p className="text-purple-600 text-[10px]">Data is compiled in real-time from active college ledger transactions.</p>
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
              disabled={isExporting || downloadSuccess}
              className="px-5 py-2 text-xs font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Compiling Report...' : `Export ${format}`}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
