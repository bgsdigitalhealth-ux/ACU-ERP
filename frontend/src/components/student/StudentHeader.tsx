import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  ArrowLeft,
  Bell,
  Grid,
  ChevronDown,
  User,
  KeyRound,
  LogOut,
  Calendar,
  BookOpen,
  Receipt,
  FileCheck2,
  CalendarClock,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

interface StudentHeaderProps {
  onLogout: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ onLogout }) => {
  const { profile, toggleSidebar, navigate, messages } = useStudent();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const appGridRef = useRef<HTMLDivElement>(null);

  const unreadMessages = messages.filter((m) => !m.isRead);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationMenu(false);
      }
      if (appGridRef.current && !appGridRef.current.contains(event.target as Node)) {
        setShowAppGrid(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Navigation Controls & University Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('home', 'my-courses')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Back to Home Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Sidebar Hamburger Toggle */}
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Toggle Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* University Brand & Campus Name */}
        <div className="flex items-center gap-2.5">
          <img
            src="/roles/acu-logo.png"
            alt="ACU Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 leading-tight">
              Adichunchanagiri University, B.G. Nagara
            </h1>
            <p className="text-[10px] text-gray-500 font-medium hidden sm:block">
              Examination &amp; Student Academic Governance Portal
            </p>
          </div>
        </div>
      </div>

      {/* Right: Role Badge, Quick Launchers, Notification Bell & Student Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role Badge: STUDENT */}
        <div className="hidden sm:flex items-center px-2.5 py-1 rounded-md border border-gray-300 text-[11px] font-bold text-gray-600 tracking-wider bg-gray-50 uppercase">
          STUDENT
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 relative transition-colors"
            title="University Circulars & Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadMessages.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadMessages.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-gray-800">
                  Circulars &amp; Announcements ({unreadMessages.length})
                </span>
                <button
                  onClick={() => {
                    navigate('messages', 'inbox');
                    setShowNotificationMenu(false);
                  }}
                  className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {messages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      navigate('messages', 'inbox');
                      setShowNotificationMenu(false);
                    }}
                    className={`p-3 hover:bg-purple-50/50 cursor-pointer transition-colors ${
                      !msg.isRead ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-purple-700">
                        {msg.circularNo || msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-800 font-medium line-clamp-2 leading-snug">
                      {msg.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 9-Dots App Grid Launcher */}
        <div className="relative" ref={appGridRef}>
          <button
            onClick={() => setShowAppGrid(!showAppGrid)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            title="ACU ERP Modules"
          >
            <Grid className="w-5 h-5 text-gray-600" />
          </button>

          {showAppGrid && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 grid grid-cols-3 gap-2 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  navigate('home', 'my-courses');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <BookOpen className="w-5 h-5 mb-1 text-purple-600" />
                <span className="text-[10px] font-bold text-center">Courses</span>
              </button>
              <button
                onClick={() => {
                  navigate('timetables', 'timetable');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <Calendar className="w-5 h-5 mb-1 text-blue-600" />
                <span className="text-[10px] font-bold text-center">Timetable</span>
              </button>
              <button
                onClick={() => {
                  navigate('attendance', 'course-wise');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <CalendarClock className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-[10px] font-bold text-center">Attendance</span>
              </button>
              <button
                onClick={() => {
                  navigate('coe', 'view-results');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <FileCheck2 className="w-5 h-5 mb-1 text-amber-600" />
                <span className="text-[10px] font-bold text-center">Results</span>
              </button>
              <button
                onClick={() => {
                  navigate('fees', 'pay-fee');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <Receipt className="w-5 h-5 mb-1 text-rose-600" />
                <span className="text-[10px] font-bold text-center">My Fee</span>
              </button>
              <button
                onClick={() => {
                  navigate('applications', 'other-applications');
                  setShowAppGrid(false);
                }}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <Grid className="w-5 h-5 mb-1 text-indigo-600" />
                <span className="text-[10px] font-bold text-center">Helpdesk</span>
              </button>
            </div>
          )}
        </div>

        {/* Student Profile Avatar & Name with Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src={profile.photoUrl || '/student/haribhushan_photo.jpg'}
              alt={profile.fullName}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-purple-200 shadow-2xs"
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-gray-800 leading-tight">
                HARIBHUSHAN KU..
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                Adm No: {profile.admissionNo}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[9999] animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-100 bg-purple-50/40">
                <p className="text-xs font-bold text-gray-900">{profile.fullName}</p>
                <p className="text-[11px] text-purple-700 font-semibold">{profile.program}</p>
                <p className="text-[10px] text-gray-500">Roll: {profile.rollNo} • Sem: {profile.currentSemester}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('profile', 'my-profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('profile', 'change-password');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-gray-500" />
                  <span>Change Password</span>
                </button>

                <button
                  onClick={() => {
                    navigate('leave', 'apply-leave');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Leave Management</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-600" />
                  <span>Logout from Student Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Header Logout Button - Always Visible */}
        <button
          onClick={onLogout}
          title="Logout from Student Portal"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

