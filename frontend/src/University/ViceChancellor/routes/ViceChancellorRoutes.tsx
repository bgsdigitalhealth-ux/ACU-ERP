import React from 'react';
import { ViceChancellorLayout } from '../layouts/ViceChancellorLayout';
import { ViceChancellorDashboard } from '../pages/ViceChancellorDashboard';

interface ViceChancellorRoutesProps {
  onBackToPortal?: () => void;
}

export const ViceChancellorRoutes: React.FC<ViceChancellorRoutesProps> = ({ onBackToPortal }) => {
  return (
    <ViceChancellorLayout onBackToPortal={onBackToPortal}>
      <ViceChancellorDashboard />
    </ViceChancellorLayout>
  );
};
export default ViceChancellorRoutes;
