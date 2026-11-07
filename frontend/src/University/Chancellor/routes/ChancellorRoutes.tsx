import React from 'react';
import { ChancellorLayout } from '../layouts/ChancellorLayout';

interface ChancellorRoutesProps {
  onBackToPortal?: () => void;
  onLogout?: () => void;
}

export const ChancellorRoutes: React.FC<ChancellorRoutesProps> = ({ onBackToPortal, onLogout }) => {
  return <ChancellorLayout onLogout={onLogout || onBackToPortal} />;
};

export default ChancellorRoutes;
