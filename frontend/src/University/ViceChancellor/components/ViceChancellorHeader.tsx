import React, { useState } from 'react';
import {
  Landmark,
  Bell,
  ChevronDown,
  Search,
  HelpCircle,
  GraduationCap,
  LogOut,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ViceChancellorHeaderProps {
  onLogout?: () => void;
  notificationCount?: number;
  viceChancellorName?: string;
  onSearch?: (query: string) => void;
}

export const ViceChancellorHeader: React.FC<ViceChancellorHeaderProps> = ({
  onLogout,
  notificationCount = 1,
  viceChancellorName = 'Prof. (Dr.) Ramesh K.',
  onSearch,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="w-full text-white flex flex-col shadow-md select-none sticky top-0 z-40">
      {/* 1. Top Emblem Bar (Karnataka Higher Education ERP) with Architectural Skyline */}
      <div className="w-full px-4 sm:px-6 py-1.5 bg-gradient-to-r from-[#200e4e] via-[#331168] to-[#1e0d47] border-b border-purple-900/60 flex items-center justify-between relative overflow-hidden">
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-6 h-6 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center font-black text-xs shadow-xs">
            <Landmark className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-black tracking-tight text-white">
              Karnataka Higher Education ERP
            </span>
            <span className="hidden sm:inline text-[11px] text-purple-200/80 font-medium">
              | University Management System
            </span>
          </div>
        </div>

        {/* State Heritage Silhouette subtle graphic */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-semibold text-purple-200/90 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold border border-white/15">
            Apex Executive Suite
          </span>
          <span>Department of Higher Education, Govt. of Karnataka</span>
        </div>
      </div>

      {/* 2. Main Executive Header Bar */}
      <div className="w-full px-4 sm:px-6 py-2.5 bg-[#180a3a] border-b border-purple-950 flex items-center justify-between gap-4">
        {/* Left: Vice Chancellor Portal / University Executive Dashboard */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-purple-700/80 border border-purple-400/40 text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-black text-white leading-tight flex items-center gap-2">
              <span>Vice Chancellor Portal</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] font-semibold text-purple-200/70 leading-snug">
              University Executive Dashboard
            </div>
          </div>
        </div>

        {/* Right Section: Search Bar + Bell + Help + Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Quick Search */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
            <input
              type="text"
              placeholder="Search ERP modules, files..."
              value={searchVal}
              onChange={handleSearchChange}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-purple-950/70 border border-purple-800/80 rounded-xl text-white placeholder-purple-300/60 focus:outline-hidden focus:ring-1 focus:ring-purple-400 transition-all font-medium"
            />
          </div>

          {/* Notification Bell with Badge '1' */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white transition-all cursor-pointer border border-purple-700/50"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-900">Statutory Notifications</span>
                  <button
                    onClick={() => setIsNotifOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                    <div className="font-bold text-purple-950">Board of Governors Meeting</div>
                    <div className="text-[11px] text-purple-700 mt-0.5">
                      Scheduled for 15 Nov 2026 at Senate Chamber.
                    </div>
                    <span className="text-[10px] text-purple-500 font-semibold">1 hour ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-900">7 Faculty Selections for Sanction</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Statutory committee reports placed on VC desk.
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">3 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Button (?) */}
          <button
            onClick={() => alert('Vice Chancellor Executive Helpdesk & Statutory Manual available at VC Secretariat.')}
            className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white transition-all cursor-pointer border border-purple-700/50"
            title="Executive Help & Statutes"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Profile Capsule */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/60 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                RK
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-white leading-tight">
                  {viceChancellorName}
                </div>
                <div className="text-[10px] font-semibold text-purple-200/80">
                  Vice Chancellor
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-xs font-black text-purple-950">{viceChancellorName}</div>
                  <div className="text-[11px] text-purple-800 font-semibold">Chief Academic &amp; Executive Head</div>
                  <div className="text-[10px] text-purple-600 font-mono mt-1">VC-EXEC-CLEARANCE: LEVEL-1</div>
                </div>

                <div className="mt-2 py-1 space-y-1 text-xs">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Statutory Authority Active</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Digital Signature Token: Ready</span>
                  </div>
                </div>

                {onLogout && (
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-rose-100"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit to University Portal</span>
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