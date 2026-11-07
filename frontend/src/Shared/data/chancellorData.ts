import {
  CollegeExamStatusItem,
  ExamPerformanceYearData,
  PendingApprovalItem,
  GovernanceDecisionItem,
  KeyInsightMetric,
  QuickReportConfig,
  ChancellorNotification,
  KpiSummary
} from '../types/chancellor';

export const ACADEMIC_YEARS = ['2024 – 25', '2023 – 24', '2022 – 23', '2021 – 22'];

export const COLLEGES_LIST = [
  'All Colleges',
  'BGS Medical College & Hospital',
  'AIMS, B.G. Nagara',
  'BGSVIAHS',
  'BGS Institute of Technology',
  'Adichunchanagiri College of Pharmacy',
  'Adichunchanagiri College of Nursing',
  'BGS College of Education'
];

export const PROGRAMMES_LIST = [
  'All Programmes',
  'Medical (MBBS / MD / MS)',
  'Engineering & Technology (BE / B.Tech / M.Tech)',
  'Pharmacy (B.Pharm / M.Pharm / Pharm.D)',
  'Nursing Sciences (B.Sc / M.Sc Nursing)',
  'Allied Health Sciences',
  'Management & Humanities (MBA / BBA)'
];

export const PHASES_LIST = [
  'All Phases',
  'Odd Semester 2024-25',
  'Even Semester 2023-24',
  'Annual Examination Phase',
  'Supplementary Examination Phase'
];

export const INITIAL_KPIS: Record<string, KpiSummary> = {
  '2024 – 25': {
    constituentColleges: 14,
    studentsRegistered: 8642,
    totalExams: 128,
    overallPassPercentage: 92.4,
    examCompletionPercentage: 96.8,
    collegesChange: '+1 from 2023-24',
    studentsChange: '+2.5% YoY',
    examsChange: '+6 theory & practical',
    passPercentageChange: '+0.8% YoY',
    completionChange: '+1.2% on schedule'
  },
  '2023 – 24': {
    constituentColleges: 13,
    studentsRegistered: 8430,
    totalExams: 122,
    overallPassPercentage: 91.6,
    examCompletionPercentage: 95.6,
    passPercentageChange: '+1.9% YoY',
  },
  '2022 – 23': {
    constituentColleges: 13,
    studentsRegistered: 8120,
    totalExams: 118,
    overallPassPercentage: 89.7,
    examCompletionPercentage: 94.2,
  },
  '2021 – 22': {
    constituentColleges: 12,
    studentsRegistered: 7850,
    totalExams: 112,
    overallPassPercentage: 88.1,
    examCompletionPercentage: 92.5,
  }
};

export const INITIAL_COLLEGE_STATUS: CollegeExamStatusItem[] = [
  {
    id: 'col-1',
    collegeName: 'BGS Medical College & Hospital',
    collegeCode: 'BGS-MED',
    totalExams: 28,
    examsConducted: 28,
    evaluationCompleted: 28,
    resultsPublished: 26,
    status: 'In Progress',
    academicYear: '2024 – 25',
    programmeType: 'Medical (MBBS / MD / MS)'
  },
  {
    id: 'col-2',
    collegeName: 'AIMS, B.G. Nagara',
    collegeCode: 'AIMS-BGN',
    totalExams: 20,
    examsConducted: 20,
    evaluationCompleted: 20,
    resultsPublished: 20,
    status: 'Completed',
    academicYear: '2024 – 25',
    programmeType: 'Medical (MBBS / MD / MS)'
  },
  {
    id: 'col-3',
    collegeName: 'BGSVIAHS',
    collegeCode: 'BGS-AHS',
    totalExams: 12,
    examsConducted: 12,
    evaluationCompleted: 11,
    resultsPublished: 0,
    status: 'Evaluation',
    academicYear: '2024 – 25',
    programmeType: 'Allied Health Sciences'
  },
  {
    id: 'col-4',
    collegeName: 'Other Constituent Colleges (11)',
    collegeCode: 'CONST-11',
    totalExams: 68,
    examsConducted: 66,
    evaluationCompleted: 63,
    resultsPublished: 58,
    status: 'Ongoing',
    academicYear: '2024 – 25',
    programmeType: 'Engineering & Technology (BE / B.Tech / M.Tech)'
  }
];

