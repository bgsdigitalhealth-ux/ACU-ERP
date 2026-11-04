import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcModals: React.FC = () => {
  const {
    activeVcModal,
    setActiveVcModal,
    selectedVcApproval,
    setSelectedVcApproval,
    approveVcItem,
    rejectVcItem,
    vcApprovals
  } = useUniversityAdmin();

  const [returnRemarks, setReturnRemarks] = useState('');

  if (!activeVcModal) return null;

  const currentItem = selectedVcApproval || vcApprovals[0];

  const handleClose = () => {
    setActiveVcModal(null);
    setSelectedVcApproval(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/90 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#380665] via-[#4B087B] to-[#250444] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h3 className="font-extrabold text-base tracking-tight text-white">
              Vice-Chancellor Executive Assent
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {currentItem ? (
          <div className="p-6 space-y-4">
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-purple-700">Matter for Escalation</span>
                <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
                  {currentItem.urgency}
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-gray-900">{currentItem.title}</h4>
              <p className="text-gray-600 font-medium">Institution: <strong>{currentItem.institution}</strong></p>
              <p className="text-gray-500 font-mono text-[11px]">Ref: {currentItem.referenceNo} • Date: {currentItem.submittedDate}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry / Proposal Details</label>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700 leading-relaxed">
                {currentItem.details}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">VC Observations / Directives (Optional)</label>
              <textarea
                rows={3}
                placeholder="Enter executive remarks or conditionality for the Controller of Examinations..."
                value={returnRemarks}
                onChange={(e) => setReturnRemarks(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-purple-600"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => rejectVcItem(currentItem.id, returnRemarks || 'Clarification sought from Dean/CoE')}
                className="px-4 py-2 border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return with Remarks</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => approveVcItem(currentItem.id)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Seal Decision</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-gray-500">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p>No active items awaiting approval.</p>
          </div>
        )}
      </div>
    </div>
  );
};

