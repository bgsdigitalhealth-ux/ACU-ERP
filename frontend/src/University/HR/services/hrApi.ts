import { API_BASE_URL } from '../../../config/apiConfig';

export interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  employmentType: 'Permanent' | 'Contract' | 'Adjunct' | 'Visiting';
  status: 'Active' | 'On Leave' | 'Resigned' | 'Retired';
  salaryGross: number;
}

export interface RecruitmentRequisition {
  requisitionId: string;
  title: string;
  department: string;
  positions: number;
  qualification: string;
  experienceMinYears: number;
  applicationDeadline: string;
  status: 'Open' | 'Screening' | 'Interviews' | 'Filled' | 'Closed';
  applicantsCount: number;
}

export interface PayrollRecord {
  payrollId: string;
  monthYear: string;
  employeeId: string;
  employeeName: string;
  department: string;
  basicPay: number;
  daHra: number;
  deductions: number;
  netPay: number;
  paymentStatus: 'Paid' | 'Pending' | 'Processing' | 'Hold';
  disbursementDate?: string;
}

export interface AttendanceRecord {
  attendanceId: string;
  date: string;
  employeeId: string;
  employeeName: string;
  department: string;
  status: 'Present' | 'Absent' | 'On Leave' | 'Half Day' | 'On Duty';
  checkInTime: string;
  checkOutTime: string;
  biometricVerified: boolean;
}

const HR_API_BASE = `${API_BASE_URL}/hr`;

export const hrApi = {
  getEmployees: async (): Promise<Employee[]> => {
    try {
      const res = await fetch(`${HR_API_BASE}/employees`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [
        { employeeId: 'EMP-1001', fullName: 'Dr. Ramesh Chandra, MD', email: 'ramesh.c@acu.edu.in', department: 'Medicine', designation: 'Professor & Dean', employmentType: 'Permanent', status: 'Active', salaryGross: 145000 },
        { employeeId: 'EMP-1002', fullName: 'Dr. Savitha Rao, PhD', email: 'savitha.rao@acu.edu.in', department: 'Physiology', designation: 'Associate Professor', employmentType: 'Permanent', status: 'Active', salaryGross: 105000 },
        { employeeId: 'EMP-1003', fullName: 'Mr. Anand Gowda, MCA', email: 'anand.g@acu.edu.in', department: 'IT Systems', designation: 'Systems Administrator', employmentType: 'Permanent', status: 'Active', salaryGross: 72000 },
      ];
    }
  },

  getRecruitment: async (): Promise<RecruitmentRequisition[]> => {
    try {
      const res = await fetch(`${HR_API_BASE}/recruitment`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [
        { requisitionId: 'REQ-2026-01', title: 'Assistant Professor in Pathology', department: 'Pathology', positions: 2, qualification: 'MD Pathology', experienceMinYears: 3, applicationDeadline: '25 Nov 2026', status: 'Open', applicantsCount: 14 },
        { requisitionId: 'REQ-2026-02', title: 'Senior Resident in General Medicine', department: 'Medicine', positions: 3, qualification: 'MD/DNB General Medicine', experienceMinYears: 1, applicationDeadline: '30 Nov 2026', status: 'Screening', applicantsCount: 22 },
      ];
    }
  },

  getPayroll: async (monthYear = 'October 2026'): Promise<PayrollRecord[]> => {
    try {
      const res = await fetch(`${HR_API_BASE}/payroll?monthYear=${encodeURIComponent(monthYear)}`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [
        { payrollId: 'PAY-2026-10-01', monthYear: 'October 2026', employeeId: 'EMP-1001', employeeName: 'Dr. Ramesh Chandra, MD', department: 'Medicine', basicPay: 100000, daHra: 45000, deductions: 12000, netPay: 133000, paymentStatus: 'Paid', disbursementDate: '31 Oct 2026' },
        { payrollId: 'PAY-2026-10-02', monthYear: 'October 2026', employeeId: 'EMP-1002', employeeName: 'Dr. Savitha Rao, PhD', department: 'Physiology', basicPay: 70000, daHra: 35000, deductions: 8500, netPay: 96500, paymentStatus: 'Paid', disbursementDate: '31 Oct 2026' },
      ];
    }
  },

  getAttendance: async (date = '06 Nov 2026'): Promise<AttendanceRecord[]> => {
    try {
      const res = await fetch(`${HR_API_BASE}/attendance?date=${encodeURIComponent(date)}`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [
        { attendanceId: 'ATT-01', date: '06 Nov 2026', employeeId: 'EMP-1001', employeeName: 'Dr. Ramesh Chandra, MD', department: 'Medicine', status: 'Present', checkInTime: '08:45 AM', checkOutTime: '05:15 PM', biometricVerified: true },
        { attendanceId: 'ATT-02', date: '06 Nov 2026', employeeId: 'EMP-1002', employeeName: 'Dr. Savitha Rao, PhD', department: 'Physiology', status: 'Present', checkInTime: '08:55 AM', checkOutTime: '05:00 PM', biometricVerified: true },
      ];
    }
  },
};

export default hrApi;

