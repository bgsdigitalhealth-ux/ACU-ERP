// ACU ERP Faculty / Staff Portal Types
// Recreated from Teacher_Profile_All_Pages_Screenshots.pdf (31 Reference Pages)

export interface FacultyProfile {
  empCode: string; // 'PUNIV03049' / 'ACUFAC2024049'
  fullName: string; // 'Mohammed Ismail Razee'
  designation: string; // 'Assistant Professor & Course Incharge'
  department: string; // 'Department of Computer Applications (MCA)'
  university: string; // 'Adichunchanagiri University'
  campus: string; // 'B.G. Nagara Campus'
  email: string; // 'ismail.razee@acu.edu.in'
  phone: string; // '+91 98860 12345'
  photoUrl: string; // Faculty profile photo
  roleBadge: string; // 'FACULTY'
  joiningDate: string; // '01-08-2022'
  activeBatch: string; // '2025MCA03'
  activeSemester: string; // 'S3 / S4'
}

export interface FacultyCourse {
  code: string; // 'CSA4504'
  name: string; // 'MERN FULL STACK DEVELOPMENT'
  shortName: string; // 'MERN Full Stack'
  credits: string; // 'L:2 - T:0 - P:0 - C:2'
  incharge: string; // 'PUNIV02691 - FAIZAN ANWAR KHAN' / 'PUNIV03049 - Mohammed Ismail Razee'
  semester: string; // 'S3' / 'S4'
  programme: string; // 'MCA (Master of Computer Applications)'
  batch: string; // '2025MCA03'
  totalStudents: number; // 53
  coursePlanUrl: string; // 'CP-CSA4504-MERN-Stack-Theory.pdf'
  aboutCourse: string;
  whatYoullLearn: string;
}

export interface StudentFacultyView {
  slNo: number;
  rollNo: string; // '20252MCA0002'
  regNo: string; // '20252MCA0002'
  name: string; // 'NIKHITA M'
  batch: string; // '2025MCA03-S3 MCA'
  status: 'ACTIVE' | 'INACTIVE';
  email: string;
  phone: string;
  attendanceAvg: number; // e.g. 100.00
  caMarks: { ca1: number; ca2: number; ca3: number; total: number };
}

export interface CourseHandoutElement {
  id: string;
  title: string; // 'COURSE DETAILS', 'COURSE DESCRIPTION', etc.
  status: 'Completed' | 'Pending' | 'Draft';
  description: string;
  lastUpdated: string;
}

export interface LessonPlanTopic {
  id: string;
  slNo: number;
  topic: string;
  plannedDate: string;
  completedDate?: string;
  plannedHours: number;
  actualHours?: number;
  teachingMethod: 'Chalk & Talk' | 'ICT / PPT' | 'Lab Demonstration' | 'Flipped Classroom';
  mappedCO: string; // 'CO1', 'CO2', etc.
  status: 'Completed' | 'Pending' | 'In Progress';
  remarks?: string;
}

export interface HourlyAttendanceSlot {
  hour: number; // 1 to 8
  timeSpan: string; // '09:45 AM - 10:40 AM'
  courseCode: string;
  courseName: string;
  batch: string;
  status: 'Marked' | 'Unmarked' | 'Open' | 'Disabled';
  presentCount: number;
  absentCount: number;
  totalCount: number;
}

export interface AttendanceRecordRow {
  studentRoll: string;
  studentName: string;
  regNo: string;
  hours: { [hour: number]: 'P' | 'A' | 'OD' | 'L' };
  absentHours: string[]; // e.g. ['H1', 'H5', 'H6']
  averagePercentage: number;
}

export interface OnlineMeetingFaculty {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  batch: string;
  dateStr: string;
  timeRange: string;
  platform: 'Google Meet' | 'Zoom' | 'MS Teams';
  meetingLink: string;
  status: 'Live Now' | 'Upcoming' | 'Past';
  hostName: string;
  attendeesCount: number;
}

export interface AssessmentItemFaculty {
  id: string;
  title: string; // 'CA 1', 'Mid-Term Exam'
  assessmentType: '1. CA (Continuous Assessments)' | '2. Mid-Term Exam' | 'End Semester Exam' | 'Lab Experiment';
  courseCode: string;
  courseName: string;
  batch: string;
  maxMarks: number;
  weightage: number;
  assignedDate: string;
  submissionDeadline: string;
  status: 'Published' | 'Draft' | 'Evaluated';
  submissionsCount: number;
  totalCount: number;
}

export interface QuestionPoolItem {
  id: string;
  questionText: string;
  questionType: 'MCQ' | 'Short Answer' | 'Descriptive' | 'True / False';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  mappedCO: string; // 'CO1', 'CO2', etc.
  bloomsLevel: 'L1 - Remember' | 'L2 - Understand' | 'L3 - Apply' | 'L4 - Analyze';
  options?: string[];
  correctOption?: string;
  explanation?: string;
}

export interface CourseMaterialFaculty {
  id: string;
  slNo: number;
  name: string; // 'Git Codes', 'Basic Mongoose Commands'
  type: 'DOCUMENT' | 'PRESENTATION' | 'CODE_LAB' | 'VIDEO';
  description: string;
  uploadedOn: string;
  uploadedBy: string; // 'Mohammed Ismail Razee'
  fileSize: string;
  fileExt: string;
  downloadUrl: string;
}

export interface InternalMarkRow {
  slNo: number;
  rollNo: string;
  studentName: string;
  ca1: number; // Max 25
  ca2: number; // Max 25
  ca3: number; // Max 25
  assignment: number; // Max 10
  attendanceMark: number; // Max 5
  totalMarks: number; // Calculated Max 50
  percentage: number;
  isSubmitted: boolean;
}

export interface CourseFileCategory {
  id: string;
  title: string;
  description: string;
  requiredDocuments: number;
  uploadedDocuments: number;
  percentageComplete: number;
  status: 'Complete' | 'In Progress' | 'Pending';
  documents: { id: string; name: string; uploadedDate: string; fileUrl: string }[];
}

export interface OBEOutcomeItem {
  id: string;
  coNumber: string; // '#1 CO1'
  coCode: string; // 'CO1'
  shortTitle: string; // 'Application of Domain Knowledge'
  description: string;
  targetAttainment: number; // e.g. 75%
  status: 'Active' | 'Draft';
}

export interface AssessmentCOPOMappingRow {
  slNo: number;
  assessmentType: string; // '1. CA (Continuous Assessments)'
  assessmentNumber: string; // 'CA 1'
  title: string; // 'CA1'
  mappedCO: string; // 'CO1, CO2, CO3'
  mappedPO: string; // 'PO1, PO2, PO3, PO4, PO5'
  mappedPSO: string; // 'PSO1, PSO2'
}

export interface FacultySurveyItem {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  responsesCount: number;
  totalStudents: number;
  questions: { id: string; question: string; type: 'Rating' | 'Text' | 'MCQ' }[];
}

export interface SubstitutionRecord {
  id: string;
  date: string;
  hour: number;
  courseCode: string;
  courseName: string;
  originalFaculty: string;
  substituteFaculty: string;
  batch: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Completed';
}

