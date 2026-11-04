import React from 'react';
import {
  LayoutDashboard,
  Building,
  Layers,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const CollegeAdminSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'college-profile', label: 'College Profile', icon: Building },
    { id: 'dept-management', label: 'Department Management', icon: Layers },
    { id: 'hod-management', label: 'HOD Management', icon: Users },
    { id: 'faculty-management', label: 'Faculty Management', icon: GraduationCap },
    { id: 'exam-management', label: 'Examination Management', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-2xs"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-[#260548] via-[#350a63] to-[#20043c] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-800/40 lg:hidden">
          <span className="font-bold text-sm text-purple-200">College Admin Menu</span>
          <button onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-lg border border-purple-300/40'
                    : 'text-purple-100/90 hover:bg-purple-900/40 hover:text-white'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-purple-900/40 text-center">
          <span className="text-[10px] text-purple-300/60 font-serif tracking-wider uppercase block">
            College Administration
          </span>
        </div>
      </aside>
    </>
  );
};

