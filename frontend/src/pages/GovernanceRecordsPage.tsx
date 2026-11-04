import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { GovernanceDecisionsTable } from '../components/chancellor/GovernanceDecisionsTable';

export const GovernanceRecordsPage: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in">
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Governance Records &amp; Decisions</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Permanent University Archives, Chancellor Assent Decrees &amp; Audit Logs
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Legally Ratified</span>
        </div>
      </div>

      <GovernanceDecisionsTable />
    </div>
  );
};
