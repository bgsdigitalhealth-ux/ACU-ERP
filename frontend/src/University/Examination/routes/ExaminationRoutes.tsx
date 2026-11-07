import React from 'react';
import { ExaminationLayout } from '../layouts/ExaminationLayout';
import { ExaminationDashboard } from '../pages/ExaminationDashboard';

interface ExaminationRoutesProps {
  onBackToPortal?: () => void;
}

export const ExaminationRoutes: React.FC<ExaminationRoutesProps> = ({ onBackToPortal }) => {
  return (
    <ExaminationLayout onBackToPortal={onBackToPortal}>
      <ExaminationDashboard />
    </ExaminationLayout>
  );
};
export default ExaminationRoutes;
