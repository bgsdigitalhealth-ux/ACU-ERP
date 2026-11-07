import { Router } from 'express';
import { getEmployees, createEmployee } from '../controllers/employeeController.js';
import { getRequisitions, createRequisition } from '../controllers/recruitmentController.js';
import { getPayroll, processPayroll } from '../controllers/payrollController.js';
import { getAttendance, markAttendance } from '../controllers/attendanceController.js';

const router = Router();

// Employee routes
router.get('/employees', getEmployees);
router.post('/employees', createEmployee);

// Recruitment routes
router.get('/recruitment', getRequisitions);
router.post('/recruitment', createRequisition);

// Payroll routes
router.get('/payroll', getPayroll);
router.post('/payroll', processPayroll);

// Attendance routes
router.get('/attendance', getAttendance);
router.post('/attendance', markAttendance);

export default router;

