import {
  CollegeItem,
  HodAssignment,
  HodFiltersState,
  HodKpis,
  DepartmentWorkflowStage,
  HodPendingAction,
  HodSubmissionRecord,
  MarksEntryRow
} from '../types/hod';

export const COLLEGES_AND_DEPARTMENTS: CollegeItem[] = [
  {
    id: 'col-bgs-med',
    name: 'BGS Medical College & Hospital',
    code: 'BGS-MED',
    departments: [
      'Physiology',
      'Anatomy',
      'Biochemistry',
      'Pathology',
      'Pharmacology',
      'Microbiology',
      'Community Medicine',
      'General Medicine',
      'General Surgery',
      'Pediatrics'
    ]
  },
  {
    id: 'col-aims',
    name: 'AIMS, B.G. Nagara',
    code: 'AIMS-BGN',
    departments: [
      'Physiology',
      'Anatomy',
      'Biochemistry',
      'Pathology',
      'Pharmacology',
      'Microbiology',
      'Forensic Medicine',
      'Dermatology'
    ]
  },
  {
    id: 'col-bgsviahs',
    name: 'BGSVIAHS',
    code: 'BGS-AHS',
    departments: [
      'Medical Laboratory Technology',
      'Radiology & Imaging Technology',
      'Anesthesia & Operation Theatre Tech',
      'Renal Dialysis Technology',
      'Optometry'
    ]
  },
  {
    id: 'col-bgsit',
    name: 'BGS Institute of Technology',
    code: 'BGSIT',
    departments: [
      'Computer Science & Engineering',
      'Information Science & Engineering',
      'Electronics & Communication Engineering',
      'Civil Engineering',
      'Mechanical Engineering',
      'Artificial Intelligence & Data Science'
    ]
  },
  {
    id: 'col-pharmacy',
    name: 'Adichunchanagiri College of Pharmacy',
    code: 'ACCP',
    departments: [
      'Pharmaceutics',
      'Pharmacology',
      'Pharmaceutical Chemistry',
      'Pharmacognosy',
      'Pharmacy Practice'
    ]
  },
  {
    id: 'col-nursing',
    name: 'Adichunchanagiri College of Nursing',
    code: 'ACCN',
    departments: [
      'Medical Surgical Nursing',
      'Community Health Nursing',
      'Obstetric & Gynecological Nursing',
      'Child Health (Pediatric) Nursing',
      'Mental Health Nursing'
    ]
  }
];

export const INITIAL_HOD_ASSIGNMENTS: HodAssignment[] = [
  {
    id: 'hod-1',
    fullName: 'Dr. Ranjan Kumar',
    email: 'hod.physiology@bgs.edu.in',
    employeeId: 'BGS-MED-042',
    collegeId: 'col-bgs-med',
    collegeName: 'BGS Medical College & Hospital',
    department: 'Physiology',
    designation: 'Professor & Head of Department',
    mobileNumber: '+91 98451 23456',
    joiningDate: '01 Aug 2018',
    accountStatus: 'Active',
    assignedDate: '15 Jul 2021'
  },
  {
    id: 'hod-2',
    fullName: 'Dr. Sunita Kulkarni',
    email: 'hod.anatomy@bgs.edu.in',
    employeeId: 'BGS-MED-019',
    collegeId: 'col-bgs-med',
    collegeName: 'BGS Medical College & Hospital',
    department: 'Anatomy',
    designation: 'Professor & HOD',
    mobileNumber: '+91 98452 34567',
    joiningDate: '12 Jan 2017',
    accountStatus: 'Active',
    assignedDate: '10 Aug 2020'
  },
  {
    id: 'hod-3',
    fullName: 'Dr. H. M. Ramesh',
    email: 'hod.biochem@bgs.edu.in',
    employeeId: 'BGS-MED-031',
    collegeId: 'col-bgs-med',
    collegeName: 'BGS Medical College & Hospital',
    department: 'Biochemistry',
    designation: 'Professor & HOD',
    mobileNumber: '+91 98453 45678',
    joiningDate: '20 Jul 2019',
    accountStatus: 'Active',
    assignedDate: '05 Jan 2022'
  },
  {
    id: 'hod-4',
    fullName: 'Dr. Anand Gowda',
    email: 'hod.pathology@bgs.edu.in',
    employeeId: 'BGS-MED-055',
    collegeId: 'col-bgs-med',
    collegeName: 'BGS Medical College & Hospital',
    department: 'Pathology',
    designation: 'Associate Professor & HOD I/C',
    mobileNumber: '+91 98454 56789',
    joiningDate: '15 Feb 2022',
    accountStatus: 'Invited',
    assignedDate: '01 Mar 2025'
  }
];

export const DEFAULT_HOD_FILTERS: HodFiltersState = {
  academicYear: '2024 – 25',
  programme: 'MBBS',
  phase: 'First MBBS',
  examType: 'Theory',
  subject: 'Physiology'
};

export const INITIAL_HOD_KPIS: HodKpis = {
  examsInvolved: 4,
  examinersNominated: 12,
  questionPapersReviewed: 3,
  marksSubmitted: 420,
  pendingApprovals: 2
};

