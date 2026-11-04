import React, { useState } from 'react';
import { HodHeader } from './HodHeader';
import { HodSidebar } from './HodSidebar';
import { HodDashboardPage } from '../../pages/HodDashboardPage';
import { HodOperationsPage } from '../../pages/hod/HodOperationsPage';
import { HodEvaluationPage } from '../../pages/hod/HodEvaluationPage';
import { HodReportsPage } from '../../pages/hod/HodReportsPage';
import { HodSettingsPage } from '../../pages/hod/HodSettingsPage';
import { useHod } from '../../context/HodContext';
import { CheckCircle2, X } from 'lucide-react';

interface Props {
  onLogout?: () => void;
  onNavigateToAuth?: () => void;
}

export const HodDashboardLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { toastMessage, clearToast, logoutHod } = useHod();

  const handleLogout = () => {
    logoutHod();
    if (onLogout) onLogout();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fe] flex flex-col antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-[#2a084e] text-white px-4 py-3 rounded-2xl shadow-2xl border border-purple-400/40 text-xs animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="p-1 hover:bg-white/10 rounded-lg text-purple-200 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <HodHeader
        onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
        onLogout={handleLogout}
        onOpenSettings={() => setActiveTab('settings')}
      />

      {/* Body with Sidebar + Main Content */}
      <div className="flex-1 flex min-w-0">
        <HodSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMobileOpen(false);
          }}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && <HodDashboardPage />}
          
          {(activeTab === 'exam-schedule' ||
            activeTab === 'examiner-nomination' ||
            activeTab === 'practical-viva-details') && (
            <HodOperationsPage initialSubTab={activeTab as any} />
          )}

          {(activeTab === 'qp-review' ||
            activeTab === 'internal-assessment' ||
            activeTab === 'marks-verification') && (
            <HodEvaluationPage initialSubTab={activeTab as any} />
          )}

          {(activeTab === 'dept-eval-report' ||
            activeTab === 'faculty-contribution' ||
            activeTab === 'pending-actions-view') && (
            <HodReportsPage initialSubTab={activeTab as any} />
          )}

          {activeTab === 'settings' && <HodSettingsPage />}
        </main>
      </div>
    </div>
  );
};
