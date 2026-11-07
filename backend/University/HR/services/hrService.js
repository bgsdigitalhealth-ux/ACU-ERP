import { Employee } from '../models/Employee.js';
import { Recruitment } from '../models/Recruitment.js';
import { Payroll } from '../models/Payroll.js';
import { Attendance } from '../models/Attendance.js';

let IN_MEMORY_EMPLOYEES = [
  { employeeId: 'EMP-1001', fullName: 'Dr. Ramesh Chandra, MD', email: 'ramesh.c@acu.edu.in', department: 'Medicine', designation: 'Professor & Dean', employmentType: 'Permanent', status: 'Active', salaryGross: 145000 },
  { employeeId: 'EMP-1002', fullName: 'Dr. Savitha Rao, PhD', email: 'savitha.rao@acu.edu.in', department: 'Physiology', designation: 'Associate Professor', employmentType: 'Permanent', status: 'Active', salaryGross: 105000 },
  { employeeId: 'EMP-1003', fullName: 'Mr. Anand Gowda, MCA', email: 'anand.g@acu.edu.in', department: 'IT Systems', designation: 'Systems Administrator', employmentType: 'Permanent', status: 'Active', salaryGross: 72000 },
  { employeeId: 'EMP-1004', fullName: 'Ms. Deepika Hegde, MBA', email: 'deepika.h@acu.edu.in', department: 'HR & Personnel', designation: 'HR Officer', employmentType: 'Permanent', status: 'Active', salaryGross: 68000 },
];

let IN_MEMORY_RECRUITMENT = [
  { requisitionId: 'REQ-2026-01', title: 'Assistant Professor in Pathology', department: 'Pathology', positions: 2, qualification: 'MD Pathology with 3 years NMC experience', experienceMinYears: 3, applicationDeadline: '25 Nov 2026', status: 'Open', applicantsCount: 14 },
  { requisitionId: 'REQ-2026-02', title: 'Senior Resident in General Medicine', department: 'Medicine', positions: 3, qualification: 'MD/DNB General Medicine', experienceMinYears: 1, applicationDeadline: '30 Nov 2026', status: 'Screening', applicantsCount: 22 },
];

let IN_MEMORY_PAYROLL = [
  { payrollId: 'PAY-2026-10-01', monthYear: 'October 2026', employeeId: 'EMP-1001', employeeName: 'Dr. Ramesh Chandra, MD', department: 'Medicine', basicPay: 100000, daHra: 45000, deductions: 12000, netPay: 133000, paymentStatus: 'Paid', disbursementDate: '31 Oct 2026' },
  { payrollId: 'PAY-2026-10-02', monthYear: 'October 2026', employeeId: 'EMP-1002', employeeName: 'Dr. Savitha Rao, PhD', department: 'Physiology', basicPay: 70000, daHra: 35000, deductions: 8500, netPay: 96500, paymentStatus: 'Paid', disbursementDate: '31 Oct 2026' },
];

let IN_MEMORY_ATTENDANCE = [
  { attendanceId: 'ATT-2026-11-06-01', date: '06 Nov 2026', employeeId: 'EMP-1001', employeeName: 'Dr. Ramesh Chandra, MD', department: 'Medicine', status: 'Present', checkInTime: '08:45 AM', checkOutTime: '05:15 PM', biometricVerified: true },
  { attendanceId: 'ATT-2026-11-06-02', date: '06 Nov 2026', employeeId: 'EMP-1002', employeeName: 'Dr. Savitha Rao, PhD', department: 'Physiology', status: 'Present', checkInTime: '08:55 AM', checkOutTime: '05:00 PM', biometricVerified: true },
];

export const hrService = {
  // Employees
  getAllEmployees: async () => {
    try {
      const dbEmployees = await Employee.find().sort({ createdAt: -1 }).lean();
      if (dbEmployees?.length) return dbEmployees;
    } catch {}
    return IN_MEMORY_EMPLOYEES;
  },
  createEmployee: async (data) => {
    const employeeId = data.employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEmp = { ...data, employeeId };
    IN_MEMORY_EMPLOYEES.unshift(newEmp);
    try { await Employee.create(newEmp); } catch {}
    return newEmp;
  },

  // Recruitment
  getAllRequisitions: async () => {
    try {
      const dbReqs = await Recruitment.find().sort({ createdAt: -1 }).lean();
      if (dbReqs?.length) return dbReqs;
    } catch {}
    return IN_MEMORY_RECRUITMENT;
  },
  createRequisition: async (data) => {
    const requisitionId = data.requisitionId || `REQ-2026-${Math.floor(10 + Math.random() * 90)}`;
    const newReq = { ...data, requisitionId };
    IN_MEMORY_RECRUITMENT.unshift(newReq);
    try { await Recruitment.create(newReq); } catch {}
    return newReq;
  },

  // Payroll
  getPayrollRecords: async (monthYear = 'October 2026') => {
    try {
      const dbPayroll = await Payroll.find({ monthYear }).sort({ createdAt: -1 }).lean();
      if (dbPayroll?.length) return dbPayroll;
    } catch {}
    return IN_MEMORY_PAYROLL;
  },
  createPayrollRecord: async (data) => {
    const payrollId = `PAY-${Date.now()}`;
    const newPay = { ...data, payrollId };
    IN_MEMORY_PAYROLL.unshift(newPay);
    try { await Payroll.create(newPay); } catch {}
    return newPay;
  },

  // Attendance
  getAttendanceLogs: async (date = '06 Nov 2026') => {
    try {
      const dbAtt = await Attendance.find({ date }).sort({ createdAt: -1 }).lean();
      if (dbAtt?.length) return dbAtt;
    } catch {}
    return IN_MEMORY_ATTENDANCE;
  },
  recordAttendance: async (data) => {
    const attendanceId = `ATT-${Date.now()}`;
    const newAtt = { ...data, attendanceId };
    IN_MEMORY_ATTENDANCE.unshift(newAtt);
    try { await Attendance.create(newAtt); } catch {}
    return newAtt;
  },
};
export default hrService;

