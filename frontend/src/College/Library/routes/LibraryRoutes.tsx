import React from 'react';
import { LibraryLayout } from '../layouts/LibraryLayout';
import { LibraryDashboard } from '../pages/LibraryDashboard';

interface LibraryRoutesProps {
  onBackToPortal?: () => void;
}

export const LibraryRoutes: React.FC<LibraryRoutesProps> = ({ onBackToPortal }) => {
  return (
    <LibraryLayout onBackToPortal={onBackToPortal}>
      <LibraryDashboard />
    </LibraryLayout>
  );
};
export default LibraryRoutes;
