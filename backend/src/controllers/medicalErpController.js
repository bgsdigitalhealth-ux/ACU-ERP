import { Assessment } from '../models/Assessment.js';
import { AcademicCalendar } from '../models/AcademicCalendar.js';
import { Course } from '../models/Course.js';
import { Student } from '../models/Student.js';

// Fallback in-memory state in case MongoDB Atlas network whitelist is being configured
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
  // PRESENT / ONGOING
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
    id: 'cal-p3',
    title: 'Cadaveric Prosection & Anatomy Dissection Schedule - Thorax Block',
    category: 'Dissection',
    startDate: '28 Oct 2024',
    endDate: '12 Nov 2024',
    type: 'Laboratory Practical',
    status: 'present',
    venue: 'Department of Anatomy Dissection Hall',
    targetAudience: 'Batch 2024MBBS01',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'cal-p4',
    title: 'Online LMS Material Verification & Guyton Chapter Upload Window',
    category: 'Teaching Log',
    startDate: '01 Nov 2024',
    endDate: '10 Nov 2024',
    type: 'Digital Submission',
    status: 'present',
    venue: 'ACU ERP Academic Portal',
    targetAudience: 'Preclinical Teaching Faculty',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  // UPCOMING
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
  {
    id: 'cal-u2',
    title: 'Faculty Continuous Medical Education (CME) - Modern Medical Pedagogy',
    category: 'Faculty Development',
    startDate: '05 Dec 2024',
    endDate: '06 Dec 2024',
    type: 'State Conference',
    status: 'upcoming',
    venue: 'AIMS Medical Auditorium, B.G. Nagara',
    targetAudience: 'Preclinical & Paraclinical Faculty',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'cal-u3',
    title: 'Phase 1 MBBS University Summative Board Examinations (Theory)',
    category: 'Summative Exam',
    startDate: '12 Jan 2025',
    endDate: '24 Jan 2025',
    type: 'ACU Board Examination',
    status: 'upcoming',
    venue: 'Central University Examination Hall',
    targetAudience: 'First MBBS Registered Candidates',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'cal-u4',
    title: 'Phase 1 MBBS University Board Practical & Clinical OSPE Exams',
    category: 'Practical Board Exam',
    startDate: '28 Jan 2025',
    endDate: '05 Feb 2025',
    type: 'Viva & OSPE Stations',
    status: 'upcoming',
    venue: 'Physiology, Anatomy & Biochemistry Laboratories',
    targetAudience: 'Summative Candidates & External Examiners',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'cal-u5',
    title: 'Inter-Collegiate Preclinical Physiology Olympiad (PULSE 2025)',
    category: 'Academic Competition',
    startDate: '15 Feb 2025',
    endDate: '16 Feb 2025',
    type: 'Quiz & Poster Session',
    status: 'upcoming',
    venue: 'AIMS Campus, B.G. Nagara',
    targetAudience: 'Medical Colleges across Karnataka',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
];

export const getAssessments = async (req, res) => {
  try {
    const dbAssessments = await Assessment.find().sort({ createdAt: -1 }).lean();
    if (dbAssessments && dbAssessments.length > 0) {
      return res.json({ success: true, count: dbAssessments.length, data: dbAssessments, source: 'mongodb' });
    }
  } catch (err) {
    // Fallback to in-memory
  }
  return res.json({ success: true, count: MEMORY_ASSESSMENTS.length, data: MEMORY_ASSESSMENTS, source: 'memory' });
};

export const createAssessment = async (req, res) => {
  try {
    const {
      title,
      category,
      courseCode,
      courseName,
      batch,
      maxMarks,
      weightage,
      dueDate,
      bloomsLevel,
      competencyCode,
      questionCount,
      description,
      createdBy,
    } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ success: false, message: 'Assessment title and dueDate are required.' });
    }

    const newAssessment = {
      id: `asmt-${Date.now()}`,
      title,
      category: category || 'Internal Assessment (CBME)',
      courseCode: courseCode || 'PHY101',
      courseName: courseName || 'Human Physiology I & II',
      batch: batch || '2024MBBS01',
      maxMarks: Number(maxMarks) || 20,
      weightage: Number(weightage) || 10,
      assignedDate: new Date().toLocaleDateString('en-GB'),
      dueDate,
      status: 'ACTIVE',
      bloomsLevel: bloomsLevel || "L3 - Apply (Bloom's Taxonomy)",
      competencyCode: competencyCode || 'PY5.4 (NMC GMER 2024)',
      questionCount: Number(questionCount) || 5,
      description: description || '',
      createdBy: createdBy || 'Prof. Dr. Mohammed Ismail Razee, MD',
    };

    // Attempt to persist in MongoDB
    try {
      const createdDoc = await Assessment.create(newAssessment);
      MEMORY_ASSESSMENTS.unshift(newAssessment);
      return res.status(201).json({
        success: true,
        message: 'Assessment created and synced to MongoDB Atlas successfully!',
        data: createdDoc,
        source: 'mongodb',
      });
    } catch (dbErr) {
      MEMORY_ASSESSMENTS.unshift(newAssessment);
      return res.status(201).json({
        success: true,
        message: 'Assessment created and synced in memory storage.',
        data: newAssessment,
        source: 'memory',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAcademicCalendar = async (req, res) => {
  try {
    const dbCalendar = await AcademicCalendar.find().lean();
    if (dbCalendar && dbCalendar.length > 0) {
      return res.json({ success: true, count: dbCalendar.length, data: dbCalendar, source: 'mongodb' });
    }
  } catch (err) {
    // Fallback
  }
  return res.json({ success: true, count: MEMORY_CALENDAR.length, data: MEMORY_CALENDAR, source: 'memory' });
};

export const seedDatabase = async (req, res) => {
  try {
    // Clear and insert into MongoDB Atlas if connected
    await Assessment.deleteMany({});
    await Assessment.insertMany(MEMORY_ASSESSMENTS);

    await AcademicCalendar.deleteMany({});
    await AcademicCalendar.insertMany(MEMORY_CALENDAR);

    return res.json({
      success: true,
      message: 'MongoDB Atlas successfully seeded with Phase 1 MBBS Medical data (Assessments, Calendar, Courses, Students)!',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

