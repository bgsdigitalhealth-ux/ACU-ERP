import React, { useState } from 'react';
import { UniversityAdminRoleSwitcher } from './UniversityAdminRoleSwitcher';
import { useUniversityAdmin } from '../../context/UniversityAdminContext';
import { VcHeader } from './vc/VcHeader';
import { VcSidebar } from './vc/VcSidebar';
import { VcDashboard } from './vc/VcDashboard';
import { VcUniversityExamStatusPage } from './vc/pages/VcUniversityExamStatusPage';
import { VcCollegeMonitoringPage } from './vc/pages/VcCollegeMonitoringPage';
import { VcExamReadinessPage } from './vc/pages/VcExamReadinessPage';
import { VcExamRegulationsPage } from './vc/pages/VcExamRegulationsPage';
import { VcPoliciesGuidelinesPage } from './vc/pages/VcPoliciesGuidelinesPage';
import { VcAcademicCalendarPage } from './vc/pages/VcAcademicCalendarPage';
import { VcSchemeReformsPage } from './vc/pages/VcSchemeReformsPage';
import { VcExceptionalCasesPage } from './vc/pages/VcExceptionalCasesPage';
import { VcScheduleModificationsPage } from './vc/pages/VcScheduleModificationsPage';
import { VcMalpracticeDisciplinaryPage } from './vc/pages/VcMalpracticeDisciplinaryPage';
import { VcResultAuthorisationPage } from './vc/pages/VcResultAuthorisationPage';
import { VcValuationProgressPage } from './vc/pages/VcValuationProgressPage';
import { VcResultProcessingPage } from './vc/pages/VcResultProcessingPage';
import { VcResultAnalysisPage } from './vc/pages/VcResultAnalysisPage';
import { VcPerformanceReportsPage } from './vc/pages/VcPerformanceReportsPage';
import { VcTrendAnalysisPage } from './vc/pages/VcTrendAnalysisPage';
import { VcAccreditationPage } from './vc/pages/VcAccreditationPage';
import { VcSettingsPage } from './vc/pages/VcSettingsPage';
import { CoeHeader } from './coe/CoeHeader';
import { CoeSidebar } from './coe/CoeSidebar';
import { CoeDashboard } from './coe/CoeDashboard';
import { RegistrarHeader } from './registrar/RegistrarHeader';
import { RegistrarSidebar } from './registrar/RegistrarSidebar';
import { RegistrarDashboard } from './registrar/RegistrarDashboard';
import { ChancellorDashboardLayout } from '../chancellor/ChancellorDashboardLayout';
import { ChancellorProvider } from '../../context/ChancellorContext';
import { CheckCircle2, X } from 'lucide-react';

interface UniversityAdminLayoutProps {
  onLogout: () => void;
}

export const UniversityAdminLayout: React.FC<UniversityAdminLayoutProps> = ({ onLogout }) => {
  const { activeRole, toastMessage, clearToast } = useUniversityAdmin();

  // Tab states for each role
  const [vcTab, setVcTab] = useState('dashboard');
  const [coeTab, setCoeTab] = useState('dashboard');
  const [regTab, setRegTab] = useState('dashboard');

  const [mobileOpen, setMobileOpen] = useState(false);

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

      {/* Top Apex Role Switcher Bar */}
      <UniversityAdminRoleSwitcher />

      {/* Role 1: Chancellor */}
      {activeRole === 'chancellor' && (
        <ChancellorProvider>
          <ChancellorDashboardLayout onLogout={onLogout} />
        </ChancellorProvider>
      )}

      {/* Role 2: Vice-Chancellor */}
      {activeRole === 'vice-chancellor' && (
        <div className="flex-1 flex flex-col min-h-0">
          <VcHeader
            onLogout={onLogout}
            onToggleSidebar={() => setMobileOpen(!mobileOpen)}
          />
          <div className="flex-1 flex min-w-0">
            <VcSidebar
              activeTab={vcTab}
              setActiveTab={(tab) => {
                setVcTab(tab);
                setMobileOpen(false);
              }}
              isMobileOpen={mobileOpen}
              setIsMobileOpen={setMobileOpen}
            />
            <main className="flex-1 min-w-0 overflow-y-auto">
              {vcTab === 'dashboard' && <VcDashboard onNavigate={(tab) => setVcTab(tab)} />}
              {vcTab === 'univ-exam-status' && <VcUniversityExamStatusPage />}
              {vcTab === 'college-monitoring' && <VcCollegeMonitoringPage />}
              {vcTab === 'exam-readiness' && <VcExamReadinessPage />}
              {vcTab === 'exam-regulations' && <VcExamRegulationsPage />}
              {vcTab === 'policies-guidelines' && <VcPoliciesGuidelinesPage />}
              {vcTab === 'academic-calendar' && <VcAcademicCalendarPage />}
              {vcTab === 'scheme-reforms' && <VcSchemeReformsPage />}
              {vcTab === 'exceptional-cases' && <VcExceptionalCasesPage />}
              {vcTab === 'schedule-modifications' && <VcScheduleModificationsPage />}
              {vcTab === 'malpractice-disciplinary' && <VcMalpracticeDisciplinaryPage />}
              {vcTab === 'result-authorisation' && <VcResultAuthorisationPage />}
              {vcTab === 'valuation-progress-vc' && <VcValuationProgressPage />}
              {vcTab === 'result-processing-vc' && <VcResultProcessingPage />}
              {vcTab === 'result-analysis-vc' && <VcResultAnalysisPage />}
              {vcTab === 'performance-reports-vc' && <VcPerformanceReportsPage />}
              {vcTab === 'trend-analysis-vc' && <VcTrendAnalysisPage />}
              {vcTab === 'accreditation-vc' && <VcAccreditationPage />}
              {vcTab === 'settings' && <VcSettingsPage />}
            </main>
          </div>
        </div>
      )}

      {/* Role 3: Controller of Examination (CoE) */}
      {activeRole === 'coe' && (
        <div className="flex-1 flex flex-col min-h-0">
          <CoeHeader
            onLogout={onLogout}
            onToggleSidebar={() => setMobileOpen(!mobileOpen)}
          />
          <div className="flex-1 flex min-w-0">
            <CoeSidebar
              activeTab={coeTab}
              setActiveTab={(tab) => {
                setCoeTab(tab);
                setMobileOpen(false);
              }}
              isMobileOpen={mobileOpen}
              setIsMobileOpen={setMobileOpen}
            />
            <main className="flex-1 min-w-0 overflow-y-auto">
              <CoeDashboard />
            </main>
          </div>
        </div>
      )}

      {/* Role 4: Registrar (Evaluation) */}
      {activeRole === 'registrar' && (
        <div className="flex-1 flex flex-col min-h-0">
          <RegistrarHeader
            onLogout={onLogout}
            onToggleSidebar={() => setMobileOpen(!mobileOpen)}
          />
          <div className="flex-1 flex min-w-0">
            <RegistrarSidebar
              activeTab={regTab}
              setActiveTab={(tab) => {
                setRegTab(tab);
                setMobileOpen(false);
              }}
              isMobileOpen={mobileOpen}
              setIsMobileOpen={setMobileOpen}
            />
            <main className="flex-1 min-w-0 overflow-y-auto">
              <RegistrarDashboard />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

