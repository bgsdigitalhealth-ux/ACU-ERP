import React, { createContext, useContext, useState } from 'react';
import {
  CollegeAdminSubRole,
  DeanFiltersState,
  DeanKpis,
  ExamConductRow,
  DeanActivityItem,
  DeputyFiltersState,
  DeputyKpis,
  InvigilatorAllocationRow,
  DutyRosterItem
} from '../types/collegeAdmin';
import {
  INITIAL_DEAN_KPIS,
  INITIAL_EXAM_CONDUCT_ROWS,
  INITIAL_DEAN_ACTIVITIES,
  INITIAL_DEPUTY_KPIS,
  INITIAL_ALLOCATION_SUMMARY,
  INITIAL_DUTY_ROSTER
} from '../data/collegeAdminData';

interface CollegeAdminContextType {
  // Sub-role switcher
  activeSubRole: CollegeAdminSubRole;
  setActiveSubRole: (role: CollegeAdminSubRole) => void;

  // Toast
  toastMessage: string | null;
  setToast: (msg: string) => void;
  clearToast: () => void;

  // --- Dean (Chief Superintendent) State ---
  deanFilters: DeanFiltersState;
  setDeanFilters: React.Dispatch<React.SetStateAction<DeanFiltersState>>;
  deanKpis: DeanKpis;
  examConductRows: ExamConductRow[];
  deanActivities: DeanActivityItem[];
  activeDeanModal: 'session' | 'invigilators' | 'substitute' | 'readiness' | 'materials' | 'monitoring' | null;
  setActiveDeanModal: (modal: 'session' | 'invigilators' | 'substitute' | 'readiness' | 'materials' | 'monitoring' | null) => void;
  handleCreateExamSession: (sessionName: string, hallsCount: number) => void;
  handleVerifyReadiness: () => void;
  handleIssueMaterials: () => void;

  // --- Deputy Superintendent State ---
  deputyFilters: DeputyFiltersState;
  setDeputyFilters: React.Dispatch<React.SetStateAction<DeputyFiltersState>>;
  deputyKpis: DeputyKpis;
  allocationSummary: InvigilatorAllocationRow[];
  dutyRoster: DutyRosterItem[];
  activeDeputyModal: 'allocate' | 'roster' | 'substitute' | 'attendance' | null;
  setActiveDeputyModal: (modal: 'allocate' | 'roster' | 'substitute' | 'attendance' | null) => void;
  handleAllocateInvigilators: (count: number) => void;
  handleGenerateDutyRoster: () => void;
  handleSubstituteInvigilator: (hallNo: string, newInvigilator: string) => void;
  handleMarkAttendance: (presentCount: number) => void;
}

const CollegeAdminContext = createContext<CollegeAdminContextType | undefined>(undefined);