export const EXAMINATION_PERFORMANCE_HISTORY: ExamPerformanceYearData[] = [
  {
    year: '2021 – 22',
    passPercentage: 88.1,
    registeredStudents: 7850,
    appearedStudents: 7720,
    passedStudents: 6801
  },
  {
    year: '2022 – 23',
    passPercentage: 89.7,
    registeredStudents: 8120,
    appearedStudents: 8010,
    passedStudents: 7185
  },
  {
    year: '2023 – 24',
    passPercentage: 91.6,
    registeredStudents: 8430,
    appearedStudents: 8350,
    passedStudents: 7648
  },
  {
    year: '2024 – 25',
    passPercentage: 92.4,
    registeredStudents: 8642,
    appearedStudents: 8560,
    passedStudents: 7910
  }
];

export const INITIAL_PENDING_APPROVALS: PendingApprovalItem[] = [
  {
    id: 'appr-1',
    title: 'Revised Examination Regulations – UG & PG',
    submittedBy: 'Vice-Chancellor',
    submitterRole: 'Executive Academic Head',
    submissionDate: '02 Mar 2025',
    category: 'Policy Approval',
    priority: 'High',
    status: 'Pending Chancellor Approval',
    details: 'Comprehensive framework update standardizing credit requirements, supplementary exam eligibility, and moderation rules across all constituent professional colleges in line with NEP-2020 guidelines.',
    supportingDocuments: [
      'Draft_Regulations_UG_PG_2025.pdf',
      'Academic_Council_Resolution_Feb2025.pdf',
      'Comparative_Credit_Analysis.xlsx'
    ]
  },
  {
    id: 'appr-2',
    title: 'Introduction of Common University Examination',
    submittedBy: 'Controller of Examinations',
    submitterRole: 'Office of COE',
    submissionDate: '26 Feb 2025',
    category: 'Governance',
    priority: 'Urgent',
    status: 'Pending Chancellor Approval',
    details: 'Implementation plan for unified online barcoded question paper delivery and centralized valuation camps for winter 2025 exams to ensure uniform evaluation standards.',
    supportingDocuments: [
      'COE_Proposal_Common_Exam_2025.pdf',
      'Budget_Allocation_Security_Printing.pdf',
      'Digital_Valuation_Feasibility_Report.pdf'
    ]
  },
  {
    id: 'appr-3',
    title: 'Special Examination – Exceptional Cases',
    submittedBy: 'Registrar (Evaluation)',
    submitterRole: 'Evaluation Directorate',
    submissionDate: '19 Feb 2025',
    category: 'Special Approval',
    priority: 'Medium',
    status: 'Pending Chancellor Approval',
    details: 'Sanction requested for conducting special supplementary examinations for 14 final-year MBBS and B.Tech candidates who represented the University at National Sports and Research Symposia.',
    supportingDocuments: [
      'Student_Nomination_List_Verification.pdf',
      'Medical_Sports_Council_Endorsement.pdf'
    ]
  }
];

export const INITIAL_GOVERNANCE_DECISIONS: GovernanceDecisionItem[] = [
  {
    id: 'dec-1',
    date: '10 Mar 2025',
    title: 'Approved – Examination Calendar 2025 – 26',
    referenceNumber: 'ACU/Exam/2025/021',
    decisionType: 'Statutory Approval',
    approvedBy: 'Chancellor',
    status: 'Official',
    description: 'Statutory assent granted to the annual university examination master schedule across undergraduate, postgraduate, and super-specialty faculties.'
  },
  {
    id: 'dec-2',
    date: '24 Feb 2025',
    title: 'Amendment to Evaluation Guidelines',
    referenceNumber: 'ACU/Acad/2025/017',
    decisionType: 'Regulatory Amendment',
    approvedBy: 'Chancellor',
    status: 'Official',
    description: 'Ratification of third-party double valuation rules for postgraduate dissertation papers with variance limits capped at 15%.'
  },
  {
    id: 'dec-3',
    date: '18 Feb 2025',
    title: 'Approval – Supplementary Examination (Odd Sem)',
    referenceNumber: 'ACU/Exam/2025/012',
    decisionType: 'Examination Board',
    approvedBy: 'Chancellor',
    status: 'Notified',
    description: 'Executive decree sanctioning accelerated fast-track re-examinations for semester 7 engineering and medical interns.'
  }
];

