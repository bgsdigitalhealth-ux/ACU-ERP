import React, { createContext, useContext, useState } from 'react';
import {
  UniversityAdminRole,
  VcFiltersState,
  VcKpis,
  VcApprovalItem,
  CollegeExamStatusItem,
  VcActivityItem,
  CoeFiltersState,
  CoeKpis,
  CoeUpcomingExam,
  PracticalScheduleItem,
  RegistrarFiltersState,
  RegistrarKpis,
  RegistrarPendingActionItem,
  ValuationProgressRow,
  ResultComponentStatus,
  RegistrarActivityItem
} from '../types/universityAdmin';
import {
  INITIAL_VC_KPIS,
  INITIAL_VC_APPROVALS,
  INITIAL_COLLEGE_STATUS,
  VC_PERFORMANCE_TREND,
  INITIAL_VC_ACTIVITIES,
  INITIAL_COE_KPIS,
  INITIAL_COE_UPCOMING_EXAMS,
  INITIAL_PRACTICAL_SCHEDULE,
  INITIAL_REGISTRAR_KPIS,
  INITIAL_REGISTRAR_PENDING_ACTIONS,
  INITIAL_VALUATION_PROGRESS,
  INITIAL_RESULT_STATUS,
  INITIAL_REGISTRAR_ACTIVITIES
} from '../data/universityAdminData';

interface UniversityAdminContextType {
  // Apex Role Switcher
  activeRole: UniversityAdminRole;
  setActiveRole: (role: UniversityAdminRole) => void;

  // Toast
  toastMessage: string | null;
  setToast: (msg: string) => void;
  clearToast: () => void;

  // --- Vice-Chancellor State ---
  vcFilters: VcFiltersState;
  setVcFilters: React.Dispatch<React.SetStateAction<VcFiltersState>>;
  vcKpis: VcKpis;
  vcApprovals: VcApprovalItem[];
  collegeStatusList: CollegeExamStatusItem[];
  vcTrendData: typeof VC_PERFORMANCE_TREND;
  vcActivities: VcActivityItem[];
  approveVcItem: (id: string) => void;
  rejectVcItem: (id: string, reason: string) => void;
  activeVcModal: 'approval' | 'malpractice' | 'stat' | null;
  setActiveVcModal: (modal: 'approval' | 'malpractice' | 'stat' | null) => void;
  selectedVcApproval: VcApprovalItem | null;
  setSelectedVcApproval: (item: VcApprovalItem | null) => void;

  // --- Controller of Examination State ---
  coeFilters: CoeFiltersState;
  setCoeFilters: React.Dispatch<React.SetStateAction<CoeFiltersState>>;
  coeKpis: CoeKpis;
  coeUpcomingExams: CoeUpcomingExam[];
  practicalSchedule: PracticalScheduleItem[];
  activeCoeModal: 'create-exam' | 'allocate-examiners' | 'centre-alloc' | 'upload-marks' | 'process-results' | null;
  setActiveCoeModal: (modal: 'create-exam' | 'allocate-examiners' | 'centre-alloc' | 'upload-marks' | 'process-results' | null) => void;
  handleCreateExam: (subject: string, type: 'Theory' | 'Practical') => void;
  handleAllocateExaminers: (subject: string, count: number) => void;

  // --- Registrar (Evaluation) State ---
  registrarFilters: RegistrarFiltersState;
  setRegistrarFilters: React.Dispatch<React.SetStateAction<RegistrarFiltersState>>;
  registrarKpis: RegistrarKpis;
  registrarPendingActions: RegistrarPendingActionItem[];
  valuationProgress: ValuationProgressRow[];
  resultStatus: ResultComponentStatus[];
  registrarActivities: RegistrarActivityItem[];
  activeRegistrarModal: 'receive-scripts' | 'allocate-eval' | 'practical-marks' | 'ia-marks' | 'lock-marks' | 'process-results' | 'publish-results' | 'reval' | null;
  setActiveRegistrarModal: (modal: 'receive-scripts' | 'allocate-eval' | 'practical-marks' | 'ia-marks' | 'lock-marks' | 'process-results' | 'publish-results' | 'reval' | null) => void;
  handleReceiveScripts: (count: number) => void;
  handleLockMarks: () => void;
  handlePublishResult: () => void;
}

