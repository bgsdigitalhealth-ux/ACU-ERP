import React, { useState } from 'react';
import { Menu, Search, Calendar, Mail, Bell, LogOut, Shield, ChevronDown, User } from 'lucide-react';
import { RoleInfo } from '../types/auth';

interface HeaderProps {
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  currentRole?: RoleInfo | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  searchTerm,
  setSearchTerm,
  currentRole,
  onLogout
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b border-[#edf2f7] px-6 flex items-center justify-between overflow-visible">
      {/* Left: Sidebar toggle & Search input */}
      <div className="flex items-center gap-5 flex-1 max-w-xl">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-[#64748b] hover:bg-[#f4f6fc] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here..."
            className="w-full bg-[#f4f6fc] text-sm text-[#1e293b] placeholder-[#8a92a6] rounded-xl pl-11 pr-10 py-2.5 outline-hidden border border-transparent focus:border-[#7047eb]/30 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-[#8a92a6] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Right: Role indicator, Date badge, Notifications, Profile & Logout */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* Active Role Pill */}
        {currentRole && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f0ebff] border border-[#dcd1fc] rounded-xl text-xs font-semibold text-[#7047eb]">
            <Shield className="w-3.5 h-3.5" />
            <span>{currentRole.title.replace(/\n/g, ' ')}</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs font-medium text-[#475569]">
          <Calendar className="w-4 h-4 text-[#7047eb]" />
          <span>November 03, 2026</span>
        </div>

        {/* Mail Icon */}
        <button className="relative p-2.5 text-[#64748b] hover:bg-[#f4f6fc] rounded-xl transition-colors cursor-pointer">
          <Mail className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#7047eb] rounded-full ring-2 ring-white"></span>
        </button>

        {/* Bell Notifications */}
        <button className="relative p-2.5 text-[#64748b] hover:bg-[#f4f6fc] rounded-xl transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#e83e8c] rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile with Dropdown */}
        <div className="relative pl-2">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7047eb]/30 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-500 hidden sm:block transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setDropdownOpen(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-[9999] border border-gray-200 text-gray-800 animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-80px)] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900">Dr. Sarah Jenkins</p>
                  <p className="text-[11px] text-gray-500">{currentRole ? currentRole.defaultEmail : 'admin@acu.edu.in'}</p>
                  {currentRole && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      {currentRole.title.replace(/\n/g, ' ')}
                    </span>
                  )}
                </div>

                <div className="py-1">
                  <div className="px-4 py-2 text-[11px] text-gray-500 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Active ERP Session</span>
                  </div>

                  {onLogout && (
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Logout / Exit to Home</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Standalone Quick Exit button */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Switch Role / Home"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#64748b] hover:text-[#e83e8c] hover:bg-[#fdeaf3] rounded-xl transition-colors border border-[#edf2f7] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Exit to Home</span>
          </button>
        )}
      </div>
    </header>
  );
};
