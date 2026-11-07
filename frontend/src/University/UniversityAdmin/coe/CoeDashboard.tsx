import React from 'react';
import { CoeFilters } from './CoeFilters';
import { CoeKpis } from './CoeKpis';
import { CoeWorkflow } from './CoeWorkflow';
import { CoeUpcomingExams } from './CoeUpcomingExams';
import { CoeQuickActions } from './CoeQuickActions';
import { CoePracticalAllocationWizard } from './CoePracticalAllocationWizard';
import { CoePracticalScheduleTable } from './CoePracticalScheduleTable';
import { CoeReportsOutputs } from './CoeReportsOutputs';
import { CoeModals } from './CoeModals';

export const CoeDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic CoE Filters */}
      <CoeFilters />

      {/* 2. 7 KPI Cards Row */}
      <CoeKpis />

      {/* 3. Examination Process Workflow + Upcoming Exams (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <CoeWorkflow />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <CoeUpcomingExams />
        </div>
      </div>

      {/* 4. Quick Actions (6 Operations Row) */}
      <CoeQuickActions />

      {/* 5. Exam Schedule Practical + Practical Allocation Wizard (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <CoePracticalScheduleTable />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <CoePracticalAllocationWizard />
        </div>
      </div>

      {/* 6. Reports & Outputs (4 Cards) */}
      <CoeReportsOutputs />

      {/* 7. Operational Modals */}
      <CoeModals />
    </div>
  );
};

