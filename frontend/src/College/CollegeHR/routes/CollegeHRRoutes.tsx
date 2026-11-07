import React from 'react';
import { CollegeHRLayout } from '../layouts/CollegeHRLayout';
import { CollegeHRDashboard } from '../pages/CollegeHRDashboard';

interface CollegeHRRoutesProps {
  onBackToPortal?: () => void;
}

export const CollegeHRRoutes: React.FC<CollegeHRRoutesProps> = ({ onBackToPortal }) => {
  return (
    <CollegeHRLayout onBackToPortal={onBackToPortal}>
      <CollegeHRDashboard />
    </CollegeHRLayout>
  );
};
export default CollegeHRRoutes;
