import React from 'react';
import { HodFilters } from '../components/hod/HodFilters';
import { HodKpiCards } from '../components/hod/HodKpiCards';
import { DepartmentWorkflowSection } from '../components/hod/DepartmentWorkflowSection';
import { HodPendingActions } from '../components/hod/HodPendingActions';
import { HodQuickActions } from '../components/hod/HodQuickActions';
import { HodRecentSubmissions } from '../components/hod/HodRecentSubmissions';
import { HodReportsOutputs } from '../components/hod/HodReportsOutputs';
import { HodModals } from '../components/hod/HodModals';

export const HodDashboardPage: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic Filters Bar (Locked to assigned department) */}
      <HodFilters />

      {/* 2. 5 KPI Cards Row */}
      <HodKpiCards />

      {/* 3. Workflow + Pending Actions (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <DepartmentWorkflowSection />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <HodPendingActions />
        </div>
      </div>

      {/* 4. Quick Actions (6 Operations Row) */}
      <HodQuickActions />

      {/* 5. Recent Submissions + Reports & Outputs (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <HodRecentSubmissions />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <HodReportsOutputs />
        </div>
      </div>

      {/* 6. Dynamic Modals Dialog for Quick Actions & Workflows */}
      <HodModals />
    </div>
  );
};

