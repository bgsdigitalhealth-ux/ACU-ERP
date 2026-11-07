import React, { useState } from 'react';
import {
  Home,
  Building2,
  GraduationCap,
  Users,
  Coins,
  FlaskConical,
  Calendar,
  BarChart3,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export interface SidebarSubItem {
  id: string;
  label: string;
}

export interface SidebarSection {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: SidebarSubItem[];
}

interface ChancellorSidebarProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ChancellorSidebar: React.FC<ChancellorSidebarProps> = ({
  activePage,
  onSelectPage,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  // Collapsible state for each section
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'university-governance': true,
    'academic-oversight': true,
    'administration': true,
    'finance-budget': true,
    'research-innovation': true,
    'statutory-meetings': true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections: SidebarSection[] = [
    {
      id: 'dashboard',
      label: 'Chancellor Dashboard',
      icon: Home,
    },
    {
      id: 'university-governance',
      label: 'University Governance',
      icon: Building2,
      subItems: [
        { id: 'policies', label: 'University Policies' },
        { id: 'statutes', label: 'Statutes & Regulations' },
        { id: 'ordinances', label: 'Ordinances & Amendments' },
      ],
    },
    {
      id: 'academic-oversight',
      label: 'Academic Oversight',
      icon: GraduationCap,
      subItems: [
        { id: 'academic-programs', label: 'Academic Programs' },
        { id: 'curriculum-approval', label: 'Curriculum Approval' },
        { id: 'exam-evaluation', label: 'Exam & Evaluation' },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Users,
      subItems: [
        { id: 'vc-reports', label: 'Vice-Chancellor Reports' },
        { id: 'registrar-updates', label: 'Registrar & Admin Updates' },
        { id: 'hr-appointments', label: 'HR & Appointments' },
      ],
    },
    {
      id: 'finance-budget',
      label: 'Finance & Budget',
      icon: Coins,
      subItems: [
        { id: 'annual-budget', label: 'Annual Budget' },
        { id: 'major-expenditures', label: 'Major Expenditures' },
        { id: 'audit-compliance', label: 'Audit & Compliance' },
      ],
    },
    {
      id: 'research-innovation',
      label: 'Research & Innovation',
      icon: FlaskConical,
      subItems: [
        { id: 'research-projects', label: 'Research Projects' },
        { id: 'grants-funding', label: 'Grants & Funding' },
        { id: 'collaborations-mous', label: 'Collaborations (MoUs)' },
      ],
    },
    {
      id: 'statutory-meetings',
      label: 'Statutory & Meetings',
      icon: Calendar,
      subItems: [
        { id: 'executive-council', label: 'Executive Council' },
        { id: 'academic-council', label: 'Academic Council' },
        { id: 'syndicate-meetings', label: 'Syndicate / Board Meetings' },
        { id: 'approvals-resolutions', label: 'Approvals & Resolutions' },
      ],
    },
    {
      id: 'reports-analytics',
      label: 'Reports & Analytics',
      icon: BarChart3,
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
    },
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
        className={`w-64 sm:w-72 bg-[#0a1638] text-slate-200 flex flex-col shrink-0 border-r border-indigo-950/80 transition-all duration-300 z-50 fixed lg:static top-0 bottom-0 left-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Menu List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
          {sections.map((section) => {
            const Icon = section.icon;
            const hasSub = section.subItems && section.subItems.length > 0;
            const isOpen = !!openSections[section.id];
            const isRootActive = activePage === section.id;
            const isSubActive =
              hasSub && section.subItems?.some((sub) => sub.id === activePage);

            return (
              <div key={section.id} className="space-y-1">
                {/* Main Item Button */}
                <button
                  onClick={() => {
                    if (hasSub) {
                      toggleSection(section.id);
                    } else {
                      onSelectPage(section.id);
                      if (onCloseMobile) onCloseMobile();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isRootActive
                      ? 'bg-[#1a4cd2] text-white shadow-md shadow-blue-600/30 font-bold'
                      : isSubActive
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4.5 h-4.5 shrink-0 stroke-[2.2]" />
                    <span>{section.label}</span>
                  </div>
                  {hasSub && (
                    <div className="text-slate-400">
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenu Items */}
                {hasSub && isOpen && (
                  <div className="pl-6 pr-1 py-1 space-y-1">
                    {section.subItems?.map((sub) => {
                      const isItemActive = activePage === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            onSelectPage(sub.id);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                            isItemActive
                              ? 'bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-bold shadow-xs'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isItemActive ? 'bg-amber-300' : 'bg-slate-500'
                            }`}
                          />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info pill in sidebar */}
        <div className="p-3 border-t border-white/10 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-300">Statutory Governance Mode</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">ACU University Act &amp; Statutes</div>
        </div>
      </aside>
    </>
  );
};

export default ChancellorSidebar;
