import React from 'react';
import { Scale, CheckCircle2, ChevronRight } from 'lucide-react';
import { useChancellor } from '../context/ChancellorContext';

export const StatutoryApprovalsPage: React.FC = () => {
  const { pendingApprovals, setSelectedApproval } = useChancellor();

  return (
    <div className="space-y-5 animate-in fade-in">
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Statutory Approvals Portal</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Executive Chancellor Assents, Ordinances &amp; Exceptional Policy Cases
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <Scale className="w-4 h-4 text-amber-300" />
          <span>Pending Decisions: {pendingApprovals.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {pendingApprovals.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-purple-100">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-extrabold text-[#1e1b4b] text-base">No Pending Files</h3>
            <p className="text-xs text-gray-500 mt-1">All university examination policy files have received statutory assent.</p>
          </div>
        ) : (
          pendingApprovals.map((appr) => (
            <div
              key={appr.id}
              onClick={() => setSelectedApproval(appr)}
              className="bg-white p-5 rounded-2xl border border-purple-100 hover:border-purple-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    {appr.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {appr.priority} Priority
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#1e1b4b]">{appr.title}</h3>
                <p className="text-xs text-gray-500">
                  Submitted by: <strong className="text-gray-700">{appr.submittedBy}</strong> ({appr.submitterRole}) on {appr.submissionDate}
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold hover:bg-[#320b60] shrink-0">
                <span>Review &amp; Assent</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

