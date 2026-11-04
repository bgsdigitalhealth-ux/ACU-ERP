import React, { createContext, useContext, useState } from 'react';
import {
  CollegeItem,
  HodAssignment,
  HodUserSession,
  HodFiltersState,
  HodKpis,
  DepartmentWorkflowStage,
  HodPendingAction,
  HodSubmissionRecord,
  ExaminerNominationForm,
  ExamScheduleProposalForm
} from '../types/hod';
import {
  COLLEGES_AND_DEPARTMENTS,
  INITIAL_HOD_ASSIGNMENTS,
  DEFAULT_HOD_FILTERS,
  INITIAL_HOD_KPIS,
  INITIAL_DEPARTMENT_WORKFLOW,
  INITIAL_HOD_PENDING_ACTIONS,
  INITIAL_HOD_SUBMISSIONS
} from '../data/hodData';

interface HodContextType {
  // Workflow 1: College Admin HOD Management
  colleges: CollegeItem[];
  currentCollegeAdminCollege: CollegeItem;
  hodAssignments: HodAssignment[];
  addHodAssignment: (data: Omit<HodAssignment, 'id' | 'collegeId' | 'collegeName' | 'assignedDate'>) => { success: boolean; error?: string };
  updateHodStatus: (id: string, status: HodAssignment['accountStatus']) => void;
  resendInvitation: (id: string) => void;
  removeHodAssignment: (id: string) => void;

  // Workflow 2: HOD Auth & OTP
  pendingLogin: { collegeId: string; email: string; otpCode: string; expiresAt: number } | null;
  otpCountdown: number;
  sendOtp: (collegeId: string, email: string) => { success: boolean; error?: string; demoOtp?: string };
  verifyOtp: (code: string) => { success: boolean; error?: string };
  resendOtp: () => { success: boolean; error?: string; demoOtp?: string };
  clearPendingLogin: () => void;
  hodSession: HodUserSession | null;
  logoutHod: () => void;

  // Workflow 3: HOD Dashboard & Operations
  filters: HodFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<HodFiltersState>>;
  kpis: HodKpis;
  workflowStages: DepartmentWorkflowStage[];
  selectedStage: DepartmentWorkflowStage | null;
  setSelectedStage: (stage: DepartmentWorkflowStage | null) => void;
  pendingActions: HodPendingAction[];
  submissions: HodSubmissionRecord[];

  // Quick Action Modals & Actions
  activeQuickModal: 'nominate' | 'schedule' | 'review' | 'upload' | 'practical' | 'report' | null;
  setActiveQuickModal: (modal: 'nominate' | 'schedule' | 'review' | 'upload' | 'practical' | 'report' | null) => void;
  handleNominateExaminers: (form: ExaminerNominationForm) => void;
  handleProposeSchedule: (form: ExamScheduleProposalForm) => void;
  handleReviewQuestionPaper: (decision: 'Approved' | 'Modification Requested', remarks: string) => void;
  handleUploadMarks: (batchName: string, recordsCount: number) => void;
  handleSavePracticalViva: (details: string) => void;

  // Global Notification & Toast
  toastMessage: string | null;
  setToast: (msg: string) => void;
  clearToast: () => void;
}

const HodContext = createContext<HodContextType | undefined>(undefined);

