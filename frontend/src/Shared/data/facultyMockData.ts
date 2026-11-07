import {
  FacultyProfile,
  FacultyCourse,
  StudentFacultyView,
  CourseHandoutElement,
  LessonPlanTopic,
  HourlyAttendanceSlot,
  AttendanceRecordRow,
  OnlineMeetingFaculty,
  AssessmentItemFaculty,
  QuestionPoolItem,
  CourseMaterialFaculty,
  InternalMarkRow,
  CourseFileCategory,
  OBEOutcomeItem,
  AssessmentCOPOMappingRow,
  FacultySurveyItem,
  SubstitutionRecord,
} from '../types/faculty';

export interface AcademicCalendarItem {
  id: string;
  title: string;
  category: 'Examination' | 'Clinical Posting' | 'Didactic Lecture' | 'Academic Event' | 'Holiday / Vacation';
  startDate: string;
  endDate: string;
  type: 'present' | 'upcoming';
  description: string;
  status: 'Ongoing' | 'Scheduled' | 'Upcoming';
  venue: string;
}

export const INITIAL_FACULTY_PROFILE: FacultyProfile = {
  empCode: 'MEDFAC2024018',
  fullName: 'Prof. Dr. Mohammed Ismail Razee, MD',
  designation: 'Professor & Course Incharge',
  department: 'Department of Physiology',
  university: 'Adichunchanagiri University',
  campus: 'BGS Medical College & Hospital, B.G. Nagara',
  email: 'ismail.razee@acu.edu.in',
  phone: '+91 98860 45219',
  photoUrl: '/roles/faculty-color-icon.png',
  roleBadge: 'FACULTY',
  joiningDate: '01-08-2020',
  activeBatch: '2024MBBS01',
  activeSemester: 'Phase 1 MBBS',
};

export const FACULTY_COURSES: FacultyCourse[] = [
  {
    code: 'PHY101',
    name: 'HUMAN PHYSIOLOGY I & II',
    shortName: 'Physiology',
    credits: 'L:3 - T:1 - P:2 - C:6',
    incharge: 'MEDFAC2024018 - Prof. Dr. Mohammed Ismail Razee, MD',
    semester: 'Phase 1 MBBS',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    batch: '2024MBBS01',
    totalStudents: 53,
    coursePlanUrl: 'CP-PHY101-Human-Physiology-Theory-OSPE.pdf',
    aboutCourse:
      'Core preclinical subject covering the normal physical and biochemical functions of the human body, organ systems, homeostasis, neuromuscular physiology, cardiovascular dynamics, respiration, renal clearance, endocrine regulation, and neurophysiology. Fully aligned with National Medical Commission (NMC) Competency-Based Medical Education (CBME) guidelines.',
    whatYoullLearn:
      'Demonstrate deep comprehension of organ system physiology, perform and interpret diagnostic clinical procedures (ECG, Spirometry, Blood Pressure, Hematology, Reflex Examination, ABG Analysis), correlate physiological mechanisms with clinical disease pathology, and perform Objective Structured Practical Examinations (OSPE).',
  },
  {
    code: 'ANA101',
    name: 'HUMAN ANATOMY, EMBRYOLOGY & HISTOLOGY',
    shortName: 'Anatomy',
    credits: 'L:3 - T:1 - P:2 - C:6',
    incharge: 'MEDFAC2024003 - Dr. B. Ramesh, MS',
    semester: 'Phase 1 MBBS',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    batch: '2024MBBS01',
    totalStudents: 53,
    coursePlanUrl: 'CP-ANA101-Human-Anatomy.pdf',
    aboutCourse:
      'Gross anatomical structures of Thorax, Abdomen, Pelvis, Head & Neck, Brain and Upper/Lower Limbs with microscopic histology and embryological organogenesis.',
    whatYoullLearn:
      'Identify cadaveric anatomical structures, anatomical landmarks, histological cross sections and cross-sectional radiological imaging (CT/MRI correlations).',
  },
  {
    code: 'BIO101',
    name: 'MEDICAL BIOCHEMISTRY & CLINICAL GENETICS',
    shortName: 'Biochemistry',
    credits: 'L:2 - T:1 - P:1 - C:4',
    incharge: 'MEDFAC2024009 - Dr. K. Suma, MD',
    semester: 'Phase 1 MBBS',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    batch: '2024MBBS01',
    totalStudents: 53,
    coursePlanUrl: 'CP-BIO101-Medical-Biochemistry.pdf',
    aboutCourse:
      'Biomolecules, intermediary metabolism, clinical enzymology, acid-base homeostasis, molecular biology, and interpretation of clinical laboratory diagnostics.',
    whatYoullLearn:
      'Perform biochemical investigations, urine analysis, serum electrolytes, liver and renal function tests, and interpret metabolic disease profiles.',
  },
  {
    code: 'ECE101',
    name: 'EARLY CLINICAL EXPOSURE (ECE) & AETCOM',
    shortName: 'ECE & Ethics',
    credits: 'L:1 - T:0 - P:1 - C:2',
    incharge: 'MEDFAC2024001 - Dr. H. B. Shivaramaiah, MD',
    semester: 'Phase 1 MBBS',
    programme: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    batch: '2024MBBS01',
    totalStudents: 53,
    coursePlanUrl: 'CP-ECE101-Early-Clinical-Exposure.pdf',
    aboutCourse:
      'Early patient contact, hospital ward integration, bedside clinical correlation of preclinical topics, communication skills and medical ethics (AETCOM Module).',
    whatYoullLearn:
      'Develop empathetic patient interaction, doctor-patient communication, clinical observation in hospital wards, and professional medical ethics.',
  },
];

