import React from 'react';
import { VicePrincipalLayout } from '../layouts/VicePrincipalLayout';
import { VicePrincipalDashboard } from '../pages/VicePrincipalDashboard';

interface VicePrincipalRoutesProps {
  onBackToPortal?: () => void;
}

export const VicePrincipalRoutes: React.FC<VicePrincipalRoutesProps> = ({ onBackToPortal }) => {
  return (
    <VicePrincipalLayout onBackToPortal={onBackToPortal}>
      <VicePrincipalDashboard />
    </VicePrincipalLayout>
  );
};
export default VicePrincipalRoutes;
