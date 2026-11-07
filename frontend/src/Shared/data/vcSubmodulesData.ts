import {
  CollegeMonitoringDetail,
  ExamReadinessDetail,
  ExamRegulationDetail,
  ExamPolicyDetail,
  UniversityCalendarEvent,
  ExamReformDetail,
  ExceptionalCaseDetail,
  ScheduleModificationDetail,
  MalpracticeCaseDetail,
  ResultAuthorisationDetail,
  ValuationCampDetail,
  ResultProcessingStageBatch,
  UniversityRankHolder,
  AccreditationMetricDetail
} from '../types/universityAdmin';

// ============================================================
// 1. Examination Oversight Data
// ============================================================

export const COLLEGE_MONITORING_DATA: CollegeMonitoringDetail[] = [
  {
    id: 'col-1',
    name: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    code: 'AIMS-01',
    principal: 'Dr. M. G. Shivaramu, MD',
    deanName: 'Prof. K. N. Narasimha Swamy',
    totalStudents: 1250,
    examsScheduled: 20,
    examsConducted: 20,
    evaluationProgress: 100,
    resultsPublished: 100,
    complianceScore: 99.2,
    cctvStatus: 'Online',
    invigilatorsActive: 42,
    malpracticeCount: 1
  },
  {
    id: 'col-2',
    name: 'BGS Medical College & Hospital',
    code: 'BGSMCH-02',
    principal: 'Dr. S. K. Venkatesh, MS',
    deanName: 'Dr. Ramesh Babu, MD',
    totalStudents: 1420,
    examsScheduled: 28,
    examsConducted: 28,
    evaluationProgress: 100,
    resultsPublished: 92.8,
    complianceScore: 98.4,
    cctvStatus: 'Online',
    invigilatorsActive: 56,
    malpracticeCount: 2
  },
  {
    id: 'col-3',
    name: 'BGS Institute of Technology (BGSIT)',
    code: 'BGSIT-03',
    principal: 'Dr. B. K. Narendra, Ph.D.',
    deanName: 'Dr. T. Mahadeva Prasad',
    totalStudents: 2150,
    examsScheduled: 36,
    examsConducted: 36,
    evaluationProgress: 94.4,
    resultsPublished: 88.5,
    complianceScore: 97.6,
    cctvStatus: 'Online',
    invigilatorsActive: 68,
    malpracticeCount: 0
  },
  {
    id: 'col-4',
    name: 'Sri Adichunchanagiri College of Pharmacy (SACCP)',
    code: 'SACCP-04',
    principal: 'Dr. B. Ramesh, M.Pharm, Ph.D.',
    deanName: 'Dr. Prakash Goudanavar',
    totalStudents: 780,
    examsScheduled: 16,
    examsConducted: 16,
    evaluationProgress: 93.7,
    resultsPublished: 81.2,
    complianceScore: 98.8,
    cctvStatus: 'Online',
    invigilatorsActive: 28,
    malpracticeCount: 0
  },
  {
    id: 'col-5',
    name: 'Adichunchanagiri College of Nursing (ACN)',
    code: 'ACN-05',
    principal: 'Prof. Victoria D’Almeida, M.Sc (N)',
    deanName: 'Prof. Chethan Kumar',
    totalStudents: 620,
    examsScheduled: 14,
    examsConducted: 14,
    evaluationProgress: 92.8,
    resultsPublished: 78.5,
    complianceScore: 96.9,
    cctvStatus: 'Online',
    invigilatorsActive: 24,
    malpracticeCount: 0
  },
  {
    id: 'col-6',
    name: 'BGS Institute of Aviation & Allied Health Sciences (BGSVIAHS)',
    code: 'BGSVIAHS-06',
    principal: 'Dr. N. C. Ashok, MD',
    deanName: 'Dr. Manjunath Shetty',
    totalStudents: 540,
    examsScheduled: 12,
    examsConducted: 12,
    evaluationProgress: 91.6,
    resultsPublished: 0,
    complianceScore: 95.8,
    cctvStatus: 'Degraded',
    invigilatorsActive: 20,
    malpracticeCount: 0
  },
  {
    id: 'col-7',
    name: 'Sri Adichunchanagiri Ayurvedic Medical College & Hospital',
    code: 'SAAMC-07',
    principal: 'Dr. A. L. Patil, MD (Ayu)',
    deanName: 'Dr. Shrinidhi Kumar',
    totalStudents: 490,
    examsScheduled: 10,
    examsConducted: 10,
    evaluationProgress: 90.0,
    resultsPublished: 80.0,
    complianceScore: 98.1,
    cctvStatus: 'Online',
    invigilatorsActive: 18,
    malpracticeCount: 0
  },
  {
    id: 'col-8',
    name: 'BGS Dental College & Hospital',
    code: 'BGSDC-08',
    principal: 'Dr. Vinay Kumar, MDS',
    deanName: 'Dr. Preetha Sharma',
    totalStudents: 510,
    examsScheduled: 10,
    examsConducted: 10,
    evaluationProgress: 90.0,
    resultsPublished: 90.0,
    complianceScore: 99.0,
    cctvStatus: 'Online',
    invigilatorsActive: 18,
    malpracticeCount: 0
  }
];

