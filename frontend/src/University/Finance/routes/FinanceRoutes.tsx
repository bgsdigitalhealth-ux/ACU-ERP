import React from 'react';
import { FinanceLayout } from '../layouts/FinanceLayout';
import { FinanceDashboard } from '../pages/FinanceDashboard';

interface FinanceRoutesProps {
  onBackToPortal?: () => void;
}

export const FinanceRoutes: React.FC<FinanceRoutesProps> = ({ onBackToPortal }) => {
  return (
    <FinanceLayout onBackToPortal={onBackToPortal}>
      <FinanceDashboard />
    </FinanceLayout>
  );
};
export default FinanceRoutes;
