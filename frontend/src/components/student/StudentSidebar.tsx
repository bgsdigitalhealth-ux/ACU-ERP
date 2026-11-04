import React, { useState } from 'react';
import {
  Search,
  Home,
  User,
  Users,
  Calendar,
  CalendarDays,
  Clock,
  CheckSquare,
  MessageSquare,
  LayoutGrid,
  Mail,
  Award,
  Video,
  FileBarChart,
  BookOpen,
  Receipt,
  Target,
  Sparkles,
  CalendarX2,
  Bus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenus?: { id: string; label: string }[];
}

const SIDEBAR_ITEMS: SidebarMenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    submenus: [
      { id: 'my-courses', label: 'My Courses' },
      { id: 'home-dashboard', label: 'Home Dashboard' },
      { id: 'overview', label: 'Dashboard / Overview' },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    submenus: [
      { id: 'my-profile', label: 'My profile' },
      { id: 'change-password', label: 'Change password' },
    ],
  },
  {
    id: 'mentoring',
    label: 'Mentoring & Guidance',
    icon: Users,
  },
  {
    id: 'timetables',
    label: 'Timetables',
    icon: Calendar,
    submenus: [
      { id: 'timetable', label: 'Timetable' },
      { id: 'external-exam', label: 'External Exam Timetable' },
    ],
  },
  {
    id: 'academic-calendar',
    label: 'Academic Calendar',
    icon: CalendarDays,
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: Clock,
    submenus: [
      { id: 'course-wise', label: 'Course Wise Report' },
      { id: 'week-wise', label: 'Week-wise Report' },
      { id: 'daily', label: 'Daily Attendance' },
    ],
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: CheckSquare,
  },
  {
    id: 'surveys',
    label: 'Feedback And Surveys',
    icon: MessageSquare,
    submenus: [
      { id: 'course-survey', label: 'Course Survey' },
      { id: 'general-survey', label: 'General Survey' },
      { id: 'faculty-eval', label: 'Faculty Evaluation' },
    ],
  },
  {
    id: 'applications',
    label: 'Applications & Registrations',
    icon: LayoutGrid,
    submenus: [
      { id: 'regular-exam', label: 'Regular Exam' },
      { id: 'other-applications', label: 'Other Applications' },
      { id: 'grace-mark', label: 'Grace Mark' },
      { id: 'cbe-semterm', label: 'CBE / Sem term' },
    ],
  },
  {
    id: 'messages',
    label: 'Message Box',
    icon: Mail,
    submenus: [
      { id: 'inbox', label: 'Inbox' },
    ],
  },
  {
    id: 'coe',
    label: 'Controller Of Examination',
    icon: Award,
    submenus: [
      { id: 'view-answer-booklet', label: 'View Answer Booklet' },
      { id: 'view-results', label: 'View Results' },
      { id: 'makeup-backlog', label: 'Makeup / Backlog Registration' },
      { id: 'apply-rv-rt', label: 'Apply RV/RT' },
      { id: 'summer-term', label: 'Summer Term' },
      { id: 'hall-ticket', label: 'End Term / Mid Term Hall Ticket' },
      { id: 're-registration', label: 'Re-Registration' },
    ],
  },
  {
    id: 'meetings',
    label: 'Online Meetings',
    icon: Video,
  },
  {
    id: 'results',
    label: 'Results',
    icon: FileBarChart,
    submenus: [
      { id: 'assessment-marks', label: 'Assessment Marks' },
    ],
  },
  {
    id: 'resources',
    label: 'Resource Repository',
    icon: BookOpen,
    submenus: [
      { id: 'my-resources', label: 'My Resources' },
    ],
  },
  {
    id: 'fees',
    label: 'My Fee',
    icon: Receipt,
    submenus: [
      { id: 'pay-fee', label: 'Pay Fee' },
      { id: 'receipts', label: 'Receipts' },
      { id: 'challans', label: 'Challans' },
      { id: 'online-payments', label: 'Online Payments' },
    ],
  },
  {
    id: 'outcomes',
    label: 'Learning Outcomes',
    icon: Target,
    submenus: [
      { id: 'program-outcomes', label: 'Program Outcomes' },
      { id: 'course-outcomes', label: 'Course Outcomes' },
      { id: 'student-performance', label: 'Student Performance Outcomes' },
    ],
  },
  {
    id: 'credits',
    label: 'Additional Credits/ Activity Points',
    icon: Sparkles,
    submenus: [
      { id: 'apply-credits', label: 'Apply' },
    ],
  },
  {
    id: 'leave',
    label: 'Leave Management',
    icon: CalendarX2,
    submenus: [
      { id: 'apply-leave', label: 'Apply For Leave' },
      { id: 'applied-leaves', label: 'Applied Leave(s)' },
    ],
  },
  {
    id: 'transport',
    label: 'Transportation Management',
    icon: Bus,
    submenus: [
      { id: 'application-request', label: 'Application Request' },
      { id: 'route-change', label: 'Route Change / Cancellation Request' },
    ],
  },
];

