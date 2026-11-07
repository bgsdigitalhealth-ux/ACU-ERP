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

// ============================================================
// Comprehensive Vice-Chancellor Submodule Types
// ============================================================

export interface CollegeMonitoringDetail {
  id: string;
  name: string;
  code: string;
  principal: string;
  totalStudents: number;
  examsScheduled: number;
  examsConducted: number;
  evaluationProgress: number; // percentage
  resultsPublished: number; // percentage
  complianceScore: number; // out of 100
  cctvStatus: 'Online' | 'Offline' | 'Degraded';
  invigilatorsActive: number;
  malpracticeCount: number;
  deanName: string;
}

export interface ExamReadinessDetail {
  id: string;
  category: string;
  task: string;
  deadline: string;
  status: 'Ready' | 'In Progress' | 'Attention Needed';
  progress: number;
  responsibleOfficer: string;
  notes: string;
}

export interface ExamRegulationDetail {
  id: string;
  title: string;
  code: string;
  category: 'Medical (CBME)' | 'Pharmacy' | 'Nursing' | 'Engineering' | 'General';
  academicYear: string;
  programme: string;
  effectiveDate: string;
  status: 'Gazetted' | 'Pending Council Review' | 'Active';
  description: string;
  clauses: string[];
}

export interface ExamPolicyDetail {
  id: string;
  title: string;
  category: string;
  version: string;
  effectiveDate: string;
  status: 'Active' | 'Under Review' | 'Draft';
  description: string;
  keyRules: string[];
}

export interface UniversityCalendarEvent {
  id: string;
  eventName: string;
  category: 'Examination' | 'Internal Assessment' | 'Administrative' | 'Holiday' | 'Result Declaration';
  startDate: string;
  endDate: string;
  programme: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  targetCohort: string;
}

export interface ExamReformDetail {
  id: string;
  title: string;
  initiative: string;
  phase: string;
  targetYear: string;
  status: 'Implemented' | 'In Progress' | 'Proposed';
  impact: string;
  leadDepartment: string;
}

export interface ExceptionalCaseDetail {
  id: string;
  studentName: string;
  usn: string;
  college: string;
  programme: string;
  semester: string;
  requestType: 'Medical Condonation' | 'Scribe & Extra Time' | 'Special Exam Session' | 'Re-Checking OMR';
  reason: string;
  submittedDate: string;
  urgency: 'High' | 'Urgent' | 'Pending';
  documentsAttached: string[];
  status: 'Pending VC Decision' | 'Approved' | 'Rejected';
  remarks?: string;
  recommendingAuthority: string;
}

export interface ScheduleModificationDetail {
  id: string;
  college: string;
  programme: string;
  semester: string;
  courseName: string;
  courseCode: string;
  existingDate: string;
  existingSession: string;
  proposedDate: string;
  proposedSession: string;
  reason: string;
  affectedStudents: number;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  requestedBy: string;
  coERecommendation: string;
}

export interface MalpracticeCaseDetail {
  id: string;
  caseNo: string;
  studentName: string;
  usn: string;
  college: string;
  examName: string;
  examDate: string;
  violationType: 'Unauthorized Notes / Chits' | 'Smart Watch / Electronic Device' | 'Impersonation' | 'Copying from Peer';
  description: string;
  committeeRecommendation: string;
  vcDecree?: string;
  status: 'Under Review' | 'Penalty Imposed' | 'Pardoned';
  evidencePhotos: string[];
}

export interface ResultAuthorisationDetail {
  id: string;
  programme: string;
  semester: string;
  college: string;
  examSession: string;
  totalStudents: number;
  passedCount: number;
  passPercentage: number;
  distinctionCount: number;
  moderationApplied: boolean;
  moderationMarksAvg: number;
  discrepanciesResolved: boolean;
  authorisationStatus: 'Pending VC Signature' | 'Authorised' | 'Withheld';
  signedDate?: string;
}

export interface ValuationCampDetail {
  id: string;
  campName: string;
  location: string;
  chiefValuer: string;
  totalBundles: number;
  scriptsReceived: number;
  evaluatedFirst: number;
  evaluatedSecond: number;
  thirdValuationTriggered: number;
  evaluatorsTurnout: number; // percentage
  completionRate: number; // percentage
  estimatedCompletionDate: string;
}

export interface ResultProcessingStageBatch {
  id: string;
  batchName: string;
  programme: string;
  semester: string;
  currentStage: number; // 1 to 6
  stageName: string;
  status: 'On Schedule' | 'Awaiting Moderation' | 'Pending VC Assent' | 'Published';
  pendingTasks: string;
  responsibleOfficer: string;
}

export interface UniversityRankHolder {
  rank: number;
  studentName: string;
  usn: string;
  college: string;
  programme: string;
  percentage: number;
  medal: 'Gold Medal' | 'Silver Medal' | 'Bronze Medal' | 'Certificate of Merit';
}

export interface AccreditationMetricDetail {
  id: string;
  criterion: string;
  metricNo: string;
  title: string;
  benchmark: string;
  currentScore: string;
  complianceRate: number;
  documentsCount: number;
  auditStatus: 'Compliant' | 'Verified' | 'Pending Documentation';
}