export const EXAM_READINESS_DATA: ExamReadinessDetail[] = [
  {
    id: 'r-1',
    category: 'Timetable & Scheduling',
    task: 'Final University Examination Notification & Timetable Gazetting',
    deadline: '15 Jan 2025',
    status: 'Ready',
    progress: 100,
    responsibleOfficer: 'Controller of Examination (CoE)',
    notes: 'Published across all 14 college notice boards and student portals.'
  },
  {
    id: 'r-2',
    category: 'Candidate Enrollment',
    task: 'Student Examination Registration, Condonation & Fee Reconciliation',
    deadline: '10 Feb 2025',
    status: 'Ready',
    progress: 99.4,
    responsibleOfficer: 'Registrar (Evaluation)',
    notes: '8,642 students approved. 24 students pending condonation hearing.'
  },
  {
    id: 'r-3',
    category: 'Hall Tickets & Barcodes',
    task: 'Biometric Barcoded Hall Ticket Generation & Digital Distribution',
    deadline: '20 Feb 2025',
    status: 'Ready',
    progress: 98.9,
    responsibleOfficer: 'ERP Technical Cell',
    notes: 'Watermarked QR code hall tickets pushed to student portal app.'
  },
  {
    id: 'r-4',
    category: 'Examination Centres',
    task: 'Physical Centre Infrastructure, Jammer Setup & Sanitization Audit',
    deadline: '25 Feb 2025',
    status: 'Ready',
    progress: 100,
    responsibleOfficer: 'Chief Superintendents Panel',
    notes: 'All 14 apex exam halls certified compliant with CCTV & UPS backup.'
  },
  {
    id: 'r-5',
    category: 'Invigilation Roster',
    task: 'Internal & External Invigilators Deputation & Training',
    deadline: '28 Feb 2025',
    status: 'In Progress',
    progress: 95.2,
    responsibleOfficer: 'Dean of Academic Oversight',
    notes: '384 invigilators deployed; 18 replacement reserves being allocated.'
  },
  {
    id: 'r-6',
    category: 'Confidential Operations',
    task: 'Digital QP Bank Encryption, Dual-PIN Locker & Biometric Decryption',
    deadline: '01 Mar 2025',
    status: 'Ready',
    progress: 100,
    responsibleOfficer: 'CoE & Confidential Custodian',
    notes: '256-bit AES encryption verified with 45-minute timed release.'
  },
  {
    id: 'r-7',
    category: 'Practical Examinations',
    task: 'External Clinical Examiners Deputation (Medical, Dental & Nursing)',
    deadline: '05 Mar 2025',
    status: 'In Progress',
    progress: 93.5,
    responsibleOfficer: 'Medical Faculty Board Chairman',
    notes: '78 of 84 external senior professors confirmed attendance.'
  },
  {
    id: 'r-8',
    category: 'CCTV Apex Surveillance',
    task: 'Direct IP-Feed Streaming to Vice-Chancellor Apex Monitoring Room',
    deadline: '02 Mar 2025',
    status: 'Ready',
    progress: 98.0,
    responsibleOfficer: 'IT Director & Security Chief',
    notes: '112 camera feeds live on VC dashboard with automated AI loitering alerts.'
  }
];

