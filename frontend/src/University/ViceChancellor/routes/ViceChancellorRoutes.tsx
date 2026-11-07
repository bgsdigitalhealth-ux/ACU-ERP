import React from 'react';
import { ViceChancellorLayout } from '../layouts/ViceChancellorLayout';

interface ViceChancellorRoutesProps {
  onBackToPortal?: () => void;
  onLogout?: () => void;
}

export const ViceChancellorRoutes: React.FC<ViceChancellorRoutesProps> = ({ onBackToPortal, onLogout }) => {
  return <ViceChancellorLayout onLogout={onLogout || onBackToPortal} />;
};

export default ViceChancellorRoutes;