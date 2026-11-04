import {
  VcKpis,
  VcApprovalItem,
  CollegeExamStatusItem,
  VcActivityItem,
  CoeKpis,
  CoeUpcomingExam,
  PracticalScheduleItem,
  RegistrarKpis,
  RegistrarPendingActionItem,
  ValuationProgressRow,
  ResultComponentStatus,
  RegistrarActivityItem
} from '../types/universityAdmin';

// ==========================================
// 1. Vice-Chancellor Data
// ==========================================
export const INITIAL_VC_KPIS: VcKpis = {
  constituentColleges: 14,
  studentsRegistered: 8642,
  totalExams: 128,
  overallPassPercentage: 92.4,
  pendingApprovals: 24
};

export const INITIAL_VC_APPROVALS: VcApprovalItem[] = [
  {
    id: 'vc-app-1',
    title: 'Modification in Exam Schedule',
    institution: 'AIMS, B.G. Nagara',
    urgency: 'High',
    category: 'Schedule Modification',
    submittedDate: '09 Mar 2025',
    details: 'Request to reschedule Phase II MBBS Surgery clinical viva due to state medical conference clash.',
    referenceNo: 'ACU/VC/2025/APP-082'
  },
  {
    id: 'vc-app-2',
    title: 'Malpractice Case – Review',
    institution: 'BGS Medical College & Hospital',
    urgency: 'Urgent',
    category: 'Malpractice',
    submittedDate: '07 Mar 2025',
    details: 'Disciplinary committee inquiry findings on candidate with unauthorized notes during Anatomy Paper II.',
    referenceNo: 'ACU/VC/2025/MAL-014'
  },
  {
    id: 'vc-app-3',
    title: 'Result Authorisation – Odd Semester',
    institution: 'BGSVIAHS',
    urgency: 'Pending',
    category: 'Result Authorisation',
    submittedDate: '06 Mar 2025',
    details: 'B.Sc Allied Health Sciences (3rd Sem) consolidated moderation result sheet awaiting VC final signature.',
    referenceNo: 'ACU/VC/2025/RES-041'
  },
  {
    id: 'vc-app-4',
    title: 'Policy Amendment – Evaluation Guidelines',
    institution: 'University Level',
    urgency: 'For Approval',
    category: 'Policy Amendment',
    submittedDate: '05 Mar 2025',
    details: 'Proposed revision to third valuation eligibility criteria when variance between double evaluators exceeds 15%.',
    referenceNo: 'ACU/VC/2025/POL-009'
  }
];

export const INITIAL_COLLEGE_STATUS: CollegeExamStatusItem[] = [
  {
    collegeName: 'BGS Medical College & Hospital',
    exams: 28,
    conducted: 28,
    evaluation: 28,
    results: 26,
    status: 'In Progress'
  },
  {
    collegeName: 'AIMS, B.G. Nagara',
    exams: 20,
    conducted: 20,
    evaluation: 20,
    results: 20,
    status: 'Completed'
  },
  {
    collegeName: 'BGSVIAHS',
    exams: 12,
    conducted: 12,
    evaluation: 11,
    results: '—',
    status: 'Evaluation'
  },
  {
    collegeName: 'Other Constituent Colleges (11)',
    exams: 68,
    conducted: 66,
    evaluation: 63,
    results: 58,
    status: 'Ongoing'
  }
];

export const VC_PERFORMANCE_TREND = [
  { year: '2021 – 22', passRate: 88.1 },
  { year: '2022 – 23', passRate: 89.7 },
  { year: '2023 – 24', passRate: 91.6 },
  { year: '2024 – 25', passRate: 92.4 }
];

export const INITIAL_VC_ACTIVITIES: VcActivityItem[] = [
  {
    id: 'act-1',
    date: '10 Mar 2025',
    activity: 'Approved – Exam Schedule Modification (AIMS)',
    reference: 'ACU/Exam/2025/021'
  },
  {
    id: 'act-2',
    date: '07 Mar 2025',
    activity: 'Reviewed – Malpractice Report (BGS MCH)',
    reference: 'ACU/Exam/2025/020'
  },
  {
    id: 'act-3',
    date: '05 Mar 2025',
    activity: 'Approved – Evaluation Guideline Amendment',
    reference: 'ACU/Exam/2025/017'
  }
];

// ==========================================
// 2. Controller of Examination (CoE) Data
// ==========================================
export const INITIAL_COE_KPIS: CoeKpis = {
  examsPlanned: 28,
  examinersTotal: 142,
  examinersAllocated: 26,
  examCentres: 6,
  practicalBatches: 8,
  totalStudents: 4860,
  overallReadiness: 92
};