const UniversityAdminContext = createContext<UniversityAdminContextType | undefined>(undefined);

export const UniversityAdminProvider: React.FC<{ children: React.ReactNode; initialRole?: UniversityAdminRole }> = ({
  children,
  initialRole = 'vice-chancellor'
}) => {
  const [activeRole, setActiveRole] = useState<UniversityAdminRole>(initialRole);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };
  const clearToast = () => setToastMessage(null);

  // --- Vice-Chancellor State ---
  const [vcFilters, setVcFilters] = useState<VcFiltersState>({
    academicYear: '2024 – 25',
    college: 'All Colleges',
    programme: 'All Programmes',
    phase: 'All Phases'
  });
  const [vcKpis, setVcKpis] = useState<VcKpis>(INITIAL_VC_KPIS);
  const [vcApprovals, setVcApprovals] = useState<VcApprovalItem[]>(INITIAL_VC_APPROVALS);
  const [collegeStatusList] = useState<CollegeExamStatusItem[]>(INITIAL_COLLEGE_STATUS);
  const [vcTrendData] = useState(VC_PERFORMANCE_TREND);
  const [vcActivities, setVcActivities] = useState<VcActivityItem[]>(INITIAL_VC_ACTIVITIES);
  const [activeVcModal, setActiveVcModal] = useState<'approval' | 'malpractice' | 'stat' | null>(null);
  const [selectedVcApproval, setSelectedVcApproval] = useState<VcApprovalItem | null>(null);

  const approveVcItem = (id: string) => {
    const item = vcApprovals.find(a => a.id === id);
    if (!item) return;
    setVcApprovals(prev => prev.filter(a => a.id !== id));
    setVcKpis(prev => ({ ...prev, pendingApprovals: Math.max(0, prev.pendingApprovals - 1) }));
    setVcActivities(prev => [
      {
        id: `act-${Date.now()}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        activity: `Approved – ${item.title} (${item.institution})`,
        reference: item.referenceNo
      },
      ...prev
    ]);
    setActiveVcModal(null);
    setSelectedVcApproval(null);
    setToast(`Vice-Chancellor has approved: ${item.title}`);
  };

  const rejectVcItem = (id: string, reason: string) => {
    const item = vcApprovals.find(a => a.id === id);
    if (!item) return;
    setVcApprovals(prev => prev.filter(a => a.id !== id));
    setVcKpis(prev => ({ ...prev, pendingApprovals: Math.max(0, prev.pendingApprovals - 1) }));
    setActiveVcModal(null);
    setSelectedVcApproval(null);
    setToast(`Referral returned for revision: ${reason}`);
  };

  // --- Controller of Examination State ---
  const [coeFilters, setCoeFilters] = useState<CoeFiltersState>({
    academicYear: '2024 – 25',
    programme: 'MBBS',
    phase: 'First MBBS',
    examType: 'Practical',
    subject: 'Physiology'
  });
  const [coeKpis, setCoeKpis] = useState<CoeKpis>(INITIAL_COE_KPIS);
  const [coeUpcomingExams, setCoeUpcomingExams] = useState<CoeUpcomingExam[]>(INITIAL_COE_UPCOMING_EXAMS);
  const [practicalSchedule] = useState<PracticalScheduleItem[]>(INITIAL_PRACTICAL_SCHEDULE);
  const [activeCoeModal, setActiveCoeModal] = useState<'create-exam' | 'allocate-examiners' | 'centre-alloc' | 'upload-marks' | 'process-results' | null>(null);

  const handleCreateExam = (subject: string, type: 'Theory' | 'Practical') => {
    setCoeKpis(prev => ({ ...prev, examsPlanned: prev.examsPlanned + 1 }));
    setCoeUpcomingExams(prev => [
      {
        id: `up-${Date.now()}`,
        date: '25 Mar 2025',
        subject,
        type,
        status: 'Scheduled',
        venue: 'Main Exam Centre',
        batch: 'Batch C'
      },
      ...prev
    ]);
    setActiveCoeModal(null);
    setToast(`Examination created and scheduled for ${subject} (${type}).`);
  };

  const handleAllocateExaminers = (subject: string, count: number) => {
    setCoeKpis(prev => ({ ...prev, examinersAllocated: prev.examinersAllocated + count }));
    setActiveCoeModal(null);
    setToast(`Allocated ${count} examiners for ${subject}.`);
  };

  // --- Registrar (Evaluation) State ---
  const [registrarFilters, setRegistrarFilters] = useState<RegistrarFiltersState>({
    academicYear: '2024 – 25',
    programme: 'MBBS',
    phase: 'First MBBS',
    subject: 'Physiology'
  });
  const [registrarKpis, setRegistrarKpis] = useState<RegistrarKpis>(INITIAL_REGISTRAR_KPIS);
  const [registrarPendingActions, setRegistrarPendingActions] = useState<RegistrarPendingActionItem[]>(INITIAL_REGISTRAR_PENDING_ACTIONS);
  const [valuationProgress] = useState<ValuationProgressRow[]>(INITIAL_VALUATION_PROGRESS);
  const [resultStatus, setResultStatus] = useState<ResultComponentStatus[]>(INITIAL_RESULT_STATUS);
  const [registrarActivities, setRegistrarActivities] = useState<RegistrarActivityItem[]>(INITIAL_REGISTRAR_ACTIVITIES);
  const [activeRegistrarModal, setActiveRegistrarModal] = useState<'receive-scripts' | 'allocate-eval' | 'practical-marks' | 'ia-marks' | 'lock-marks' | 'process-results' | 'publish-results' | 'reval' | null>(null);

  const handleReceiveScripts = (count: number) => {
    setRegistrarKpis(prev => ({ ...prev, answerScriptsReceived: prev.answerScriptsReceived + count }));
    setActiveRegistrarModal(null);
    setToast(`Received & registered ${count} answer scripts in Central Evaluation Centre.`);
  };

  const handleLockMarks = () => {
    setRegistrarKpis(prev => ({ ...prev, resultDraftsPrepared: prev.resultDraftsPrepared + 1 }));
    setRegistrarPendingActions(prev => prev.filter(a => a.type !== 'practical'));
    setActiveRegistrarModal(null);
    setToast('All marks verified and cryptographically locked. Result draft compiled.');
  };

  const handlePublishResult = () => {
    setRegistrarKpis(prev => ({ ...prev, resultsPublished: prev.resultsPublished + 1 }));
    setResultStatus(prev => prev.map(r => r.component === 'Overall Result' ? { ...r, status: 'Finalised' } : r));
    setRegistrarPendingActions(prev => prev.filter(a => a.type !== 'approval'));
    setRegistrarActivities(prev => [
      {
        id: `reg-pub-${Date.now()}`,
        dateTime: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
        activity: 'Official Results Published',
        details: `${registrarFilters.subject} – ${registrarFilters.programme} (${registrarFilters.phase})`,
        by: 'Registrar (Evaluation)'
      },
      ...prev
    ]);
    setActiveRegistrarModal(null);
    setToast(`Results published successfully on ACU Student Portal for ${registrarFilters.subject}!`);
  };

  return (
    <UniversityAdminContext.Provider
      value={{
        activeRole,
        setActiveRole,
        toastMessage,
        setToast,
        clearToast,
        // VC
        vcFilters,
        setVcFilters,
        vcKpis,
        vcApprovals,
        collegeStatusList,
        vcTrendData,
        vcActivities,
        approveVcItem,
        rejectVcItem,
        activeVcModal,
        setActiveVcModal,
        selectedVcApproval,
        setSelectedVcApproval,
        // CoE
        coeFilters,
        setCoeFilters,
        coeKpis,
        coeUpcomingExams,
        practicalSchedule,
        activeCoeModal,
        setActiveCoeModal,
        handleCreateExam,
        handleAllocateExaminers,
        // Registrar
        registrarFilters,
        setRegistrarFilters,
        registrarKpis,
        registrarPendingActions,
        valuationProgress,
        resultStatus,
        registrarActivities,
        activeRegistrarModal,
        setActiveRegistrarModal,
        handleReceiveScripts,
        handleLockMarks,
        handlePublishResult
      }}
    >
      {children}
    </UniversityAdminContext.Provider>
  );
};

export const useUniversityAdmin = () => {
  const context = useContext(UniversityAdminContext);
  if (!context) {
    throw new Error('useUniversityAdmin must be used within a UniversityAdminProvider');
  }
  return context;
};

