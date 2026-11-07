export interface CollegeItem {
  id: string;
  name: string;
  code: string;
  departments: string[];
}

export interface HodAssignment {
  id: string;
  fullName: string;
  email: string;
  employeeId: string;
  collegeId: string;
  collegeName: string;
  department: string;
  designation: string;
  mobileNumber: string;
  joiningDate: string;
  accountStatus: 'Active' | 'Invited' | 'Pending' | 'Deactivated';
  assignedDate: string;
}

export interface HodUserSession {
  id: string;
  fullName: string;
  email: string;
  employeeId: string;
  collegeName: string;
  department: string;
  role: 'HEAD_OF_DEPARTMENT';
  avatar?: string;
  token: string;
}

export interface HodFiltersState {
  academicYear: string;
  programme: string;
  phase: string;
  examType: 'Theory' | 'Practical' | 'All';
  subject: string;
}

export interface HodKpis {
  examsInvolved: number;
  examinersNominated: number;
  questionPapersReviewed: number;
  marksSubmitted: number;
  pendingApprovals: number;
}

export type WorkflowStageId = 'nominate' | 'review' | 'conduct' | 'verify' | 'complete';

export interface DepartmentWorkflowStage {
  id: WorkflowStageId;
  label: string;
  subLabel?: string;
  iconName: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  completionDate?: string;
  responsibleFaculty?: string;
  description: string;
}

export interface HodPendingAction {
  id: string;
  title: string;
  subtitle: string;
  examination: string;
  programme: string;
  subject: string;
  batch?: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Normal';
  actionType: 'nominate' | 'verify' | 'review' | 'practical';
  isOverdue?: boolean;
}

export interface HodSubmissionRecord {
  id: string;
  date: string;
  activity: string;
  subject: string;
  examination: string;
  submittedBy: string;
  status: 'Approved' | 'Forwarded' | 'Pending' | 'Rejected' | 'Modification Requested';
  details?: string;
  refNumber: string;
}

export interface ExaminerNominationForm {
  examinationId: string;
  examType: 'Theory' | 'Practical';
  subject: string;
  internalExaminers: string[];
  externalExaminers: string[];
  chiefExaminer: string;
  remarks?: string;
}

export interface ExamScheduleProposalForm {
  academicYear: string;
  programme: string;
  phase: string;
  examType: 'Theory' | 'Practical';
  subject: string;
  examDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  invigilatorCount: number;
  remarks?: string;
}

export interface QuestionPaperReviewItem {
  id: string;
  subject: string;
  courseCode: string;
  paperSetter: string;
  maxMarks: number;
  durationMinutes: number;
  submissionDate: string;
  syllabusCoverage: number; // 0-100%
  status: 'Pending' | 'Approved' | 'Modification Requested';
  fileName: string;
}

export interface MarksEntryRow {
  regNumber: string;
  studentName: string;
  internalMarks: number;
  practicalMarks: number;
  totalMarks: number;
  attendance: 'Present' | 'Absent';
}