// ============================================================
// 2. Academic & Exam Governance Data
// ============================================================

export const EXAM_REGULATIONS_DATA: ExamRegulationDetail[] = [
  {
    id: 'reg-1',
    title: 'ACU MBBS Examination Ordinance (NMC CBME 2024 Revision)',
    code: 'ACU/REG/MED/2024-01',
    category: 'Medical (CBME)',
    academicYear: '2024 – 25',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    effectiveDate: '01 Sep 2024',
    status: 'Active',
    description: 'Comprehensive statute governing modular CBME examinations, logbook assessments, clinical skill certifications, and summative university clinical OSCE/OSPE evaluations.',
    clauses: [
      'Clause 4.1: Mandatory 75% attendance in theory and 80% in clinical postings to sit for university boards.',
      'Clause 7.2: Continuous Internal Assessment (CIA) weightage fixed at 50% theory and 50% practical with minimum 50% combined score.',
      'Clause 11.4: Double valuation mandatory for all theory answer books by one internal and one external examiner.',
      'Clause 15.1: Maximum 4 attempts permitted to complete first professional MBBS course within 4 years of admission.'
    ]
  },
  {
    id: 'reg-2',
    title: 'University Valuation & Double-Valuation Ordinance (Statute 14-B)',
    code: 'ACU/REG/GEN/2023-14B',
    category: 'General',
    academicYear: '2023 – 24',
    programme: 'All Programmes',
    effectiveDate: '15 Oct 2023',
    status: 'Active',
    description: 'Statute establishing procedures for centralized valuation camps, barcoded evaluation, variance resolution, and appointment of third evaluators.',
    clauses: [
      'Clause 3.1: If variance between Evaluator 1 and Evaluator 2 is <=15%, average of both marks is awarded.',
      'Clause 3.2: If variance exceeds 15%, script automatically routed to a third senior evaluator.',
      'Clause 5.4: Barcoded script masking guarantees complete candidate anonymity throughout valuation process.'
    ]
  },
  {
    id: 'reg-3',
    title: 'Differently-Abled Student Accommodations & Scribe Guidelines',
    code: 'ACU/REG/EXM/2024-08',
    category: 'General',
    academicYear: '2024 – 25',
    programme: 'All Programmes',
    effectiveDate: '01 Aug 2024',
    status: 'Active',
    description: 'Procedures for allotment of scribes, compensatory examination time (20 min per hour), and specialized exam seating for candidates with benchmark disabilities.',
    clauses: [
      'Clause 2.1: Medical certificate from competent district medical board required 15 days before examination.',
      'Clause 4.3: Scribe qualification must be one grade lower than candidate’s qualifying academic level.'
    ]
  },
  {
    id: 'reg-4',
    title: 'ACU Pharmacy Faculty Regulations (PCI 2024 Alignment)',
    code: 'ACU/REG/PHAR/2024-03',
    category: 'Pharmacy',
    academicYear: '2024 – 25',
    programme: 'B.Pharm & Pharm.D',
    effectiveDate: '10 Nov 2024',
    status: 'Active',
    description: 'Guidelines for non-university and university examination conduction, industrial training viva, and dissertation evaluation.',
    clauses: [
      'Clause 6.2: Sessional exams best 2 of 3 aggregate for continuous internal marks.',
      'Clause 9.1: Comprehensive viva voce evaluated by external panel approved by Vice-Chancellor.'
    ]
  }
];

