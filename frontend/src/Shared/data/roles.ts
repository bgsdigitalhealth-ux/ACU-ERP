import { RoleInfo } from '../types/auth';

export const ACU_ERP_ROLES: RoleInfo[] = [
  {
    id: 'chancellor',
    title: 'Chancellor',
    subtitle: 'Apex university governance, statutory approvals and executive decrees',
    iconName: 'Crown',
    color: '#0284c7',
    bgLight: '#f0f9ff',
    borderColor: '#38bdf8',
    defaultEmail: 'chancellor@acu.edu.in',
    angle: 270, // 12:00 Top
    iconPath: '/roles/chancellor-color-icon.png',
    cardPath: '/roles/chancellor-card.png'
  },
  {
    id: 'vice-chancellor',
    title: 'Vice\nChancellor',
    subtitle: 'Approvals & Academic Oversight, Institutional Governance',
    iconName: 'GraduationCap',
    color: '#7c3aed',
    bgLight: '#f5f0ff',
    borderColor: '#a78bfa',
    defaultEmail: 'vc.office@acu.edu.in',
    angle: 302.7,
    iconPath: '/roles/vice-chancellor-color-icon.png',
    cardPath: '/roles/vice-chancellor-card.png'
  },
  {
    id: 'coe',
    title: 'Controller of\nExamination',
    subtitle: 'University examination schedules, QP generation and centre allocation',
    iconName: 'ClipboardCheck',
    color: '#db2777',
    bgLight: '#fff0f5',
    borderColor: '#f472b6',
    defaultEmail: 'coe@acu.edu.in',
    angle: 335.4,
    iconPath: '/roles/coe-color-icon.png',
    cardPath: '/roles/coe-card.png'
  },
  {
    id: 'registrar',
    title: 'Registrar',
    subtitle: 'Evaluation, Valuation Centers & Result Processing Administration',
    iconName: 'FileEdit',
    color: '#e11d48',
    bgLight: '#fff0f2',
    borderColor: '#fb7185',
    defaultEmail: 'registrar.eval@acu.edu.in',
    angle: 8.1,
    iconPath: '/roles/registrar-color-icon.png',
    cardPath: '/roles/registrar-card.png'
  },
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Treasury funds, examination fee reconciliation & remuneration registers',
    iconName: 'Coins',
    color: '#ea580c',
    bgLight: '#fff8f0',
    borderColor: '#fb923c',
    defaultEmail: 'finance.officer@acu.edu.in',
    angle: 40.8,
    iconPath: '/roles/finance-color-icon.png',
    cardPath: '/roles/finance-card.png'
  },
  {
    id: 'dean',
    title: 'Dean',
    subtitle: 'Chief Superintendent examination oversight & institutional management',
    iconName: 'UserCheck',
    color: '#ca8a04',
    bgLight: '#fffdf0',
    borderColor: '#facc15',
    defaultEmail: 'dean.medical@bgs.edu.in',
    angle: 73.5,
    iconPath: '/roles/dean-color-icon.png',
    cardPath: '/roles/dean-card.png'
  },
  {
    id: 'deputy-superintendent',
    title: 'Deputy\nSuperintendent',
    subtitle: 'Invigilator allocation, duty roster & hall operations management',
    iconName: 'Shield',
    color: '#16a34a',
    bgLight: '#f0fff4',
    borderColor: '#4ade80',
    defaultEmail: 'deputy.exam@bgs.edu.in',
    angle: 106.2,
    iconPath: '/roles/deputy-superintendent-color-icon.png',
    cardPath: '/roles/deputy-superintendent-card.png'
  },
  {
    id: 'hod',
    title: 'Department\nHOD',
    subtitle: 'Departmental examination ops, examiner nomination and mark verification',
    iconName: 'Network',
    color: '#059669',
    bgLight: '#f0fdf4',
    borderColor: '#34d399',
    defaultEmail: 'hod.physiology@bgs.edu.in',
    angle: 138.9,
    iconPath: '/roles/hod-color-icon.png',
    cardPath: '/roles/hod-card.png'
  },
  {
    id: 'faculty',
    title: 'Faculty /\nStaff',
    subtitle: 'Teaching log, attendance, internal assessments and valuation duty',
    iconName: 'Users',
    color: '#0284c7',
    bgLight: '#f0f9ff',
    borderColor: '#38bdf8',
    defaultEmail: 'faculty@acu.edu.in',
    angle: 171.6,
    iconPath: '/roles/faculty-color-icon.png',
    cardPath: '/roles/faculty-card.png'
  },
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Hall tickets, exam schedules, revaluation requests and digital grade sheets',
    iconName: 'GraduationCap',
    color: '#3b82f6',
    bgLight: '#f5f3ff',
    borderColor: '#60a5fa',
    defaultEmail: 'student@acu.edu.in',
    angle: 204.3,
    iconPath: '/roles/student-color-icon.png',
    cardPath: '/roles/student-card.png'
  },
  {
    id: 'parent',
    title: 'Parents /\nGuardian',
    subtitle: 'Student attendance, exam performance metrics, fee receipts and notifications',
    iconName: 'UsersRound',
    color: '#9333ea',
    bgLight: '#fdf4ff',
    borderColor: '#c084fc',
    defaultEmail: 'parent@acu.edu.in',
    angle: 237,
    iconPath: '/roles/parent-color-icon.png',
    cardPath: '/roles/parent-card.png'
  }
];

export const KARNATAKA_ERP_ROLES = ACU_ERP_ROLES;