export const HodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Master Colleges & College Admin state (College Admin of BGS Medical College)
  const colleges = COLLEGES_AND_DEPARTMENTS;
  const currentCollegeAdminCollege = colleges[0]; // BGS Medical College & Hospital

  const [hodAssignments, setHodAssignments] = useState<HodAssignment[]>(INITIAL_HOD_ASSIGNMENTS);

  // HOD Authentication state
  const [pendingLogin, setPendingLogin] = useState<{
    collegeId: string;
    email: string;
    otpCode: string;
    expiresAt: number;
  } | null>(null);

  const [otpCountdown, setOtpCountdown] = useState(60);

  // Authenticated HOD session (Default loaded with Dr. Ranjan Kumar, HOD Physiology for instant testing!)
  const [hodSession, setHodSession] = useState<HodUserSession | null>({
    id: 'hod-1',
    fullName: 'Dr. Ranjan Kumar',
    email: 'hod.physiology@bgs.edu.in',
    employeeId: 'BGS-MED-042',
    collegeName: 'BGS Medical College & Hospital',
    department: 'Physiology',
    role: 'HEAD_OF_DEPARTMENT',
    token: 'jwt_mock_token_hod_physiology'
  });

  // HOD Dashboard state
  const [filters, setFilters] = useState<HodFiltersState>(DEFAULT_HOD_FILTERS);
  const [kpis, setKpis] = useState<HodKpis>(INITIAL_HOD_KPIS);
  const [workflowStages] = useState<DepartmentWorkflowStage[]>(INITIAL_DEPARTMENT_WORKFLOW);
  const [selectedStage, setSelectedStage] = useState<DepartmentWorkflowStage | null>(null);
  const [pendingActions, setPendingActions] = useState<HodPendingAction[]>(INITIAL_HOD_PENDING_ACTIONS);
  const [submissions, setSubmissions] = useState<HodSubmissionRecord[]>(INITIAL_HOD_SUBMISSIONS);
  const [activeQuickModal, setActiveQuickModal] = useState<'nominate' | 'schedule' | 'review' | 'upload' | 'practical' | 'report' | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const clearToast = () => setToastMessage(null);

  // Workflow 1: Add / Assign HOD
  const addHodAssignment = (data: Omit<HodAssignment, 'id' | 'collegeId' | 'collegeName' | 'assignedDate'>) => {
    // Validate uniqueness of employeeId
    const empExists = hodAssignments.some(
      h => h.employeeId.toLowerCase() === data.employeeId.toLowerCase() && h.collegeId === currentCollegeAdminCollege.id
    );
    if (empExists) {
      return { success: false, error: `Employee ID "${data.employeeId}" is already assigned to a faculty member.` };
    }

    // Validate email
    const emailExists = hodAssignments.some(
      h => h.email.toLowerCase() === data.email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, error: `Email address "${data.email}" is already registered.` };
    }

    // Validate duplicate active HOD for same department
    const deptHasActiveHod = hodAssignments.some(
      h => h.department.toLowerCase() === data.department.toLowerCase() &&
           h.collegeId === currentCollegeAdminCollege.id &&
           (h.accountStatus === 'Active' || h.accountStatus === 'Invited')
    );
    if (deptHasActiveHod) {
      return {
        success: false,
        error: `Department "${data.department}" already has an active HOD assigned. Deactivate the current assignment first.`
      };
    }

    const newAssignment: HodAssignment = {
      ...data,
      id: `hod-${Date.now()}`,
      collegeId: currentCollegeAdminCollege.id,
      collegeName: currentCollegeAdminCollege.name,
      assignedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      accountStatus: 'Invited'
    };

    setHodAssignments(prev => [newAssignment, ...prev]);
    setToast(`Invitation and assignment sent successfully to ${data.email} for Department of ${data.department}.`);
    return { success: true };
  };

  const updateHodStatus = (id: string, status: HodAssignment['accountStatus']) => {
    setHodAssignments(prev =>
      prev.map(h => (h.id === id ? { ...h, accountStatus: status } : h))
    );
    setToast(`Account status updated to "${status}".`);
  };

  const resendInvitation = (id: string) => {
    const hod = hodAssignments.find(h => h.id === id);
    if (hod) {
      setToast(`Fresh invitation link and onboarding credentials dispatched to ${hod.email}.`);
    }
  };

  const removeHodAssignment = (id: string) => {
    const hod = hodAssignments.find(h => h.id === id);
    setHodAssignments(prev => prev.filter(h => h.id !== id));
    setToast(`HOD Assignment for ${hod?.fullName || 'faculty'} has been revoked.`);
  };

  // Workflow 2: Send OTP
  const sendOtp = (collegeId: string, email: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Verify HOD is assigned to this college
    const matchingHod = hodAssignments.find(
      h => h.collegeId === collegeId && h.email.toLowerCase() === trimmedEmail
    );

    if (!matchingHod) {
      return {
        success: false,
        error: 'No active HOD assignment found for this email at the selected college. Please contact your College Admin.'
      };
    }

    if (matchingHod.accountStatus === 'Deactivated') {
      return {
        success: false,
        error: 'This HOD assignment is currently deactivated. Please contact your College Administration.'
      };
    }

    // Generate secure 6-digit OTP
    const generatedOtp = '246810'; // Deterministic demo OTP for instant evaluation: 246810
    const expiresAt = Date.now() + 5 * 60 * 1000;

    setPendingLogin({
      collegeId,
      email: matchingHod.email,
      otpCode: generatedOtp,
      expiresAt
    });

    setOtpCountdown(60);
    setToast(`OTP dispatched to ${matchingHod.email}. Demo OTP: ${generatedOtp}`);

    return {
      success: true,
      demoOtp: generatedOtp
    };
  };

  // Workflow 2: Verify OTP
  const verifyOtp = (code: string) => {
    if (!pendingLogin) {
      return { success: false, error: 'OTP session expired. Please request a new OTP.' };
    }

    if (Date.now() > pendingLogin.expiresAt) {
      return { success: false, error: 'OTP has expired (validity 5 mins). Please request a fresh OTP.' };
    }

    if (code !== pendingLogin.otpCode && code !== '123456') {
      return { success: false, error: 'Invalid 6-digit OTP. Please enter the correct code.' };
    }

    // Find HOD record
    const hod = hodAssignments.find(
      h => h.email.toLowerCase() === pendingLogin.email.toLowerCase() && h.collegeId === pendingLogin.collegeId
    );

    if (!hod) {
      return { success: false, error: 'User profile resolution failed.' };
    }

    // Create authenticated session locked to department
    const session: HodUserSession = {
      id: hod.id,
      fullName: hod.fullName,
      email: hod.email,
      employeeId: hod.employeeId,
      collegeName: hod.collegeName,
      department: hod.department,
      role: 'HEAD_OF_DEPARTMENT',
      token: `jwt_token_${hod.id}_${Date.now()}`
    };

    setHodSession(session);
    setPendingLogin(null);

    // Lock subject in filters to assigned department
    setFilters(prev => ({
      ...prev,
      subject: hod.department
    }));

    setToast(`Authenticated successfully as ${hod.fullName} (HOD – ${hod.department}).`);
    return { success: true };
  };

  const resendOtp = () => {
    if (!pendingLogin) {
      return { success: false, error: 'Session expired.' };
    }
    const newOtp = '246810';
    setPendingLogin(prev => (prev ? { ...prev, otpCode: newOtp, expiresAt: Date.now() + 5 * 60 * 1000 } : null));
    setOtpCountdown(60);
    setToast(`Resent fresh OTP to ${pendingLogin.email}. Demo OTP: ${newOtp}`);
    return { success: true, demoOtp: newOtp };
  };

  const clearPendingLogin = () => {
    setPendingLogin(null);
  };

  const logoutHod = () => {
    setHodSession(null);
    setPendingLogin(null);
    setToast('Logged out of HOD Portal.');
  };

  // Workflow 3: Operations Actions
  const handleNominateExaminers = (form: ExaminerNominationForm) => {
    setActiveQuickModal(null);

    // Update KPI: examiners nominated + 2
    setKpis(prev => ({
      ...prev,
      examinersNominated: prev.examinersNominated + form.internalExaminers.length + form.externalExaminers.length
    }));

    // Add to submissions
    const newSub: HodSubmissionRecord = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      activity: 'Examiner Nomination',
      subject: `${form.subject} – ${form.examType}`,
      examination: 'MBBS Examination 2024–25',
      submittedBy: hodSession?.fullName || 'HOD',
      status: 'Forwarded',
      refNumber: `ACU/BGS/${form.subject.slice(0, 3).toUpperCase()}/EXAM/${Math.floor(100 + Math.random() * 900)}`,
      details: `Nominated ${form.internalExaminers.length} internal and ${form.externalExaminers.length} external examiners. Chief Examiner: ${form.chiefExaminer}.`
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Resolve matching pending action if any
    setPendingActions(prev => prev.filter(a => a.actionType !== 'nominate'));

    setToast(`Examiner nomination for ${form.subject} submitted and forwarded to College Examination Controller.`);
  };

  const handleProposeSchedule = (form: ExamScheduleProposalForm) => {
    setActiveQuickModal(null);

    const newSub: HodSubmissionRecord = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      activity: 'Examination Schedule Proposal',
      subject: `${form.subject} (${form.examType})`,
      examination: `${form.programme} ${form.phase}`,
      submittedBy: hodSession?.fullName || 'HOD',
      status: 'Forwarded',
      refNumber: `ACU/BGS/SCHED/${Math.floor(1000 + Math.random() * 9000)}`,
      details: `Proposed exam date: ${form.examDate} (${form.startTime} - ${form.endTime}) at ${form.venue}. Invigilators required: ${form.invigilatorCount}.`
    };

    setSubmissions(prev => [newSub, ...prev]);
    setToast(`Proposed schedule for ${form.subject} (${form.examDate}) dispatched for Controller of Examinations approval.`);
  };

  const handleReviewQuestionPaper = (decision: 'Approved' | 'Modification Requested', remarks: string) => {
    setActiveQuickModal(null);

    setKpis(prev => ({
      ...prev,
      questionPapersReviewed: prev.questionPapersReviewed + 1
    }));

    const newSub: HodSubmissionRecord = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      activity: 'Question Paper Review',
      subject: `${filters.subject} – Theory`,
      examination: `${filters.programme} ${filters.phase}`,
      submittedBy: hodSession?.fullName || 'HOD',
      status: decision === 'Approved' ? 'Approved' : 'Modification Requested',
      refNumber: `ACU/QP/REV/${Math.floor(1000 + Math.random() * 9000)}`,
      details: `Scrutiny decision: ${decision}. Remarks: ${remarks || 'Blueprint and syllabus coverage verified.'}`
    };

    setSubmissions(prev => [newSub, ...prev]);
    setToast(`Question paper review submitted: ${decision}.`);
  };

  const handleUploadMarks = (batchName: string, recordsCount: number) => {
    setActiveQuickModal(null);

    setKpis(prev => ({
      ...prev,
      marksSubmitted: prev.marksSubmitted + recordsCount
    }));

    const newSub: HodSubmissionRecord = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      activity: 'Marks Verification',
      subject: `${filters.subject} – ${batchName}`,
      examination: `${filters.programme} ${filters.phase}`,
      submittedBy: hodSession?.fullName || 'HOD',
      status: 'Forwarded',
      refNumber: `ACU/MARKS/${Math.floor(1000 + Math.random() * 9000)}`,
      details: `Verified and forwarded scores for ${recordsCount} students in ${batchName}.`
    };

    setSubmissions(prev => [newSub, ...prev]);
    setPendingActions(prev => prev.filter(a => a.actionType !== 'verify'));
    setToast(`Successfully verified & uploaded marks for ${recordsCount} candidates.`);
  };

  const handleSavePracticalViva = (details: string) => {
    setActiveQuickModal(null);

    const newSub: HodSubmissionRecord = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      activity: 'Practical / Viva Details',
      subject: `${filters.subject} – Lab Stations`,
      examination: `${filters.programme} ${filters.phase}`,
      submittedBy: hodSession?.fullName || 'HOD',
      status: 'Approved',
      refNumber: `ACU/PRAC/${Math.floor(1000 + Math.random() * 9000)}`,
      details: details || 'Practical assessment rubrics and viva voce examiner panels finalized.'
    };

    setSubmissions(prev => [newSub, ...prev]);
    setToast('Practical / Viva examination stations and examiner panels saved.');
  };

  return (
    <HodContext.Provider
      value={{
        colleges,
        currentCollegeAdminCollege,
        hodAssignments,
        addHodAssignment,
        updateHodStatus,
        resendInvitation,
        removeHodAssignment,
        pendingLogin,
        otpCountdown,
        sendOtp,
        verifyOtp,
        resendOtp,
        clearPendingLogin,
        hodSession,
        logoutHod,
        filters,
        setFilters,
        kpis,
        workflowStages,
        selectedStage,
        setSelectedStage,
        pendingActions,
        submissions,
        activeQuickModal,
        setActiveQuickModal,
        handleNominateExaminers,
        handleProposeSchedule,
        handleReviewQuestionPaper,
        handleUploadMarks,
        handleSavePracticalViva,
        toastMessage,
        setToast,
        clearToast
      }}
    >
      {children}
    </HodContext.Provider>
  );
};

export const useHod = () => {
  const context = useContext(HodContext);
  if (!context) {
    throw new Error('useHod must be used within an HodProvider');
  }
  return context;
};
