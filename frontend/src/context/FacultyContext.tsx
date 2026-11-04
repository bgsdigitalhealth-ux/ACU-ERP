import React, { createContext, useContext, useState } from 'react';
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
import {
  INITIAL_FACULTY_PROFILE,
  FACULTY_COURSES,
  FACULTY_STUDENTS_LIST,
  COURSE_HANDOUT_ELEMENTS,
  LESSON_PLAN_TOPICS,
  HOURLY_ATTENDANCE_SLOTS,
  ATTENDANCE_DAY_RECORDS,
  ONLINE_MEETINGS_FACULTY,
  ASSESSMENTS_FACULTY_LIST,
  QUESTION_POOL_LIST,
  COURSE_MATERIALS_LIST,
  INTERNAL_MARKS_LIST,
  COURSE_FILE_CATEGORIES,
  OBE_COURSE_OUTCOMES,
  ASSESSMENT_CO_PO_MAPPINGS,
  FACULTY_SURVEYS,
  SUBSTITUTION_RECORDS,
  FACULTY_ACADEMIC_CALENDAR,
  AcademicCalendarItem,
} from '../data/facultyMockData';

interface FacultyContextType {
  profile: FacultyProfile;
  updateProfile: (updated: Partial<FacultyProfile>) => void;
  courses: FacultyCourse[];
  currentCourse: FacultyCourse;
  setCurrentCourse: (course: FacultyCourse) => void;

  navMode: 'global' | 'course';
  setNavMode: (mode: 'global' | 'course') => void;
  activeMenu: string;
  activeSubmenu: string;
  navigate: (menu: string, submenu?: string, mode?: 'global' | 'course') => void;

  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Student list
  students: StudentFacultyView[];

  // Course Handout
  handoutElements: CourseHandoutElement[];

  // Lesson Plan
  lessonPlan: LessonPlanTopic[];
  addLessonTopic: (topic: Omit<LessonPlanTopic, 'id' | 'slNo'>) => void;
  updateLessonTopic: (id: string, updated: Partial<LessonPlanTopic>) => void;

  // Attendance
  attendanceSlots: HourlyAttendanceSlot[];
  dayAttendanceRecords: AttendanceRecordRow[];
  saveAttendanceForHour: (hour: number, records: { [studentRoll: string]: 'P' | 'A' | 'OD' | 'L' }) => void;

  // Meetings
  meetings: OnlineMeetingFaculty[];

  // Assessments & Question Pool
  assessments: AssessmentItemFaculty[];
  addAssessment: (asmt: Omit<AssessmentItemFaculty, 'id' | 'submissionsCount'>) => void;
  questionPool: QuestionPoolItem[];
  addQuestion: (q: Omit<QuestionPoolItem, 'id'>) => void;

  // Materials
  materials: CourseMaterialFaculty[];
  addMaterial: (m: Omit<CourseMaterialFaculty, 'id' | 'slNo'>) => void;

  // Internal Marks
  internalMarks: InternalMarkRow[];
  updateStudentMark: (rollNo: string, updated: Partial<InternalMarkRow>) => void;
  submitInternalMarks: () => void;

  // Course File
  courseFileCategories: CourseFileCategory[];
  uploadCourseDocument: (catId: string, docName: string) => void;

  // OBE
  obeOutcomes: OBEOutcomeItem[];
  addOBEOutcome: (outcome: Omit<OBEOutcomeItem, 'id'>) => void;
  assessmentMappings: AssessmentCOPOMappingRow[];

  // Surveys & Substitutions
  surveys: FacultySurveyItem[];
  addSurvey: (survey: Omit<FacultySurveyItem, 'id' | 'responsesCount'>) => void;
  substitutions: SubstitutionRecord[];

  // Academic Calendar (Present & Upcoming)
  academicCalendar: AcademicCalendarItem[];
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export const FacultyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FacultyProfile>(INITIAL_FACULTY_PROFILE);
  const [courses] = useState<FacultyCourse[]>(FACULTY_COURSES);
  const [currentCourse, setCurrentCourse] = useState<FacultyCourse>(FACULTY_COURSES[0]);

