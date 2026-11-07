import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  DashboardFiltersState,
  KpiSummary,
  CollegeExamStatusItem,
  ExamPerformanceYearData,
  PendingApprovalItem,
  GovernanceDecisionItem,
  KeyInsightMetric,
  QuickReportConfig,
  ChancellorNotification
} from '../types/chancellor';
import {
  INITIAL_KPIS,
  INITIAL_COLLEGE_STATUS,
  EXAMINATION_PERFORMANCE_HISTORY,
  INITIAL_PENDING_APPROVALS,
  INITIAL_GOVERNANCE_DECISIONS,
  INITIAL_KEY_INSIGHTS,
  INITIAL_NOTIFICATIONS
} from '../data/chancellorData';

interface ChancellorContextType {
  // Filters
  filters: DashboardFiltersState;
  setAcademicYear: (year: string) => void;
  setCollege: (college: string) => void;
  setProgramme: (programme: string) => void;
  setPhase: (phase: string) => void;
  resetFilters: () => void;

  // KPI Calculations
  kpiSummary: KpiSummary;

  // Tables & Data
  collegeExamList: CollegeExamStatusItem[];
  performanceHistory: ExamPerformanceYearData[];
  keyInsights: KeyInsightMetric[];

  // Approvals workflow
  pendingApprovals: PendingApprovalItem[];
  selectedApproval: PendingApprovalItem | null;
  setSelectedApproval: (item: PendingApprovalItem | null) => void;
  handleApprove: (id: string, remarks: string) => void;
  handleReject: (id: string, remarks: string) => void;
  handleRequestModification: (id: string, remarks: string) => void;

  // Governance Decisions
  governanceDecisions: GovernanceDecisionItem[];
  selectedDecision: GovernanceDecisionItem | null;
  setSelectedDecision: (item: GovernanceDecisionItem | null) => void;

  // Notifications
  notifications: ChancellorNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  // Reports
  activeReportModal: QuickReportConfig | null;
  setActiveReportModal: (report: QuickReportConfig | null) => void;
  handleGenerateReport: (reportId: string, format: 'PDF' | 'Excel') => void;

  // Global Toast / Feedback message
  toastMessage: string | null;
  clearToast: () => void;
}

const ChancellorContext = createContext<ChancellorContextType | undefined>(undefined);

const initialFilters: DashboardFiltersState = {
  academicYear: '2024 – 25',
  college: 'All Colleges',
  programme: 'All Programmes',
  phase: 'All Phases',
};