export const StudentSidebar: React.FC = () => {
  const { activeMenu, activeSubmenu, navigate, sidebarCollapsed } = useStudent();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    home: true,
    profile: false,
    timetables: false,
    attendance: false,
    surveys: false,
    applications: false,
    coe: false,
    fees: false,
    outcomes: false,
    transport: false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const filteredItems = SIDEBAR_ITEMS.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchParent = item.label.toLowerCase().includes(term);
    const matchSub = item.submenus?.some((s) => s.label.toLowerCase().includes(term));
    return matchParent || matchSub;
  });

  return (
    <aside
      className={`fixed top-14 sm:top-16 left-0 bottom-0 z-20 bg-[#1d2434] text-[#a0aec0] flex flex-col transition-all duration-300 border-r border-[#2d3748] select-none ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Search Bar matching Page 1 PDF */}
      {!sidebarCollapsed && (
        <div className="p-3 border-b border-[#2d3748]/60">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#161c28] text-xs text-gray-200 placeholder-gray-500 rounded-md pl-3 pr-8 py-2 border border-transparent focus:border-[#7047eb] outline-hidden transition-all"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 space-y-0.5 custom-scrollbar">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActiveMenu = activeMenu === item.id;
          const isExpanded = expandedMenus[item.id] || searchTerm.length > 0;
          const hasSubmenus = item.submenus && item.submenus.length > 0;

          return (
            <div key={item.id} className="px-2">
              {/* Parent Menu Row */}
              <button
                onClick={() => {
                  if (hasSubmenus) {
                    toggleExpand(item.id);
                    if (!isActiveMenu && item.submenus && item.submenus.length > 0) {
                      navigate(item.id, item.submenus[0].id);
                    }
                  } else {
                    navigate(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer group ${
                  isActiveMenu
                    ? 'bg-[#7047eb] text-white shadow-sm'
                    : 'text-[#cbd5e1] hover:bg-[#252e42] hover:text-white'
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

              {/* Submenu Children */}
              {!sidebarCollapsed && hasSubmenus && isExpanded && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.submenus!.map((sub) => {
                    const isSubActive = isActiveMenu && activeSubmenu === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => navigate(item.id, sub.id)}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer text-left ${
                          isSubActive
                            ? 'text-white bg-[#2e374d] font-bold border-l-2 border-[#7047eb]'
                            : 'text-[#94a3b8] hover:text-white hover:bg-[#232b3e]'
                        }`}
                      >
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

      {/* Footer System Version */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-[#2d3748]/60 text-[10px] text-gray-500 flex items-center justify-between">
          <span>AMS ULTIMATE PLUS</span>
          <span className="font-mono text-purple-400">v4.4.1.20</span>
        </div>
      )}
    </aside>
  );
};

