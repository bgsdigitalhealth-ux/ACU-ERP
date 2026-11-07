import React from 'react';
import { ResearchLayout } from '../layouts/ResearchLayout';
import { ResearchDashboard } from '../pages/ResearchDashboard';

interface ResearchRoutesProps {
  onBackToPortal?: () => void;
}

export const ResearchRoutes: React.FC<ResearchRoutesProps> = ({ onBackToPortal }) => {
  return (
    <ResearchLayout onBackToPortal={onBackToPortal}>
      <ResearchDashboard />
    </ResearchLayout>
  );
};
export default ResearchRoutes;
