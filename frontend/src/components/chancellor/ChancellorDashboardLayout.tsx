import React from 'react';
import { ChancellorLayout } from '../../University/Chancellor/layouts/ChancellorLayout';

interface ChancellorDashboardLayoutProps {
  onLogout?: () => void;
}

export const ChancellorDashboardLayout: React.FC<ChancellorDashboardLayoutProps> = ({ onLogout }) => {
  return <ChancellorLayout onLogout={onLogout} />;
};

export default ChancellorDashboardLayout;
