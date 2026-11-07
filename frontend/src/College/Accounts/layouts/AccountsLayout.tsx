import React from 'react';
import { CollegeFinanceDashboardLayout } from './CollegeFinanceDashboardLayout';

interface AccountsLayoutProps {
  children?: React.ReactNode;
  onBackToPortal?: () => void;
}

export const AccountsLayout: React.FC<AccountsLayoutProps> = ({ children, onBackToPortal }) => {
  if (children) {
    return <>{children}</>;
  }
  return <CollegeFinanceDashboardLayout onLogout={onBackToPortal || (() => {})} />;
};

export default AccountsLayout;

