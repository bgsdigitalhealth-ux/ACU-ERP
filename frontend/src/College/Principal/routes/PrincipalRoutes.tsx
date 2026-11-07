import React from 'react';
import { PrincipalLayout } from '../layouts/PrincipalLayout';
import { PrincipalDashboard } from '../pages/PrincipalDashboard';

interface PrincipalRoutesProps {
  onBackToPortal?: () => void;
}

export const PrincipalRoutes: React.FC<PrincipalRoutesProps> = ({ onBackToPortal }) => {
  return (
    <PrincipalLayout onBackToPortal={onBackToPortal}>
      <PrincipalDashboard />
    </PrincipalLayout>
  );
};
export default PrincipalRoutes;
