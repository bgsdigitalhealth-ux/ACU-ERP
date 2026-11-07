import React from 'react';
import { CollegeAdminLayout } from '../layouts/CollegeAdminLayout';
import { CollegeAdminDashboard } from '../pages/CollegeAdminDashboard';

interface CollegeAdminRoutesProps {
  onBackToPortal?: () => void;
}

export const CollegeAdminRoutes: React.FC<CollegeAdminRoutesProps> = ({ onBackToPortal }) => {
  return (
    <CollegeAdminLayout onBackToPortal={onBackToPortal}>
      <CollegeAdminDashboard />
    </CollegeAdminLayout>
  );
};
export default CollegeAdminRoutes;