  // Mode: 'global' (Home / My Communities) or 'course' (Subject Community like CSA4504)
  const [navMode, setNavMode] = useState<'global' | 'course'>('course');
  const [activeMenu, setActiveMenu] = useState<string>('student-info');
  const [activeSubmenu, setActiveSubmenu] = useState<string>('details');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [students] = useState<StudentFacultyView[]>(FACULTY_STUDENTS_LIST);
  const [handoutElements] = useState<CourseHandoutElement[]>(COURSE_HANDOUT_ELEMENTS);
  const [lessonPlan, setLessonPlan] = useState<LessonPlanTopic[]>(LESSON_PLAN_TOPICS);
  const [attendanceSlots, setAttendanceSlots] = useState<HourlyAttendanceSlot[]>(HOURLY_ATTENDANCE_SLOTS);
  const [dayAttendanceRecords, setDayAttendanceRecords] = useState<AttendanceRecordRow[]>(ATTENDANCE_DAY_RECORDS);
  const [meetings] = useState<OnlineMeetingFaculty[]>(ONLINE_MEETINGS_FACULTY);
  const [assessments, setAssessments] = useState<AssessmentItemFaculty[]>(() => {
    try {
      const saved = localStorage.getItem('acu_faculty_assessments');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ASSESSMENTS_FACULTY_LIST;
  });
  const [questionPool, setQuestionPool] = useState<QuestionPoolItem[]>(QUESTION_POOL_LIST);
  const [materials, setMaterials] = useState<CourseMaterialFaculty[]>(COURSE_MATERIALS_LIST);
  const [internalMarks, setInternalMarks] = useState<InternalMarkRow[]>(INTERNAL_MARKS_LIST);
  const [courseFileCategories, setCourseFileCategories] = useState<CourseFileCategory[]>(COURSE_FILE_CATEGORIES);
  const [obeOutcomes, setObeOutcomes] = useState<OBEOutcomeItem[]>(OBE_COURSE_OUTCOMES);
  const [assessmentMappings] = useState<AssessmentCOPOMappingRow[]>(ASSESSMENT_CO_PO_MAPPINGS);
  const [surveys, setSurveys] = useState<FacultySurveyItem[]>(FACULTY_SURVEYS);
  const [substitutions] = useState<SubstitutionRecord[]>(SUBSTITUTION_RECORDS);
  const [academicCalendar] = useState<AcademicCalendarItem[]>(FACULTY_ACADEMIC_CALENDAR);

  const navigate = (menu: string, submenu?: string, mode?: 'global' | 'course') => {
    if (mode) setNavMode(mode);
    setActiveMenu(menu);

    if (submenu) {
      setActiveSubmenu(submenu);
    } else {
      // Default submenus
      switch (menu) {
        case 'dashboard':
          setActiveSubmenu('quick-access');
          break;
        case 'student-info':
          setActiveSubmenu('details');
          break;
        case 'course-handout':
          setActiveSubmenu('handout');
          break;
        case 'course-info':
          setActiveSubmenu('info');
          break;
        case 'lesson-planner':
          setActiveSubmenu('proposed-plan');
          break;
        case 'attendance':
          setActiveSubmenu('mark-attendance');
          break;
        case 'meetings':
          setActiveSubmenu('join-meeting');
          break;
        case 'assessments':
          setActiveSubmenu('management');
          break;
        case 'materials':
          setActiveSubmenu('copy');
          break;
        case 'internal-marks':
          setActiveSubmenu('report');
          break;
        case 'course-file':
          setActiveSubmenu('overview');
          break;
        case 'obe':
          setActiveSubmenu('course-outcomes');
          break;
        case 'surveys':
          setActiveSubmenu('manage-surveys');
          break;
        case 'tutor-batches':
          setActiveSubmenu('batches');
          break;
        case 'timetable':
          setActiveSubmenu('batch-section');
          break;
        case 'substitution':
          setActiveSubmenu('report');
          break;
        case 'attendance-reports':
          setActiveSubmenu('day-week-wise');
          break;
        default:
          setActiveSubmenu('overview');
      }
    }
  };

  const updateProfile = (updated: Partial<FacultyProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const addLessonTopic = (topic: Omit<LessonPlanTopic, 'id' | 'slNo'>) => {
    const newTopic: LessonPlanTopic = {
      ...topic,
      id: `lp-${Date.now()}`,
      slNo: lessonPlan.length + 1,
    };
    setLessonPlan((prev) => [...prev, newTopic]);
  };

  const updateLessonTopic = (id: string, updated: Partial<LessonPlanTopic>) => {
    setLessonPlan((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const saveAttendanceForHour = (
    hour: number,
    records: { [studentRoll: string]: 'P' | 'A' | 'OD' | 'L' }
  ) => {
    let present = 0;
    let absent = 0;
    Object.values(records).forEach((status) => {
      if (status === 'P' || status === 'OD') present++;
      else absent++;
    });

    setAttendanceSlots((prev) =>
      prev.map((slot) =>
        slot.hour === hour
          ? {
              ...slot,
              status: 'Marked',
              presentCount: present,
              absentCount: absent,
            }
          : slot
      )
    );

    // Update day records
    setDayAttendanceRecords((prev) =>
      prev.map((r) => {
        const status = records[r.studentRoll] || 'P';
        const newHours = { ...r.hours, [hour]: status };
        const absentHours: string[] = [];
        let pCount = 0;
        let totalMarked = 0;

        for (let h = 1; h <= 8; h++) {
          if (newHours[h]) {
            totalMarked++;
            if (newHours[h] === 'A') {
              absentHours.push(`H${h}`);
            } else {
              pCount++;
            }
          }
        }
        const avg = totalMarked > 0 ? (pCount / totalMarked) * 100 : 100;

        return {
          ...r,
          hours: newHours,
          absentHours,
          averagePercentage: parseFloat(avg.toFixed(2)),
        };
      })
    );
  };

  const addAssessment = (asmt: Omit<AssessmentItemFaculty, 'id' | 'submissionsCount'>) => {
    const id = `asmt-${Date.now()}`;
    const newAsmt: AssessmentItemFaculty = {
      ...asmt,
      id,
      submissionsCount: 0,
    };
    setAssessments((prev) => {
      const updated = [newAsmt, ...prev];
      try {
        localStorage.setItem('acu_faculty_assessments', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Dynamic sync to Student Portal
    try {
      const studentAsmt = {
        id,
        title: asmt.title,
        courseName: asmt.courseName,
        courseCode: asmt.courseCode,
        type: 'Continuous Assessment' as const,
        maxMarks: asmt.maxMarks,
        dueDate: (asmt as any).dueDate || asmt.submissionDeadline,
        status: 'Available' as const,
        remarks: `Assigned on ${asmt.assignedDate}. Batch: ${asmt.batch}`,
      };
      const existing = localStorage.getItem('acu_shared_assessments');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(studentAsmt);
      localStorage.setItem('acu_shared_assessments', JSON.stringify(list));
      window.dispatchEvent(new Event('acu_assessment_created'));
    } catch (e) {
      console.warn('Could not sync assessment to student portal:', e);
    }

    // Persist to MongoDB Atlas backend if reachable
    const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    fetch(`${backendBase}/api/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAsmt),
    }).catch(() => {
      // Graceful offline fallback
    });
  };

  const addQuestion = (q: Omit<QuestionPoolItem, 'id'>) => {
    const newQ: QuestionPoolItem = {
      ...q,
      id: `q-${Date.now()}`,
    };
    setQuestionPool((prev) => [newQ, ...prev]);
  };

  const addMaterial = (m: Omit<CourseMaterialFaculty, 'id' | 'slNo'>) => {
    const newMat: CourseMaterialFaculty = {
      ...m,
      id: `mat-${Date.now()}`,
      slNo: materials.length + 1,
    };
    setMaterials((prev) => [...prev, newMat]);
  };

  const updateStudentMark = (rollNo: string, updated: Partial<InternalMarkRow>) => {
    setInternalMarks((prev) =>
      prev.map((row) => {
        if (row.rollNo === rollNo) {
          const merged = { ...row, ...updated };
          const total = (merged.ca1 || 0) + (merged.ca2 || 0) + (merged.ca3 || 0);
          const scaled = Math.min(50, Math.round(total / 1.5));
          const pct = parseFloat(((scaled / 50) * 100).toFixed(1));
          return { ...merged, totalMarks: scaled, percentage: pct };
        }
        return row;
      })
    );
  };

  const submitInternalMarks = () => {
    setInternalMarks((prev) => prev.map((r) => ({ ...r, isSubmitted: true })));
  };

  const uploadCourseDocument = (catId: string, docName: string) => {
    setCourseFileCategories((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const newDoc = {
            id: `doc-${Date.now()}`,
            name: docName,
            uploadedDate: new Date().toLocaleDateString('en-GB'),
            fileUrl: '#',
          };
          const updatedDocs = [...c.documents, newDoc];
          const pct = Math.min(100, Math.round((updatedDocs.length / c.requiredDocuments) * 100));
          return {
            ...c,
            uploadedDocuments: updatedDocs.length,
            percentageComplete: pct,
            status: pct >= 100 ? 'Complete' : 'In Progress',
            documents: updatedDocs,
          };
        }
        return c;
      })
    );
  };

  const addOBEOutcome = (outcome: Omit<OBEOutcomeItem, 'id'>) => {
    const newOutcome: OBEOutcomeItem = {
      ...outcome,
      id: `co-${Date.now()}`,
    };
    setObeOutcomes((prev) => [...prev, newOutcome]);
  };

  const addSurvey = (survey: Omit<FacultySurveyItem, 'id' | 'responsesCount'>) => {
    const newSurvey: FacultySurveyItem = {
      ...survey,
      id: `srv-${Date.now()}`,
      responsesCount: 0,
    };
    setSurveys((prev) => [newSurvey, ...prev]);
  };

  return (
    <FacultyContext.Provider
      value={{
        profile,
        updateProfile,
        courses,
        currentCourse,
        setCurrentCourse,
        navMode,
        setNavMode,
        activeMenu,
        activeSubmenu,
        navigate,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        searchQuery,
        setSearchQuery,
        students,
        handoutElements,
        lessonPlan,
        addLessonTopic,
        updateLessonTopic,
        attendanceSlots,
        dayAttendanceRecords,
        saveAttendanceForHour,
        meetings,
        assessments,
        addAssessment,
        questionPool,
        addQuestion,
        materials,
        addMaterial,
        internalMarks,
        updateStudentMark,
        submitInternalMarks,
        courseFileCategories,
        uploadCourseDocument,
        obeOutcomes,
        addOBEOutcome,
        assessmentMappings,
        surveys,
        addSurvey,
        substitutions,
        academicCalendar,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export const useFaculty = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
};