export const EXAM_POLICIES_DATA: ExamPolicyDetail[] = [
  {
    id: 'pol-1',
    title: 'Apex Moderation Board Powers & Grace Mark Distribution Policy',
    category: 'Examination Results',
    version: 'v3.2',
    effectiveDate: '01 Nov 2024',
    status: 'Active',
    description: 'Guidelines governing the award of moderation/grace marks up to a maximum of 5 marks across maximum 2 subjects to enable eligible candidates to pass.',
    keyRules: [
      'Maximum 5 marks total grace allowed per professional exam.',
      'Candidate must pass all other components independently.',
      'Requires explicit approval and countersignature of the Vice-Chancellor.'
    ]
  },
  {
    id: 'pol-2',
    title: 'On-Screen Marking (OSM) Digital Valuation Standard Operating Procedure',
    category: 'Valuation & Assessment',
    version: 'v2.0',
    effectiveDate: '15 Jan 2025',
    status: 'Active',
    description: 'Protocol for high-speed optical scanning of answer scripts, cloud storage encryption, digital stylus annotation, and automated total calculation.',
    keyRules: [
      'Complete un-masking prevention with AES 256-bit encryption.',
      'Evaluator must spend minimum 12 minutes per 40-page answer booklet.',
      'Random 5% quality audit performed by Chief Custodian.'
    ]
  },
  {
    id: 'pol-3',
    title: 'Malpractice Prevention & Flying Squad Protocol',
    category: 'Disciplinary Governance',
    version: 'v4.1',
    effectiveDate: '01 Oct 2024',
    status: 'Active',
    description: 'Rules for flying squad surprise inspections, confiscation of contraband, videography evidence logging, and swift enquiry committee hearings.',
    keyRules: [
      'Flying squad must visit each designated centre at least twice per 3-hour session.',
      'Any mobile or unauthorized electronic hardware logged into evidence bag immediately.'
    ]
  }
];

export const ACADEMIC_CALENDAR_DATA: UniversityCalendarEvent[] = [
  {
    id: 'cal-1',
    eventName: 'MBBS Phase I University Theory Board Examinations',
    category: 'Examination',
    startDate: '10 Mar 2025',
    endDate: '22 Mar 2025',
    programme: 'MBBS Phase I',
    status: 'Ongoing',
    targetCohort: 'Batch 2023-24'
  },
  {
    id: 'cal-2',
    eventName: 'Central Valuation Camp (AIMS, B.G. Nagara)',
    category: 'Examination',
    startDate: '18 Mar 2025',
    endDate: '31 Mar 2025',
    programme: 'All Medical Programmes',
    status: 'Upcoming',
    targetCohort: 'Faculty Evaluators'
  },
  {
    id: 'cal-3',
    eventName: 'Continuous Internal Assessment (CIA-3) Marks Freezing',
    category: 'Internal Assessment',
    startDate: '25 Feb 2025',
    endDate: '28 Feb 2025',
    programme: 'All Faculties',
    status: 'Completed',
    targetCohort: 'Constituent Colleges'
  },
  {
    id: 'cal-4',
    eventName: 'MBBS Phase I Clinical Practical & Viva Voce Board Exams',
    category: 'Examination',
    startDate: '24 Mar 2025',
    endDate: '05 Apr 2025',
    programme: 'MBBS Phase I',
    status: 'Upcoming',
    targetCohort: 'AIMS & BGS MCH Candidates'
  },
  {
    id: 'cal-5',
    eventName: 'Apex University Results Declaration & Web Publishing',
    category: 'Result Declaration',
    startDate: '12 Apr 2025',
    endDate: '15 Apr 2025',
    programme: 'Medicine & Allied Sciences',
    status: 'Upcoming',
    targetCohort: 'All Registered Candidates'
  },
  {
    id: 'cal-6',
    eventName: 'Statutory Academic Council & Executive Syndicate Meeting',
    category: 'Administrative',
    startDate: '20 Apr 2025',
    endDate: '20 Apr 2025',
    programme: 'Apex Governance',
    status: 'Upcoming',
    targetCohort: 'University Leadership'
  }
];

