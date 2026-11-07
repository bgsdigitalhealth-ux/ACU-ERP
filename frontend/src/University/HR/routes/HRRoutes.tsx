import React, { useState } from 'react';
import { HRLayout } from '../layouts/HRLayout';
import { HRDashboard } from '../pages/HRDashboard';
import { EmployeeManagement } from '../pages/EmployeeManagement';
import { Recruitment } from '../pages/Recruitment';
import { Payroll } from '../pages/Payroll';
import { Attendance } from '../pages/Attendance';

interface HRRoutesProps {
  onBackToPortal?: () => void;
}

export const HRRoutes: React.FC<HRRoutesProps> = ({ onBackToPortal }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'recruitment' | 'payroll' | 'attendance'>('dashboard');

  return (
    <HRLayout activeTab={activeTab} onTabChange={setActiveTab} onBackToPortal={onBackToPortal}>
      {activeTab === 'dashboard' && <HRDashboard />}
      {activeTab === 'employees' && <EmployeeManagement />}
      {activeTab === 'recruitment' && <Recruitment />}
      {activeTab === 'payroll' && <Payroll />}
      {activeTab === 'attendance' && <Attendance />}
    </HRLayout>
  );
};

export default HRRoutes;

