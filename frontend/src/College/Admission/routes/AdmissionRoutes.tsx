import React from 'react';
import { AdmissionLayout } from '../layouts/AdmissionLayout';
import { AdmissionDashboard } from '../pages/AdmissionDashboard';

interface AdmissionRoutesProps {
  onBackToPortal?: () => void;
}

export const AdmissionRoutes: React.FC<AdmissionRoutesProps> = ({ onBackToPortal }) => {
  return (
    <AdmissionLayout onBackToPortal={onBackToPortal}>
      <AdmissionDashboard />
    </AdmissionLayout>
  );
};
export default AdmissionRoutes;
