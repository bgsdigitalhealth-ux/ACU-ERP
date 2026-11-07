import { Assessment } from '../models/Assessment.js';
import { AcademicCalendar } from '../models/AcademicCalendar.js';
import { Course } from '../models/Course.js';
import { Student } from '../models/Student.js';

let MEMORY_ASSESSMENTS = [
  {
    id: 'asmt-1',
    title: 'Continuous Assessment 1 (IA-1): Hematology & Hemodynamics',
    category: 'Theory Assessment (CBME)',
    courseCode: 'PHY101',
    courseName: 'Human Physiology I & II',
    batch: '2024MBBS01',
    maxMarks: 20,
    weightage: 10,
    assignedDate: '01-11-2024',
    dueDate: '20-11-2024',
    status: 'ACTIVE',
    bloomsLevel: "L3 - Apply (Bloom's Taxonomy)",
    competencyCode: 'PY2.5 (NMC GMER 2024)',
    questionCount: 5,
    description: 'Erythropoiesis regulation, blood grouping cross-match, and cardiac cycle timeline analysis.',
    createdBy: 'Prof. Dr. Mohammed Ismail Razee, MD',
  },
  {
    id: 'asmt-2',
    title: 'Continuous Assessment 2 (IA-2): Respiratory & Renal Mechanics',
    category: 'Theory Assessment (CBME)',
    courseCode: 'PHY101',
    courseName: 'Human Physiology I & II',
    batch: '2024MBBS01',
    maxMarks: 20,
    weightage: 10,
    assignedDate: '04-11-2024',
    dueDate: '25-11-2024',
    status: 'SCHEDULED',
    bloomsLevel: "L4 - Analyze (Bloom's Taxonomy)",
    competencyCode: 'PY6.3 & PY7.2 (NMC GMER 2024)',
    questionCount: 6,
    description: 'Ventilation-perfusion mismatch, counter-current multiplier, and GFR regulatory reflexes.',
    createdBy: 'Prof. Dr. Mohammed Ismail Razee, MD',
  },
  {
    id: 'asmt-3',
    title: 'OSPE Practical Assessment 1: Hematology Practical & Blood Smear',
    category: 'OSPE Clinical Exam',
    courseCode: 'PHY101',
    courseName: 'Human Physiology I & II',
    batch: '2024MBBS01',
    maxMarks: 40,
    weightage: 20,
    assignedDate: '10-11-2024',
    dueDate: '28-11-2024',
    status: 'DRAFT',
    bloomsLevel: 'L3 - Apply (Practical Clinical)',
    competencyCode: 'PY2.11 (NMC GMER 2024)',
    questionCount: 4,
    description: 'RBC/WBC counting chamber dilution, Leishman staining, and differential count verification.',
    createdBy: 'Prof. Dr. Mohammed Ismail Razee, MD',
  },
];

const MEMORY_CALENDAR = [
  {
    id: 'cal-p1',
    title: 'Phase 1 MBBS Continuous Assessment (IA-1) Evaluation Window',
    category: 'Assessment',
    startDate: '01 Nov 2024',
    endDate: '15 Nov 2024',
    type: 'Academic Milestone',
    status: 'present',
    venue: 'AIMS Academic Block & Physiology Lab',
    targetAudience: 'First MBBS Students & Physiology Faculty',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'cal-p2',
    title: 'NMC CBME Early Clinical Exposure (ECE-1) Hospital Ward Postings',
    category: 'Clinical Posting',
    startDate: '03 Nov 2024',
    endDate: '18 Nov 2024',
    type: 'Ward Rounds',
    status: 'present',
    venue: 'Adichunchanagiri Hospital & Research Centre',
    targetAudience: 'MBBS Batch 2024MBBS01',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'cal-u1',
    title: 'First MBBS Mid-Term Formative OSPE Clinical Examination',
    category: 'Examination',
    startDate: '25 Nov 2024',
    endDate: '30 Nov 2024',
    type: 'OSPE Practical Exam',
    status: 'upcoming',
    venue: 'AIMS Clinical Skills Centre',
    targetAudience: 'All Phase 1 MBBS Students',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
];

export const academicService = {
  getAssessments: async () => {
    try {
      const items = await Assessment.find().sort({ createdAt: -1 }).lean();
      if (items && items.length > 0) return items;
    } catch {}
    return MEMORY_ASSESSMENTS;
  },

  createAssessment: async (data) => {
    const id = data.id || 'asmt-' + Date.now();
    const newAsmt = { ...data, id };
    MEMORY_ASSESSMENTS.unshift(newAsmt);
    try { await Assessment.create(newAsmt); } catch {}
    return newAsmt;
  },

  getCalendar: async () => {
    try {
      const items = await AcademicCalendar.find().lean();
      if (items && items.length > 0) return items;
    } catch {}
    return MEMORY_CALENDAR;
  },

  seed: async () => {
    try {
      for (const a of MEMORY_ASSESSMENTS) {
        await Assessment.findOneAndUpdate({ id: a.id }, a, { upsert: true });
      }
      for (const c of MEMORY_CALENDAR) {
        await AcademicCalendar.findOneAndUpdate({ id: c.id }, c, { upsert: true });
      }
      return { success: true, message: 'Academic data seeded successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
export default academicService;