export const EXAM_REFORMS_DATA: ExamReformDetail[] = [
  {
    id: 'ref-1',
    title: 'On-Screen Marking (OSM) Digital Valuation Architecture',
    initiative: 'Zero-Transit Digital Script Evaluation',
    phase: 'Phase II Rollout',
    targetYear: '2024 – 2025',
    status: 'Implemented',
    impact: 'Eliminates answer booklet logistics cost, prevents physical loss, and cuts valuation cycle time by 45%.',
    leadDepartment: 'Office of the Controller of Examination'
  },
  {
    id: 'ref-2',
    title: 'Biometric Candidate Verification & Smart Entry Gateways',
    initiative: 'Impersonation Eradication at Medical Centres',
    phase: 'Pilot Testing at AIMS',
    targetYear: '2025',
    status: 'In Progress',
    impact: '100% eradication of impersonation risk with live verification against university admission database.',
    leadDepartment: 'IT Security & Examination Vigilance'
  },
  {
    id: 'ref-3',
    title: 'DigiLocker & National Academic Depository (NAD) Real-time Sync',
    initiative: 'Instant Digital Degree & Transcripts Verification',
    phase: 'Phase III Integration',
    targetYear: '2024',
    status: 'Implemented',
    impact: '100% of awarded degrees and mark sheets cryptographically verifiable globally within 24 hours of declaration.',
    leadDepartment: 'Registrar (Evaluation) & Apex IT Cell'
  },
  {
    id: 'ref-4',
    title: 'Automated Third Evaluator AI Variance Triggers',
    initiative: 'Discrepancy Resolution Automation',
    phase: 'Final Review',
    targetYear: '2025',
    status: 'Proposed',
    impact: 'Automated statistical outlier detection triggering immediate senior peer review without administrative delay.',
    leadDepartment: 'Board of Evaluation'
  }
];

// ============================================================
// 3. Approvals & Decisions Data
// ============================================================

export const EXCEPTIONAL_CASES_DATA: ExceptionalCaseDetail[] = [
  {
    id: 'exc-1',
    studentName: 'Harshitha K. Gowda',
    usn: '1AC23MD014',
    college: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    programme: 'MBBS Phase II',
    semester: 'Phase II',
    requestType: 'Medical Condonation',
    reason: 'Severe dengue hemorrhagic fever with ICU admission at BGS Gleneagles Hospital. Attendance short by 4.2% (70.8% against required 75%). Hospital discharge summaries and Principal endorsement attached.',
    submittedDate: '08 Mar 2025',
    urgency: 'High',
    documentsAttached: ['Hospital_Discharge_Summary.pdf', 'Doctor_Fitness_Certificate.pdf', 'Principal_AIMS_Recommendation.pdf'],
    status: 'Pending VC Decision',
    recommendingAuthority: 'Dr. M. G. Shivaramu, Principal, AIMS'
  },
  {
    id: 'exc-2',
    studentName: 'Mohammed Zeeshan',
    usn: '1AC24NS032',
    college: 'Adichunchanagiri College of Nursing (ACN)',
    programme: 'B.Sc Nursing',
    semester: '1st Year',
    requestType: 'Scribe & Extra Time',
    reason: 'Fracture of right dominant radius bone sustained during clinical duty accident on 02 Mar 2025. Orthopedic cast applied for 6 weeks. Requesting non-medical scribe and 20 min/hour compensatory time.',
    submittedDate: '06 Mar 2025',
    urgency: 'Urgent',
    documentsAttached: ['Orthopedic_Surgeon_Cast_Report.pdf', 'Scribe_Undertaking_Certificate.pdf'],
    status: 'Pending VC Decision',
    recommendingAuthority: 'Prof. Victoria D’Almeida, Principal, ACN'
  },
  {
    id: 'exc-3',
    studentName: 'Rohan Deshmukh',
    usn: '1AC22BT089',
    college: 'BGS Institute of Technology (BGSIT)',
    programme: 'B.Tech (Computer Science & Engineering)',
    semester: '6th Semester',
    requestType: 'Special Exam Session',
    reason: 'Selected to represent India at the ACM-ICPC International Collegiate Programming Contest Finals in Orlando, USA clashing with 2 board theory papers.',
    submittedDate: '04 Mar 2025',
    urgency: 'Pending',
    documentsAttached: ['National_Selection_Letter.pdf', 'Ministry_Travel_Orders.pdf'],
    status: 'Pending VC Decision',
    recommendingAuthority: 'Dr. B. K. Narendra, Principal, BGSIT'
  }
];

