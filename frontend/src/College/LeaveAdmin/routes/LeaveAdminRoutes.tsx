import React from 'react';
import { LeaveAdminLayout } from '../layouts/LeaveAdminLayout';
import { LeaveAdminDashboard } from '../pages/LeaveAdminDashboard';

interface LeaveAdminRoutesProps {
  onBackToPortal?: () => void;
}

export const LeaveAdminRoutes: React.FC<LeaveAdminRoutesProps> = ({ onBackToPortal }) => {
  return (
    <LeaveAdminLayout onBackToPortal={onBackToPortal}>
      <LeaveAdminDashboard />
    </LeaveAdminLayout>
  );
};
export default LeaveAdminRoutes;
