import React, { useState, useEffect } from 'react';
import { Menu, CheckCircle2, X, LayoutGrid, BookOpen, Columns } from 'lucide-react';
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
  const [academicYear, setAcademicYear] = useState('2026 – 2027');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'both' | 'overview' | 'responsibilities'>('both');

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
        ? `Proposal ${updated.proposalCode} Sanctioned under Delegated Vice-Chancellor Statutory Authority.`
        : decision === 'Endorse for Chancellor'
        ? `Proposal ${updated.proposalCode} Endorsed & Placed Before Chancellor for Apex Assent per Statute 12(4).`
        : decision === 'Reject'
        ? `Proposal ${updated.proposalCode} Declined with Vice-Chancellor Executive Observations.`
        : `Proposal ${updated.proposalCode} Returned to Registrar / Originating Department for compliance rectification.`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Render Center Canvas
  const renderCenterContent = () => {
    if (activePage === 'dashboard') {
      return (
        <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6 bg-[#f4f6fb] overflow-y-auto space-y-4">
          {/* Top View Toggle Ribbon */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-700">
              Karnataka Higher Education ERP • Vice Chancellor Executive Suite
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setDashboardTab('both')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  dashboardTab === 'both'
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>

              <button
                onClick={() => setDashboardTab('overview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  dashboardTab === 'overview'
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Executive Dashboard</span>
              </button>

              <button
                onClick={() => setDashboardTab('responsibilities')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  dashboardTab === 'responsibilities'
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Work &amp; Responsibilities (Part 2)</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Split View */}
          <div className="flex-1 flex flex-col 2xl:flex-row gap-6">
            {/* Part 1: Main Executive Dashboard */}
            {(dashboardTab === 'both' || dashboardTab === 'overview') && (
              <div className={`${dashboardTab === 'both' ? 'flex-1 min-w-0' : 'w-full'}`}>
                <ViceChancellorDashboardPage
                  overview={overview}
                  academicYear={academicYear}
                  onAcademicYearChange={setAcademicYear}
                  onNavigate={(pageId) => setActivePage(pageId)}
                  onSelectCategory={(category) => {
                    if (category.includes('Program')) setActivePage('academic-affairs');
                    else if (category.includes('Affiliation')) setActivePage('college-affiliation');
                    else if (category.includes('Recruitment')) setActivePage('human-resources');
                    else if (category.includes('Research') || category.includes('MoU'))
                      setActivePage('research-innovation');
                    else if (category.includes('Budget')) setActivePage('finance-budget');
                    else if (category.includes('Policy')) setActivePage('governance');
                    else setActivePage('approvals-workflow');
                  }}
                  onOpenProposalModal={(proposal) => setSelectedProposal(proposal)}
                />
              </div>
            )}

            {/* Part 2: Work, Responsibilities & ERP Modules */}
            {(dashboardTab === 'both' || dashboardTab === 'responsibilities') && (
              <div
                className={`${
                  dashboardTab === 'both' ? 'w-full 2xl:w-[540px] shrink-0' : 'w-full'
                }`}
              >
                <ViceChancellorResponsibilitiesPanel
                  responsibilities={overview.responsibilities}
                  erpModulesAccess={overview.erpModulesAccess}
                  reportsList={overview.reportsList}
                  importantComponents={overview.importantComponents}
                  goal={overview.goal}
                  onSelectModule={(moduleName) => {
                    setActivePage(moduleName);
                  }}
                />
              </div>
            )}
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
    <div className="min-h-screen bg-[#12072b] flex flex-col font-sans select-none text-slate-800">
      {/* 1. Header Bar */}
      <ViceChancellorHeader
        onLogout={onLogout}
        notificationCount={1}
        viceChancellorName={overview.viceChancellorName || 'Prof. (Dr.) Ramesh K.'}
      />

      {/* 2. Mobile Sidebar Toggle Floating Button */}
      <div className="lg:hidden bg-[#180a3a] px-4 py-2 border-b border-purple-900/60 flex items-center justify-between text-white">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white cursor-pointer"
        >
          <Menu className="w-4 h-4 text-purple-400" />
          <span>Toggle Navigation Menu</span>
        </button>
        <span className="text-[11px] text-purple-300 font-semibold uppercase">
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

      {/* 4. Statutory Proposal Decision Modal */}
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