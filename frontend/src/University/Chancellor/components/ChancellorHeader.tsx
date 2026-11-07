import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Landmark,
  ShieldAlert,
  X
} from 'lucide-react';

interface ChancellorHeaderProps {
  onLogout?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications?: () => void;
  notificationCount?: number;
}

export const ChancellorHeader: React.FC<ChancellorHeaderProps> = ({
  onLogout,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  notificationCount = 1,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  return (
    <header className="w-full bg-[#0d1b3e] text-white flex flex-col shadow-md border-b border-indigo-900/60 sticky top-0 z-40 select-none">
      {/* Top Banner (Apex Title Bar) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 bg-gradient-to-r from-[#0b1736] via-[#10224d] to-[#0b1736] flex items-center justify-between border-b border-white/10">
        {/* Left: University ERP Crest & Platform Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-0.5 flex items-center justify-center shadow-md shadow-amber-500/20">
            <div className="w-full h-full bg-[#0b1736] rounded-full flex items-center justify-center">
              <Landmark className="w-4 h-4 text-amber-300 stroke-[2.2]" />
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>University ERP</span>
              <span className="text-white/40 font-normal">|</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200 hidden md:inline">
                Integrated University Management System
              </span>
            </div>
          </div>
        </div>

        {/* Right / Center Apex Role Title */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/15 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-bold text-amber-300 tracking-wide">
              University Chancellor – ERP Role
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Header Navigation Bar: Portal Branding, Search Bar, Notifications & Profile */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2.5 bg-[#0f214d] flex items-center justify-between gap-4">
        {/* Left: Chancellor Portal Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 shadow-inner">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white leading-none">
              University ERP
            </div>
            <div className="text-[11px] font-semibold text-sky-200/80 leading-snug">
              Chancellor Portal
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search reports, departments, proposals..."
              className="w-full bg-[#172c63] hover:bg-[#1a3372] focus:bg-white focus:text-slate-900 text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2 border border-indigo-400/30 focus:border-indigo-400 focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile Pill */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationToast(!showNotificationToast);
                if (onOpenNotifications) onOpenNotifications();
              }}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0f214d] animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Toast */}
            {showNotificationToast && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-indigo-100 p-3 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-700">
                  <span>Apex Alerts & Decisions</span>
                  <button onClick={() => setShowNotificationToast(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2.5 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      5 New Program Proposals Pending
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Academic Council and Vice-Chancellor recommended for Chancellor assent.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 bg-[#172c63] hover:bg-[#1f3a80] border border-white/15 rounded-full px-3 py-1.5 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-900 font-black text-xs flex items-center justify-center shadow-xs">
                C
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">
                Chancellor
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-indigo-100 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">The Chancellor</div>
                  <div className="text-[10px] text-slate-500">Apex Institutional Authority</div>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Switch Role / Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChancellorHeader;
