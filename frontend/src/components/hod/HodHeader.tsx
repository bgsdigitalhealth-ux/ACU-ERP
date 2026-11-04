import React, { useState } from 'react';
import { Building2, Bell, ChevronDown, User, LogOut, Settings, ShieldCheck, Menu } from 'lucide-react';
import { useHod } from '../../context/HodContext';

interface HodHeaderProps {
  onLogout: () => void;
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
}

export const HodHeader: React.FC<HodHeaderProps> = ({ onLogout, onOpenSettings, onToggleSidebar }) => {
  const { hodSession } = useHod();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="relative w-full bg-gradient-to-r from-[#29084e] via-[#3a0e69] to-[#250646] text-white px-4 sm:px-8 py-3.5 shadow-lg border-b border-[#581c87] z-40 select-none overflow-visible">
      {/* Golden swoosh accent matching image with isolated overflow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[330px] top-0 bottom-0 w-36 pointer-events-none hidden xl:block opacity-90">
          <svg viewBox="0 0 140 70" fill="none" className="w-full h-full">
            <path d="M0 0 C40 20, 80 50, 140 70 L140 0 Z" fill="url(#hodGoldSwoosh)" />
            <defs>
              <linearGradient id="hodGoldSwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="60%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-[1850px] mx-auto flex items-center justify-between gap-4 relative z-10">
        {/* Left: ACU Logo, University Title & EMS Subtitle */}
        <div className="flex items-center gap-3 sm:gap-6">
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
                <path d="M30 6 L52 15 C52 40 30 61 30 63 C30 61 8 40 8 15 Z" fill="#fff7ed" />
                <text x="30" y="34" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="17" fontFamily="serif">
                  ACU
                </text>
                <circle cx="30" cy="46" r="6" fill="#e11d48" />
              </svg>
            </div>

            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white block leading-none">
                ACU
              </span>
              <span className="text-[11px] font-medium text-purple-200 tracking-wide block mt-1">
                Adichunchanagiri University
              </span>
            </div>
          </div>

          <div className="h-10 w-[1.5px] bg-purple-400/40 hidden md:block"></div>

          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Examination Management System
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-amber-300 leading-tight mt-0.5 tracking-normal">
              Head of the Department (HOD) – Dashboard
            </p>
          </div>
        </div>

        {/* Right: College Badge, Notifications Bell, HOD Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Assigned College Badge Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-xs font-bold text-white shadow-2xs">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span>{hodSession?.collegeName || 'BGS Medical College & Hospital'}</span>
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 transition-colors border border-purple-400/30 text-white cursor-pointer"
            title="HOD Notifications"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center ring-2 ring-purple-950 shadow-md">
              3
            </span>
          </button>

          {/* User Profile Pill with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/70 border border-purple-400/30 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center ring-2 ring-white/80 shadow-sm shrink-0">
                <User className="w-4 h-4 text-white stroke-[2.5]" />
              </div>

              <div className="text-left hidden md:block">
                <span className="block text-xs font-bold text-white leading-tight">
                  HOD – {hodSession?.department || 'Physiology'}
                </span>
                <span className="block text-[10px] text-amber-300 font-medium leading-none truncate max-w-[140px]">
                  {hodSession?.fullName || 'Dr. Ranjan Kumar'}
                </span>
              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-purple-200 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setDropdownOpen(false)}
                />

                <div className="absolute right-0 top-full mt-2 w-64 bg-white text-[#1e293b] rounded-2xl shadow-2xl border border-purple-200 py-2 z-[9999] animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-80px)] overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-[#2e1065]">{hodSession?.fullName || 'Dr. Ranjan Kumar'}</p>
                    <p className="text-[11px] text-gray-500">{hodSession?.email || 'hod.physiology@bgs.edu.in'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      Dept: {hodSession?.department || 'Physiology'}
                    </span>
                  </div>

                  <div className="py-1 text-xs">
                    {onOpenSettings && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenSettings();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 text-gray-700 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-purple-600" />
                        <span>Account &amp; Security Settings</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2.5 px-4 py-2 text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Authorized Department Lead</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors"
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
          <button
            onClick={onLogout}
            title="Logout / Exit Session"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-400/40 text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
