import React, { useState } from 'react';
import {
  Bell,
  Grid,
  Menu,
  ChevronDown,
  User,
  LogOut,
  BookOpen,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useFaculty } from '../../context/FacultyContext';

interface FacultyHeaderProps {
  onLogout: () => void;
}

export const FacultyHeader: React.FC<FacultyHeaderProps> = ({ onLogout }) => {
  const { profile, toggleSidebar, currentCourse, courses, setCurrentCourse, navigate } = useFaculty();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-[#1d2434] text-white z-30 flex items-center justify-between px-3 sm:px-6 border-b border-[#2d3748] shadow-sm select-none">
      {/* Left Branding & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-1.5 rounded-lg hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* ACU ERP Crest & University Title */}
        <div className="flex items-center gap-2.5">
          <img
            src="/roles/faculty-color-icon.png"
            alt="ACU ERP"
            className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 border border-purple-400/30"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              ACU ERP
              <span className="text-[10px] font-semibold text-purple-300 px-1.5 py-0.2 bg-purple-900/60 rounded">
                Faculty Portal
              </span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium tracking-tight">
              Adichunchanagiri University, B.G. Nagara
            </span>
          </div>
        </div>

        {/* Course quick badge */}
        <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-gray-700">
          <div className="flex items-center gap-2 bg-[#2d3748]/70 px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-600/50">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-white">{currentCourse.code}</span>
            <span className="text-gray-400">|</span>
            <span className="truncate max-w-[200px]">{currentCourse.shortName}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Pill matching PDF screenshot */}
        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/10 text-gray-200 border border-gray-600">
          FACULTY
        </span>

        {/* 9-Dots Quick App Launcher matching screenshot */}
        <div className="relative">
          <button
            onClick={() => {
              setShowAppLauncher(!showAppLauncher);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            title="App Launcher"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Grid className="w-4 h-4" />
          </button>

          {showAppLauncher && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 text-xs font-bold text-gray-700 uppercase">
                <span>Quick Modules</span>
                <button onClick={() => setShowAppLauncher(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Mark Attendance', icon: 'Attendance', action: () => navigate('attendance', 'mark-attendance', 'course') },
                  { label: 'Lesson Plan', icon: 'Plan', action: () => navigate('lesson-planner', 'proposed-plan', 'course') },
                  { label: 'Assessments', icon: 'Assess', action: () => navigate('assessments', 'management', 'course') },
                  { label: 'Question Bank', icon: 'Questions', action: () => navigate('assessments', 'question-pool', 'course') },
                  { label: 'Course Handout', icon: 'Handout', action: () => navigate('course-handout', 'handout', 'course') },
                  { label: 'Timetable', icon: 'Timetable', action: () => navigate('timetable', 'batch-section', 'global') },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.action();
                      setShowAppLauncher(false);
                    }}
                    className="p-2 rounded-lg hover:bg-purple-50 text-center flex flex-col items-center gap-1 group transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors text-xs font-bold">
                      {item.icon.charAt(0)}
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700 leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowAppLauncher(false);
              setShowProfileMenu(false);
            }}
            title="Notifications"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-[#1d2434] px-4 py-2.5 text-white flex items-center justify-between text-xs font-bold">
                <span>Faculty Notifications (3 Unread)</span>
                <span className="text-[10px] bg-purple-600 px-1.5 py-0.5 rounded text-purple-100">Live</span>
              </div>
              <div className="divide-y divide-gray-100 text-xs max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-purple-50/50 cursor-pointer transition-colors">
                  <div className="font-bold text-gray-900">IA-1 Marks Deadline Notification</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">
                    Controller of Examination: Enter continuous assessment marks for Batch 2024MBBS01 before 20-11-2024.
                  </div>
                </div>
                <div className="p-3 hover:bg-purple-50/50 cursor-pointer transition-colors">
                  <div className="font-bold text-gray-900">Student Clinical Duty Leave Alert</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">
                    Saif Basha (20241MBBS0003) requested Clinical Posting Leave for MEDICON Conference.
                  </div>
                </div>
                <div className="p-3 hover:bg-purple-50/50 cursor-pointer transition-colors">
                  <div className="font-bold text-gray-900">OBE Attainment Review Scheduled</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">
                    Dean Academics requested verification of CO-PO direct attainment calculations.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card & Dropdown matching screenshot */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowAppLauncher(false);
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-[#2d3748] transition-colors cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-purple-700 border border-purple-400 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              {profile.fullName
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white truncate max-w-[130px] leading-tight">
                {profile.fullName}
              </span>
              <span className="text-[10px] text-gray-400 font-mono leading-tight">
                Code: {profile.empCode}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
          </button>

          {showProfileMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setShowProfileMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[9999] animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-80px)] overflow-y-auto">
                <div className="p-4 bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
                  <div className="font-bold text-sm">{profile.fullName}</div>
                  <div className="text-xs text-purple-200 mt-0.5">{profile.designation}</div>
                  <div className="text-[11px] text-gray-300 font-mono mt-1">
                    Emp ID: {profile.empCode} • {profile.department}
                  </div>
                </div>

                {/* Course switch options */}
                <div className="p-2 border-b border-gray-100">
                  <div className="text-[10px] font-bold text-gray-500 uppercase px-2 py-1">Active Teaching Course</div>
                  {courses.map((course) => (
                    <button
                      key={course.code}
                      onClick={() => {
                        setCurrentCourse(course);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        currentCourse.code === course.code
                          ? 'bg-purple-100 text-purple-900 font-bold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{course.code} - {course.shortName}</span>
                      {currentCourse.code === course.code && <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />}
                    </button>
                  ))}
                </div>

                <div className="p-2 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      navigate('dashboard', 'quick-access', 'global');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    Quick Access Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('student-info', 'details', 'course');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 text-gray-700 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    My Course Community
                  </button>
                </div>

                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-bold cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    Logout from Faculty Portal
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dedicated Header Logout Button - Always Visible */}
        <button
          onClick={onLogout}
          title="Logout from Faculty Portal"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-400/40 text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
