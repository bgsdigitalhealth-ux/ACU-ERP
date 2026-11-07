import React from 'react';
import { RegistrarLayout } from '../layouts/RegistrarLayout';
import { RegistrarDashboard } from '../pages/RegistrarDashboard';

interface RegistrarRoutesProps {
  onBackToPortal?: () => void;
}

export const RegistrarRoutes: React.FC<RegistrarRoutesProps> = ({ onBackToPortal }) => {
  return (
    <RegistrarLayout onBackToPortal={onBackToPortal}>
      <RegistrarDashboard />
    </RegistrarLayout>
  );
};
export default RegistrarRoutes;
