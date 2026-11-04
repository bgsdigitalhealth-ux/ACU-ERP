export type CollegeAdminSubRole = 'dean' | 'deputy-superintendent' | 'hod-management';

// --- Dean (Chief Superintendent) Types ---
export interface DeanFiltersState {
  academicYear: string;
  programme: string;
  phase: string;
  subject: string;
}

export interface DeanKpis {
  examsScheduled: number;
  invigilatorsAllotted: number;
  examHalls: number;
  totalSeats: number;
  allocationCompletedPercent: number;
  pendingIssues: number;
}

export interface ExamConductRow {
  session: string;
  centres: number;
  halls: number | string;
  seats: number;
  status: 'In Progress' | 'Scheduled' | 'Completed';
}

export interface DeanActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'finalised' | 'verified' | 'issued' | 'progress';
}

// --- Deputy Superintendent Types ---
export interface DeputyFiltersState {
  academicYear: string;
  programme: string;
  phase: string;
  examType: 'Theory' | 'Practical' | 'All';
}

export interface DeputyKpis {
  examsScheduled: number;
  facultyAvailable: number;
  invigilatorsAllocated: number;
  examHalls: number;
  totalSeats: number;
  allocationCompletedPercent: number;
}

export interface InvigilatorAllocationRow {
  session: string;
  required: number;
  allocated: number;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface DutyRosterItem {
  hallNo: string;
  invigilators: string;
  seats: number;
  reliever?: string;
}

