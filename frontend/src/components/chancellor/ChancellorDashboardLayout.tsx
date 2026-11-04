import React, { useState } from 'react';
import { Menu, CheckCircle2, X } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import { ChancellorHeader } from './ChancellorHeader';
import { ChancellorSidebar } from './ChancellorSidebar';
import { ChancellorDashboardPage } from '../../pages/ChancellorDashboardPage';
import { UniversityOverviewPage } from '../../pages/UniversityOverviewPage';
import { AcademicGovernancePage } from '../../pages/AcademicGovernancePage';
import { ExaminationOversightPage } from '../../pages/ExaminationOversightPage';
import { StatutoryApprovalsPage } from '../../pages/StatutoryApprovalsPage';
import { ReportsAnalyticsPage } from '../../pages/ReportsAnalyticsPage';
import { GovernanceRecordsPage } from '../../pages/GovernanceRecordsPage';
import { ApprovalModal } from './ApprovalModal';
import { ReportGenerationModal } from './ReportGenerationModal';
import { NotificationDrawer } from './NotificationDrawer';

interface ChancellorDashboardLayoutProps {
  onLogout?: () => void;
}

export const ChancellorDashboardLayout: React.FC<ChancellorDashboardLayoutProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    selectedApproval,
    setSelectedApproval,
    handleApprove,
    handleReject,
    handleRequestModification,
    toastMessage,
    clearToast
  } = useChancellor();

  const renderActiveView = () => {
    switch (activePage) {
      case 'university-overview':
        return <UniversityOverviewPage />;
      case 'academic-governance':
      case 'exam-policies':
      case 'regulations-ordinances':
      case 'governance-docs':
        return <AcademicGovernancePage />;
      case 'exam-oversight':
      case 'exam-status-table':
      case 'college-performance':
      case 'trends-analytics':
        return <ExaminationOversightPage />;
      case 'statutory-approvals':
      case 'policy-approvals':
      case 'special-cases':
      case 'governance-referrals':
        return <StatutoryApprovalsPage />;
      case 'reports-analytics':
      case 'rep-annual':
      case 'rep-programme':
      case 'rep-accreditation':
        return <ReportsAnalyticsPage />;
      case 'governance-records':
      case 'gov-resolutions':
      case 'gov-approval-history':
      case 'gov-audit':
        return <GovernanceRecordsPage />;
      case 'dashboard':
      default:
        return <ChancellorDashboardPage onNavigate={(page) => setActivePage(page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4fb] flex flex-col font-sans select-none">
      {/* Top Header */}
      <ChancellorHeader onLogout={onLogout} />

      {/* Main Body: Sidebar + Dynamic Dashboard Content */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Sidebar */}
        <ChancellorSidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Dynamic Content Canvas */}
        <div className="flex-1 flex flex-col min-w-0 p-3 sm:p-5 md:p-6 lg:p-7">
          {/* Mobile Menu Opener & Breadcrumb */}
          <div className="flex items-center justify-between pb-3 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 p-2 bg-purple-900 text-white rounded-xl text-xs font-bold"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
            <span className="text-xs font-bold text-[#2e1065] capitalize">
              {activePage.replace('-', ' ')}
            </span>
          </div>

          {/* Active View Component */}
          <main className="flex-1">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      {selectedApproval && (
        <ApprovalModal
          item={selectedApproval}
          onClose={() => setSelectedApproval(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestModification={handleRequestModification}
        />
      )}

      <ReportGenerationModal />
      <NotificationDrawer />

      {/* Toast Feedback Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1b4b] text-white px-4 py-3 rounded-2xl shadow-2xl border border-purple-400/50 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold leading-tight">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="p-1 rounded-full text-purple-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

