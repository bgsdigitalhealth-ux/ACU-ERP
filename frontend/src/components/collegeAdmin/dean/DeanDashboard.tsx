import React from 'react';
import { DeanFilters } from './DeanFilters';
import { DeanKpis } from './DeanKpis';
import { DeanWorkflow } from './DeanWorkflow';
import { DeanTodaysExamCard } from './DeanTodaysExamCard';
import { DeanQuickActions } from './DeanQuickActions';
import { DeanExamConductStatusTable } from './DeanExamConductStatusTable';
import { DeanRecentActivities } from './DeanRecentActivities';
import { DeanModals } from './DeanModals';

export const DeanDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic Dean Filters */}
      <DeanFilters />

      {/* 2. 6 KPI Cards Row */}
      <DeanKpis />

      {/* 3. Examination Lifecycle Workflow + Today's Examination (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <DeanWorkflow />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <DeanTodaysExamCard />
        </div>
      </div>

      {/* 4. Quick Actions (6 Operations Row) */}
      <DeanQuickActions />

      {/* 5. Exam Conduct Status Table + Recent Activities Feed (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <DeanExamConductStatusTable />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <DeanRecentActivities />
        </div>
      </div>

      {/* 6. Operational Modals Dialog */}
      <DeanModals />
    </div>
  );
};

