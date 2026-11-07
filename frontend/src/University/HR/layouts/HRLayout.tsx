import React from 'react';

interface HRLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'employees' | 'recruitment' | 'payroll' | 'attendance';
  onTabChange: (tab: 'dashboard' | 'employees' | 'recruitment' | 'payroll' | 'attendance') => void;
  onBackToPortal?: () => void;
}

export const HRLayout: React.FC<HRLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onBackToPortal,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'HR Overview' },
    { id: 'employees', label: 'Staff Management' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'payroll', label: 'Payroll & Compensation' },
    { id: 'attendance', label: 'Attendance Records' },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg">
              HR
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">University HR Directorate</h1>
              <p className="text-xs text-slate-500">Adichunchanagiri University Personnel Portal</p>
            </div>
          </div>
          {onBackToPortal && (
            <button
              onClick={onBackToPortal}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              ← Back to Portal
            </button>
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default HRLayout;

