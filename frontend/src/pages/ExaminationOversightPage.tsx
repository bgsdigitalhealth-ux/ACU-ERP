import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { DashboardFilters } from '../components/chancellor/DashboardFilters';
import { UniversityExamStatusTable } from '../components/chancellor/UniversityExamStatusTable';
import { ExaminationPerformanceChart } from '../components/chancellor/ExaminationPerformanceChart';

export const ExaminationOversightPage: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Examination Oversight</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Real-time Evaluation Monitoring, College Compliance &amp; Result Dispatches
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <ClipboardCheck className="w-4 h-4 text-amber-300" />
          <span>Active Session: 2024–25</span>
        </div>
      </div>

      <DashboardFilters />

      <div className="space-y-5">
        <UniversityExamStatusTable />
        <ExaminationPerformanceChart />
      </div>
    </div>
  );
};

