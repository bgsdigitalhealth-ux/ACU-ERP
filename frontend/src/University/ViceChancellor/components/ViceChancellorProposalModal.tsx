import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  History,
  Stamp,
  Coins,
  Send
} from 'lucide-react';
import { ViceChancellorProposalItem } from '../services/vicechancellorApi';

interface VcProposalModalProps {
  proposal: ViceChancellorProposalItem | null;
  onClose: () => void;
  onDecide: (
    proposalId: string,
    decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return',
    remarks: string
  ) => Promise<void>;
}

export const ViceChancellorProposalModal: React.FC<VcProposalModalProps> = ({
  proposal,
  onClose,
  onDecide,
}) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!proposal) return null;

  const handleExecute = async (
    decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return'
  ) => {
    if ((decision === 'Reject' || decision === 'Return') && !remarks.trim()) {
      setErrorMessage(
        decision === 'Reject'
          ? 'Executive observations are required when rejecting a statutory proposal.'
          : 'Please enter revision instructions for the originating department / Registrar.'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await onDecide(proposal._id || proposal.id || '', decision, remarks);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#091535] to-[#1e3a8a] text-white flex items-center justify-between border-b border-indigo-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-blue-300 shadow-inner">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-300">
                  {proposal.proposalCode}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  {proposal.delegatedAuthority}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          
          {/* Statutory Delegated Authority Notice */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs text-blue-950">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Statutory Rule:</strong> Actions are exercised under Vice Chancellor delegated executive authority as per University Statutes.
              </span>
            </div>
            <span className="font-mono font-bold text-[11px] text-blue-800 shrink-0">
              {proposal.delegatedAuthority}
            </span>
          </div>

          {/* Description & Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left 2 Cols: Details & Description */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Proposal Description &amp; Justification</label>
                <div className="mt-1 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                  {proposal.description}
                </div>
              </div>

              {/* Audit Trail Stepper */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-600" />
                  <span>Audit Trail &amp; Processing History</span>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                  {proposal.auditTrail.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{item.stage}</span>
                        <span className="text-slate-400 mx-1.5">•</span>
                        <span className="text-slate-600">{item.action}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
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
                <div className="text-[11px] text-slate-500 font-semibold">Origin Department</div>
                <div className="font-bold text-slate-900">{proposal.department}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Submitted By</div>
                <div className="font-bold text-slate-900">{proposal.submittedBy}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Budget Involved</div>
                <div className="font-extrabold text-emerald-800 flex items-center gap-1 text-xs">
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{proposal.budgetInvolved || 'Nil'}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Urgency</div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                  {proposal.urgency}
                </span>
              </div>
            </div>

          </div>

          {/* Existing Decision / Seal */}
          {proposal.status !== 'Pending VC Action' && proposal.vcDecision && (
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <div className="font-black text-emerald-950 flex items-center gap-2">
                <Stamp className="w-4 h-4 text-emerald-700" />
                <span>Vice Chancellor Decision Decreed</span>
              </div>
              <div>
                <strong>Decision:</strong> {proposal.vcDecision.decision}
              </div>
              <div>
                <strong>Remarks:</strong> {proposal.vcDecision.remarks}
              </div>
              {proposal.vcDecision.digitalSignatureId && (
                <div className="text-[10.5px] font-mono text-emerald-800">
                  Seal ID: {proposal.vcDecision.digitalSignatureId}
                </div>
              )}
            </div>
          )}

          {/* Action Remarks formulation */}
          {proposal.status === 'Pending VC Action' && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Vice Chancellor Remarks / Executive Observations:</span>
                <span className="text-[10.5px] text-slate-500 font-normal">
                  (Required for Reject &amp; Return)
                </span>
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter executive notes, endorsement directives, or revision remarks..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-xs text-slate-900 bg-white"
              />

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-5 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-600">
            Audit Trail: Actions are timestamped and signed with the Vice Chancellor electronic seal.
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>

            {proposal.status === 'Pending VC Action' && (
              <>
                {/* 1. Return for Revision */}
                <button
                  onClick={() => handleExecute('Return')}
                  disabled={isSubmitting}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return for Revision</span>
                </button>

                {/* 2. Reject */}
                <button
                  onClick={() => handleExecute('Reject')}
                  disabled={isSubmitting}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                {/* 3. Endorse for Chancellor Assent (if statutory) */}
                {proposal.delegatedAuthority === 'Requires Chancellor Assent' && (
                  <button
                    onClick={() => handleExecute('Endorse for Chancellor')}
                    disabled={isSubmitting}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Endorse for Chancellor</span>
                  </button>
                )}

                {/* 4. Approve (Sanction under VC powers) */}
                <button
                  onClick={() => handleExecute('Approve')}
                  disabled={isSubmitting}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
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

export default ViceChancellorProposalModal;
