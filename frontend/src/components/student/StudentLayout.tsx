import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { StudentHeader } from './StudentHeader';
import { StudentSidebar } from './StudentSidebar';

// Module Page Imports
import { StudentHomeDashboard } from './pages/StudentHomeDashboard';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { StudentChangePasswordPage } from './pages/StudentChangePasswordPage';
import { StudentMentoringPage } from './pages/StudentMentoringPage';
import { StudentTimetablePage } from './pages/StudentTimetablePage';
import { StudentExternalExamTimetablePage } from './pages/StudentExternalExamTimetablePage';
import { StudentAcademicCalendarPage } from './pages/StudentAcademicCalendarPage';
import { StudentAttendancePage } from './pages/StudentAttendancePage';
import { StudentAssessmentsPage } from './pages/StudentAssessmentsPage';
import { StudentFeedbackSurveysPage } from './pages/StudentFeedbackSurveysPage';
import { StudentApplicationsPage } from './pages/StudentApplicationsPage';
import { StudentMessageBoxPage } from './pages/StudentMessageBoxPage';
import { StudentCoEPage } from './pages/StudentCoEPage';
import { StudentOnlineMeetingsPage } from './pages/StudentOnlineMeetingsPage';
import { StudentAssessmentMarksPage } from './pages/StudentAssessmentMarksPage';
import { StudentResourceRepositoryPage } from './pages/StudentResourceRepositoryPage';
import { StudentMyFeePage } from './pages/StudentMyFeePage';
import { StudentLearningOutcomesPage } from './pages/StudentLearningOutcomesPage';
import { StudentAdditionalCreditsPage } from './pages/StudentAdditionalCreditsPage';
import { StudentLeaveManagementPage } from './pages/StudentLeaveManagementPage';
import { StudentTransportationPage } from './pages/StudentTransportationPage';

interface StudentLayoutProps {
  onLogout: () => void;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ onLogout }) => {
  const { activeMenu, activeSubmenu, sidebarCollapsed } = useStudent();

  // Dynamic router to render the corresponding page based on activeMenu & activeSubmenu
  const renderCurrentPage = () => {
    switch (activeMenu) {
      case 'home':
        return <StudentHomeDashboard />;

      case 'profile':
        if (activeSubmenu === 'change-password') {
          return <StudentChangePasswordPage />;
        }
        return <StudentProfilePage />;

      case 'mentoring':
        return <StudentMentoringPage />;

      case 'timetables':
        if (activeSubmenu === 'external-exam') {
          return <StudentExternalExamTimetablePage />;
        }
        return <StudentTimetablePage />;

      case 'academic-calendar':
        return <StudentAcademicCalendarPage />;

      case 'attendance':
        return <StudentAttendancePage />;

      case 'assessments':
        return <StudentAssessmentsPage />;

      case 'surveys':
        return <StudentFeedbackSurveysPage />;

      case 'applications':
        return <StudentApplicationsPage />;

      case 'messages':
        return <StudentMessageBoxPage />;

      case 'coe':
        return <StudentCoEPage />;

      case 'meetings':
        return <StudentOnlineMeetingsPage />;

      case 'results':
        return <StudentAssessmentMarksPage />;

      case 'resources':
        return <StudentResourceRepositoryPage />;

      case 'fees':
        return <StudentMyFeePage />;

      case 'outcomes':
        return <StudentLearningOutcomesPage />;

      case 'credits':
        return <StudentAdditionalCreditsPage />;

      case 'leave':
        return <StudentLeaveManagementPage />;

      case 'transport':
        return <StudentTransportationPage />;

      default:
        return <StudentHomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col font-sans text-gray-800 antialiased selection:bg-purple-200 selection:text-purple-900">
      {/* Top University & Student Header */}
      <StudentHeader onLogout={onLogout} />

      {/* Main Body */}
      <div className="flex flex-1 pt-14 sm:pt-16">
        {/* Fixed Left Sidebar with all 19 Menus */}
        <StudentSidebar />

        {/* Dynamic Content Area */}
        <main
          className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          {/* Page Body */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderCurrentPage()}
          </div>

          {/* Unified Student Portal Footer */}
          <footer className="mt-auto border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-purple-900">ACU ERP</span>
                <span>•</span>
                <span>Adichunchanagiri University, B.G. Nagara - 571448</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <span>Academic Session 2026 - 2027</span>
                <span>•</span>
                <span>Autonomous Student Academic Management System</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

