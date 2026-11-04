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

export const VcDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic University Filters */}
      <VcFilters />

      {/* 2. 5 KPI Cards Row */}
      <VcKpis />

      {/* 3. Examination Workflow + Approvals (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VcWorkflow />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <VcApprovals />
        </div>
      </div>

      {/* 4. College-wise Examination Status + Trend Chart (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <VcCollegeStatusTable />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <VcPerformanceTrend />
        </div>
      </div>

      {/* 5. Key Indicators + Recent Activities (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <VcKeyIndicators />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <VcRecentActivities />
        </div>
      </div>

      {/* 6. Quick Access */}
      <VcQuickAccess />

      {/* 7. Decision Modal */}
      <VcModals />
    </div>
  );
};

