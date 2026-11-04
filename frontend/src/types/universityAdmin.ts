export type UniversityAdminRole = 'chancellor' | 'vice-chancellor' | 'coe' | 'registrar';

// --- Vice-Chancellor Types ---
export interface VcFiltersState {
  academicYear: string;
  college: string;
  programme: string;
  phase: string;
}

export interface VcKpis {
  constituentColleges: number;
  studentsRegistered: number;
  totalExams: number;
  overallPassPercentage: number;
  pendingApprovals: number;
}

export interface VcApprovalItem {
  id: string;
  title: string;
  institution: string;
  urgency: 'High' | 'Urgent' | 'Pending' | 'For Approval';
  category: 'Schedule Modification' | 'Malpractice' | 'Result Authorisation' | 'Policy Amendment';
  submittedDate: string;
  details: string;
  referenceNo: string;
}

export interface CollegeExamStatusItem {
  collegeName: string;
  exams: number;
  conducted: number;
  evaluation: number;
  results: number | string;
  status: 'In Progress' | 'Completed' | 'Evaluation' | 'Ongoing' | 'Delayed';
}

export interface VcActivityItem {
  id: string;
  date: string;
  activity: string;
  reference: string;
  notes?: string;
}

// --- Controller of Examination (CoE) Types ---
export interface CoeFiltersState {
  academicYear: string;
  programme: string;
  phase: string;
  examType: 'Theory' | 'Practical' | 'All';
  subject: string;
}

export interface CoeKpis {
  examsPlanned: number;
  examinersTotal: number;
  examinersAllocated: number;
  examCentres: number;
  practicalBatches: number;
  totalStudents: number;
  overallReadiness: number; // percentage
}

export interface CoeUpcomingExam {
  id: string;
  date: string;
  subject: string;
  type: 'Practical' | 'Theory';
  status: 'Scheduled' | 'Draft' | 'Ongoing';
  venue?: string;
  batch?: string;
}

export interface PracticalScheduleItem {
  id: string;
  subject: string;
  batch: string;
  date: string;
  time: string;
  venue: string;
  status: 'Scheduled' | 'Completed' | 'In Progress';
}

// --- Registrar (Evaluation) Types ---
export interface RegistrarFiltersState {
  academicYear: string;
  programme: string;
  phase: string;
  subject: string;
}

export interface RegistrarKpis {
  answerScriptsReceived: number;
  evaluatorsAppointed: number;
  scriptsEvaluated: number;
  evaluationPercentage: number;
  practicalMarksReceived: number;
  resultDraftsPrepared: number;
  resultsPublished: number;
}

export interface RegistrarPendingActionItem {
  id: string;
  label: string;
  count: number;
  color: string;
  type: 'theory' | 'practical' | 'ia' | 'approval';
}

export interface ValuationProgressRow {
  paper: string;
  totalScripts: number;
  evaluated: number;
  percentage: number;
}

export interface ResultComponentStatus {
  component: string;
  maxMarks: number;
  status: 'Finalised' | 'Draft Ready' | 'Pending';
}

export interface RegistrarActivityItem {
  id: string;
  dateTime: string;
  activity: string;
  details: string;
  by: string;
}

