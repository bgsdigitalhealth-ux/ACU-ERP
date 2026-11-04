import React from 'react';
import { useFaculty } from '../../context/FacultyContext';
import { FacultyHeader } from './FacultyHeader';
import { FacultySidebar } from './FacultySidebar';

// Pages
import { FacultyDashboardPage } from './pages/FacultyDashboardPage';
import { FacultyCourseInfoPage } from './pages/FacultyCourseInfoPage';
import { FacultyCourseHandoutPage } from './pages/FacultyCourseHandoutPage';
import { FacultyStudentInfoPage } from './pages/FacultyStudentInfoPage';
import { FacultyLessonPlannerPage } from './pages/FacultyLessonPlannerPage';
import { FacultyAttendanceMarkPage } from './pages/FacultyAttendanceMarkPage';
import { FacultyAttendanceHourReportPage } from './pages/FacultyAttendanceHourReportPage';
import { FacultyAttendanceDayReportPage } from './pages/FacultyAttendanceDayReportPage';
import { FacultyAttendanceReportsPage } from './pages/FacultyAttendanceReportsPage';
import { FacultyOnlineMeetingsPage } from './pages/FacultyOnlineMeetingsPage';
import { FacultyAssessmentManagementPage } from './pages/FacultyAssessmentManagementPage';
import { FacultyCreateAssessmentPage } from './pages/FacultyCreateAssessmentPage';
import { FacultyQuestionPoolPage } from './pages/FacultyQuestionPoolPage';
import { FacultyResultReportPage } from './pages/FacultyResultReportPage';
import { FacultyExperimentStatusPage } from './pages/FacultyExperimentStatusPage';
import { FacultyCourseMaterialsPage } from './pages/FacultyCourseMaterialsPage';
import { FacultyInternalMarksPage } from './pages/FacultyInternalMarksPage';
import { FacultyCourseFilePage } from './pages/FacultyCourseFilePage';
import { FacultyOBECourseOutcomesPage } from './pages/FacultyOBECourseOutcomesPage';
import { FacultyOBEPOCORulesPage } from './pages/FacultyOBEPOCORulesPage';
import { FacultyOBECOPOMappingPage } from './pages/FacultyOBECOPOMappingPage';
import { FacultyOBECoursePOAttainmentPage } from './pages/FacultyOBECoursePOAttainmentPage';
import { FacultyOBEAssessmentMappingPage } from './pages/FacultyOBEAssessmentMappingPage';
import { FacultyPollsSurveysPage } from './pages/FacultyPollsSurveysPage';
import { FacultyTutorBatchesPage } from './pages/FacultyTutorBatchesPage';
import { FacultyTimetablePage } from './pages/FacultyTimetablePage';
import { FacultySubstitutionReportPage } from './pages/FacultySubstitutionReportPage';
import { FacultyAcademicCalendarPage } from './pages/FacultyAcademicCalendarPage';

interface FacultyLayoutProps {
  onLogout: () => void;
}

export const FacultyLayout: React.FC<FacultyLayoutProps> = ({ onLogout }) => {
  const { activeMenu, activeSubmenu, sidebarCollapsed } = useFaculty();

  const renderActivePage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <FacultyDashboardPage />;

      case 'course-info':
        return <FacultyCourseInfoPage />;

      case 'course-handout':
        return <FacultyCourseHandoutPage />;

      case 'student-info':
      case 'students-global':
        return <FacultyStudentInfoPage />;

      case 'lesson-planner':
      case 'lesson-planner-global':
        return <FacultyLessonPlannerPage />;

      case 'attendance':
        if (activeSubmenu === 'hour-report') {
          return <FacultyAttendanceHourReportPage />;
        }
        if (activeSubmenu === 'day-report') {
          return <FacultyAttendanceDayReportPage />;
        }
        return <FacultyAttendanceMarkPage />;

      case 'meetings':
        return <FacultyOnlineMeetingsPage />;

      case 'assessments':
        if (activeSubmenu === 'create-assessment') {
          return <FacultyCreateAssessmentPage />;
        }
        if (activeSubmenu === 'question-pool') {
          return <FacultyQuestionPoolPage />;
        }
        if (activeSubmenu === 'result-report' || activeSubmenu === 'slow-learner') {
          return <FacultyResultReportPage />;
        }
        if (activeSubmenu === 'experiment-status') {
          return <FacultyExperimentStatusPage />;
        }
        return <FacultyAssessmentManagementPage />;

      case 'assessment-report-global':
        return <FacultyResultReportPage />;

      case 'materials':
        return <FacultyCourseMaterialsPage />;

      case 'internal-marks':
      case 'ca-marks-global':
        return <FacultyInternalMarksPage />;

      case 'course-file':
        return <FacultyCourseFilePage />;

      case 'obe':
        if (activeSubmenu === 'po-co-rules') {
          return <FacultyOBEPOCORulesPage />;
        }
        if (activeSubmenu === 'co-po-report' || activeSubmenu === 'co-po-mapping') {
          return <FacultyOBECOPOMappingPage />;
        }
        if (activeSubmenu === 'po-attainment' || activeSubmenu === 'co-attainment') {
          return <FacultyOBECoursePOAttainmentPage />;
        }
        if (activeSubmenu === 'assessment-mapping') {
          return <FacultyOBEAssessmentMappingPage />;
        }
        return <FacultyOBECourseOutcomesPage />;

      case 'surveys':
        return <FacultyPollsSurveysPage />;

      case 'my-communities':
        if (activeSubmenu === 'my-tutor-batches' || activeSubmenu === 'my-mentees') {
          return <FacultyTutorBatchesPage />;
        }
        return <FacultyDashboardPage />;

      case 'timetable':
        return <FacultyTimetablePage />;

      case 'substitution':
        return <FacultySubstitutionReportPage />;

      case 'attendance-reports':
        return <FacultyAttendanceReportsPage />;

      case 'academic-calendar':
        return <FacultyAcademicCalendarPage />;

      default:
        return <FacultyDashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <FacultyHeader onLogout={onLogout} />

      {/* Main Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <FacultySidebar />

        {/* Dynamic Content */}
        <main
          className={`flex-1 transition-all duration-300 p-6 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="max-w-7xl mx-auto">{renderActivePage()}</div>
        </main>
      </div>

      {/* Footer */}
      <footer
        className={`bg-white border-t border-slate-200 py-3 px-6 text-center text-xs text-slate-500 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <p>
          Adichunchanagiri University (ACU) ERP &copy; {new Date().getFullYear()} &bull; AMS Autonomous Ultimate Plus
          v4.4.1.20 &bull; All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

