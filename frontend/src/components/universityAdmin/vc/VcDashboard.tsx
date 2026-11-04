import React from 'react';
import { VcFilters } from './VcFilters';
import { VcKpis } from './VcKpis';
import { VcWorkflow } from './VcWorkflow';
import { VcApprovals } from './VcApprovals';
import { VcCollegeStatusTable } from './VcCollegeStatusTable';
import { VcPerformanceTrend } from './VcPerformanceTrend';
import { VcKeyIndicators } from './VcKeyIndicators';
import { VcRecentActivities } from './VcRecentActivities';
import { VcQuickAccess } from './VcQuickAccess';
import { VcModals } from './VcModals';

interface VcDashboardProps {
  onNavigate?: (tab: string) => void;
}

export const VcDashboard: React.FC<VcDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic University Filters */}
      <VcFilters />

      {/* 2. 5 KPI Cards Row */}
      <VcKpis />

      {/* 3. Examination Workflow + Approvals (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VcWorkflow onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <VcApprovals onNavigate={onNavigate} />
        </div>
      </div>

      {/* 4. Row 4 (3 Columns matching reference image): College-wise Status + Trend Chart + Key Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <VcCollegeStatusTable onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <VcPerformanceTrend />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <VcKeyIndicators />
        </div>
      </div>

      {/* 5. Row 5 (2 Columns matching reference image): Recent Activities + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <VcRecentActivities onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <VcQuickAccess onNavigate={onNavigate} />
        </div>
      </div>

      {/* 6. Decision Modal */}
      <VcModals />
    </div>
  );
};


