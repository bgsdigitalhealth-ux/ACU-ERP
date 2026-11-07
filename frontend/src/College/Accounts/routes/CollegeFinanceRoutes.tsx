import React from 'react';
import { CollegeFinanceDashboardLayout } from '../layouts/CollegeFinanceDashboardLayout';

interface CollegeFinanceRoutesProps {
  onBackToPortal?: () => void;
}

export const CollegeFinanceRoutes: React.FC<CollegeFinanceRoutesProps> = ({ onBackToPortal }) => {
  return <CollegeFinanceDashboardLayout onLogout={onBackToPortal || (() => {})} />;
};

export default CollegeFinanceRoutes;
