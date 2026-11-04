import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  ClipboardCheck,
  Scale,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: { id: string; label: string }[];
}

export const ChancellorSidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isMobileOpen,
  setIsMobileOpen
}) => {
  // Controlled expansion state for sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'academic-governance': true,
    'exam-oversight': true,
    'statutory-approvals': true,
    'reports-analytics': true,
    'governance-records': true
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'university-overview',
      label: 'University Overview',
      icon: Building2,
    },
    {
      id: 'academic-governance',
      label: 'Academic Governance',
      icon: GraduationCap,
      subItems: [
        { id: 'exam-policies', label: 'Examination Policies' },
        { id: 'regulations-ordinances', label: 'Regulations & Ordinances' },
        { id: 'governance-docs', label: 'Governance Documents' },
      ],
    },
    {
      id: 'exam-oversight',
      label: 'Examination Oversight',
      icon: ClipboardCheck,
      subItems: [
        { id: 'exam-status-table', label: 'University Exam Status' },
        { id: 'college-performance', label: 'College-wise Performance' },
        { id: 'trends-analytics', label: 'Trends & Analytics' },
      ],
    },
    {
      id: 'statutory-approvals',
      label: 'Statutory Approvals',
      icon: Scale,
      subItems: [
        { id: 'policy-approvals', label: 'Policy / Framework Approvals' },
        { id: 'special-cases', label: 'Special / Exceptional Cases' },
        { id: 'governance-referrals', label: 'Governance Referrals' },
      ],
    },
    {
      id: 'reports-analytics',
      label: 'Reports & Analytics',
      icon: BarChart3,
      subItems: [
        { id: 'rep-annual', label: 'Annual Examination Report' },
        { id: 'rep-programme', label: 'Programme-wise Results' },
        { id: 'rep-accreditation', label: 'Accreditation Indicators' },
      ],
    },
    {
      id: 'governance-records',
      label: 'Governance Records',
      icon: FileText,
      subItems: [
        { id: 'gov-resolutions', label: 'Resolutions & Decisions' },
        { id: 'gov-approval-history', label: 'Approval History' },
        { id: 'gov-audit', label: 'Audit & Compliance' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 xl:w-72 bg-gradient-to-b from-[#260548] via-[#350a63] to-[#20043c] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-purple-800/40 lg:hidden">
          <span className="font-bold text-sm text-purple-200">Navigation Menu</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-lg text-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 custom-scrollbar">
          {menuItems.map(item => {
            const Icon = item.icon;
            const hasSub = !!item.subItems && item.subItems.length > 0;
            const isSectionOpen = openSections[item.id];
            const isDirectActive = activePage === item.id;

            return (
              <div key={item.id} className="space-y-1">
                {/* Main Item Button */}
                <button
                  onClick={() => {
                    if (hasSub) {
                      toggleSection(item.id);
                    } else {
                      setActivePage(item.id);
                      setIsMobileOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                    isDirectActive
                      ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-lg border border-purple-300/40'
                      : 'text-purple-100/90 hover:bg-purple-900/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4.5 h-4.5 ${
                        isDirectActive ? 'text-white' : 'text-purple-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {hasSub && (
                    <div>
                      {isSectionOpen ? (
                        <ChevronDown className="w-4 h-4 text-purple-300" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenu Items */}
                {hasSub && isSectionOpen && (
                  <div className="pl-7 pr-1 py-1 space-y-0.5 border-l-2 border-purple-500/30 ml-4">
                    {item.subItems!.map(sub => {
                      const isSubActive = activePage === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActivePage(sub.id);
                            setIsMobileOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-[11.5px] transition-colors text-left ${
                            isSubActive
                              ? 'text-white font-bold bg-purple-700/60 shadow-xs'
                              : 'text-purple-200/80 hover:text-white hover:bg-purple-900/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSubActive ? 'bg-amber-400' : 'bg-purple-400/60'
                            }`}
                          />
                          <span className="leading-tight">{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Classical University Building Outline Watermark matching image */}
        <div className="p-4 pt-1 flex flex-col items-center border-t border-purple-900/40 select-none">
          <div className="w-36 h-20 opacity-30">
            <svg viewBox="0 0 200 120" className="w-full h-full text-purple-300 stroke-current fill-none">
              <polygon points="10,40 100,10 190,40" strokeWidth="2.5" />
              <rect x="20" y="40" width="160" height="70" strokeWidth="2" />
              {/* Columns */}
              <line x1="40" y1="40" x2="40" y2="110" strokeWidth="3" />
              <line x1="70" y1="40" x2="70" y2="110" strokeWidth="3" />
              <line x1="100" y1="40" x2="100" y2="110" strokeWidth="3" />
              <line x1="130" y1="40" x2="130" y2="110" strokeWidth="3" />
              <line x1="160" y1="40" x2="160" y2="110" strokeWidth="3" />
              {/* Steps */}
              <line x1="5" y1="110" x2="195" y2="110" strokeWidth="2.5" />
              <line x1="0" y1="115" x2="200" y2="115" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="text-[10px] text-purple-300/60 font-serif tracking-wider uppercase -mt-1">
            Chancellor Secretariat
          </span>
        </div>
      </aside>
    </>
  );
};