export const SCHEDULE_MODIFICATIONS_DATA: ScheduleModificationDetail[] = [
  {
    id: 'sch-1',
    college: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    programme: 'MBBS Phase II',
    semester: 'Phase II',
    courseName: 'General Surgery Clinical Viva & Practical',
    courseCode: 'MED-SURG-201',
    existingDate: '16 Mar 2025',
    existingSession: 'Morning (09:00 AM - 01:00 PM)',
    proposedDate: '19 Mar 2025',
    proposedSession: 'Morning (09:00 AM - 01:00 PM)',
    reason: 'Clash with the 52nd State Annual Surgeons Conference where appointed external examiners from Karnataka Medical Council are key keynote speakers.',
    affectedStudents: 75,
    status: 'Pending Approval',
    requestedBy: 'Dr. M. G. Shivaramu, Principal, AIMS',
    coERecommendation: 'Recommended for approval. Clinical venue and invigilator backup confirmed for 19 Mar 2025.'
  },
  {
    id: 'sch-2',
    college: 'BGS Medical College & Hospital',
    programme: 'MBBS Phase I',
    semester: 'Phase I',
    courseName: 'Biochemistry Paper II (Theory)',
    courseCode: 'MED-BIO-102',
    existingDate: '14 Mar 2025',
    existingSession: 'Afternoon (02:00 PM - 05:00 PM)',
    proposedDate: '17 Mar 2025',
    proposedSession: 'Morning (09:30 AM - 12:30 PM)',
    reason: 'Mandatory district election polling booth center requisition of college auditorium wing by Mandya District Administration.',
    affectedStudents: 150,
    status: 'Pending Approval',
    requestedBy: 'Dr. S. K. Venkatesh, Principal, BGS MCH',
    coERecommendation: 'Strongly recommended due to statutory election compliance requirements.'
  }
];

export const MALPRACTICE_CASES_DATA: MalpracticeCaseDetail[] = [
  {
    id: 'mal-1',
    caseNo: 'ACU/VC/2025/MAL-014',
    studentName: 'Karthik S. Gowda',
    usn: '1AC23MD088',
    college: 'BGS Medical College & Hospital',
    examName: 'Human Anatomy Paper II (Theory)',
    examDate: '07 Mar 2025',
    violationType: 'Unauthorized Notes / Chits',
    description: 'Found with 3 micro-photocopied pages of abdominal viscera vascular diagrams concealed inside geometry box during exam session at Hall 4. Confiscated by Chief Superintendent Dr. Ramesh Babu.',
    committeeRecommendation: 'Cancellation of performance in Anatomy Paper II and debarment from sitting for remainder of March 2025 theory papers. Eligible to re-appear in Supplementary Board.',
    status: 'Under Review',
    evidencePhotos: ['Confiscated_Notes_Front.jpg', 'Hall_4_CCTV_Frame_1034.jpg', 'Candidate_Admission_Statement.pdf']
  },
  {
    id: 'mal-2',
    caseNo: 'ACU/VC/2025/MAL-019',
    studentName: 'Deepak V. Shenoy',
    usn: '1AC22BT045',
    college: 'BGS Institute of Technology (BGSIT)',
    examName: 'Computer Networks (Theory)',
    examDate: '05 Mar 2025',
    violationType: 'Smart Watch / Electronic Device',
    description: 'Flying squad detected active Bluetooth smartwatch with stored course slides during paper. Hardware verified by IT forensic cell.',
    committeeRecommendation: 'Cancellation of all subjects of the current semester and strict disciplinary probation.',
    status: 'Under Review',
    evidencePhotos: ['Hardware_Forensic_Log.pdf', 'Confiscated_Watch_Photo.jpg']
  }
];

