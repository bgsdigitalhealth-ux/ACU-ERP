import React, { useState } from 'react';
import { VcQuickAccess } from './VcQuickAccess';
import { VcResearchReport } from './VcResearchReport';
import { VcFeedbackGraph } from './VcFeedbackGraph';
import { VcFinancialReportGraph } from './VcFinancialReportGraph';
import { VcRecentActivities } from './VcRecentActivities';
import { VcUpcomingEvents } from './VcUpcomingEvents';
import { VcModals } from './VcModals';
import { Landmark, Calendar, RefreshCw } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

interface VcDashboardProps {
  onNavigate?: (tab: string) => void;
}

export const VcDashboard: React.FC<VcDashboardProps> = ({ onNavigate }) => {
  const { setToast } = useUniversityAdmin();
  const [academicYear, setAcademicYear] = useState('2024 – 25');

  return (
    <div className="space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Executive Welcome & Institutional Filter Bar */}
      <div className="bg-white rounded-2xl border border-purple-200/90 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#5a189a] to-[#7b2cbf] text-white flex items-center justify-center shadow-md">
            <Landmark className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                Vice-Chancellor’s Executive Governance Dashboard
              </h2>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                Live Overview
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Adichunchanagiri University &bull; Institutional Strategy, R&D, Financial Health & Stakeholder CSAT
            </p>
          </div>
        </div>

        {/* Year Filter & Refresh */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-2 bg-[#f4f1fa] border border-purple-200 rounded-xl px-3 py-1.5 text-xs text-purple-950 font-bold">
            <Calendar className="w-3.5 h-3.5 text-purple-700" />
            <span>Academic Year:</span>
            <select
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                setToast(`Academic session switched to ${e.target.value}`);
              }}
              className="bg-transparent font-extrabold text-purple-900 focus:outline-hidden cursor-pointer"
            >
              <option value="2024 – 25">2024 – 25 (Active)</option>
              <option value="2023 – 24">2023 – 24 (Audited)</option>
              <option value="2022 – 23">2022 – 23 (Archived)</option>
            </select>
          </div>

          <button
            onClick={() => setToast('Governance metrics refreshed with latest university data.')}
            className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
            title="Refresh Governance Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. Executive Quick Access */}
      <VcQuickAccess onNavigate={onNavigate} />

      {/* 2. University Research & Innovation Report (Ongoing, Proposals Submitted, Completed, Sanctioned Grants) */}
      <VcResearchReport onNavigate={onNavigate} />

      {/* 3. Financial Report (in Graph) */}
      <VcFinancialReportGraph onNavigate={onNavigate} />

      {/* 4. Student & Parents Feedback Analytics (in Graph) */}
      <VcFeedbackGraph onNavigate={onNavigate} />

      {/* 5. Recent Activity & Upcoming Events (Side-by-Side 2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <VcRecentActivities onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <VcUpcomingEvents onNavigate={onNavigate} />
        </div>
      </div>

      {/* Modals */}
      <VcModals />
    </div>
  );
};
