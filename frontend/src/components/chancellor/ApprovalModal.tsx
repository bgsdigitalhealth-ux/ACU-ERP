import React, { useState } from 'react';
import {
  X,
  FileText,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Paperclip,
  Download
} from 'lucide-react';
import { PendingApprovalItem } from '../../types/chancellor';

interface ApprovalModalProps {
  item: PendingApprovalItem;
  onClose: () => void;
  onApprove: (id: string, remarks: string) => void;
  onReject: (id: string, remarks: string) => void;
  onRequestModification: (id: string, remarks: string) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  item,
  onClose,
  onApprove,
  onReject,
  onRequestModification
}) => {
  const [remarks, setRemarks] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleAction = (actionType: 'approve' | 'reject' | 'modify') => {
    if ((actionType === 'reject' || actionType === 'modify') && !remarks.trim()) {
      setValidationError('Mandatory: Please provide explicit observations / remarks for this governance action.');
      return;
    }

    setValidationError('');
    if (actionType === 'approve') {
      onApprove(item.id, remarks.trim() || 'Statutory Assent Granted without reservations.');
    } else if (actionType === 'reject') {
      onReject(item.id, remarks.trim());
    } else {
      onRequestModification(item.id, remarks.trim());
    }
  };

  const getPriorityBadge = (p: PendingApprovalItem['priority']) => {
    switch (p) {
      case 'Urgent':
        return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-purple-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-purple-100 border border-white/20">
                {item.category}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                  item.priority
                )}`}
              >
                {item.priority} Priority
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              {item.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Submitter Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-purple-700 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-500 block">Submitted By:</span>
                <span className="font-bold text-[#1e1b4b] text-xs">
                  {item.submittedBy} ({item.submitterRole})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-500 block">Date of Submission:</span>
                <span className="font-bold text-[#1e1b4b] text-xs">{item.submissionDate}</span>
              </div>
            </div>
          </div>

          {/* Detailed Request Summary */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Statutory Memorandum &amp; Background:
            </h4>
            <div className="bg-[#fcfaff] p-4 rounded-xl border border-purple-100/90 text-gray-700 leading-relaxed text-[12.5px]">
              {item.details}
            </div>
          </div>

          {/* Supporting Documents */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-purple-600" />
              <span>Supporting Annexures &amp; Documents ({item.supportingDocuments.length}):</span>
            </h4>
            <div className="space-y-1.5">
              {item.supportingDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-medium text-gray-800 truncate text-xs">{doc}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading verified annexure: ${doc}`)}
                    className="flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-2 py-1 rounded-lg"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chancellor's Observations / Remarks */}
          <div className="pt-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              Chancellor's Assent Observations / Instructions:
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter executive comments, modification conditions, or assent ratification remarks..."
              className="w-full p-3 bg-white border border-purple-200 rounded-xl text-xs text-gray-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            />
            {validationError && (
              <p className="flex items-center gap-1 text-xs text-rose-600 font-bold mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{validationError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer with 3 Statutory Actions */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel / Close
          </button>

          <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
            {/* Request Modification */}
            <button
              onClick={() => handleAction('modify')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Request Modification</span>
            </button>

            {/* Reject */}
            <button
              onClick={() => handleAction('reject')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Decline Proposal</span>
            </button>

            {/* Approve / Grant Assent */}
            <button
              onClick={() => handleAction('approve')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Grant Chancellor Assent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

