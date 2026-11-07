import React from 'react';
import {
  Home,
  Building2,
  GraduationCap,
  FileCheck,
  FlaskConical,
  Users,
  Coins,
  Compass,
  UserCheck,
  Landmark,
  ShieldCheck,
  Calendar,
  CheckSquare,
  BarChart3,
  Mail,
  BookOpen,
  Settings,
  Scale,
  ChevronRight
} from 'lucide-react';

export interface VcSidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface ViceChancellorSidebarProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ViceChancellorSidebar: React.FC<ViceChancellorSidebarProps> = ({
  activePage,
  onSelectPage,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems: VcSidebarItem[] = [
    { id: 'dashboard', label: 'VC Dashboard', icon: Home },
    { id: 'governance', label: 'University Governance', icon: Building2 },
    { id: 'academic-affairs', label: 'Academic Affairs', icon: GraduationCap },
    { id: 'examinations', label: 'Examinations', icon: FileCheck },
    { id: 'research-innovation', label: 'Research & Innovation', icon: FlaskConical },
    { id: 'human-resources', label: 'Human Resources', icon: Users },
    { id: 'finance-budget', label: 'Finance & Budget', icon: Coins },
    { id: 'planning-development', label: 'Planning & Development', icon: Compass },
    { id: 'student-affairs', label: 'Student Affairs', icon: UserCheck },
    { id: 'college-affiliation', label: 'College & Affiliation', icon: Landmark },
    { id: 'quality-accreditation', label: 'Quality & Accreditation', icon: ShieldCheck },
    { id: 'statutory-meetings', label: 'Statutory Bodies & Meetings', icon: Calendar },
    { id: 'approvals-workflow', label: 'Approvals & Workflow', icon: CheckSquare },
    { id: 'reports-analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'communication', label: 'Communication', icon: Mail },
    { id: 'documents-policies', label: 'Documents & Policies', icon: BookOpen },
    { id: 'settings', label: 'Settings & Role Access', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-64 sm:w-72 bg-[#12072b] text-purple-100 flex flex-col shrink-0 border-r border-purple-950 transition-all duration-300 z-50 fixed lg:static top-0 bottom-0 left-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Item List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPage(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7e22ce] text-white shadow-md shadow-purple-900/40 font-bold'
                    : 'text-purple-200/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className="w-4.5 h-4.5 shrink-0 stroke-[2.2]" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.id !== 'dashboard' && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-white translate-x-0.5' : 'text-purple-400/60'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer badge in sidebar */}
        <div className="p-3 border-t border-purple-900/60 text-[11px] text-purple-300/80 bg-[#0d0420]">
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-purple-200">Executive Statutory Powers</span>
          </div>
          <div className="text-[10px] text-purple-400/60 mt-0.5">
            Karnataka State Universities Act • Statute 14
          </div>
        </div>
      </aside>
    </>
  );
};

export default ViceChancellorSidebar;