import React, { useState } from 'react';
import { X, Printer, Receipt } from 'lucide-react';

interface GenerateReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName?: string;
}

export const GenerateReceiptModal: React.FC<GenerateReceiptModalProps> = ({
  isOpen,
  onClose,
  collegeName = 'City College of Engineering',
}) => {
  const rollNo = 'CSE2301';
  const studentName = 'Akhilesh Kumar';
  const amount = '125000';
  const receiptNumber = `REC-${Date.now().toString().slice(-6)}`;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Official Fee Receipt Generator</h3>
              <p className="text-xs text-sky-100">Digitally authenticated college payment proof</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Printable Receipt Preview Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative select-none">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <img src="/karnataka-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800 leading-tight">{collegeName}</h4>
                  <p className="text-[10px] text-slate-500">Government of Karnataka • Higher Education ERP</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                PAID &bull; VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-[10.5px] text-gray-500">Receipt No:</span>
                <p className="font-bold text-gray-800">{receiptNumber}</p>
              </div>
              <div>
                <span className="text-[10.5px] text-gray-500">Date:</span>
                <p className="font-bold text-gray-800">{date}</p>
              </div>
              <div>
                <span className="text-[10.5px] text-gray-500">Student Name:</span>
                <p className="font-bold text-gray-800">{studentName}</p>
              </div>
              <div>
                <span className="text-[10.5px] text-gray-500">Roll No / USN:</span>
                <p className="font-bold text-gray-800">{rollNo}</p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-800">B.Tech Tuition &amp; Academic Fee (Sem 3)</p>
                <p className="text-[10px] text-gray-500">Mode: Online Payment Gateway &bull; Ref: PG-990812</p>
              </div>
              <p className="text-base font-black text-green-600">₹ {Number(amount).toLocaleString('en-IN')}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-gray-400">
              <span>Digitally Authenticated by College Finance Office</span>
              <span>Valid for Income Tax Sec 80C</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`Receipt No: ${receiptNumber}\nStudent: ${studentName} (${rollNo})\nAmount: ₹ ${amount}\nDate: ${date}\nInstitution: ${collegeName}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              {copied ? 'Copied Details!' : 'Copy Summary'}
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
