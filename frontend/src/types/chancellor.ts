export interface DashboardFiltersState {
  academicYear: string;
  college: string;
  programme: string;
  phase: string;
}

export interface KpiSummary {
  constituentColleges: number;
  studentsRegistered: number;
  totalExams: number;
  overallPassPercentage: number;
  examCompletionPercentage: number;
  // Year-over-year changes
  collegesChange?: string;
  studentsChange?: string;
  examsChange?: string;
  passPercentageChange?: string;
  completionChange?: string;
}

export interface CollegeExamStatusItem {
  id: string;
  collegeName: string;
  collegeCode: string;
  totalExams: number;
  examsConducted: number;
  evaluationCompleted: number;
  resultsPublished: number;
  status: 'In Progress' | 'Completed' | 'Evaluation' | 'Ongoing' | 'Delayed' | 'Not Started';
  academicYear: string;
  programmeType: string;
}

export interface ExamPerformanceYearData {
  year: string;
  passPercentage: number;
  registeredStudents: number;
  appearedStudents: number;
  passedStudents: number;
}

export interface PendingApprovalItem {
  id: string;
  title: string;
  submittedBy: string;
  submitterRole: string;
  submissionDate: string;
  category: 'Policy Approval' | 'Governance' | 'Special Approval' | 'Ordinance';
  priority: 'High' | 'Medium' | 'Urgent';
  status: 'Pending Chancellor Approval' | 'Approved' | 'Rejected' | 'Modification Requested';
  details: string;
  supportingDocuments: string[];
  remarks?: string;
  decisionDate?: string;
}

export interface GovernanceDecisionItem {
  id: string;
  date: string;
  title: string;
  referenceNumber: string;
  decisionType: 'Statutory Approval' | 'Regulatory Amendment' | 'Examination Board' | 'Executive Ordinance';
  approvedBy: string;
  status: 'Official' | 'Notified' | 'Archived';
  description: string;
}

export interface KeyInsightMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down' | 'neutral';
  isPositive: boolean;
  type: 'passRate' | 'examsConducted' | 'resultsPublished' | 'disruptions';
}

export interface QuickReportConfig {
  id: string;
  title: string;
  description: string;
  iconType: 'annual' | 'college' | 'programme' | 'accreditation';
  defaultFormat: 'PDF' | 'Excel';
}

export interface ChancellorNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'approval' | 'exam' | 'governance' | 'compliance';
  read: boolean;
  priority: 'high' | 'normal';
  link?: string;
}

