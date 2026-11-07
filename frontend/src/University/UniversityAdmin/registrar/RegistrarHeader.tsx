import React, { useState } from 'react';
import { Building2, Bell, ChevronDown, LogOut, Menu, User, ShieldCheck } from 'lucide-react';

interface RegistrarHeaderProps {
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const RegistrarHeader: React.FC<RegistrarHeaderProps> = ({ onLogout, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="relative w-full bg-gradient-to-r from-[#29084e] via-[#3a0e69] to-[#250646] text-white px-4 sm:px-8 py-3.5 shadow-lg border-b border-[#581c87] z-40 select-none overflow-visible">
      {/* Golden swoosh accent matching image with isolated overflow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[330px] top-0 bottom-0 w-36 pointer-events-none hidden xl:block opacity-90">
          <svg viewBox="0 0 140 70" fill="none" className="w-full h-full">
            <path d="M0 0 C40 20, 80 50, 140 70 L140 0 Z" fill="url(#regGoldSwoosh)" />
            <defs>
              <linearGradient id="regGoldSwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="60%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-[1850px] mx-auto flex items-center justify-between gap-4 relative z-10">
        {/* Left: ACU Crest + Titles */}
        <div className="flex items-center gap-4 sm:gap-6">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-12 relative shrink-0">
              <svg viewBox="0 0 60 70" className="w-full h-full drop-shadow-md">
                <path
                  d="M30 2 L56 12 C56 42 30 65 30 68 C30 65 4 42 4 12 Z"
                  fill="#ffffff"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />
                <circle cx="30" cy="24" r="14" fill="#a855f7" opacity="0.15" />
                <path
                  d="M30 14 C26 22 20 25 18 31 C22 31 25 28 30 35 C35 28 38 31 42 31 C40 25 34 22 30 14 Z"
                  fill="#7e22ce"
                />
                <path
                  d="M20 38 C25 36 35 36 40 38 C37 45 23 45 20 38 Z"
                  fill="#fbbf24"
                />
                <text
                  x="30"
                  y="53"
                  textAnchor="middle"
                  fill="#581c87"
                  fontSize="8.5"
                  fontWeight="900"
                  fontFamily="sans-serif"
                >
                  ACU
                </text>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">ACU</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-purple-200 tracking-tight leading-none">
                Adichunchanagiri University
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-9 w-[1px] bg-purple-400/40" />

          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
              Examination Management System
            </h1>
            <p className="text-xs sm:text-[13px] font-semibold text-amber-300">
              Registrar (Evaluation) – University Login
            </p>
          </div>
        </div>

        {/* Right: College/Univ pill, Notifications, Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-xs font-semibold text-purple-100 shadow-inner">
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>BGS Medical College &amp; Hospital</span>
          </div>

          <button className="relative p-2 rounded-xl text-purple-200 hover:text-white hover:bg-purple-800/50 transition-colors cursor-pointer">
            <Bell className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#2e0956]">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full hover:bg-purple-800/40 transition-colors border border-transparent hover:border-purple-400/30 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-purple-400/40">
                REG
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  Registrar (Evaluation)
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setDropdownOpen(false)}
                />

                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-[9999] border border-purple-200 text-gray-800 animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-80px)] overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-extrabold text-[#29084e]">Dr. N. B. Ramesh</p>
                    <p className="text-[11px] text-gray-500 font-medium">Registrar (Evaluation), ACU</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold w-fit border border-emerald-100">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Evaluation &amp; Results Authority</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <div className="px-4 py-2 text-[11px] text-gray-500 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>Office of Registrar Evaluation</span>
                    </div>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Logout / Exit Session</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dedicated Header Logout Button - Always Visible */}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Logout / Exit Session"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-400/40 text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
