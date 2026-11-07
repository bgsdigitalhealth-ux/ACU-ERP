import React from 'react';
import { FacultyLayout } from '../layouts/FacultyLayout';
import { FacultyDashboard } from '../pages/FacultyDashboard';

interface FacultyRoutesProps {
  onBackToPortal?: () => void;
}

export const FacultyRoutes: React.FC<FacultyRoutesProps> = ({ onBackToPortal }) => {
  return (
    <FacultyLayout onBackToPortal={onBackToPortal}>
      <FacultyDashboard />
    </FacultyLayout>
  );
};
export default FacultyRoutes;
