import React, { useState, useEffect } from 'react';
import { Menu, CheckCircle2, X } from 'lucide-react';
import {
  vicechancellorApi,
  ViceChancellorOverviewData,
  ViceChancellorProposalItem,
  FALLBACK_VC_OVERVIEW,
} from '../services/vicechancellorApi';
import { ViceChancellorHeader } from '../components/ViceChancellorHeader';
import { ViceChancellorSidebar } from '../components/ViceChancellorSidebar';
import { ViceChancellorResponsibilitiesPanel } from '../components/ViceChancellorResponsibilitiesPanel';
import { ViceChancellorDashboardPage } from '../pages/ViceChancellorDashboardPage';
import { ViceChancellorSubcontentPage } from '../pages/ViceChancellorSubcontentPage';
import { ViceChancellorAnalyticsPage } from '../pages/ViceChancellorAnalyticsPage';
import { ViceChancellorProposalModal } from '../components/ViceChancellorProposalModal';

interface ViceChancellorLayoutProps {
  onLogout?: () => void;
}

export const ViceChancellorLayout: React.FC<ViceChancellorLayoutProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [academicYear, setAcademicYear] = useState('2024 - 2025');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dynamic Data
  const [overview, setOverview] = useState<ViceChancellorOverviewData>(FALLBACK_VC_OVERVIEW);
  const [proposals, setProposals] = useState<ViceChancellorProposalItem[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<ViceChancellorProposalItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Overview & Proposals
  const loadData = async () => {
    try {
      const [overviewData, proposalsData] = await Promise.all([
        vicechancellorApi.fetchOverview(academicYear),
        vicechancellorApi.fetchProposals(),
      ]);
      setOverview(overviewData);
      setProposals(proposalsData);
    } catch (err) {
      console.error('[Vice Chancellor Layout] Error loading dynamic data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [academicYear]);

  // Execute Statutory Decision Workflow
  const handleDecide = async (
    proposalId: string,
    decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return',
    remarks: string
  ) => {
    const updated = await vicechancellorApi.decideProposal(proposalId, {
      decision,
      remarks,
    });

    // Refresh dynamic data from DB
    await loadData();

    setToastMessage(
      decision === 'Approve'
        ? `Proposal ${updated.proposalCode} Sanctioned under Delegated Vice-Chancellor Authority.`
        : decision === 'Endorse for Chancellor'
        ? `Proposal ${updated.proposalCode} Endorsed & Forwarded for Chancellor Apex Assent.`
        : decision === 'Reject'
        ? `Proposal ${updated.proposalCode} Declined with Vice-Chancellor Executive Observations.`
        : `Proposal ${updated.proposalCode} Returned to Registrar / Department for compliance rectification.`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Render Center Canvas
  const renderCenterContent = () => {
    if (activePage === 'dashboard') {
      return (
        <div className="flex-1 flex flex-col 2xl:flex-row gap-6 p-4 sm:p-5 lg:p-6 bg-[#f4f6fb] overflow-y-auto">
          {/* Main Dashboard Canvas (Part 1) */}
          <div className="flex-1 min-w-0">
            <ViceChancellorDashboardPage
              overview={overview}
              academicYear={academicYear}
              onAcademicYearChange={setAcademicYear}
              onNavigate={(pageId) => setActivePage(pageId)}
              onSelectCategory={(category) => {
                // Map category to appropriate subpage
                if (category.includes('Program')) setActivePage('academic-affairs');
                else if (category.includes('Faculty')) setActivePage('human-resources');
                else if (category.includes('Budget')) setActivePage('finance-budget');
                else if (category.includes('Policy')) setActivePage('governance');
                else if (category.includes('MoU')) setActivePage('research-innovation');
                else setActivePage('approvals-workflow');
              }}
              onOpenProposalModal={(proposal) => setSelectedProposal(proposal)}
            />
          </div>

          {/* Right Responsibilities Panel (Part 2 of 2) */}
          <div className="w-full 2xl:w-[480px] shrink-0">
            <ViceChancellorResponsibilitiesPanel
              responsibilities={overview.responsibilities}
              erpModulesAccess={overview.erpModulesAccess}
              goal={overview.goal}
            />
          </div>
        </div>
      );
    }

    if (activePage === 'reports-analytics') {
      return (
        <ViceChancellorAnalyticsPage
          academicYear={academicYear}
          onBackToDashboard={() => setActivePage('dashboard')}
        />
      );
    }

    // Complete full-page view for any clicked subcontent
    return (
      <ViceChancellorSubcontentPage
        pageId={activePage}
        onBackToDashboard={() => setActivePage('dashboard')}
        onOpenProposalModal={(proposal) => setSelectedProposal(proposal)}
        proposals={proposals}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#08132e] flex flex-col font-sans select-none text-slate-800">
      {/* 1. Header Bar */}
      <ViceChancellorHeader
        onLogout={onLogout}
        notificationCount={5}
        viceChancellorName={overview.viceChancellorName || 'Dr. R. Sharma'}
      />

      {/* 2. Mobile Sidebar Toggle Floating Button */}
      <div className="lg:hidden bg-[#08132e] px-4 py-2 border-b border-indigo-950 flex items-center justify-between text-white">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
        >
          <Menu className="w-4 h-4 text-blue-400" />
          <span>Toggle Navigation Menu</span>
        </button>
        <span className="text-[11px] text-blue-300 font-semibold uppercase">
          {activePage.replace(/-/g, ' ')}
        </span>
      </div>

      {/* 3. Main Workspace: Left Sidebar + Center Dynamic Canvas */}
      <div className="flex-1 flex overflow-hidden">
        <ViceChancellorSidebar
          activePage={activePage}
          onSelectPage={(pageId) => setActivePage(pageId)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Center Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto flex flex-col bg-[#f4f6fb]">
          {renderCenterContent()}
        </main>
      </div>

      {/* 4. Proposal Decision Modal */}
      {selectedProposal && (
        <ViceChancellorProposalModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onDecide={handleDecide}
        />
      )}

      {/* 5. Statutory Decision Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-start gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs font-semibold leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViceChancellorLayout;