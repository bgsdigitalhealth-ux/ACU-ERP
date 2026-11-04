import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Home,
  Info,
  FileText,
  UserCheck,
  CalendarDays,
  Video,
  ClipboardList,
  FolderArchive,
  BarChart2,
  Users,
  Clock,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { useFaculty } from '../../context/FacultyContext';

interface SubmenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenus?: SubmenuItem[];
}

// Subject Community Menus (Pages 3 - 26)
const COURSE_COMMUNITY_MENUS: MenuItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home, submenus: [{ id: 'quick-access', label: 'Quick Access' }] },
  { id: 'course-info', label: 'Course Info', icon: Info },
  { id: 'course-handout', label: 'Course Handout', icon: FileText },
  { id: 'student-info', label: 'Student Information', icon: Users },
  {
    id: 'lesson-planner',
    label: 'Lesson Planner',
    icon: CalendarDays,
    submenus: [{ id: 'proposed-plan', label: 'Proposed Course Plan' }],
  },
  {
    id: 'attendance',
    label: 'Student Attendance',
    icon: UserCheck,
    submenus: [
      { id: 'mark-attendance', label: 'Mark Attendance' },
      { id: 'hour-report', label: 'Hour Wise Report' },
      { id: 'day-report', label: 'Day Wise Report' },
    ],
  },
  {
    id: 'meetings',
    label: 'Online Meetings',
    icon: Video,
    submenus: [
      { id: 'manage-meeting', label: 'Manage Meeting' },
      { id: 'join-meeting', label: 'Join Meeting' },
    ],
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: ClipboardList,
    submenus: [
      { id: 'management', label: 'Management' },
      { id: 'create-assessment', label: 'Create Assessment' },
      { id: 'question-pool', label: 'Question Pool' },
      { id: 'slow-learner', label: 'Slow Learner Analysis' },
      { id: 'result-report', label: 'Result Report' },
      { id: 'experiment-status', label: 'Experiment Completion Status' },
      { id: 'attitude-skills', label: 'Attitude and Skills' },
    ],
  },
  {
    id: 'materials',
    label: 'Course Materials',
    icon: Layers,
    submenus: [
      { id: 'manage', label: 'Manage' },
      { id: 'copy', label: 'Copy' },
    ],
  },
  {
    id: 'internal-marks',
    label: 'CA/Internal Marks',
    icon: Award,
    submenus: [{ id: 'report', label: 'Internal Assessment Report' }],
  },
  { id: 'course-file', label: 'Course File', icon: FolderArchive },
  {
    id: 'obe',
    label: 'OBE',
    icon: BarChart2,
    submenus: [
      { id: 'course-outcomes', label: 'Course Outcome' },
      { id: 'po-co-rules', label: 'PO CO Attainment Rules' },
      { id: 'co-po-report', label: 'CO PO Calculation & Report' },
      { id: 'co-po-mapping', label: 'CO-PO & PSO Mapping' },
      { id: 'po-attainment', label: 'Course PO Attainment' },
      { id: 'co-attainment', label: 'Course CO Attainment' },
      { id: 'assessment-mapping', label: 'Assessment CO-PO Mapping' },
    ],
  },
  {
    id: 'surveys',
    label: 'Polls And Survey',
    icon: BarChart2,
    submenus: [
      { id: 'manage-surveys', label: 'Manage Surveys' },
      { id: 'survey-report', label: 'Report' },
    ],
  },
];

// Global Navigation Menus (Pages 2, 27 - 32)
const GLOBAL_COMMUNITY_MENUS: MenuItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home, submenus: [{ id: 'quick-access', label: 'Quick Access' }] },
  {
    id: 'my-communities',
    label: 'My Communities',
    icon: BookOpen,
    submenus: [
      { id: 'course-communities', label: 'Course Communities' },
      { id: 'my-tutor-batches', label: 'My Tutor Batches' },
      { id: 'course-incharge', label: 'Course Incharge' },
      { id: 'my-mentees', label: 'My Mentees' },
    ],
  },
  { id: 'students-global', label: 'Students', icon: Users, submenus: [{ id: 'student-info-global', label: 'Student Information' }] },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: Clock,
    submenus: [
      { id: 'batch-section', label: 'Batch/Section Timetable' },
      { id: 'consolidated', label: 'Consolidated Timetable' },
      { id: 'suspend-hour', label: 'Suspend Hour' },
    ],
  },
  { id: 'academic-calendar', label: 'Academic Calendar', icon: Calendar },
  { id: 'substitution', label: 'Substitution Report', icon: RotateCcw },
  {
    id: 'attendance-reports',
    label: 'Attendance Reports',
    icon: UserCheck,
    submenus: [
      { id: 'day-week-wise', label: 'Day/Week Wise Report' },
      { id: 'absentees', label: 'Absentees Report' },
      { id: 'unmarked-faculty', label: 'Unmarked Faculty Report' },
      { id: 'course-wise', label: 'Course Wise Report' },
    ],
  },
  { id: 'assessment-report-global', label: 'Assessment Report', icon: ClipboardList },
  { id: 'lesson-planner-global', label: 'Lesson Planner Report', icon: CalendarDays },
  { id: 'ca-marks-global', label: 'CA/Internal Marks', icon: Award },
];

export const FacultySidebar: React.FC = () => {
  const {
    activeMenu,
    activeSubmenu,
    navigate,
    sidebarCollapsed,
    navMode,
    setNavMode,
    currentCourse,
  } = useFaculty();

  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    'student-info': true,
    attendance: true,
    assessments: true,
    obe: true,
    'my-communities': true,
    timetable: true,
    'attendance-reports': true,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const activeMenusList = navMode === 'course' ? COURSE_COMMUNITY_MENUS : GLOBAL_COMMUNITY_MENUS;

  const filteredItems = activeMenusList.filter((item) => {
    if (!searchTerm) return true;
    const matchParent = item.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchChild = item.submenus?.some((sub) =>
      sub.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchParent || matchChild;
  });

  return (
    <aside
      className={`fixed top-14 sm:top-16 left-0 bottom-0 z-20 bg-[#1d2434] text-[#a0aec0] flex flex-col transition-all duration-300 border-r border-[#2d3748] select-none ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Bar inside Sidebar matching Screenshots: Back arrow button and Search */}
      <div className="p-3 border-b border-[#2d3748]/70 flex items-center gap-2">
        {navMode === 'course' ? (
          <button
            onClick={() => {
              setNavMode('global');
              navigate('dashboard', 'quick-access', 'global');
            }}
            title="Back to Global Home"
            className="w-7 h-7 rounded-lg bg-[#2d3748] hover:bg-purple-700 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              setNavMode('course');
              navigate('student-info', 'details', 'course');
            }}
            title="Open Subject Community"
            className="w-7 h-7 rounded-lg bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 text-xs font-bold"
          >
            SC
          </button>
        )}

        {!sidebarCollapsed && (
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#141a28] text-gray-200 placeholder-gray-500 text-xs rounded-lg pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-700/60"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" />
          </div>
        )}
      </div>

      {/* Mode Indicator Banner */}
      {!sidebarCollapsed && (
        <div className="px-3 py-1.5 bg-[#141a28]/60 border-b border-[#2d3748]/50 flex items-center justify-between text-[10px] font-bold">
          <span className="text-purple-300 uppercase tracking-wider">
            {navMode === 'course' ? 'SUBJECT COMMUNITY' : 'GLOBAL CAMPUS'}
          </span>
          <span className="text-gray-400 font-mono">
            {navMode === 'course' ? currentCourse.code : 'ACU'}
          </span>
        </div>
      )}

      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 custom-scrollbar">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const hasSubmenus = item.submenus && item.submenus.length > 0;
          const isExpanded = expandedMenus[item.id] || searchTerm.length > 0;
          const isActiveMenu = activeMenu === item.id;

          return (
            <div key={item.id} className="text-xs">
              {/* Menu Item Button */}
              <button
                onClick={() => {
                  if (hasSubmenus) {
                    toggleExpand(item.id);
                  }
                  navigate(item.id, item.submenus?.[0]?.id, navMode);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all group cursor-pointer ${
                  isActiveMenu && !hasSubmenus
                    ? 'bg-[#7047eb] text-white shadow-sm'
                    : isActiveMenu
                    ? 'bg-[#2d3748] text-white'
                    : 'text-[#94a3b8] hover:bg-[#2d3748]/60 hover:text-white'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                      isActiveMenu ? 'text-white' : 'text-[#94a3b8] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {!sidebarCollapsed && (
                    <span className="truncate tracking-tight">{item.label}</span>
                  )}
                </div>

                {!sidebarCollapsed && hasSubmenus && (
                  <div className="text-gray-400 pl-1">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenus */}
              {!sidebarCollapsed && hasSubmenus && isExpanded && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 animate-in fade-in duration-150">
                  {item.submenus!.map((sub) => {
                    const isSubActive = isActiveMenu && activeSubmenu === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => navigate(item.id, sub.id, navMode)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                          isSubActive
                            ? 'bg-[#7047eb] text-white font-semibold shadow-xs'
                            : 'text-[#94a3b8] hover:text-white hover:bg-[#2d3748]/40'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSubActive ? 'bg-white' : 'bg-[#64748b]'
                          }`}
                        />
                        <span className="truncate">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer System Version matching PDF screenshot */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-[#2d3748]/60 text-[10px] text-gray-500 flex items-center justify-between">
          <span>AMS AUTONOMOUS ULTIMATE_PLUS</span>
          <span className="font-mono text-purple-400">v4.4.1.20</span>
        </div>
      )}
    </aside>
  );
};