export const ChancellorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<DashboardFiltersState>(initialFilters);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApprovalItem[]>(INITIAL_PENDING_APPROVALS);
  const [governanceDecisions, setGovernanceDecisions] = useState<GovernanceDecisionItem[]>(INITIAL_GOVERNANCE_DECISIONS);
  const [notifications, setNotifications] = useState<ChancellorNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedApproval, setSelectedApproval] = useState<PendingApprovalItem | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<GovernanceDecisionItem | null>(null);
  const [activeReportModal, setActiveReportModal] = useState<QuickReportConfig | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const clearToast = () => setToastMessage(null);

  // Filter setters
  const setAcademicYear = (academicYear: string) => {
    setFilters(prev => ({ ...prev, academicYear }));
    showToast(`Filters updated for Academic Year: ${academicYear}`);
  };

  const setCollege = (college: string) => {
    setFilters(prev => ({ ...prev, college }));
  };

  const setProgramme = (programme: string) => {
    setFilters(prev => ({ ...prev, programme }));
  };

  const setPhase = (phase: string) => {
    setFilters(prev => ({ ...prev, phase }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    showToast('Filters reset to default 2024 – 25 University View');
  };

  // Dynamic KPI calculation reflecting active academic year and college filters
  const kpiSummary = useMemo(() => {
    const base = INITIAL_KPIS[filters.academicYear] || INITIAL_KPIS['2024 – 25'];

    if (filters.college !== 'All Colleges') {
      return {
        constituentColleges: 1,
        studentsRegistered: Math.round(base.studentsRegistered / 4.5),
        totalExams: Math.round(base.totalExams / 4),
        overallPassPercentage: Number((base.overallPassPercentage + 0.4).toFixed(1)),
        examCompletionPercentage: Number((base.examCompletionPercentage + 0.2).toFixed(1)),
        collegesChange: 'Selected College view',
        studentsChange: 'College enrollment',
        examsChange: 'Active batches',
        passPercentageChange: '+0.5% vs avg',
        completionChange: 'On schedule'
      };
    }

    return base;
  }, [filters.academicYear, filters.college]);

  // Filtered College Exam Status Table
  const collegeExamList = useMemo(() => {
    let list = INITIAL_COLLEGE_STATUS;

    if (filters.college !== 'All Colleges') {
      list = list.filter(item => item.collegeName.toLowerCase().includes(filters.college.toLowerCase()));
      if (list.length === 0) {
        list = [{
          id: 'custom-1',
          collegeName: filters.college,
          collegeCode: 'COL-ACU',
          totalExams: 24,
          examsConducted: 24,
          evaluationCompleted: 23,
          resultsPublished: 22,
          status: 'In Progress',
          academicYear: filters.academicYear,
          programmeType: filters.programme
        }];
      }
    }

    return list;
  }, [filters.college, filters.academicYear, filters.programme]);

  // Dynamic Performance Trend Chart Data
  const performanceHistory = useMemo(() => {
    return EXAMINATION_PERFORMANCE_HISTORY.map(item => {
      if (item.year === filters.academicYear) {
        return {
          ...item,
          passPercentage: kpiSummary.overallPassPercentage
        };
      }
      return item;
    });
  }, [filters.academicYear, kpiSummary.overallPassPercentage]);

  // Dynamic Insights
  const keyInsights = useMemo(() => {
    return INITIAL_KEY_INSIGHTS.map(ins => {
      if (ins.type === 'passRate') {
        const passDiff = (kpiSummary.overallPassPercentage - 91.6).toFixed(1);
        return {
          ...ins,
          value: `+${passDiff}%`,
          subtitle: `Pass Rate (vs. Previous Year)`
        };
      }
      return ins;
    });
  }, [kpiSummary.overallPassPercentage]);

  // Approvals Workflow Actions
  const handleApprove = (id: string, remarks: string) => {
    const item = pendingApprovals.find(a => a.id === id);
    if (!item) return;

    // Remove from pending
    setPendingApprovals(prev => prev.filter(a => a.id !== id));

    // Add to governance decisions
    const newDecision: GovernanceDecisionItem = {
      id: `dec-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: `Assented: ${item.title}`,
      referenceNumber: `ACU/Chan/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      decisionType: 'Statutory Approval',
      approvedBy: 'Chancellor (Executive Assent)',
      status: 'Official',
      description: remarks || `Statutory assent confirmed by the Chancellor for ${item.title}.`
    };

    setGovernanceDecisions(prev => [newDecision, ...prev]);

    // Add notification
    const newNotif: ChancellorNotification = {
      id: `notif-${Date.now()}`,
      title: 'Statutory Assent Executed',
      message: `Chancellor successfully assented to: "${item.title}". Notification dispatched to ${item.submittedBy}.`,
      timestamp: 'Just now',
      category: 'approval',
      read: false,
      priority: 'high'
    };
    setNotifications(prev => [newNotif, ...prev]);

    setSelectedApproval(null);
    showToast(`Assent granted: "${item.title}" permanently recorded.`);
  };

  const handleReject = (id: string, remarks: string) => {
    const item = pendingApprovals.find(a => a.id === id);
    if (!item) return;

    setPendingApprovals(prev => prev.filter(a => a.id !== id));

    const newDecision: GovernanceDecisionItem = {
      id: `dec-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: `Declined: ${item.title}`,
      referenceNumber: `ACU/Chan/DEC/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      decisionType: 'Executive Ordinance',
      approvedBy: 'Chancellor',
      status: 'Archived',
      description: `Proposal declined. Reason: ${remarks}`
    };

    setGovernanceDecisions(prev => [newDecision, ...prev]);

    setSelectedApproval(null);
    showToast(`Proposal declined and recorded with Chancellor's observations.`);
  };

  const handleRequestModification = (id: string, remarks: string) => {
    const item = pendingApprovals.find(a => a.id === id);
    if (!item) return;

    setPendingApprovals(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              status: 'Modification Requested' as const,
              remarks: remarks
            }
          : a
      )
    );

    setSelectedApproval(null);
    showToast(`Modification referral sent to ${item.submittedBy} with instructions.`);
  };

  // Notifications
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  // Report generation trigger
  const handleGenerateReport = (_reportId: string, format: 'PDF' | 'Excel') => {
    const report = activeReportModal;
    setActiveReportModal(null);
    showToast(`Generated: ${report?.title || 'Report'} (${format}) for ${filters.academicYear}. Downloading...`);
  };

  return (
    <ChancellorContext.Provider
      value={{
        filters,
        setAcademicYear,
        setCollege,
        setProgramme,
        setPhase,
        resetFilters,
        kpiSummary,
        collegeExamList,
        performanceHistory,
        keyInsights,
        pendingApprovals,
        selectedApproval,
        setSelectedApproval,
        handleApprove,
        handleReject,
        handleRequestModification,
        governanceDecisions,
        selectedDecision,
        setSelectedDecision,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        activeReportModal,
        setActiveReportModal,
        handleGenerateReport,
        toastMessage,
        clearToast
      }}
    >
      {children}
    </ChancellorContext.Provider>
  );
};

export const useChancellor = () => {
  const context = useContext(ChancellorContext);
  if (!context) {
    throw new Error('useChancellor must be used within a ChancellorProvider');
  }
  return context;
};
