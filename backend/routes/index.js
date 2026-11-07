import { Router } from 'express';

// University Routes
import chancellorRoutes from '../University/Chancellor/routes/chancellorRoutes.js';
import viceChancellorRoutes from '../University/ViceChancellor/routes/vicechancellorRoutes.js';
import registrarRoutes from '../University/Registrar/routes/registrarRoutes.js';
import universityFinanceRoutes from '../University/Finance/routes/financeRoutes.js';
import hrRoutes from '../University/HR/routes/hrRoutes.js';
import univLeaveAdminRoutes from '../University/LeaveAdmin/routes/leaveadminRoutes.js';
import examinationRoutes from '../University/Examination/routes/examinationRoutes.js';
import academicRoutes from '../University/Academic/routes/academicRoutes.js';
import admissionRoutes from '../University/Admission/routes/admissionRoutes.js';
import researchRoutes from '../University/Research/routes/researchRoutes.js';
import studentAffairsRoutes from '../University/StudentAffairs/routes/studentaffairsRoutes.js';
import universityAdminRoutes from '../University/UniversityAdmin/routes/universityAdminRoutes.js';

// College Routes
import principalRoutes from '../College/Principal/routes/principalRoutes.js';
import vicePrincipalRoutes from '../College/VicePrincipal/routes/viceprincipalRoutes.js';
import hodRoutes from '../College/HOD/routes/hodRoutes.js';
import facultyRoutes from '../College/Faculty/routes/facultyRoutes.js';
import collegeHrRoutes from '../College/CollegeHR/routes/collegehrRoutes.js';
import collLeaveAdminRoutes from '../College/LeaveAdmin/routes/leaveadminRoutes.js';
import collegeAccountsRoutes from '../College/Accounts/routes/collegeFinanceRoutes.js';
import collegeAdmissionRoutes from '../College/Admission/routes/admissionRoutes.js';
import collegeExamRoutes from '../College/Examination/routes/examinationRoutes.js';
import libraryRoutes from '../College/Library/routes/libraryRoutes.js';
import studentSectionRoutes from '../College/StudentSection/routes/studentsectionRoutes.js';
import collegeAdminRoutes from '../College/CollegeAdmin/routes/collegeadminRoutes.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'ACU ERP - Adichunchanagiri University Enterprise Architecture',
    database: 'MongoDB Atlas',
    architecture: 'Clean Modular University & College Architecture',
    timestamp: new Date().toISOString(),
  });
});

// Root API Index
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'ACU ERP - Adichunchanagiri University Backend API',
    endpoints: {
      health: '/api/health',
      dashboard: '/api/dashboard',
      modules: '/api/modules',
      assessments: '/api/assessments',
      calendar: '/api/academic-calendar',
      collegeFinance: '/api/college-finance/dashboard',
      hr: '/api/hr/employees',
    },
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
  });
});

// Mount University Routes
router.use('/university/chancellor', chancellorRoutes);
router.use('/chancellor', chancellorRoutes);
router.use('/university/vice-chancellor', viceChancellorRoutes);
router.use('/vice-chancellor', viceChancellorRoutes);
router.use('/university/registrar', registrarRoutes);
router.use('/university/finance', universityFinanceRoutes);
router.use('/university/hr', hrRoutes);
router.use('/university/leave-admin', univLeaveAdminRoutes);
router.use('/university/examination', examinationRoutes);
router.use('/university/academic', academicRoutes);
router.use('/university/admission', admissionRoutes);
router.use('/university/research', researchRoutes);
router.use('/university/student-affairs', studentAffairsRoutes);
router.use('/university/admin', universityAdminRoutes);

// Direct modular aliases requested in architectural specification
router.use('/hr', hrRoutes);

// Mount College Routes
router.use('/college/principal', principalRoutes);
router.use('/college/vice-principal', vicePrincipalRoutes);
router.use('/college/hod', hodRoutes);
router.use('/college/faculty', facultyRoutes);
router.use('/college/hr', collegeHrRoutes);
router.use('/college/leave-admin', collLeaveAdminRoutes);
router.use('/college/accounts', collegeAccountsRoutes);
router.use('/college/admission', collegeAdmissionRoutes);
router.use('/college/examination', collegeExamRoutes);
router.use('/college/library', libraryRoutes);
router.use('/college/student-section', studentSectionRoutes);
router.use('/college/admin', collegeAdminRoutes);

// College Finance Direct Routes
router.use('/college-finance', collegeAccountsRoutes);
router.use('/finance', collegeAccountsRoutes); // backward compatibility

// Academic & Examination Backward-Compatible Routes
router.use('/', academicRoutes);

// University Admin Backward-Compatible Dashboard & Modules Routes
router.use('/', universityAdminRoutes);

export default router;

