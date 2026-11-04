import React from 'react';
import { DeputyFilters } from './DeputyFilters';
import { DeputyKpis } from './DeputyKpis';
import { DeputyWorkflow } from './DeputyWorkflow';
import { DeputyTodaysExamCard } from './DeputyTodaysExamCard';
import { DeputyQuickActions } from './DeputyQuickActions';
import { DeputyExamStatusTrack } from './DeputyExamStatusTrack';
import { DeputyAllocationSummaryTable } from './DeputyAllocationSummaryTable';
import { DeputyDutyRosterTable } from './DeputyDutyRosterTable';
import { DeputyReportsDownloads } from './DeputyReportsDownloads';
import { DeputyModals } from './DeputyModals';

export const DeputyDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic Top Filters */}
      <DeputyFilters />

      {/* 2. 6 KPI Cards Row */}
      <DeputyKpis />

      {/* 3. Workflow + Today's Examination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <DeputyWorkflow />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <DeputyTodaysExamCard />
        </div>
      </div>

      {/* 4. Quick Actions + Examination Status Track */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <DeputyQuickActions />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <DeputyExamStatusTrack />
        </div>
      </div>

      {/* 5. 3 Columns: Invigilator Allocation Summary + Today's Duty Roster + Reports & Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <DeputyAllocationSummaryTable />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <DeputyDutyRosterTable />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <DeputyReportsDownloads />
        </div>
      </div>

      {/* 6. Dynamic Modals Dialog */}
      <DeputyModals />
    </div>
  );
};