export const INITIAL_KEY_INSIGHTS: KeyInsightMetric[] = [
  {
    id: 'ins-1',
    title: 'Pass Rate',
    value: '+0.8%',
    subtitle: 'Pass Rate (vs. Previous Year)',
    trend: 'up',
    isPositive: true,
    type: 'passRate'
  },
  {
    id: 'ins-2',
    title: 'Exams Conducted',
    value: '98.4%',
    subtitle: 'Exams Conducted (as per Calendar)',
    trend: 'up',
    isPositive: true,
    type: 'examsConducted'
  },
  {
    id: 'ins-3',
    title: 'Results Published',
    value: '92.1%',
    subtitle: 'Results Published',
    trend: 'up',
    isPositive: true,
    type: 'resultsPublished'
  },
  {
    id: 'ins-4',
    title: 'Major Exam Disruptions',
    value: '0',
    subtitle: 'Major Exam Disruptions',
    trend: 'neutral',
    isPositive: true,
    type: 'disruptions'
  }
];

export const QUICK_REPORTS_LIST: QuickReportConfig[] = [
  {
    id: 'rep-annual',
    title: 'Annual Examination Report',
    description: 'Comprehensive annual statistical abstract with college, faculty, and candidate results.',
    iconType: 'annual',
    defaultFormat: 'PDF'
  },
  {
    id: 'rep-college',
    title: 'College-wise Performance',
    description: 'Comparative pass percentage benchmarks, rank distribution, and moderation audits.',
    iconType: 'college',
    defaultFormat: 'Excel'
  },
  {
    id: 'rep-programme',
    title: 'Programme Results',
    description: 'Detailed analysis of UG, PG, and Doctoral exam clearance rates by department.',
    iconType: 'programme',
    defaultFormat: 'PDF'
  },
  {
    id: 'rep-accreditation',
    title: 'Accreditation Indicators (NAAC / NIRF)',
    description: 'Criterion II & III metrics, student progression indices, and NAAC SSR evidence tables.',
    iconType: 'accreditation',
    defaultFormat: 'PDF'
  }
];

export const INITIAL_NOTIFICATIONS: ChancellorNotification[] = [
  {
    id: 'notif-1',
    title: 'Urgent Policy Assent Required',
    message: 'Revised Examination Regulations – UG & PG submitted by Vice-Chancellor awaiting Chancellor sanction.',
    timestamp: '10 mins ago',
    category: 'approval',
    read: false,
    priority: 'high',
    link: '/approvals'
  },
  {
    id: 'notif-2',
    title: 'Common University Exam Proposal',
    message: 'Proposal for unified examination centers and digital evaluation submitted by COE.',
    timestamp: '2 hours ago',
    category: 'governance',
    read: false,
    priority: 'high',
    link: '/approvals'
  },
  {
    id: 'notif-3',
    title: 'Special Examination Request',
    message: 'Registrar (Evaluation) forwarded special examination files for final-year national athletes.',
    timestamp: 'Yesterday',
    category: 'exam',
    read: false,
    priority: 'normal',
    link: '/approvals'
  },
  {
    id: 'notif-4',
    title: 'AIMS Examination Results Published',
    message: '100% of MBBS Phase III Part 1 theory and clinical results successfully gazetted.',
    timestamp: '3 days ago',
    category: 'exam',
    read: true,
    priority: 'normal'
  }
];