export const RESULT_AUTHORISATION_DATA: ResultAuthorisationDetail[] = [
  {
    id: 'res-auth-1',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    semester: 'Phase I (Annual Board)',
    college: 'Consolidated (AIMS & BGS MCH)',
    examSession: 'February – March 2025',
    totalStudents: 300,
    passedCount: 282,
    passPercentage: 94.0,
    distinctionCount: 68,
    moderationApplied: true,
    moderationMarksAvg: 2.1,
    discrepanciesResolved: true,
    authorisationStatus: 'Pending VC Signature'
  },
  {
    id: 'res-auth-2',
    programme: 'MD (General Medicine & Radio-Diagnosis)',
    semester: 'Final Postgraduate Board',
    college: 'AIMS, B.G. Nagara',
    examSession: 'January 2025',
    totalStudents: 32,
    passedCount: 32,
    passPercentage: 100.0,
    distinctionCount: 14,
    moderationApplied: false,
    moderationMarksAvg: 0,
    discrepanciesResolved: true,
    authorisationStatus: 'Pending VC Signature'
  },
  {
    id: 'res-auth-3',
    programme: 'B.Sc Allied Health Sciences',
    semester: '3rd Semester',
    college: 'BGSVIAHS',
    examSession: 'February 2025',
    totalStudents: 145,
    passedCount: 129,
    passPercentage: 88.9,
    distinctionCount: 22,
    moderationApplied: true,
    moderationMarksAvg: 1.8,
    discrepanciesResolved: true,
    authorisationStatus: 'Pending VC Signature'
  },
  {
    id: 'res-auth-4',
    programme: 'B.Pharm (Bachelor of Pharmacy)',
    semester: '6th Semester',
    college: 'Sri Adichunchanagiri College of Pharmacy',
    examSession: 'January 2025',
    totalStudents: 110,
    passedCount: 102,
    passPercentage: 92.7,
    distinctionCount: 31,
    moderationApplied: true,
    moderationMarksAvg: 1.5,
    discrepanciesResolved: true,
    authorisationStatus: 'Authorised',
    signedDate: '01 Mar 2025'
  }
];

// ============================================================
// 4. Evaluation & Results Data
// ============================================================

export const VALUATION_CAMPS_DATA: ValuationCampDetail[] = [
  {
    id: 'camp-1',
    campName: 'Central Valuation Camp A (Medicine & Surgery)',
    location: 'AIMS Campus, B.G. Nagara',
    chiefValuer: 'Dr. B. Manjunath, MD',
    totalBundles: 420,
    scriptsReceived: 8400,
    evaluatedFirst: 8400,
    evaluatedSecond: 8250,
    thirdValuationTriggered: 148,
    evaluatorsTurnout: 98.2,
    completionRate: 98.2,
    estimatedCompletionDate: '12 Mar 2025'
  },
  {
    id: 'camp-2',
    campName: 'Central Valuation Camp B (Pre & Para-Clinical)',
    location: 'BGS Medical College, Bengaluru',
    chiefValuer: 'Dr. K. S. Anand, MD',
    totalBundles: 350,
    scriptsReceived: 7000,
    evaluatedFirst: 7000,
    evaluatedSecond: 6860,
    thirdValuationTriggered: 112,
    evaluatorsTurnout: 96.5,
    completionRate: 98.0,
    estimatedCompletionDate: '14 Mar 2025'
  },
  {
    id: 'camp-3',
    campName: 'Central Valuation Camp C (Pharmacy & Nursing)',
    location: 'SACCP Campus, B.G. Nagara',
    chiefValuer: 'Dr. Prakash Goudanavar, M.Pharm',
    totalBundles: 210,
    scriptsReceived: 4200,
    evaluatedFirst: 4100,
    evaluatedSecond: 3950,
    thirdValuationTriggered: 64,
    evaluatorsTurnout: 95.0,
    completionRate: 94.0,
    estimatedCompletionDate: '16 Mar 2025'
  }
];

