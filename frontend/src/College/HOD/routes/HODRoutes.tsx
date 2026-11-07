import React from 'react';
import { HODLayout } from '../layouts/HODLayout';
import { HODDashboard } from '../pages/HODDashboard';

interface HODRoutesProps {
  onBackToPortal?: () => void;
}

export const HODRoutes: React.FC<HODRoutesProps> = ({ onBackToPortal }) => {
  return (
    <HODLayout onBackToPortal={onBackToPortal}>
      <HODDashboard />
    </HODLayout>
  );
};
export default HODRoutes;
