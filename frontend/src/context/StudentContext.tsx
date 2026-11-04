import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  EnrolledCourse,
  CourseAttendanceSummary,
  AssessmentItem,
  SubmittedApplication,
  MessageItem,
  FeeYearSummary,
  FeeReceiptItem,
  AdditionalCreditApp,
  LeaveApplicationItem,
} from '../types/student';
import {
  INITIAL_STUDENT_PROFILE,
  ENROLLED_COURSES,
  COURSE_ATTENDANCE_RECORDS,
  ASSESSMENTS_LIST,
  SUBMITTED_APPLICATIONS,
  MESSAGE_INBOX_LIST,
  FEE_YEAR_RECORDS,
  FEE_RECEIPTS_LIST,
  ADDITIONAL_CREDIT_APPS,
  LEAVE_APPLICATIONS_LIST,
} from '../data/studentMockData';

interface StudentContextType {
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  activeMenu: string;
  activeSubmenu: string;
  navigate: (menu: string, submenu?: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data collections
  courses: EnrolledCourse[];
  attendance: CourseAttendanceSummary[];
  assessments: AssessmentItem[];
  submittedApplications: SubmittedApplication[];
  addApplication: (app: Omit<SubmittedApplication, 'id' | 'appliedTime' | 'finalizedTime'>) => void;
  messages: MessageItem[];
  markMessageAsRead: (id: string) => void;
  feeYearRecords: FeeYearSummary[];
  feeReceipts: FeeReceiptItem[];
  payFee: (yearName: string, amount: number, method: 'ONLINE' | 'NEFT' | 'ONLINEPAY') => void;
  additionalCredits: AdditionalCreditApp[];
  addCreditApp: (app: Omit<AdditionalCreditApp, 'id' | 'submittedDate' | 'status'>) => void;
  leaveApplications: LeaveApplicationItem[];
  submitLeave: (leave: Omit<LeaveApplicationItem, 'id' | 'status' | 'appliedOn'>) => void;

  // Modals & triggers
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  modalPayload: any;
  setModalPayload: (payload: any) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [activeSubmenu, setActiveSubmenu] = useState<string>('my-courses');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [courses] = useState<EnrolledCourse[]>(ENROLLED_COURSES);
  const [attendance] = useState<CourseAttendanceSummary[]>(COURSE_ATTENDANCE_RECORDS);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(() => {
    try {
      const shared = localStorage.getItem('acu_shared_assessments');
      if (shared) {
        const customList: AssessmentItem[] = JSON.parse(shared);
        // Deduplicate
        const existingIds = new Set(customList.map(c => c.id));
        const filteredBase = ASSESSMENTS_LIST.filter(a => !existingIds.has(a.id));
        return [...customList, ...filteredBase];
      }
    } catch {
      // fallback
    }
    return ASSESSMENTS_LIST;
  });

  // Dynamic real-time synchronization when Teacher creates assessment
  useEffect(() => {
    const handleAssessmentSync = () => {
      try {
        const shared = localStorage.getItem('acu_shared_assessments');
        if (shared) {
          const customList: AssessmentItem[] = JSON.parse(shared);
          setAssessments((prev) => {
            const existingIds = new Set(customList.map(c => c.id));
            const filteredBase = prev.filter(a => !existingIds.has(a.id));
            return [...customList, ...filteredBase];
          });
        }
      } catch (err) {
        console.error('Error syncing shared assessments in StudentContext:', err);
      }
    };

    window.addEventListener('acu_assessment_created', handleAssessmentSync);
    window.addEventListener('storage', handleAssessmentSync);
    return () => {
      window.removeEventListener('acu_assessment_created', handleAssessmentSync);
      window.removeEventListener('storage', handleAssessmentSync);
    };
  }, []);
  const [submittedApplications, setSubmittedApplications] = useState<SubmittedApplication[]>(SUBMITTED_APPLICATIONS);
  const [messages, setMessages] = useState<MessageItem[]>(MESSAGE_INBOX_LIST);
  const [feeYearRecords, setFeeYearRecords] = useState<FeeYearSummary[]>(FEE_YEAR_RECORDS);
  const [feeReceipts, setFeeReceipts] = useState<FeeReceiptItem[]>(FEE_RECEIPTS_LIST);
  const [additionalCredits, setAdditionalCredits] = useState<AdditionalCreditApp[]>(ADDITIONAL_CREDIT_APPS);
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplicationItem[]>(LEAVE_APPLICATIONS_LIST);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  const navigate = (menu: string, submenu?: string) => {
    setActiveMenu(menu);
    if (submenu) {
      setActiveSubmenu(submenu);
    } else {
      // default submenus
      switch (menu) {
        case 'home':
          setActiveSubmenu('my-courses');
          break;
        case 'profile':
          setActiveSubmenu('my-profile');
          break;
        case 'mentoring':
          setActiveSubmenu('mentoring-guidance');
          break;
        case 'timetables':
          setActiveSubmenu('timetable');
          break;
        case 'academic-calendar':
          setActiveSubmenu('calendar');
          break;
        case 'attendance':
          setActiveSubmenu('course-wise');
          break;
        case 'assessments':
          setActiveSubmenu('assessments-list');
          break;
        case 'surveys':
          setActiveSubmenu('course-survey');
          break;
        case 'applications':
          setActiveSubmenu('other-applications');
          break;
        case 'messages':
          setActiveSubmenu('inbox');
          break;
        case 'coe':
          setActiveSubmenu('view-answer-booklet');
          break;
        case 'meetings':
          setActiveSubmenu('join-meeting');
          break;
        case 'results':
          setActiveSubmenu('assessment-marks');
          break;
        case 'resources':
          setActiveSubmenu('my-resources');
          break;
        case 'fees':
          setActiveSubmenu('pay-fee');
          break;
        case 'outcomes':
          setActiveSubmenu('program-outcomes');
          break;
        case 'credits':
          setActiveSubmenu('apply-credits');
          break;
        case 'leave':
          setActiveSubmenu('apply-leave');
          break;
        case 'transport':
          setActiveSubmenu('application-request');
          break;
        default:
          setActiveSubmenu('overview');
      }
    }
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const addApplication = (app: Omit<SubmittedApplication, 'id' | 'appliedTime' | 'finalizedTime'>) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newApp: SubmittedApplication = {
      id: `sub-${Date.now()}`,
      ...app,
      appliedTime: timeStr,
      finalizedTime: 'Under Review',
    };
    setSubmittedApplications((prev) => [newApp, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const payFee = (yearName: string, amount: number, method: 'ONLINE' | 'NEFT' | 'ONLINEPAY') => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const newReceipt: FeeReceiptItem = {
      slNo: feeReceipts.length + 1,
      receiptNo: `${now.getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`,
      receiptDate: dateStr,
      paymentMethod: method,
      amount: amount,
      feeType: `Tuition & Academic Dues (${yearName})`,
      semester: profile.currentSemester,
    };
    setFeeReceipts((prev) => [newReceipt, ...prev]);

    setFeeYearRecords((prev) =>
      prev.map((r) =>
        r.yearName === yearName
          ? {
              ...r,
              remittedFee: r.remittedFee + amount,
              balanceFee: Math.max(0, r.balanceFee - amount),
              status: r.balanceFee - amount <= 0 ? 'Paid' : 'Partial',
            }
          : r
      )
    );
  };

  const addCreditApp = (app: Omit<AdditionalCreditApp, 'id' | 'submittedDate' | 'status'>) => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const newCredit: AdditionalCreditApp = {
      id: `aca-${Date.now()}`,
      ...app,
      submittedDate: dateStr,
      status: 'PENDING',
    };
    setAdditionalCredits((prev) => [newCredit, ...prev]);
  };

  const submitLeave = (leave: Omit<LeaveApplicationItem, 'id' | 'status' | 'appliedOn'>) => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const newLeave: LeaveApplicationItem = {
      id: `lv-${Date.now()}`,
      ...leave,
      appliedOn: dateStr,
      status: 'Pending',
    };
    setLeaveApplications((prev) => [newLeave, ...prev]);
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        updateProfile,
        activeMenu,
        activeSubmenu,
        navigate,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        searchQuery,
        setSearchQuery,
        courses,
        attendance,
        assessments,
        submittedApplications,
        addApplication,
        messages,
        markMessageAsRead,
        feeYearRecords,
        feeReceipts,
        payFee,
        additionalCredits,
        addCreditApp,
        leaveApplications,
        submitLeave,
        activeModal,
        setActiveModal,
        modalPayload,
        setModalPayload,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

