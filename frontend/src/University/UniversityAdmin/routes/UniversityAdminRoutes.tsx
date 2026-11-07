import React from 'react';
import { UniversityAdminLayout } from '../layouts/UniversityAdminLayout';
import { UniversityAdminDashboard } from '../pages/UniversityAdminDashboard';

interface UniversityAdminRoutesProps {
  onBackToPortal?: () => void;
}

export const UniversityAdminRoutes: React.FC<UniversityAdminRoutesProps> = ({ onBackToPortal }) => {
  return (
    <UniversityAdminLayout onBackToPortal={onBackToPortal}>
      <UniversityAdminDashboard />
    </UniversityAdminLayout>
  );
};
export default UniversityAdminRoutes;