// Academic Calendar Data (Present and Upcoming)
export const FACULTY_ACADEMIC_CALENDAR: AcademicCalendarItem[] = [
  // Present (Active Term)
  {
    id: 'CAL-01',
    title: 'Phase 1 MBBS Term 1 Didactic Lectures & Hematology Practical Sessions',
    category: 'Didactic Lecture',
    startDate: '01 Nov 2024',
    endDate: '15 Feb 2025',
    type: 'present',
    description: 'General physiology, nerve-muscle physiology, blood groups, bleeding/clotting time, and cardiovascular dynamics lectures and practical demonstrations.',
    status: 'Ongoing',
    venue: 'Physiology Lecture Hall 1 & Central Hematology Lab',
  },
  {
    id: 'CAL-02',
    title: 'Hospital Ward Rounds & Early Clinical Exposure (ECE-1)',
    category: 'Clinical Posting',
    startDate: '15 Nov 2024',
    endDate: '28 Feb 2025',
    type: 'present',
    description: 'Observation of cardiovascular and respiratory clinical cases at BGS Medical College & Hospital Outpatient and Inpatient wards.',
    status: 'Ongoing',
    venue: 'BGS Hospital IPD / Cardiology & Pulmonology Wards',
  },
  {
    id: 'CAL-03',
    title: 'First Internal Assessment (IA-1) - Theory & OSPE Examination',
    category: 'Examination',
    startDate: '10 Dec 2024',
    endDate: '18 Dec 2024',
    type: 'present',
    description: 'Summative internal evaluation on General Physiology, Nerve-Muscle, and Cardiovascular Physiology with OSPE stations.',
    status: 'Ongoing',
    venue: 'Examination Hall 1 & OSPE Clinical Stations',
  },
  {
    id: 'CAL-04',
    title: 'Formative Competency Feedback & Mentorship Clinical Review',
    category: 'Academic Event',
    startDate: '22 Dec 2024',
    endDate: '24 Dec 2024',
    type: 'present',
    description: 'Review of student IA-1 performance, logbook signature, and personalized academic counseling for Phase 1 MBBS students.',
    status: 'Ongoing',
    venue: 'Faculty Chambers, Dept. of Physiology',
  },

  // Upcoming
  {
    id: 'CAL-05',
    title: 'Winter Clinical Recess / Break',
    category: 'Holiday / Vacation',
    startDate: '25 Dec 2024',
    endDate: '01 Jan 2025',
    type: 'upcoming',
    description: 'Institutional winter vacation for Phase 1 MBBS students and faculty.',
    status: 'Upcoming',
    venue: 'Campus Wide',
  },
  {
    id: 'CAL-06',
    title: 'Phase 1 MBBS Term 2 Resumption (Renal, Endocrine & Neurophysiology)',
    category: 'Didactic Lecture',
    startDate: '02 Jan 2025',
    endDate: '30 Apr 2025',
    type: 'upcoming',
    description: 'Resumption of lectures on Renal, Endocrine, Gastrointestinal, Central Nervous System, and Special Senses.',
    status: 'Upcoming',
    venue: 'Physiology Lecture Hall 1 & Neurophysiology Lab',
  },
  {
    id: 'CAL-07',
    title: 'Second Internal Assessment (IA-2) - Theory & Clinical Viva',
    category: 'Examination',
    startDate: '15 Mar 2025',
    endDate: '24 Mar 2025',
    type: 'upcoming',
    description: 'Evaluation covering Respiratory, Renal, Endocrine & Gastrointestinal Physiology with clinical case viva.',
    status: 'Upcoming',
    venue: 'Central Examination Block & Physiology Labs',
  },
  {
    id: 'CAL-08',
    title: 'ACU National Undergraduate Medical Research Symposium (MEDICON 2025)',
    category: 'Academic Event',
    startDate: '18 Apr 2025',
    endDate: '20 Apr 2025',
    type: 'upcoming',
    description: 'Inter-college undergraduate research presentation, clinical case posters, and physiological innovations display.',
    status: 'Upcoming',
    venue: 'ACU University Auditorium & Medical Research Block',
  },
  {
    id: 'CAL-09',
    title: 'Model Pre-University Examination (Prelims - Theory & Practical Viva)',
    category: 'Examination',
    startDate: '10 Jul 2025',
    endDate: '25 Jul 2025',
    type: 'upcoming',
    description: 'Full syllabus university pattern preparatory trial examination for First Professional MBBS students.',
    status: 'Upcoming',
    venue: 'University Examination Center',
  },
  {
    id: 'CAL-10',
    title: 'Preparatory Study Leave for First Professional University Exams',
    category: 'Holiday / Vacation',
    startDate: '26 Jul 2025',
    endDate: '15 Aug 2025',
    type: 'upcoming',
    description: 'Study leave before Adichunchanagiri University Annual Summative MBBS Board Examinations.',
    status: 'Upcoming',
    venue: 'Self Study / Library',
  },
  {
    id: 'CAL-11',
    title: 'ACU First Professional MBBS Annual University Summative Examinations',
    category: 'Examination',
    startDate: '18 Aug 2025',
    endDate: '05 Sep 2025',
    type: 'upcoming',
    description: 'Official Adichunchanagiri University examinations for Physiology Paper I, Paper II, Anatomy, and Biochemistry.',
    status: 'Upcoming',
    venue: 'ACU Central Valuation & Examination Block',
  },
];

