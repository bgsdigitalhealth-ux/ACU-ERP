import {
  DeanKpis,
  ExamConductRow,
  DeanActivityItem,
  DeputyKpis,
  InvigilatorAllocationRow,
  DutyRosterItem
} from '../types/collegeAdmin';

// ==========================================
// 1. Dean (Chief Superintendent) Data
// ==========================================
export const INITIAL_DEAN_KPIS: DeanKpis = {
  examsScheduled: 12,
  invigilatorsAllotted: 86,
  examHalls: 14,
  totalSeats: 1680,
  allocationCompletedPercent: 92,
  pendingIssues: 0
};

export const INITIAL_EXAM_CONDUCT_ROWS: ExamConductRow[] = [
  {
    session: 'Theory – FN',
    centres: 4,
    halls: 8,
    seats: 840,
    status: 'In Progress'
  },
  {
    session: 'Theory – AN',
    centres: 4,
    halls: 6,
    seats: 640,
    status: 'Scheduled'
  },
  {
    session: 'Practical',
    centres: 2,
    halls: '—',
    seats: 200,
    status: 'Scheduled'
  }
];

export const INITIAL_DEAN_ACTIVITIES: DeanActivityItem[] = [
  {
    id: 'act-1',
    text: 'Invigilator duty roster finalised for Physiology – Paper I',
    time: 'Today, 08:15 AM',
    type: 'finalised'
  },
  {
    id: 'act-2',
    text: 'Hall readiness verified – Halls 1 to 4',
    time: 'Today, 08:00 AM',
    type: 'verified'
  },
  {
    id: 'act-3',
    text: 'Exam materials issued to all centres',
    time: 'Today, 07:40 AM',
    type: 'issued'
  },
  {
    id: 'act-4',
    text: 'Session FN – Examination in progress',
    time: 'Today, 09:30 AM',
    type: 'progress'
  }
];

// ==========================================
// 2. Deputy Superintendent Data
// ==========================================
export const INITIAL_DEPUTY_KPIS: DeputyKpis = {
  examsScheduled: 12,
  facultyAvailable: 86,
  invigilatorsAllocated: 68,
  examHalls: 14,
  totalSeats: 1680,
  allocationCompletedPercent: 92
};

export const INITIAL_ALLOCATION_SUMMARY: InvigilatorAllocationRow[] = [
  {
    session: 'Theory – FN',
    required: 34,
    allocated: 34,
    status: 'Completed'
  },
  {
    session: 'Theory – AN',
    required: 34,
    allocated: 34,
    status: 'Completed'
  },
  {
    session: 'Practical',
    required: 10,
    allocated: 8,
    status: 'In Progress'
  }
];

export const INITIAL_DUTY_ROSTER: DutyRosterItem[] = [
  {
    hallNo: 'Hall 1',
    invigilators: 'Dr. A. Kumar, Dr. S. Meena',
    seats: 120,
    reliever: 'Dr. C. Verma'
  },
  {
    hallNo: 'Hall 2',
    invigilators: 'Dr. P. Rao, Dr. N. Shree',
    seats: 120,
    reliever: 'Dr. C. Verma'
  },
  {
    hallNo: 'Hall 3',
    invigilators: 'Dr. R. Kiran, Dr. V. Latha',
    seats: 120,
    reliever: 'Dr. T. Nayak'
  },
  {
    hallNo: 'Hall 4',
    invigilators: 'Dr. M. Arun, Dr. K. Devi',
    seats: 120,
    reliever: 'Dr. T. Nayak'
  }
];

