import React from 'react';
import { StudentAffairsLayout } from '../layouts/StudentAffairsLayout';
import { StudentAffairsDashboard } from '../pages/StudentAffairsDashboard';

interface StudentAffairsRoutesProps {
  onBackToPortal?: () => void;
}

export const StudentAffairsRoutes: React.FC<StudentAffairsRoutesProps> = ({ onBackToPortal }) => {
  return (
    <StudentAffairsLayout onBackToPortal={onBackToPortal}>
      <StudentAffairsDashboard />
    </StudentAffairsLayout>
  );
};
export default StudentAffairsRoutes;