export const CollegeAdminProvider: React.FC<{ children: React.ReactNode; initialSubRole?: CollegeAdminSubRole }> = ({
  children,
  initialSubRole = 'dean'
}) => {
  const [activeSubRole, setActiveSubRole] = useState<CollegeAdminSubRole>(initialSubRole);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };
  const clearToast = () => setToastMessage(null);

  // --- Dean State ---
  const [deanFilters, setDeanFilters] = useState<DeanFiltersState>({
    academicYear: '2024 – 25',
    programme: 'MBBS',
    phase: 'First MBBS',
    subject: 'Physiology'
  });
  const [deanKpis, setDeanKpis] = useState<DeanKpis>(INITIAL_DEAN_KPIS);
  const [examConductRows, setExamConductRows] = useState<ExamConductRow[]>(INITIAL_EXAM_CONDUCT_ROWS);
  const [deanActivities, setDeanActivities] = useState<DeanActivityItem[]>(INITIAL_DEAN_ACTIVITIES);
  const [activeDeanModal, setActiveDeanModal] = useState<'session' | 'invigilators' | 'substitute' | 'readiness' | 'materials' | 'monitoring' | null>(null);

  const handleCreateExamSession = (sessionName: string, hallsCount: number) => {
    setDeanKpis(prev => ({
      ...prev,
      examsScheduled: prev.examsScheduled + 1,
      examHalls: prev.examHalls + hallsCount
    }));
    setExamConductRows(prev => [
      {
        session: sessionName,
        centres: 4,
        halls: hallsCount,
        seats: hallsCount * 100,
        status: 'Scheduled'
      },
      ...prev
    ]);
    setActiveDeanModal(null);
    setToast(`Exam session "${sessionName}" created across ${hallsCount} examination halls.`);
  };

  const handleVerifyReadiness = () => {
    setDeanActivities(prev => [
      {
        id: `act-${Date.now()}`,
        text: 'Hall readiness verified – CCTV & Seating checked for all 14 halls',
        time: 'Just now',
        type: 'verified'
      },
      ...prev
    ]);
    setActiveDeanModal(null);
    setToast('Hall readiness confirmed by Chief Superintendent (Dean).');
  };

  const handleIssueMaterials = () => {
    setDeanActivities(prev => [
      {
        id: `act-${Date.now()}`,
        text: 'Confidential QP packets & OMR answer books unsealed & issued',
        time: 'Just now',
        type: 'issued'
      },
      ...prev
    ]);
    setActiveDeanModal(null);
    setToast('Exam materials issued to Hall Invigilators under secure protocol.');
  };

  // --- Deputy Superintendent State ---
  const [deputyFilters, setDeputyFilters] = useState<DeputyFiltersState>({
    academicYear: '2024 – 25',
    programme: 'MBBS',
    phase: 'First MBBS',
    examType: 'Theory'
  });
  const [deputyKpis, setDeputyKpis] = useState<DeputyKpis>(INITIAL_DEPUTY_KPIS);
  const [allocationSummary, setAllocationSummary] = useState<InvigilatorAllocationRow[]>(INITIAL_ALLOCATION_SUMMARY);
  const [dutyRoster, setDutyRoster] = useState<DutyRosterItem[]>(INITIAL_DUTY_ROSTER);
  const [activeDeputyModal, setActiveDeputyModal] = useState<'allocate' | 'roster' | 'substitute' | 'attendance' | null>(null);

  const handleAllocateInvigilators = (count: number) => {
    setDeputyKpis(prev => ({
      ...prev,
      invigilatorsAllocated: prev.invigilatorsAllocated + count,
      allocationCompletedPercent: 100
    }));
    setAllocationSummary(prev =>
      prev.map(row => row.session === 'Practical' ? { ...row, allocated: 10, status: 'Completed' } : row)
    );
    setActiveDeputyModal(null);
    setToast(`Successfully allocated ${count} additional invigilators. Allocation is 100% complete!`);
  };

  const handleGenerateDutyRoster = () => {
    setActiveDeputyModal(null);
    setToast('Duty roster generated and dispatched to all 68 invigilators via official SMS & Email.');
  };

  const handleSubstituteInvigilator = (hallNo: string, newInvigilator: string) => {
    setDutyRoster(prev =>
      prev.map(item => item.hallNo === hallNo ? { ...item, invigilators: newInvigilator } : item)
    );
    setActiveDeputyModal(null);
    setToast(`Invigilator substitute assigned for ${hallNo}: ${newInvigilator}.`);
  };

  const handleMarkAttendance = (presentCount: number) => {
    setActiveDeputyModal(null);
    setToast(`Attendance verified: ${presentCount} / 68 Invigilators present on duty.`);
  };

  return (
    <CollegeAdminContext.Provider
      value={{
        activeSubRole,
        setActiveSubRole,
        toastMessage,
        setToast,
        clearToast,
        // Dean
        deanFilters,
        setDeanFilters,
        deanKpis,
        examConductRows,
        deanActivities,
        activeDeanModal,
        setActiveDeanModal,
        handleCreateExamSession,
        handleVerifyReadiness,
        handleIssueMaterials,
        // Deputy
        deputyFilters,
        setDeputyFilters,
        deputyKpis,
        allocationSummary,
        dutyRoster,
        activeDeputyModal,
        setActiveDeputyModal,
        handleAllocateInvigilators,
        handleGenerateDutyRoster,
        handleSubstituteInvigilator,
        handleMarkAttendance
      }}
    >
      {children}
    </CollegeAdminContext.Provider>
  );
};

export const useCollegeAdmin = () => {
  const context = useContext(CollegeAdminContext);
  if (!context) {
    throw new Error('useCollegeAdmin must be used within a CollegeAdminProvider');
  }
  return context;
};