export const RESULT_PROCESSING_BATCHES: ResultProcessingStageBatch[] = [
  {
    id: 'bat-1',
    batchName: 'MBBS Phase I Board 2024-25',
    programme: 'MBBS',
    semester: 'Phase I',
    currentStage: 5,
    stageName: 'Stage 5: Vice-Chancellor Assent',
    status: 'Pending VC Assent',
    pendingTasks: 'Awaiting Vice-Chancellor final executive signature and digital seal.',
    responsibleOfficer: 'Prof. (Dr.) M. A. Shekar, VC'
  },
  {
    id: 'bat-2',
    batchName: 'MD/MS Postgraduate Board 2025',
    programme: 'MD / MS',
    semester: 'Final Year',
    currentStage: 5,
    stageName: 'Stage 5: Vice-Chancellor Assent',
    status: 'Pending VC Assent',
    pendingTasks: 'Tabulation register audited; ready for final sign-off.',
    responsibleOfficer: 'Prof. (Dr.) M. A. Shekar, VC'
  },
  {
    id: 'bat-3',
    batchName: 'B.Sc Nursing 4th Year',
    programme: 'B.Sc Nursing',
    semester: '4th Year',
    currentStage: 4,
    stageName: 'Stage 4: Moderation Board Review',
    status: 'Awaiting Moderation',
    pendingTasks: 'Academic Moderation Committee convening on 11 Mar 2025.',
    responsibleOfficer: 'Controller of Examination'
  },
  {
    id: 'bat-4',
    batchName: 'B.Tech Odd Semester Regular',
    programme: 'B.Tech',
    semester: '5th & 7th Sem',
    currentStage: 6,
    stageName: 'Stage 6: Result Web Publication',
    status: 'Published',
    pendingTasks: 'Results live on web portal. Marks cards generated.',
    responsibleOfficer: 'Registrar (Evaluation)'
  }
];

export const RANK_HOLDERS_DATA: UniversityRankHolder[] = [
  {
    rank: 1,
    studentName: 'Ananya R. Bhat',
    usn: '1AC23MD008',
    college: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    programme: 'MBBS Phase I',
    percentage: 88.6,
    medal: 'Gold Medal'
  },
  {
    rank: 2,
    studentName: 'Praveen Gowda H. M.',
    usn: '1AC23MD102',
    college: 'BGS Medical College & Hospital',
    programme: 'MBBS Phase I',
    percentage: 87.2,
    medal: 'Silver Medal'
  },
  {
    rank: 3,
    studentName: 'Sneha Mohan',
    usn: '1AC23MD145',
    college: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    programme: 'MBBS Phase I',
    percentage: 86.4,
    medal: 'Bronze Medal'
  },
  {
    rank: 4,
    studentName: 'Kavya S. Murthy',
    usn: '1AC23MD054',
    college: 'BGS Medical College & Hospital',
    programme: 'MBBS Phase I',
    percentage: 85.8,
    medal: 'Certificate of Merit'
  },
  {
    rank: 5,
    studentName: 'Nitin Bharadwaj',
    usn: '1AC23MD076',
    college: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
    programme: 'MBBS Phase I',
    percentage: 85.1,
    medal: 'Certificate of Merit'
  }
];

// ============================================================
// 5. Reports & Accreditation Data
// ============================================================

export const ACCREDITATION_METRICS_DATA: AccreditationMetricDetail[] = [
  {
    id: 'naac-1',
    criterion: 'NAAC Criterion 2.5: Evaluation Process & Reforms',
    metricNo: '2.5.1',
    title: 'Average number of days from exam completion to result declaration',
    benchmark: '<= 18 Days',
    currentScore: '14.2 Days (Achieved)',
    complianceRate: 100,
    documentsCount: 18,
    auditStatus: 'Compliant'
  },
  {
    id: 'naac-2',
    criterion: 'NAAC Criterion 2.5: Evaluation Process & Reforms',
    metricNo: '2.5.2',
    title: 'Percentage of student grievances regarding examination results',
    benchmark: '<= 2.0%',
    currentScore: '0.84% (High Integrity)',
    complianceRate: 98.4,
    documentsCount: 12,
    auditStatus: 'Verified'
  },
  {
    id: 'naac-3',
    criterion: 'NAAC Criterion 2.5: Evaluation Process & Reforms',
    metricNo: '2.5.3',
    title: 'IT Integration in Examination Management System (EMS)',
    benchmark: '100% Fully Automated',
    currentScore: '100% (End-to-End Digital)',
    complianceRate: 100,
    documentsCount: 24,
    auditStatus: 'Compliant'
  },
  {
    id: 'nirf-1',
    criterion: 'NIRF Ranking: Graduation Outcome (GO)',
    metricNo: 'GO-1',
    title: 'Metric for University Examinations & Pass Rate (GUE)',
    benchmark: '>= 90%',
    currentScore: '92.4% Overall Pass Rate',
    complianceRate: 97.2,
    documentsCount: 15,
    auditStatus: 'Compliant'
  }
];

