import React from 'react';
import { ChancellorLayout } from '../layouts/ChancellorLayout';
import { ChancellorDashboard } from '../pages/ChancellorDashboard';

interface ChancellorRoutesProps {
  onBackToPortal?: () => void;
}

export const ChancellorRoutes: React.FC<ChancellorRoutesProps> = ({ onBackToPortal }) => {
  return (
    <ChancellorLayout onBackToPortal={onBackToPortal}>
      <ChancellorDashboard />
    </ChancellorLayout>
  );
};
export default ChancellorRoutes;
