export interface StudentProfile {
  rollNo: string;
  universityRegNo: string;
  admissionNo: string;
  fullName: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthDay: string;
  birthPlace: string;
  birthState: string;
  birthCountry: string;
  motherTongue: string;
  permanentAddress: string;
  currentAddress: string;
  nationality: string;
  mobileNumber: string;
  program: string;
  batchSection: string;
  currentSemester: string;
  university: string;
  photoUrl: string;
  parentDetails: {
    fatherName: string;
    fatherMobile: string;
    fatherOccupation: string;
    motherName: string;
    motherMobile: string;
    guardianName?: string;
  };
}

export interface EnrolledCourse {
  code: string;
  name: string;
  shortCode: string;
  faculty: string;
  type: string; // 'Core', 'Open Elective', 'Major Project', etc.
  semester: string;
  credits: number;
  batchTag: string; // e.g. '2024MBBS01 First MBBS PHY101'
  status: 'In Progress' | 'Completed' | 'Upcoming';
  classesHeld: number;
  classesAttended: number;
  attendancePercent: number;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  dateStr: string;
  hour: number; // 1 to 6
  timeSpan: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  classroom: string;
  status: 'Present' | 'Absent' | 'Unmarked' | 'Suspended' | 'Holiday';
}

export interface ExternalExamItem {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'Regular Exam' | 'Supplementary';
  date: string;
  session: 'FN' | 'AN';
  startTime: string;
  endTime: string;
  venue: string;
  seatingNo: string;
  instructions: string;
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Institution' | 'School' | 'Department' | 'Program' | 'Batch';
  isHoliday: boolean;
  isSpecialEvent: boolean;
  description: string;
}

export interface CourseAttendanceSummary {
  slNo: number;
  courseName: string;
  courseCode: string;
  th: number; // Total hours
  ah: number; // Attended hours
  dl: number; // Duty leave
  ahDl: number; // AH + DL
  ahPercent: number;
  ahDlPercent: number;
}

export interface AssessmentItem {
  id: string;
  title: string;
  courseName: string;
  courseCode: string;
  type: 'Quiz' | 'Assignment' | 'Continuous Assessment' | 'Lab Record' | 'Project Evaluation';
  maxMarks: number;
  obtainedMarks?: number;
  dueDate: string;
  status: 'Upcoming' | 'Available' | 'Submitted' | 'Evaluated' | 'Expired';
  submissionDate?: string;
  remarks?: string;
}

export interface SurveyItem {
  id: string;
  title: string;
  category: 'Course Survey' | 'General Survey' | 'Faculty Evaluation';
  course?: string;
  semester: string;
  startTime: string;
  endTime: string;
  timeLimitDays: number;
  maxMarks: number;
  status: 'OPEN' | 'SUBMITTED' | 'TIME-EXPIRED';
  questions: {
    id: string;
    question: string;
    options?: string[];
    ratingScale?: number;
  }[];
}

export interface ApplicationCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  badge?: number | string;
  iconName: string;
  actionUrl?: string;
}

export interface SubmittedApplication {
  id: string;
  title: string;
  category: string;
  status: 'APPLIED' | 'UNDER REVIEW' | 'APPROVED' | 'REJECTED';
  appliedTime: string;
  finalizedTime: string;
  refNumber: string;
  remarks?: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  subject: string;
  circularNo?: string;
  body: string;
  time: string;
  date: string;
  isRead: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface ExamResultItem {
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;
  gradePoint: number;
  resultStatus: 'PASS' | 'FAIL' | 'WITHHELD';
}

export interface SemesterResult {
  semester: string;
  academicYear: string;
  examType: string;
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  creditsEarned: number;
  resultPublishedDate: string;
  items: ExamResultItem[];
}

export interface FeeYearSummary {
  slNo: number;
  yearName: string;
  totalFees: number;
  totalConcession: number;
  remittedFee: number;
  pendingFine: number;
  fineRemitted: number;
  balanceFee: number;
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface FeeReceiptItem {
  slNo: number;
  receiptNo: string;
  receiptDate: string;
  paymentMethod: 'ONLINE' | 'NEFT' | 'CR.ADJUSTMENT' | 'ONLINEPAY' | 'CHALLAN';
  amount: number;
  feeType: string;
  semester: string;
}

export interface LearningOutcomeItem {
  code: string;
  name: string;
  description: string;
}

export interface CourseOutcomeItem {
  semester: string;
  course: string;
  coName: string;
  coCode: string;
  description: string;
}

export interface StudentPoScore {
  slNo: number;
  rollNo: string;
  regNo: string;
  studentName: string;
  batch: string;
  poScores: { [key: string]: number }; // PO1..PO12, PSO1..PSO3
}

export interface AdditionalCreditApp {
  id: string;
  activityCategory: string;
  activityTitle: string;
  description: string;
  eventDate: string;
  pointsRequested: number;
  pointsApproved?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedDate: string;
  facultyMentor: string;
  certificateName?: string;
}

export interface LeaveApplicationItem {
  id: string;
  leaveType: 'Medical Leave' | 'Duty Leave' | 'Casual Leave' | 'Family Emergency';
  dayType: 'Single' | 'Multi';
  fromDate: string;
  toDate: string;
  sessions: number[]; // 1 to 8 hours
  reason: string;
  description: string;
  attachmentName?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedOn: string;
}

export interface TransportRouteItem {
  routeNo: string;
  routeName: string;
  via: string;
  driverName: string;
  contactNumber: string;
  availableSeats: number;
  totalSeats: number;
  feePerYear: number;
  stops: { stopName: string; morningPickup: string; eveningDrop: string }[];
}

