import React, { useState } from 'react';
import {
  Landmark,
  Bell,
  ChevronDown,
  Calendar,
  LogOut,
  X
} from 'lucide-react';

interface ViceChancellorHeaderProps {
  onLogout?: () => void;
  notificationCount?: number;
  viceChancellorName?: string;
}

export const ViceChancellorHeader: React.FC<ViceChancellorHeaderProps> = ({
  onLogout,
  notificationCount = 5,
  viceChancellorName = 'Dr. R. Sharma',
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Format today's date or matching mockup date
  const todayStr = 'Mon, 21 Apr 2025';

  return (
    <header className="w-full bg-[#0a1738] text-white flex flex-col shadow-md border-b border-indigo-950 sticky top-0 z-40 select-none">
      {/* Main Apex Navigation Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2.5 bg-gradient-to-r from-[#091535] via-[#0d1f4d] to-[#091535] flex items-center justify-between gap-4">
        
        {/* Left: Platform Title & Karnataka Higher Education ERP Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-400 p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20">
            <div className="w-full h-full bg-[#091535] rounded-xl flex items-center justify-center">
              <Landmark className="w-5 h-5 text-blue-300 stroke-[2.2]" />
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-base font-black tracking-tight text-white leading-none">
              Karnataka Higher Education ERP
            </div>
            <div className="text-[11px] font-semibold text-slate-300 leading-snug mt-0.5 hidden sm:block">
              Integrated University Management System
            </div>
          </div>
        </div>

        {/* Center: Vice Chancellor Dashboard & Responsibilities Banner */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/15 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-black text-white tracking-wide">
            Vice Chancellor — Dashboard &amp; Responsibilities
          </span>
        </div>

        {/* Right: Date, Notifications & Profile Capsule */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Date Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>{todayStr}</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-[#091535] animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-indigo-100 p-3.5 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-700">
                  <span>Executive Alerts ({notificationCount})</span>
                  <button onClick={() => setIsNotifOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2.5 py-2 text-xs">
                  <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">New research grant proposal submitted</div>
                      <div className="text-[10px] text-slate-500">2 hours ago • Extramural funding review</div>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Faculty appointment pending approval</div>
                      <div className="text-[10px] text-slate-500">4 hours ago • Statutory Selection Panel</div>
                    </div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">NAAC compliance report uploaded</div>
                      <div className="text-[10px] text-slate-500">6 hours ago • IQAC Secretariat</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full pl-1.5 pr-3 py-1 transition-all cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center border border-white/20">
                VC
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-white leading-tight">
                  {viceChancellorName}
                </div>
                <div className="text-[10px] font-semibold text-slate-300 leading-none">
                  Vice Chancellor
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300 ml-0.5" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-indigo-100 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{viceChancellorName}</div>
                  <div className="text-[10px] text-slate-500">Executive Head of University</div>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
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

export default ViceChancellorHeader;
