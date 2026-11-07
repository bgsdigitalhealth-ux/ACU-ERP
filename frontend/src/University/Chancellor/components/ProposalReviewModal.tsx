import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  FileText,
  AlertTriangle,
  FileCheck,
  History,
  Stamp,
  Coins
} from 'lucide-react';
import { ChancellorProposalItem } from '../services/chancellorApi';

interface ProposalReviewModalProps {
  proposal: ChancellorProposalItem | null;
  onClose: () => void;
  onDecide: (
    proposalId: string,
    decision: 'Approve' | 'Reject' | 'Return',
    remarks: string
  ) => Promise<void>;
}

export const ProposalReviewModal: React.FC<ProposalReviewModalProps> = ({
  proposal,
  onClose,
  onDecide,
}) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!proposal) return null;

  const handleExecuteDecision = async (decision: 'Approve' | 'Reject' | 'Return') => {
    if ((decision === 'Reject' || decision === 'Return') && !remarks.trim()) {
      setErrorMessage(
        decision === 'Reject'
          ? 'Executive remarks are mandatory when rejecting a statutory proposal.'
          : 'Please specify correction instructions for the Registrar / Vice-Chancellor.'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await onDecide(proposal._id || proposal.id || '', decision, remarks);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Urgent':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Returned for Correction':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0d1b3e] to-[#172c63] text-white flex items-center justify-between border-b border-indigo-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <FileCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-300">
                  {proposal.proposalCode}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getUrgencyBadge(
                    proposal.urgency
                  )}`}
                >
                  {proposal.urgency}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusBadge(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug line-clamp-1 mt-0.5">
                {proposal.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar text-slate-800">
          
          {/* Statutory Workflow Stepper based on User's Flowchart */}
          <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>Statutory Flowchart &amp; Scrutiny Stepper</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
              
              {/* Stage 1: Department */}
              <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mx-auto flex items-center justify-center mb-1">
                  ✓
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  1. Dept / College
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {proposal.department}
                </div>
              </div>

              {/* Stage 2: Registrar */}
              <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mx-auto flex items-center justify-center mb-1">
                  ✓
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  2. Registrar
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  Scrutinized &amp; Recommended
                </div>
              </div>

              {/* Stage 3: Vice-Chancellor */}
              <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mx-auto flex items-center justify-center mb-1">
                  ✓
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  3. Vice-Chancellor
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  Endorsed for Assent
                </div>
              </div>

              {/* Stage 4: Chancellor Apex Action */}
              <div className="bg-indigo-50/80 rounded-xl p-2.5 border-2 border-indigo-500 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs mx-auto flex items-center justify-center mb-1 animate-pulse">
                  4
                </div>
                <div className="text-[11px] font-bold text-indigo-950 leading-tight">
                  4. Chancellor Apex
                </div>
                <div className="text-[10px] font-extrabold text-indigo-700 mt-0.5">
                  {proposal.status === 'Approved'
                    ? 'Assented & Sealed'
                    : proposal.status === 'Rejected'
                    ? 'Rejected with Remarks'
                    : proposal.status === 'Returned for Correction'
                    ? 'Returned to VC/Registrar'
                    : 'Decision Pending'}
                </div>
              </div>
            </div>
          </div>

          {/* Proposal Summary & Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left 2 Cols: Description & Endorsements */}
            <div className="md:col-span-2 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700">Proposal Description &amp; Justification</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                  {proposal.description}
                </div>
              </div>

              {/* Endorsements Box */}
              <div className="space-y-2">
                <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200/80 text-xs text-sky-950">
                  <div className="font-bold flex items-center gap-1.5 text-sky-900">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Registrar Scrutiny Note:</span>
                  </div>
                  <div className="mt-1 text-slate-700">
                    {proposal.registrarVerification?.remarks || 'Statutory criteria verified.'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                    Verified by: {proposal.registrarVerification?.verifiedBy || 'Dr. C. K. Subbaraya, Registrar'}
                  </div>
                </div>

                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/80 text-xs text-purple-950">
                  <div className="font-bold flex items-center gap-1.5 text-purple-900">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>Vice-Chancellor Recommendation:</span>
                  </div>
                  <div className="mt-1 text-slate-700">
                    {proposal.vcRecommendation?.remarks || 'Placed before Chancellor for assent.'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                    Endorsed by: {proposal.vcRecommendation?.endorsedBy || 'Prof. M. A. Shekar, Vice-Chancellor'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Key Metadata */}
            <div className="space-y-3 bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs">
              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Category</div>
                <div className="font-bold text-slate-900">{proposal.category}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Department / Faculty</div>
                <div className="font-bold text-slate-900">{proposal.department}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Submitted By</div>
                <div className="font-bold text-slate-900">{proposal.submittedBy}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Financial Outlay</div>
                <div className="font-extrabold text-emerald-800 flex items-center gap-1 text-xs">
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{proposal.budgetInvolved || 'Nil'}</span>
                </div>
              </div>

              {proposal.supportingDocs && proposal.supportingDocs.length > 0 && (
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold mb-1">Supporting Files</div>
                  <div className="space-y-1">
                    {proposal.supportingDocs.map((doc, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-indigo-900 flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Existing Decision / Digital Seal if already decided */}
          {proposal.status !== 'Pending Chancellor Action' && proposal.chancellorDecision && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <div className="font-extrabold text-emerald-950 flex items-center gap-2">
                <Stamp className="w-4 h-4 text-emerald-700" />
                <span>Chancellor Apex Assent Decreed</span>
              </div>
              <div className="text-slate-800">
                <strong>Remarks:</strong> {proposal.chancellorDecision.remarks}
              </div>
              {proposal.chancellorDecision.digitalSignatureId && (
                <div className="text-[11px] font-mono text-emerald-800">
                  Digital Seal ID: {proposal.chancellorDecision.digitalSignatureId}
                </div>
              )}
            </div>
          )}

          {/* Action Formulation: Remarks Input */}
          {proposal.status === 'Pending Chancellor Action' && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Chancellor Remarks / Executive Directives:</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  (Required for Reject &amp; Return)
                </span>
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter statutory observations, conditions of assent, or reasons for return..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:outline-none text-xs text-slate-900 bg-white"
              />

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with Flowchart Decision Buttons */}
        <div className="px-5 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-600">
            Flowchart Decision: Actions trigger ERP notification and immutable audit trail.
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>

            {proposal.status === 'Pending Chancellor Action' && (
              <>
                {/* 1. Return for Correction (Sends back to Registrar) */}
                <button
                  onClick={() => handleExecuteDecision('Return')}
                  disabled={isSubmitting}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Send for Correction</span>
                </button>

                {/* 2. Reject with Remarks */}
                <button
                  onClick={() => handleExecuteDecision('Reject')}
                  disabled={isSubmitting}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject with Remarks</span>
                </button>

                {/* 3. Approve / Assent */}
                <button
                  onClick={() => handleExecuteDecision('Approve')}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve &amp; Sign</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalReviewModal;