export const INITIAL_DEPARTMENT_WORKFLOW: DepartmentWorkflowStage[] = [
  {
    id: 'nominate',
    label: 'Nominate Examiners',
    iconName: 'ClipboardList',
    status: 'Completed',
    completionDate: '28 Feb 2025',
    responsibleFaculty: 'Dr. Ranjan Kumar (HOD)',
    description: 'Internal & External examiners nominated and vetted for Theory Paper I & Practical sessions.'
  },
  {
    id: 'review',
    label: 'Review Question Paper',
    iconName: 'FileSearch',
    status: 'Completed',
    completionDate: '03 Mar 2025',
    responsibleFaculty: 'HOD Scrutiny Board',
    description: 'Syllabus coverage 100%, blueprint verified and sealed for university confidential printing.'
  },
  {
    id: 'conduct',
    label: 'Conduct',
    subLabel: '(Theory / Practical)',
    iconName: 'Users',
    status: 'In Progress',
    completionDate: '08 Mar 2025 (Expected)',
    responsibleFaculty: 'Examination Superintendent & Department Board',
    description: 'Theory exam completed. Practical batch B and viva sessions actively ongoing in Physiology Lab 2.'
  },
  {
    id: 'verify',
    label: 'Verify & Submit Marks',
    iconName: 'UploadCloud',
    status: 'Pending',
    completionDate: 'Pending Verification',
    responsibleFaculty: 'Valuation & HOD Audit Panel',
    description: 'Double valuation reconciliation, moderation limits, and marks upload to COE central portal.'
  },
  {
    id: 'complete',
    label: 'Complete',
    iconName: 'CheckCircle2',
    status: 'Pending',
    description: 'Final departmental endorsement, attendance sealing and COE university result clearance.'
  }
];

export const INITIAL_HOD_PENDING_ACTIONS: HodPendingAction[] = [
  {
    id: 'act-1',
    title: 'Nominate Examiners',
    subtitle: 'Practical – Physiology (Batch B)',
    examination: 'First MBBS Annual Exam 2024-25',
    programme: 'MBBS',
    subject: 'Physiology',
    batch: 'Batch B (Roll 051 - 100)',
    dueDate: 'Due: 06 Mar 2025',
    priority: 'High',
    actionType: 'nominate'
  },
  {
    id: 'act-2',
    title: 'Verify & Forward Marks',
    subtitle: 'Theory – Physiology (Paper I)',
    examination: 'First MBBS Annual Exam 2024-25',
    programme: 'MBBS',
    subject: 'Physiology',
    dueDate: 'Due: 07 Mar 2025',
    priority: 'High',
    actionType: 'verify'
  }
];

export const INITIAL_HOD_SUBMISSIONS: HodSubmissionRecord[] = [
  {
    id: 'sub-1',
    date: '04 Mar 2025',
    activity: 'Examiner Nomination',
    subject: 'Physiology – Practical',
    examination: 'First MBBS Practical Examination 2024–25',
    submittedBy: 'Dr. Ranjan Kumar (HOD)',
    status: 'Approved',
    refNumber: 'ACU/BGS/PHY/2025/EXAM/014',
    details: 'External Examiner from Bangalore Medical College confirmed. Internal panel ratified by Principal.'
  },
  {
    id: 'sub-2',
    date: '03 Mar 2025',
    activity: 'Question Paper Review',
    subject: 'Physiology – Paper I',
    examination: 'First MBBS Theory Examination 2024–25',
    submittedBy: 'Dr. Ranjan Kumar (HOD)',
    status: 'Approved',
    refNumber: 'ACU/BGS/PHY/2025/QP/009',
    details: 'Blueprint adherence verified. Maximum marks 100. Dispatched to Controller of Examinations.'
  },
  {
    id: 'sub-3',
    date: '02 Mar 2025',
    activity: 'Marks Verification',
    subject: 'Physiology – Internal',
    examination: 'Continuous Internal Assessment (CIA-III)',
    submittedBy: 'Dr. Ranjan Kumar (HOD)',
    status: 'Forwarded',
    refNumber: 'ACU/BGS/PHY/2025/IA/032',
    details: 'Uploaded 150 student IA scores. Forwarded to College Examination Controller for final assent.'
  }
];

export const ELIGIBLE_FACULTY_LIST = [
  { name: 'Dr. Ranjan Kumar', designation: 'Professor & HOD', specialization: 'Cardiovascular Physiology', experience: '18 Years' },
  { name: 'Dr. Meera Nambiar', designation: 'Associate Professor', specialization: 'Neurophysiology', experience: '12 Years' },
  { name: 'Dr. Vikramaditya Rao', designation: 'Associate Professor', specialization: 'Respiratory Physiology', experience: '10 Years' },
  { name: 'Dr. Bhavana Hegde', designation: 'Assistant Professor', specialization: 'Endocrine Physiology', experience: '6 Years' },
  { name: 'Dr. Santosh Patil', designation: 'Assistant Professor', specialization: 'Renal Physiology', experience: '5 Years' }
];

export const SAMPLE_MARKS_DATA: MarksEntryRow[] = [
  { regNumber: '24MED001', studentName: 'Aarav Sharma', internalMarks: 27, practicalMarks: 38, totalMarks: 65, attendance: 'Present' },
  { regNumber: '24MED002', studentName: 'Aditi Deshmukh', internalMarks: 29, practicalMarks: 40, totalMarks: 69, attendance: 'Present' },
  { regNumber: '24MED003', studentName: 'Akash Gowda', internalMarks: 24, practicalMarks: 35, totalMarks: 59, attendance: 'Present' },
  { regNumber: '24MED004', studentName: 'Ananya Rao', internalMarks: 28, practicalMarks: 39, totalMarks: 67, attendance: 'Present' },
  { regNumber: '24MED005', studentName: 'Chetan Kumar', internalMarks: 26, practicalMarks: 36, totalMarks: 62, attendance: 'Present' }
];
