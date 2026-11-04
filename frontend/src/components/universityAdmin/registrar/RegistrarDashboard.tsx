import React from 'react';
import { RegistrarFilters } from './RegistrarFilters';
import { RegistrarKpis } from './RegistrarKpis';
import { RegistrarWorkflow } from './RegistrarWorkflow';
import { RegistrarPendingActions } from './RegistrarPendingActions';
import { RegistrarQuickActions } from './RegistrarQuickActions';
import { RegistrarMidSection } from './RegistrarMidSection';
import { RegistrarRecentActivities } from './RegistrarRecentActivities';
import { RegistrarModals } from './RegistrarModals';

export const RegistrarDashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 p-3 sm:p-5 lg:p-6 bg-[#f8f9fe] min-h-screen">
      {/* 1. Dynamic Evaluation Filters */}
      <RegistrarFilters />

      {/* 2. 6 KPI Cards Row */}
      <RegistrarKpis />

      {/* 3. Evaluation & Result Processing Workflow + Pending Actions (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <RegistrarWorkflow />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <RegistrarPendingActions />
        </div>
      </div>

      {/* 4. Quick Actions (8 Operations Row) */}
      <RegistrarQuickActions />

      {/* 5. 4 Cards Row: Valuation Progress, Marks Summary, Result Status, Reports */}
      <RegistrarMidSection />

      {/* 6. Recent Activities Table */}
      <RegistrarRecentActivities />

      {/* 7. Operational Modals */}
      <RegistrarModals />
    </div>
  );
};

