import React from 'react';
import { DashboardFilters } from '../components/chancellor/DashboardFilters';
import { KpiCards } from '../components/chancellor/KpiCards';
import { UniversityExamStatusTable } from '../components/chancellor/UniversityExamStatusTable';
import { ExaminationPerformanceChart } from '../components/chancellor/ExaminationPerformanceChart';
import { PendingApprovalsSection } from '../components/chancellor/PendingApprovalsSection';
import { KeyInsightsSection } from '../components/chancellor/KeyInsightsSection';
import { GovernanceDecisionsTable } from '../components/chancellor/GovernanceDecisionsTable';
import { QuickReportsSection } from '../components/chancellor/QuickReportsSection';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const ChancellorDashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Filter Bar */}
      <DashboardFilters />

      {/* 5 Dynamic KPI Cards */}
      <KpiCards />

      {/* Row 2: University Exam Status Table (Left) + Performance Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 xl:col-span-7">
          <UniversityExamStatusTable />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <ExaminationPerformanceChart />
        </div>
      </div>

      {/* Row 3: Pending Approvals (Left) + Key Insights (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 xl:col-span-7">
          <PendingApprovalsSection onViewAll={() => onNavigate('statutory-approvals')} />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <KeyInsightsSection />
        </div>
      </div>

      {/* Row 4: Recent Decisions (Left) + Quick Reports (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 xl:col-span-7">
          <GovernanceDecisionsTable onViewAll={() => onNavigate('governance-records')} />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <QuickReportsSection />
        </div>
      </div>
    </div>
  );
};

