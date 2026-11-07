import React, { useState, useEffect } from 'react';
import { Menu, CheckCircle2, X } from 'lucide-react';
import {
  chancellorApi,
  ChancellorOverviewData,
  ChancellorProposalItem,
  FALLBACK_CHANCELLOR_OVERVIEW,
} from '../services/chancellorApi';
import { ChancellorHeader } from '../components/ChancellorHeader';
import { ChancellorSidebar } from '../components/ChancellorSidebar';
import { ChancellorResponsibilitiesPanel } from '../components/ChancellorResponsibilitiesPanel';
import { ChancellorDashboardPage } from '../pages/ChancellorDashboardPage';
import { ChancellorSubcontentPage } from '../pages/ChancellorSubcontentPage';
import { ChancellorAdmsDashboardPage } from '../pages/ChancellorAdmsDashboardPage';
import { ProposalReviewModal } from '../components/ProposalReviewModal';

interface ChancellorLayoutProps {
  onLogout?: () => void;
}

export const ChancellorLayout: React.FC<ChancellorLayoutProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [academicYear, setAcademicYear] = useState('2026 - 2027');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dynamic Data
  const [overview, setOverview] = useState<ChancellorOverviewData>(FALLBACK_CHANCELLOR_OVERVIEW);
  const [proposals, setProposals] = useState<ChancellorProposalItem[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<ChancellorProposalItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Overview & Proposals
  const loadData = async () => {
    try {
      const [overviewData, proposalsData] = await Promise.all([
        chancellorApi.fetchOverview(academicYear),
        chancellorApi.fetchProposals(),
      ]);
      setOverview(overviewData);
      setProposals(proposalsData);
    } catch (err) {
      console.error('[Chancellor Layout] Error loading dynamic data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [academicYear]);

  // Execute Flowchart Decision (Approve / Reject / Return)
  const handleDecide = async (
    proposalId: string,
    decision: 'Approve' | 'Reject' | 'Return',
    remarks: string
  ) => {
    const updated = await chancellorApi.decideProposal(proposalId, {
      decision,
      remarks,
    });

    // Refresh dynamic data
    await loadData();

    setToastMessage(
      decision === 'Approve'
        ? `Proposal ${updated.proposalCode} Approved & Digitally Signed with Chancellor Apex Seal.`
        : decision === 'Reject'
        ? `Proposal ${updated.proposalCode} Declined with Chancellor executive observations.`
        : `Proposal ${updated.proposalCode} Returned to Registrar & Vice-Chancellor for corrections.`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Render Center Dynamic Canvas
  const renderCenterContent = () => {
    if (activePage === 'dashboard') {
      return (
        <ChancellorDashboardPage
          overview={overview}
          academicYear={academicYear}
          onAcademicYearChange={setAcademicYear}
          onNavigate={(pageId) => setActivePage(pageId)}
          onSelectProposalCategory={(category) => {
            setActivePage(category);
          }}
          onOpenProposalModal={(proposal) => setSelectedProposal(proposal)}
          proposals={proposals}
        />
      );
    }

    if (activePage === 'reports-analytics') {
      return (
        <ChancellorAdmsDashboardPage
          academicYear={academicYear}
          onBackToDashboard={() => setActivePage('dashboard')}
        />
      );
    }

    return (
      <ChancellorSubcontentPage
        pageId={activePage}
        onBackToDashboard={() => setActivePage('dashboard')}
        onOpenProposalModal={(proposal) => setSelectedProposal(proposal)}
        proposals={proposals}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4fb] flex flex-col font-sans select-none text-slate-800">
      {/* 1. Official Apex Title Bar & Sub-Header */}
      <ChancellorHeader
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notificationCount={overview.pendingActions?.total || 1}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Main Body: Sidebar (Left) + Center Content Canvas + Responsibilities Panel (Right) */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar */}
        <ChancellorSidebar
          activePage={activePage}
          onSelectPage={(pageId) => setActivePage(pageId)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Center + Right Layout Canvas */}
        <main className="flex-1 flex flex-col min-w-0 p-3 sm:p-5 md:p-6 lg:p-7">
          
          {/* Mobile Opener */}
          <div className="flex items-center justify-between pb-3 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0f214d] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Portal Menu</span>
            </button>
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              {activePage.replace('-', ' ')}
            </span>
          </div>

          {/* Grid Layout: Main Center View (8 cols) + Right Work & Responsibilities (4 cols) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            
            {/* Center Dynamic Content View */}
            <div
              className={`transition-all duration-300 ${
                activePage === 'dashboard' ? 'xl:col-span-8' : 'xl:col-span-12'
              }`}
            >
              {renderCenterContent()}
            </div>

            {/* Right Work & Responsibilities Column (Shown alongside dashboard on desktop) */}
            {activePage === 'dashboard' && (
              <div className="xl:col-span-4 sticky top-24 self-start">
                <ChancellorResponsibilitiesPanel
                  responsibilities={overview.responsibilities}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. Decision & Review Modal for Flowchart Approvals */}
      {selectedProposal && (
        <ProposalReviewModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onDecide={handleDecide}
        />
      )}
    </div>
  );
};

export default ChancellorLayout;