// All 53 First MBBS Students
export const FACULTY_STUDENTS_LIST: StudentFacultyView[] = [
  { slNo: 1, rollNo: '20241MBBS0001', regNo: '20241MBBS0001', name: 'NIKHITA M', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'nikhita.m@bgs.edu.in', phone: '+91 94812 00101', attendanceAvg: 94.4, caMarks: { ca1: 42, ca2: 44, ca3: 45, total: 131 } },
  { slNo: 2, rollNo: '20241MBBS0002', regNo: '20241MBBS0002', name: 'KRISHNAN V', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'krishnan.v@bgs.edu.in', phone: '+91 94812 00102', attendanceAvg: 91.2, caMarks: { ca1: 40, ca2: 41, ca3: 43, total: 124 } },
  { slNo: 3, rollNo: '20241MBBS0003', regNo: '20241MBBS0003', name: 'SAIF BASHA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'saif.basha@bgs.edu.in', phone: '+91 94812 00103', attendanceAvg: 96.0, caMarks: { ca1: 46, ca2: 47, ca3: 48, total: 141 } },
  { slNo: 4, rollNo: '20241MBBS0004', regNo: '20241MBBS0004', name: 'HARIBHUSHAN KUMAR', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'haribhushan.k@bgs.edu.in', phone: '+91 98452 11044', attendanceAvg: 93.3, caMarks: { ca1: 44, ca2: 45, ca3: 46, total: 135 } },
  { slNo: 5, rollNo: '20241MBBS0005', regNo: '20241MBBS0005', name: 'MADHUKANTH S T', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'madhukanth.st@bgs.edu.in', phone: '+91 94812 00105', attendanceAvg: 88.5, caMarks: { ca1: 38, ca2: 40, ca3: 41, total: 119 } },
  { slNo: 6, rollNo: '20241MBBS0006', regNo: '20241MBBS0006', name: 'ASRITHA REDDY S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'asritha.reddy@bgs.edu.in', phone: '+91 94812 00106', attendanceAvg: 98.2, caMarks: { ca1: 48, ca2: 49, ca3: 49, total: 146 } },
  { slNo: 7, rollNo: '20241MBBS0007', regNo: '20241MBBS0007', name: 'PIUSH SAHA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'piush.saha@bgs.edu.in', phone: '+91 94812 00107', attendanceAvg: 92.0, caMarks: { ca1: 41, ca2: 43, ca3: 44, total: 128 } },
  { slNo: 8, rollNo: '20241MBBS0008', regNo: '20241MBBS0008', name: 'AVIREDDY MOUNIKA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'avireddy.m@bgs.edu.in', phone: '+91 94812 00108', attendanceAvg: 95.5, caMarks: { ca1: 45, ca2: 46, ca3: 47, total: 138 } },
  { slNo: 9, rollNo: '20241MBBS0009', regNo: '20241MBBS0009', name: 'GOPAL LAXMANASA BADI', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'gopal.badi@bgs.edu.in', phone: '+91 94812 00109', attendanceAvg: 90.0, caMarks: { ca1: 39, ca2: 42, ca3: 43, total: 124 } },
  { slNo: 10, rollNo: '20241MBBS0010', regNo: '20241MBBS0010', name: 'KURNOOL SHAIK NOOR MOHAMMAD', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'kurnool.shaik@bgs.edu.in', phone: '+91 94812 00110', attendanceAvg: 89.2, caMarks: { ca1: 38, ca2: 41, ca3: 42, total: 121 } },
  { slNo: 11, rollNo: '20241MBBS0011', regNo: '20241MBBS0011', name: 'SIMHADRI G S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'simhadri.gs@bgs.edu.in', phone: '+91 94812 00111', attendanceAvg: 94.0, caMarks: { ca1: 43, ca2: 44, ca3: 45, total: 132 } },
  { slNo: 12, rollNo: '20241MBBS0012', regNo: '20241MBBS0012', name: 'SAMEERA ANJUM', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'sameera.anjum@bgs.edu.in', phone: '+91 94812 00112', attendanceAvg: 97.5, caMarks: { ca1: 47, ca2: 48, ca3: 48, total: 143 } },
  { slNo: 13, rollNo: '20241MBBS0013', regNo: '20241MBBS0013', name: 'HARISH PRASAD', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'harish.prasad@bgs.edu.in', phone: '+91 94812 00113', attendanceAvg: 86.4, caMarks: { ca1: 36, ca2: 38, ca3: 39, total: 113 } },
  { slNo: 14, rollNo: '20241MBBS0014', regNo: '20241MBBS0014', name: 'AISWARYA K', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'aiswarya.k@bgs.edu.in', phone: '+91 94812 00114', attendanceAvg: 93.0, caMarks: { ca1: 42, ca2: 44, ca3: 45, total: 131 } },
  { slNo: 15, rollNo: '20241MBBS0015', regNo: '20241MBBS0015', name: 'K VENKATESH', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'k.venkatesh@bgs.edu.in', phone: '+91 94812 00115', attendanceAvg: 91.5, caMarks: { ca1: 40, ca2: 42, ca3: 43, total: 125 } },
  { slNo: 16, rollNo: '20241MBBS0016', regNo: '20241MBBS0016', name: 'MOHAN KRISHNA K', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'mohan.krishna@bgs.edu.in', phone: '+91 94812 00116', attendanceAvg: 95.0, caMarks: { ca1: 44, ca2: 45, ca3: 46, total: 135 } },
  { slNo: 17, rollNo: '20241MBBS0017', regNo: '20241MBBS0017', name: 'AISHWARYA S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'aishwarya.s@bgs.edu.in', phone: '+91 94812 00117', attendanceAvg: 96.5, caMarks: { ca1: 46, ca2: 47, ca3: 48, total: 141 } },
  { slNo: 18, rollNo: '20241MBBS0018', regNo: '20241MBBS0018', name: 'B CHANDRA SHEKAR', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'b.chandra@bgs.edu.in', phone: '+91 94812 00118', attendanceAvg: 87.0, caMarks: { ca1: 37, ca2: 39, ca3: 40, total: 116 } },
  { slNo: 19, rollNo: '20241MBBS0019', regNo: '20241MBBS0019', name: 'K R VINAY', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'kr.vinay@bgs.edu.in', phone: '+91 94812 00119', attendanceAvg: 92.5, caMarks: { ca1: 41, ca2: 43, ca3: 44, total: 128 } },
  { slNo: 20, rollNo: '20241MBBS0020', regNo: '20241MBBS0020', name: 'PRAJWAL GOWDA M', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'prajwal.gowda@bgs.edu.in', phone: '+91 94812 00120', attendanceAvg: 94.0, caMarks: { ca1: 43, ca2: 44, ca3: 45, total: 132 } },
  { slNo: 21, rollNo: '20241MBBS0021', regNo: '20241MBBS0021', name: 'SINCHANA R', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'sinchana.r@bgs.edu.in', phone: '+91 94812 00121', attendanceAvg: 97.0, caMarks: { ca1: 46, ca2: 47, ca3: 48, total: 141 } },
  { slNo: 22, rollNo: '20241MBBS0022', regNo: '20241MBBS0022', name: 'TEJASWINI K N', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'tejaswini.kn@bgs.edu.in', phone: '+91 94812 00122', attendanceAvg: 95.8, caMarks: { ca1: 45, ca2: 46, ca3: 47, total: 138 } },
  { slNo: 23, rollNo: '20241MBBS0023', regNo: '20241MBBS0023', name: 'YASHASWINI S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'yashaswini.s@bgs.edu.in', phone: '+91 94812 00123', attendanceAvg: 96.2, caMarks: { ca1: 45, ca2: 46, ca3: 48, total: 139 } },
  { slNo: 24, rollNo: '20241MBBS0024', regNo: '20241MBBS0024', name: 'SYED ARFATH', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'syed.arfath@bgs.edu.in', phone: '+91 94812 00124', attendanceAvg: 90.5, caMarks: { ca1: 40, ca2: 42, ca3: 43, total: 125 } },
  { slNo: 25, rollNo: '20241MBBS0025', regNo: '20241MBBS0025', name: 'RAKSHITHA M', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'rakshitha.m@bgs.edu.in', phone: '+91 94812 00125', attendanceAvg: 94.8, caMarks: { ca1: 43, ca2: 45, ca3: 46, total: 134 } },
  { slNo: 26, rollNo: '20241MBBS0026', regNo: '20241MBBS0026', name: 'DARSHAN GOWDA H', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'darshan.h@bgs.edu.in', phone: '+91 94812 00126', attendanceAvg: 88.0, caMarks: { ca1: 37, ca2: 39, ca3: 41, total: 117 } },
  { slNo: 27, rollNo: '20241MBBS0027', regNo: '20241MBBS0027', name: 'CHETANA B S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'chetana.bs@bgs.edu.in', phone: '+91 94812 00127', attendanceAvg: 96.0, caMarks: { ca1: 45, ca2: 46, ca3: 47, total: 138 } },
  { slNo: 28, rollNo: '20241MBBS0028', regNo: '20241MBBS0028', name: 'KAVYA SHREE N', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'kavya.sn@bgs.edu.in', phone: '+91 94812 00128', attendanceAvg: 95.0, caMarks: { ca1: 44, ca2: 45, ca3: 46, total: 135 } },
  { slNo: 29, rollNo: '20241MBBS0029', regNo: '20241MBBS0029', name: 'MANOJ KUMAR V', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'manoj.kv@bgs.edu.in', phone: '+91 94812 00129', attendanceAvg: 91.0, caMarks: { ca1: 40, ca2: 42, ca3: 43, total: 125 } },
  { slNo: 30, rollNo: '20241MBBS0030', regNo: '20241MBBS0030', name: 'NISHA ANAND', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'nisha.anand@bgs.edu.in', phone: '+91 94812 00130', attendanceAvg: 97.2, caMarks: { ca1: 47, ca2: 48, ca3: 49, total: 144 } },
  { slNo: 31, rollNo: '20241MBBS0031', regNo: '20241MBBS0031', name: 'POOJA SHREE K', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'pooja.sk@bgs.edu.in', phone: '+91 94812 00131', attendanceAvg: 93.5, caMarks: { ca1: 42, ca2: 44, ca3: 45, total: 131 } },
  { slNo: 32, rollNo: '20241MBBS0032', regNo: '20241MBBS0032', name: 'RAHUL SHARMA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'rahul.sharma@bgs.edu.in', phone: '+91 94812 00132', attendanceAvg: 90.0, caMarks: { ca1: 39, ca2: 41, ca3: 42, total: 122 } },
  { slNo: 33, rollNo: '20241MBBS0033', regNo: '20241MBBS0033', name: 'SANGEETHA M', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'sangeetha.m@bgs.edu.in', phone: '+91 94812 00133', attendanceAvg: 95.0, caMarks: { ca1: 44, ca2: 46, ca3: 47, total: 137 } },
  { slNo: 34, rollNo: '20241MBBS0034', regNo: '20241MBBS0034', name: 'SHASHI KIRAN B', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'shashi.kb@bgs.edu.in', phone: '+91 94812 00134', attendanceAvg: 89.0, caMarks: { ca1: 38, ca2: 40, ca3: 42, total: 120 } },
  { slNo: 35, rollNo: '20241MBBS0035', regNo: '20241MBBS0035', name: 'SUMAN RAO', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'suman.rao@bgs.edu.in', phone: '+91 94812 00135', attendanceAvg: 94.0, caMarks: { ca1: 43, ca2: 44, ca3: 46, total: 133 } },
  { slNo: 36, rollNo: '20241MBBS0036', regNo: '20241MBBS0036', name: 'SWATHI REDDY', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'swathi.reddy@bgs.edu.in', phone: '+91 94812 00136', attendanceAvg: 96.5, caMarks: { ca1: 46, ca2: 47, ca3: 48, total: 141 } },
  { slNo: 37, rollNo: '20241MBBS0037', regNo: '20241MBBS0037', name: 'VARUN GOWDA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'varun.gowda@bgs.edu.in', phone: '+91 94812 00137', attendanceAvg: 91.5, caMarks: { ca1: 41, ca2: 42, ca3: 44, total: 127 } },
  { slNo: 38, rollNo: '20241MBBS0038', regNo: '20241MBBS0038', name: 'VINUTHA P', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'vinutha.p@bgs.edu.in', phone: '+91 94812 00138', attendanceAvg: 95.2, caMarks: { ca1: 45, ca2: 46, ca3: 47, total: 138 } },
  { slNo: 39, rollNo: '20241MBBS0039', regNo: '20241MBBS0039', name: 'YOGESH KUMAR', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'yogesh.k@bgs.edu.in', phone: '+91 94812 00139', attendanceAvg: 88.5, caMarks: { ca1: 37, ca2: 39, ca3: 41, total: 117 } },
  { slNo: 40, rollNo: '20241MBBS0040', regNo: '20241MBBS0040', name: 'ANUSHA SHETTY', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'anusha.shetty@bgs.edu.in', phone: '+91 94812 00140', attendanceAvg: 97.0, caMarks: { ca1: 47, ca2: 48, ca3: 49, total: 144 } },
  { slNo: 41, rollNo: '20241MBBS0041', regNo: '20241MBBS0041', name: 'BHARATH RAJ', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'bharath.raj@bgs.edu.in', phone: '+91 94812 00141', attendanceAvg: 92.0, caMarks: { ca1: 41, ca2: 43, ca3: 44, total: 128 } },
  { slNo: 42, rollNo: '20241MBBS0042', regNo: '20241MBBS0042', name: 'CHANDANA M', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'chandana.m@bgs.edu.in', phone: '+91 94812 00142', attendanceAvg: 94.5, caMarks: { ca1: 43, ca2: 45, ca3: 46, total: 134 } },
  { slNo: 43, rollNo: '20241MBBS0043', regNo: '20241MBBS0043', name: 'DEEPAK GOWDA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'deepak.gowda@bgs.edu.in', phone: '+91 94812 00143', attendanceAvg: 89.5, caMarks: { ca1: 39, ca2: 41, ca3: 42, total: 122 } },
  { slNo: 44, rollNo: '20241MBBS0044', regNo: '20241MBBS0044', name: 'DIVYA BHARATHI', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'divya.b@bgs.edu.in', phone: '+91 94812 00144', attendanceAvg: 96.0, caMarks: { ca1: 45, ca2: 47, ca3: 48, total: 140 } },
  { slNo: 45, rollNo: '20241MBBS0045', regNo: '20241MBBS0045', name: 'GAGAN RAJ N', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'gagan.rn@bgs.edu.in', phone: '+91 94812 00145', attendanceAvg: 90.0, caMarks: { ca1: 39, ca2: 41, ca3: 43, total: 123 } },
  { slNo: 46, rollNo: '20241MBBS0046', regNo: '20241MBBS0046', name: 'HARSHITHA K', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'harshitha.k@bgs.edu.in', phone: '+91 94812 00146', attendanceAvg: 95.0, caMarks: { ca1: 44, ca2: 45, ca3: 47, total: 136 } },
  { slNo: 47, rollNo: '20241MBBS0047', regNo: '20241MBBS0047', name: 'KIRAN MAI S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'kiran.mai@bgs.edu.in', phone: '+91 94812 00147', attendanceAvg: 93.8, caMarks: { ca1: 42, ca2: 44, ca3: 45, total: 131 } },
  { slNo: 48, rollNo: '20241MBBS0048', regNo: '20241MBBS0048', name: 'LOKESH V', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'lokesh.v@bgs.edu.in', phone: '+91 94812 00148', attendanceAvg: 87.5, caMarks: { ca1: 36, ca2: 38, ca3: 40, total: 114 } },
  { slNo: 49, rollNo: '20241MBBS0049', regNo: '20241MBBS0049', name: 'MEGHANA REDDY', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'meghana.r@bgs.edu.in', phone: '+91 94812 00149', attendanceAvg: 97.5, caMarks: { ca1: 48, ca2: 48, ca3: 49, total: 145 } },
  { slNo: 50, rollNo: '20241MBBS0050', regNo: '20241MBBS0050', name: 'NITHIN KUMAR S', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'nithin.ks@bgs.edu.in', phone: '+91 94812 00150', attendanceAvg: 91.0, caMarks: { ca1: 40, ca2: 42, ca3: 44, total: 126 } },
  { slNo: 51, rollNo: '20241MBBS0051', regNo: '20241MBBS0051', name: 'PRUTHVI RAJ', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'pruthvi.raj@bgs.edu.in', phone: '+91 94812 00151', attendanceAvg: 92.5, caMarks: { ca1: 41, ca2: 43, ca3: 45, total: 129 } },
  { slNo: 52, rollNo: '20241MBBS0052', regNo: '20241MBBS0052', name: 'ROHIT VERMA', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'rohit.verma@bgs.edu.in', phone: '+91 94812 00152', attendanceAvg: 90.5, caMarks: { ca1: 39, ca2: 41, ca3: 43, total: 123 } },
  { slNo: 53, rollNo: '20241MBBS0053', regNo: '20241MBBS0053', name: 'SHRUTHI K', batch: '2024MBBS01 - First MBBS', status: 'ACTIVE', email: 'shruthi.k@bgs.edu.in', phone: '+91 94812 00153', attendanceAvg: 98.0, caMarks: { ca1: 47, ca2: 49, ca3: 49, total: 145 } },
];

export const COURSE_HANDOUT_ELEMENTS: CourseHandoutElement[] = [
  { id: '1', title: 'GENERAL & CELLULAR PHYSIOLOGY', status: 'Completed', description: 'Cell membrane transport, resting membrane potential, Nernst and Goldman-Hodgkin-Katz equations, and intercellular communication.', lastUpdated: '01-11-2024' },
  { id: '2', title: 'HEMATOLOGY & IMMUNE PHYSIOLOGY', status: 'Completed', description: 'Erythropoiesis, hemoglobin synthesis, blood grouping (ABO & Rh), hemostasis, coagulation cascades, and innate/adaptive cellular immunity.', lastUpdated: '05-11-2024' },
  { id: '3', title: 'NERVE-MUSCLE PHYSIOLOGY & MOTOR UNITS', status: 'Completed', description: 'Action potential kinetics, neuromuscular junction transmission, excitation-contraction coupling, sliding filament theory, and myasthenia gravis.', lastUpdated: '10-11-2024' },
  { id: '4', title: 'CARDIOVASCULAR PHYSIOLOGY (CVS)', status: 'Completed', description: 'Cardiac electrical conduction, 12-lead ECG analysis, cardiac cycle phases, Frank-Starling law, cardiac output measurement, and arterial blood pressure regulation.', lastUpdated: '18-11-2024' },
  { id: '5', title: 'RESPIRATORY PHYSIOLOGY', status: 'Completed', description: 'Mechanics of ventilation, compliance, surfactant dynamics, alveolar-arterial gas exchange, oxygen-hemoglobin dissociation curve, and respiratory regulation.', lastUpdated: '22-11-2024' },
  { id: '6', title: 'RENAL PHYSIOLOGY & FLUID-ELECTROLYTE BALANCE', status: 'Completed', description: 'Glomerular filtration rate (GFR), renal clearance, tubular transport, countercurrent multiplier mechanism, micturition reflex, and acid-base buffers.', lastUpdated: '25-11-2024' },
  { id: '7', title: 'ENDOCRINE PHYSIOLOGY & REPRODUCTION', status: 'Completed', description: 'Hypothalamic-pituitary axis, thyroid hormones, parathyroid and calcium homeostasis, adrenal cortex/medulla, pancreatic islets, and reproductive cycles.', lastUpdated: '28-11-2024' },
  { id: '8', title: 'CENTRAL NERVOUS SYSTEM & SPECIAL SENSES', status: 'Completed', description: 'Ascending sensory pathways, descending motor tracts, cerebellum, basal ganglia, autonomic nervous system, visual pathways, and auditory transduction.', lastUpdated: '30-11-2024' },
];

export const LESSON_PLAN_TOPICS: LessonPlanTopic[] = [
  { id: 'T1', slNo: 1, topic: 'Cell Membrane Transport & Resting Membrane Potential', plannedDate: '04-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'ICT / PPT', mappedCO: 'CO1', status: 'Completed' },
  { id: 'T2', slNo: 2, topic: 'Neuromuscular Junction Transmission & Electromyography', plannedDate: '06-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Lab Demonstration', mappedCO: 'CO1', status: 'Completed' },
  { id: 'T3', slNo: 3, topic: 'Erythropoiesis & Peripheral Blood Smear Examination', plannedDate: '10-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Lab Demonstration', mappedCO: 'CO2', status: 'Completed' },
  { id: 'T4', slNo: 4, topic: 'Cardiac Cycle, Pressure-Volume Loop & Heart Sounds', plannedDate: '14-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Chalk & Talk', mappedCO: 'CO3', status: 'Completed' },
  { id: 'T5', slNo: 5, topic: '12-Lead Electrocardiogram (ECG) Recording & Interpretation', plannedDate: '18-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Lab Demonstration', mappedCO: 'CO3', status: 'Completed' },
  { id: 'T6', slNo: 6, topic: 'Arterial Blood Pressure Regulation & Baroreceptor Reflex', plannedDate: '22-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Flipped Classroom', mappedCO: 'CO3', status: 'Completed' },
  { id: 'T7', slNo: 7, topic: 'Pulmonary Ventilation Mechanics & Spirometry Practicals', plannedDate: '26-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Lab Demonstration', mappedCO: 'CO4', status: 'Completed' },
  { id: 'T8', slNo: 8, topic: 'Oxygen-Hemoglobin Dissociation Curve & Gas Exchange', plannedDate: '30-11-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'ICT / PPT', mappedCO: 'CO4', status: 'Completed' },
  { id: 'T9', slNo: 9, topic: 'Renal Clearance, GFR & Juxtaglomerular Apparatus', plannedDate: '04-12-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'Chalk & Talk', mappedCO: 'CO5', status: 'Completed' },
  { id: 'T10', slNo: 10, topic: 'Endocrine Feedback Axis & Thyroid Hormones Regulation', plannedDate: '08-12-2024', plannedHours: 2, actualHours: 2, teachingMethod: 'ICT / PPT', mappedCO: 'CO5', status: 'Completed' },
  { id: 'T11', slNo: 11, topic: 'Ascending Sensory Tracts & Pain Pathway (Anterolateral System)', plannedDate: '12-12-2024', plannedHours: 2, actualHours: 1, teachingMethod: 'ICT / PPT', mappedCO: 'CO6', status: 'In Progress' },
  { id: 'T12', slNo: 12, topic: 'Objective Structured Practical Examination (OSPE) Revision Stations', plannedDate: '16-12-2024', plannedHours: 2, actualHours: 0, teachingMethod: 'Lab Demonstration', mappedCO: 'CO6', status: 'Pending' },
];

export const HOURLY_ATTENDANCE_SLOTS: HourlyAttendanceSlot[] = [
  { hour: 1, timeSpan: '08:30 AM - 09:25 AM', status: 'Marked', courseCode: 'PHY101', courseName: 'Physiology Theory (CVS)', batch: '2024MBBS01', presentCount: 49, absentCount: 4, totalCount: 53 },
  { hour: 2, timeSpan: '09:25 AM - 10:20 AM', status: 'Marked', courseCode: 'PHY101', courseName: 'Physiology Lab (ECG / OSPE)', batch: '2024MBBS01', presentCount: 51, absentCount: 2, totalCount: 53 },
  { hour: 3, timeSpan: '10:35 AM - 11:30 AM', status: 'Marked', courseCode: 'ANA101', courseName: 'Anatomy Histology Session', batch: '2024MBBS01', presentCount: 50, absentCount: 3, totalCount: 53 },
  { hour: 4, timeSpan: '11:30 AM - 12:25 PM', status: 'Marked', courseCode: 'ANA101', courseName: 'Cadaveric Dissection (Thorax)', batch: '2024MBBS01', presentCount: 52, absentCount: 1, totalCount: 53 },
  { hour: 5, timeSpan: '01:15 PM - 02:10 PM', status: 'Marked', courseCode: 'BIO101', courseName: 'Biochemistry Clinical Lab', batch: '2024MBBS01', presentCount: 48, absentCount: 5, totalCount: 53 },
  { hour: 6, timeSpan: '02:10 PM - 03:05 PM', status: 'Marked', courseCode: 'BIO101', courseName: 'Biochemistry Seminar', batch: '2024MBBS01', presentCount: 51, absentCount: 2, totalCount: 53 },
  { hour: 7, timeSpan: '03:15 PM - 04:10 PM', status: 'Unmarked', courseCode: 'ECE101', courseName: 'Early Clinical Exposure Bedside', batch: '2024MBBS01', presentCount: 0, absentCount: 0, totalCount: 53 },
  { hour: 8, timeSpan: '04:10 PM - 05:00 PM', status: 'Disabled', courseCode: 'AETCOM', courseName: 'Bioethics & Professionalism', batch: '2024MBBS01', presentCount: 0, absentCount: 0, totalCount: 53 },
];

export const ATTENDANCE_DAY_RECORDS: AttendanceRecordRow[] = FACULTY_STUDENTS_LIST.map((student, idx) => {
  const isAbsentH1 = idx % 9 === 0;
  const isAbsentH5 = idx % 11 === 0;
  const isAbsentH6 = idx % 14 === 0;

  const hours: { [hour: number]: 'P' | 'A' | 'OD' | 'L' } = {
    1: isAbsentH1 ? 'A' : 'P',
    2: 'P',
    3: 'P',
    4: 'P',
    5: isAbsentH5 ? 'A' : 'P',
    6: isAbsentH6 ? 'A' : 'P',
    7: 'P',
    8: 'P',
  };

  const absentHours: string[] = [];
  if (isAbsentH1) absentHours.push('H1');
  if (isAbsentH5) absentHours.push('H5');
  if (isAbsentH6) absentHours.push('H6');

  const presentCount = Object.values(hours).filter((v) => v === 'P').length;
  const averagePercentage = Math.round((presentCount / 8) * 10000) / 100;

  return {
    studentRoll: student.rollNo,
    studentName: student.name,
    regNo: student.regNo,
    hours,
    absentHours,
    averagePercentage,
  };
});

export const ONLINE_MEETINGS_FACULTY: OnlineMeetingFaculty[] = [
  {
    id: 'MTG-01',
    title: 'Clinical Case Discussion: Acute Coronary Syndrome & ECG Changes',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    dateStr: '04-11-2024',
    timeRange: '05:30 PM - 06:45 PM',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/acu-physio-cvs',
    status: 'Live Now',
    hostName: 'Prof. Dr. Mohammed Ismail Razee, MD',
    attendeesCount: 49,
  },
  {
    id: 'MTG-02',
    title: 'Pulmonary Function Testing & Spirometry Curve Diagnostic Masterclass',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    dateStr: '06-11-2024',
    timeRange: '06:00 PM - 07:15 PM',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/acu-physio-respi',
    status: 'Upcoming',
    hostName: 'Prof. Dr. Mohammed Ismail Razee, MD',
    attendeesCount: 0,
  },
  {
    id: 'MTG-03',
    title: 'Renal Countercurrent Mechanism & GFR Regulation Seminar',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    dateStr: '28-10-2024',
    timeRange: '05:00 PM - 06:15 PM',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/acu-physio-renal',
    status: 'Past',
    hostName: 'Prof. Dr. Mohammed Ismail Razee, MD',
    attendeesCount: 51,
  },
];

export const ASSESSMENTS_FACULTY_LIST: AssessmentItemFaculty[] = [
  {
    id: 'IA-1',
    title: 'IA-1: Cardiovascular & Respiratory Physiology (Theory + OSPE)',
    assessmentType: '1. CA (Continuous Assessments)',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    maxMarks: 50,
    weightage: 20,
    assignedDate: '10-11-2024',
    submissionDeadline: '20-11-2024',
    status: 'Published',
    submissionsCount: 53,
    totalCount: 53,
  },
  {
    id: 'IA-2',
    title: 'IA-2: Renal, Endocrine & Neurophysiology Examination',
    assessmentType: '1. CA (Continuous Assessments)',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    maxMarks: 50,
    weightage: 20,
    assignedDate: '15-03-2025',
    submissionDeadline: '24-03-2025',
    status: 'Draft',
    submissionsCount: 0,
    totalCount: 53,
  },
  {
    id: 'PRE-UNI',
    title: 'First Professional MBBS Model Pre-University Trial Examination',
    assessmentType: '2. Mid-Term Exam',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    batch: '2024MBBS01 - First MBBS',
    maxMarks: 100,
    weightage: 30,
    assignedDate: '10-07-2025',
    submissionDeadline: '25-07-2025',
    status: 'Draft',
    submissionsCount: 0,
    totalCount: 53,
  },
];

export const QUESTION_POOL_LIST: QuestionPoolItem[] = [
  {
    id: 'QP-01',
    questionText: 'Explain the physiological events of the Cardiac Cycle with corresponding pressure-volume changes in the Left Ventricle and heart sounds.',
    questionType: 'Descriptive',
    topic: 'Cardiovascular Physiology',
    difficulty: 'Medium',
    marks: 10,
    mappedCO: 'CO3',
    bloomsLevel: 'L3 - Apply',
  },
  {
    id: 'QP-02',
    questionText: 'A 45-year-old male presents with BP 180/100 mmHg. Which neuro-hormonal feedback mechanism acts immediately within seconds to lower BP?',
    questionType: 'MCQ',
    topic: 'Arterial Blood Pressure Regulation',
    difficulty: 'Easy',
    marks: 1,
    mappedCO: 'CO3',
    bloomsLevel: 'L2 - Understand',
    options: ['Renin-Angiotensin-Aldosterone System', 'Arterial Baroreceptor Reflex', 'Atrial Natriuretic Peptide', 'Erythropoietin Secretion'],
    correctOption: 'Arterial Baroreceptor Reflex',
  },
  {
    id: 'QP-03',
    questionText: 'Describe the Countercurrent Multiplier and Countercurrent Exchanger mechanisms in Henle loop and vasa recta of Juxtamedullary nephrons.',
    questionType: 'Descriptive',
    topic: 'Renal Physiology',
    difficulty: 'Hard',
    marks: 10,
    mappedCO: 'CO5',
    bloomsLevel: 'L4 - Analyze',
  },
  {
    id: 'QP-04',
    questionText: 'In Spirometry, which lung volume cannot be directly determined by a simple water-sealed recording spirometer?',
    questionType: 'MCQ',
    topic: 'Respiratory Physiology',
    difficulty: 'Medium',
    marks: 1,
    mappedCO: 'CO4',
    bloomsLevel: 'L3 - Apply',
    options: ['Tidal Volume (TV)', 'Inspiratory Reserve Volume (IRV)', 'Residual Volume (RV)', 'Vital Capacity (VC)'],
    correctOption: 'Residual Volume (RV)',
  },
  {
    id: 'QP-05',
    questionText: 'Compare and contrast the clinical features and laboratory findings of Graves Disease vs Hashimoto Thyroiditis.',
    questionType: 'Descriptive',
    topic: 'Endocrine Physiology',
    difficulty: 'Medium',
    marks: 5,
    mappedCO: 'CO5',
    bloomsLevel: 'L4 - Analyze',
  },
];

export const COURSE_MATERIALS_LIST: CourseMaterialFaculty[] = [
  { id: 'MAT-01', slNo: 1, name: 'Clinical ECG Interpretation & Cardiac Arrhythmias Handbook.pdf', type: 'DOCUMENT', fileSize: '4.8 MB', fileExt: 'pdf', uploadedOn: '04-11-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Comprehensive guide to 12-lead ECG analysis and arrhythmia pathology.', downloadUrl: '#' },
  { id: 'MAT-02', slNo: 2, name: 'Human Physiology Practical Manual: Hematology & Clinical OSPE.pdf', type: 'DOCUMENT', fileSize: '12.4 MB', fileExt: 'pdf', uploadedOn: '02-11-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Laboratory protocols for hematological counts, staining, and OSPE stations.', downloadUrl: '#' },
  { id: 'MAT-03', slNo: 3, name: 'Spirometry, Lung Volumes & Arterial Blood Gas (ABG) Clinical Guide.pdf', type: 'DOCUMENT', fileSize: '3.1 MB', fileExt: 'pdf', uploadedOn: '28-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Pulmonary function mechanics, alveolar ventilation, and ABG interpretation.', downloadUrl: '#' },
  { id: 'MAT-04', slNo: 4, name: 'Renin-Angiotensin-Aldosterone System (RAAS) High Yield Notes.pdf', type: 'DOCUMENT', fileSize: '1.9 MB', fileExt: 'pdf', uploadedOn: '25-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Endocrine axis regulation of blood pressure and fluid homeostasis.', downloadUrl: '#' },
  { id: 'MAT-05', slNo: 5, name: 'Nerve-Muscle Action Potential Kinetics & Synaptic Transmission.pptx', type: 'PRESENTATION', fileSize: '8.6 MB', fileExt: 'pptx', uploadedOn: '20-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Interactive lecture presentation on neuromuscular junction and action potentials.', downloadUrl: '#' },
  { id: 'MAT-06', slNo: 6, name: 'NMC CBME GMER-2024 Competency Mapped Physiology Logbook.pdf', type: 'DOCUMENT', fileSize: '2.5 MB', fileExt: 'pdf', uploadedOn: '15-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Official clinical logbook template matching NMC GMER 2024 guidelines.', downloadUrl: '#' },
  { id: 'MAT-07', slNo: 7, name: 'Hypothalamic-Pituitary-Thyroid-Adrenal Endocrine Axes Schematic.pdf', type: 'DOCUMENT', fileSize: '2.1 MB', fileExt: 'pdf', uploadedOn: '12-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'High-resolution schematic diagrams for endocrine pathway feedback loops.', downloadUrl: '#' },
  { id: 'MAT-08', slNo: 8, name: 'AETCOM Module 1.1: Foundations of Doctor-Patient Communication.pdf', type: 'DOCUMENT', fileSize: '1.4 MB', fileExt: 'pdf', uploadedOn: '08-10-2024', uploadedBy: 'Prof. Dr. Mohammed Ismail Razee', description: 'Foundational medical ethics and clinical patient interaction module.', downloadUrl: '#' },
];

export const INTERNAL_MARKS_LIST: InternalMarkRow[] = FACULTY_STUDENTS_LIST.map((student, idx) => ({
  slNo: idx + 1,
  rollNo: student.rollNo,
  studentName: student.name,
  ca1: student.caMarks.ca1,
  ca2: student.caMarks.ca2,
  ca3: student.caMarks.ca3,
  assignment: 9,
  attendanceMark: 5,
  totalMarks: student.caMarks.total,
  percentage: parseFloat(((student.caMarks.total / 50) * 100).toFixed(1)),
  isSubmitted: true,
}));

export const COURSE_FILE_CATEGORIES: CourseFileCategory[] = [
  { id: 'CAT-1', title: 'NMC CBME Course Syllabus & University Handout', description: 'Syllabus, module distribution, and learning objectives', requiredDocuments: 4, uploadedDocuments: 4, status: 'Complete', percentageComplete: 100, documents: [{ id: 'd1', name: 'NMC_Physiology_Syllabus_2024.pdf', uploadedDate: '01-10-2024', fileUrl: '#' }] },
  { id: 'CAT-2', title: 'Theory Lecture Plans & Clinical Session Logbook', description: 'Lesson planner and session-wise topic distributions', requiredDocuments: 12, uploadedDocuments: 12, status: 'Complete', percentageComplete: 100, documents: [{ id: 'd2', name: 'Physiology_Teaching_Schedule.pdf', uploadedDate: '05-10-2024', fileUrl: '#' }] },
  { id: 'CAT-3', title: 'Internal Assessment Question Papers & Model Answer Keys', description: 'IA-1 and IA-2 question papers with Bloom taxonomy mapping', requiredDocuments: 6, uploadedDocuments: 6, status: 'Complete', percentageComplete: 100, documents: [{ id: 'd3', name: 'IA1_Question_Paper_Key.pdf', uploadedDate: '15-10-2024', fileUrl: '#' }] },
  { id: 'CAT-4', title: 'Formative Clinical Assessment & OSPE Station Checklists', description: 'OSPE station questions, marking rubrics, and checklists', requiredDocuments: 8, uploadedDocuments: 7, status: 'In Progress', percentageComplete: 88, documents: [{ id: 'd4', name: 'OSPE_Station_Rubrics.pdf', uploadedDate: '20-10-2024', fileUrl: '#' }] },
  { id: 'CAT-5', title: 'Course Outcome (CO) Attainment & NMC Competency Mapping', description: 'CO-PO attainment calculations and direct assessment proofs', requiredDocuments: 6, uploadedDocuments: 6, status: 'Complete', percentageComplete: 100, documents: [{ id: 'd5', name: 'CO_PO_Attainment_Report.pdf', uploadedDate: '25-10-2024', fileUrl: '#' }] },
];

export const OBE_COURSE_OUTCOMES: OBEOutcomeItem[] = [
  { id: 'CO1', coNumber: '#1 CO1', coCode: 'CO1', shortTitle: 'General & Cellular Physiology', description: 'Describe cell membrane transport, bioelectrical potentials, neuromuscular transmission, and excitation-contraction coupling (NMC PY1.1-PY1.5).', targetAttainment: 75, status: 'Active' },
  { id: 'CO2', coNumber: '#2 CO2', coCode: 'CO2', shortTitle: 'Hematological Physiology & Immunity', description: 'Analyze blood cellular components, erythropoiesis, coagulation cascade, blood group immunology, and clinical anemia diagnosis (NMC PY2.1-PY2.12).', targetAttainment: 80, status: 'Active' },
  { id: 'CO3', coNumber: '#3 CO3', coCode: 'CO3', shortTitle: 'Cardiovascular Dynamics & ECG', description: 'Evaluate cardiac electrophysiology, 12-lead ECG traces, cardiac cycle mechanics, hemodynamics, and blood pressure regulation (NMC PY3.1-PY3.18).', targetAttainment: 75, status: 'Active' },
  { id: 'CO4', coNumber: '#4 CO4', coCode: 'CO4', shortTitle: 'Respiratory Mechanics & Gas Exchange', description: 'Interpret pulmonary function tests (spirometry), alveolar ventilation, ventilation-perfusion matching, and hypoxia mechanisms (NMC PY4.1-PY4.10).', targetAttainment: 78, status: 'Active' },
  { id: 'CO5', coNumber: '#5 CO5', coCode: 'CO5', shortTitle: 'Renal & Endocrine Homeostasis', description: 'Correlate glomerular filtration rate, countercurrent urine concentration, acid-base equilibrium, and endocrine feedback axes (NMC PY5.1-PY6.8).', targetAttainment: 75, status: 'Active' },
  { id: 'CO6', coNumber: '#6 CO6', coCode: 'CO6', shortTitle: 'Neurophysiology & Clinical OSPE Skills', description: 'Demonstrate sensory/motor reflex examinations, cranial nerve functions, autonomic nervous control, and clinical OSPE station competencies (NMC PY10.1-PY10.20).', targetAttainment: 82, status: 'Active' },
];

export const ASSESSMENT_CO_PO_MAPPINGS: AssessmentCOPOMappingRow[] = [
  { slNo: 1, assessmentType: '1. CA (Continuous Assessments)', assessmentNumber: 'CA 1', title: 'IA-1: Hematology & CVS', mappedCO: 'CO1, CO2, CO3', mappedPO: 'PO1, PO2, PO3', mappedPSO: 'PSO1, PSO2' },
  { slNo: 2, assessmentType: '1. CA (Continuous Assessments)', assessmentNumber: 'CA 2', title: 'IA-2: Respiration & Renal', mappedCO: 'CO4, CO5', mappedPO: 'PO1, PO2, PO4', mappedPSO: 'PSO1, PSO2' },
  { slNo: 3, assessmentType: '2. Mid-Term Exam', assessmentNumber: 'PRE-UNI', title: 'Pre-University Theory Exam', mappedCO: 'CO1, CO2, CO3, CO4, CO5, CO6', mappedPO: 'PO1, PO2, PO3, PO4, PO5, PO6', mappedPSO: 'PSO1, PSO2, PSO3' },
  { slNo: 4, assessmentType: 'Lab Experiment', assessmentNumber: 'OSPE-1', title: 'OSPE Practical Assessment', mappedCO: 'CO2, CO3, CO6', mappedPO: 'PO1, PO2, PO5', mappedPSO: 'PSO1, PSO3' },
];

export const FACULTY_SURVEYS: FacultySurveyItem[] = [
  {
    id: 'SURV-01',
    title: 'Phase 1 MBBS Cardiovascular & Respiration Theory Feedback',
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    startDate: '15-11-2024',
    endDate: '30-11-2024',
    status: 'ACTIVE',
    responsesCount: 48,
    totalStudents: 53,
    questions: [
      { id: 'q1', question: 'How clearly were the 12-lead ECG analysis and cardiac cycle pressure curves explained?', type: 'Rating' },
      { id: 'q2', question: 'Were the clinical cases in Early Clinical Exposure (ECE) relevant to the didactics?', type: 'Rating' },
    ],
  },
];

export const SUBSTITUTION_RECORDS: SubstitutionRecord[] = [
  {
    id: 'SUB-01',
    date: '03-11-2024',
    hour: 3,
    courseCode: 'PHY101',
    courseName: 'HUMAN PHYSIOLOGY I & II',
    originalFaculty: 'Dr. K. Suma, MD (Biochemistry)',
    substituteFaculty: 'Prof. Dr. Mohammed Ismail Razee, MD',
    batch: '2024MBBS01 - First MBBS',
    reason: 'Clinical Case Conference in Medical Auditorium',
    status: 'Approved',
  },
];
