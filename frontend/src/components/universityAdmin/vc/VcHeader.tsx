import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Grid,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Landmark,
  ShieldCheck,
  X,
  FileText,
  Calendar,
  AlertTriangle,
  Award
} from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

interface VcHeaderProps {
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onNavigate?: (tab: string) => void;
}

export const VcHeader: React.FC<VcHeaderProps> = ({
  onLogout,
  onToggleSidebar,
  onNavigate
}) => {
  const { vcApprovals } = useUniversityAdmin();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const appLauncherRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (appLauncherRef.current && !appLauncherRef.current.contains(event.target as Node)) {
        setShowAppLauncher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAppLaunch = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
    setShowAppLauncher(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-[#1d2434] text-white z-30 flex items-center justify-between px-3 sm:px-6 border-b border-[#2d3748] shadow-sm select-none">
      {/* Left Branding & Sidebar Toggle matching Teacher & Student */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            className="p-1.5 rounded-lg hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* ACU ERP Crest & University Title */}
        <div className="flex items-center gap-2.5">
          <img
            src="/roles/vice-chancellor-color-icon.png"
            alt="ACU ERP"
            className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 border border-purple-400/30"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              ACU ERP
              <span className="text-[10px] font-semibold text-purple-300 px-1.5 py-0.5 bg-purple-900/60 rounded">
                Vice-Chancellor Portal
              </span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium tracking-tight">
              Adichunchanagiri University, B.G. Nagara
            </span>
          </div>
        </div>

        {/* EMS Quick Badge matching Teacher Community Header */}
        <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-gray-700">
          <div className="flex items-center gap-2 bg-[#2d3748]/70 px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-600/50">
            <Landmark className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-white">EMS</span>
            <span className="text-gray-400">|</span>
            <span className="truncate max-w-[240px]">Examination Management System</span>
          </div>
        </div>
      </div>

      {/* Right Controls matching Teacher & Student */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Pill */}
        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/10 text-gray-200 border border-gray-600">
          VICE-CHANCELLOR
        </span>

        {/* 9-Dots Quick App Launcher matching Teacher & Student */}
        <div className="relative" ref={appLauncherRef}>
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
                  { label: 'Dashboard', icon: Landmark, tab: 'dashboard' },
                  { label: 'Exam Status', icon: Calendar, tab: 'univ-exam-status' },
                  { label: 'Approvals', icon: ShieldCheck, tab: 'exceptional-cases' },
                  { label: 'Regulations', icon: FileText, tab: 'exam-regulations' },
                  { label: 'Disciplinary', icon: AlertTriangle, tab: 'malpractice-disciplinary' },
                  { label: 'Analytics', icon: Award, tab: 'result-analysis-vc' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAppLaunch(item.tab)}
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-purple-50 text-center transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-1 group-hover:bg-[#7047eb] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-700 leading-tight line-clamp-1">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications with Badge & Dropdown matching Teacher & Student */}
        <div className="relative" ref={notificationRef}>
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
            {vcApprovals.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#1d2434]">
                {vcApprovals.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase">
                  Pending Approvals ({vcApprovals.length})
                </span>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {vcApprovals.length === 0 ? (
                  <div className="py-4 text-center text-xs text-gray-500">
                    No pending escalations. All items cleared.
                  </div>
                ) : (
                  vcApprovals.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        if (onNavigate) onNavigate('exceptional-cases');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 bg-gray-50 hover:bg-purple-50 rounded-lg border border-gray-100 transition-colors cursor-pointer text-xs"
                    >
                      <div className="font-bold text-gray-900 truncate">{app.title}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{app.institution}</div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-purple-700 font-semibold">{app.category}</span>
                        <span className="text-rose-600 font-bold">{app.urgency} Priority</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Name & Dropdown matching Teacher & Student */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowAppLauncher(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#2d3748] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-purple-400/40">
              VC
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                Prof. (Dr.) M. A. Shekar
              </span>
              <span className="text-[10px] text-gray-400 leading-tight">
                Vice-Chancellor
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">Prof. (Dr.) M. A. Shekar</p>
                <p className="text-[11px] text-gray-500">Vice-Chancellor, ACU</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold w-fit">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  <span>Executive Academic Head</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-900 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Executive Profile &amp; Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-t border-gray-100 text-left mt-1"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout / Exit Session</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Logout Button - Always Visible matching Teacher & Student */}
        <button
          onClick={onLogout}
          title="Logout"
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