export const INITIAL_COE_UPCOMING_EXAMS: CoeUpcomingExam[] = [
  {
    id: 'coe-up-1',
    date: '15 Mar 2025',
    subject: 'Physiology',
    type: 'Practical',
    status: 'Scheduled',
    venue: 'Physiology Lab 1 & 2',
    batch: 'Batch A & B'
  },
  {
    id: 'coe-up-2',
    date: '17 Mar 2025',
    subject: 'Biochemistry',
    type: 'Practical',
    status: 'Scheduled',
    venue: 'Biochemistry Practical Hall',
    batch: 'Batch A'
  },
  {
    id: 'coe-up-3',
    date: '20 Mar 2025',
    subject: 'Anatomy',
    type: 'Practical',
    status: 'Draft',
    venue: 'Dissection Hall A',
    batch: 'Batch A & B'
  }
];

export const INITIAL_PRACTICAL_SCHEDULE: PracticalScheduleItem[] = [
  {
    id: 'sch-1',
    subject: 'Physiology',
    batch: 'Batch A',
    date: '15 Mar 2025',
    time: '09:30 – 12:30',
    venue: 'Lab 1',
    status: 'Scheduled'
  },
  {
    id: 'sch-2',
    subject: 'Physiology',
    batch: 'Batch B',
    date: '15 Mar 2025',
    time: '01:30 – 04:30',
    venue: 'Lab 2',
    status: 'Scheduled'
  },
  {
    id: 'sch-3',
    subject: 'Biochemistry',
    batch: 'Batch A',
    date: '17 Mar 2025',
    time: '09:30 – 12:30',
    venue: 'Lab 1',
    status: 'Scheduled'
  }
];

// ==========================================
// 3. Registrar (Evaluation) Data
// ==========================================
export const INITIAL_REGISTRAR_KPIS: RegistrarKpis = {
  answerScriptsReceived: 3240,
  evaluatorsAppointed: 18,
  scriptsEvaluated: 2980,
  evaluationPercentage: 92,
  practicalMarksReceived: 142,
  resultDraftsPrepared: 3,
  resultsPublished: 1
};

export const INITIAL_REGISTRAR_PENDING_ACTIONS: RegistrarPendingActionItem[] = [
  {
    id: 'reg-act-1',
    label: 'Theory Valuation – Pending Scripts',
    count: 260,
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    type: 'theory'
  },
  {
    id: 'reg-act-2',
    label: 'Practical Marks – Verification',
    count: 8,
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    type: 'practical'
  },
  {
    id: 'reg-act-3',
    label: 'IA Marks – Missing / Clarification',
    count: 5,
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    type: 'ia'
  },
  {
    id: 'reg-act-4',
    label: 'Result Approval – Awaiting',
    count: 1,
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    type: 'approval'
  }
];

export const INITIAL_VALUATION_PROGRESS: ValuationProgressRow[] = [
  {
    paper: 'Paper I',
    totalScripts: 1620,
    evaluated: 1500,
    percentage: 92
  },
  {
    paper: 'Paper II',
    totalScripts: 1620,
    evaluated: 1480,
    percentage: 91
  },
  {
    paper: 'Total',
    totalScripts: 3240,
    evaluated: 2980,
    percentage: 92
  }
];

export const INITIAL_RESULT_STATUS: ResultComponentStatus[] = [
  {
    component: 'Theory – Paper I',
    maxMarks: 100,
    status: 'Finalised'
  },
  {
    component: 'Theory – Paper II',
    maxMarks: 100,
    status: 'Finalised'
  },
  {
    component: 'Practical / Viva',
    maxMarks: 100,
    status: 'Finalised'
  },
  {
    component: 'Overall Result',
    maxMarks: 300,
    status: 'Draft Ready'
  }
];

export const INITIAL_REGISTRAR_ACTIVITIES: RegistrarActivityItem[] = [
  {
    id: 'reg-act-log-1',
    dateTime: '05 Mar 2025, 04:30 PM',
    activity: 'Valuation Completed',
    details: 'Physiology – Paper I (Batch 3)',
    by: 'Evaluator'
  },
  {
    id: 'reg-act-log-2',
    dateTime: '05 Mar 2025, 11:20 AM',
    activity: 'Practical Marks Received',
    details: 'Internal & External Marks (142)',
    by: 'Dept. (Physiology)'
  },
  {
    id: 'reg-act-log-3',
    dateTime: '04 Mar 2025, 05:15 PM',
    activity: 'IA Marks Consolidated',
    details: 'First MBBS – Physiology',
    by: 'Evaluation Team'
  },
  {
    id: 'reg-act-log-4',
    dateTime: '04 Mar 2025, 02:40 PM',
    activity: 'Result Draft Generated',
    details: 'Physiology – First MBBS (Evaluation)',
    by: 'Registrar (Evaluation)'
  }
];

