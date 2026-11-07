import React from 'react';
import { ViceChancellorLayout } from '../layouts/ViceChancellorLayout';

interface ViceChancellorDashboardProps {
  onLogout?: () => void;
}

export const ViceChancellorDashboard: React.FC<ViceChancellorDashboardProps> = ({ onLogout }) => {
  return <ViceChancellorLayout onLogout={onLogout} />;
};

export default ViceChancellorDashboard;