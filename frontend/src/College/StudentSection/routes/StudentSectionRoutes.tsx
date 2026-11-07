import React from 'react';
import { StudentSectionLayout } from '../layouts/StudentSectionLayout';
import { StudentSectionDashboard } from '../pages/StudentSectionDashboard';

interface StudentSectionRoutesProps {
  onBackToPortal?: () => void;
}

export const StudentSectionRoutes: React.FC<StudentSectionRoutesProps> = ({ onBackToPortal }) => {
  return (
    <StudentSectionLayout onBackToPortal={onBackToPortal}>
      <StudentSectionDashboard />
    </StudentSectionLayout>
  );
};
export default StudentSectionRoutes;
