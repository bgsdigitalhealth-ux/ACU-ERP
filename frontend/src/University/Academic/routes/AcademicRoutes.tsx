import React from 'react';
import { AcademicLayout } from '../layouts/AcademicLayout';
import { AcademicDashboard } from '../pages/AcademicDashboard';

interface AcademicRoutesProps {
  onBackToPortal?: () => void;
}

export const AcademicRoutes: React.FC<AcademicRoutesProps> = ({ onBackToPortal }) => {
  return (
    <AcademicLayout onBackToPortal={onBackToPortal}>
      <AcademicDashboard />
    </AcademicLayout>
  );
};
export default AcademicRoutes;
