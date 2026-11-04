import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  FileCheck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface HodSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const HodSidebar: React.FC<HodSidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'exam-operations': true,
    'evaluation': true,
    'reports-records': true
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      subItems: []
    },
    {
      id: 'exam-operations',
      label: 'Exam Operations',
      icon: Calendar,
      subItems: [
        { id: 'exam-schedule', label: 'Exam Schedule (Dept.)' },
        { id: 'examiner-nomination', label: 'Examiner Nomination' },
        { id: 'practical-viva-details', label: 'Practical / Viva Details' },
      ]
    },
    {
      id: 'evaluation',
      label: 'Evaluation',
      icon: FileCheck,
      subItems: [
        { id: 'qp-review', label: 'Question Paper Review' },
        { id: 'internal-assessment', label: 'Internal Assessment' },
        { id: 'marks-verification', label: 'Marks Verification' },
      ]
    },
    {
      id: 'reports-records',
      label: 'Reports & Records',
      icon: BarChart3,
      subItems: [
        { id: 'dept-eval-report', label: 'Department Evaluation Report' },
        { id: 'faculty-contribution', label: 'Faculty Contribution' },
        { id: 'pending-actions-view', label: 'Pending Actions' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      subItems: []
    }
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 xl:w-72 bg-gradient-to-b from-[#260548] via-[#350a63] to-[#20043c] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 select-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-800/40 lg:hidden">
          <span className="font-bold text-sm text-purple-200">HOD Navigation Menu</span>
          <button onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 custom-scrollbar">
          {menuSections.map((sec) => {
            const Icon = sec.icon;
            const hasSub = sec.subItems.length > 0;
            const isSectionOpen = openSections[sec.id];
            const isDirectActive = activeTab === sec.id;

            return (
              <div key={sec.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasSub) {
                      toggleSection(sec.id);
                    } else {
                      setActiveTab(sec.id);
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
                    <Icon className={`w-4.5 h-4.5 ${isDirectActive ? 'text-white' : 'text-purple-300'}`} />
                    <span>{sec.label}</span>
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

                {hasSub && isSectionOpen && (
                  <div className="pl-7 pr-1 py-1 space-y-0.5 border-l-2 border-purple-500/30 ml-4">
                    {sec.subItems.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveTab(sub.id);
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

        {/* Bottom Classical University Building Outline Watermark */}
        <div className="p-4 pt-1 flex flex-col items-center border-t border-purple-900/40 select-none">
          <div className="w-36 h-20 opacity-30">
            <svg viewBox="0 0 200 120" className="w-full h-full text-purple-300 stroke-current fill-none">
              <polygon points="10,40 100,10 190,40" strokeWidth="2.5" />
              <rect x="20" y="40" width="160" height="70" strokeWidth="2" />
              <line x1="40" y1="40" x2="40" y2="110" strokeWidth="3" />
              <line x1="70" y1="40" x2="70" y2="110" strokeWidth="3" />
              <line x1="100" y1="40" x2="100" y2="110" strokeWidth="3" />
              <line x1="130" y1="40" x2="130" y2="110" strokeWidth="3" />
              <line x1="160" y1="40" x2="160" y2="110" strokeWidth="3" />
              <line x1="5" y1="110" x2="195" y2="110" strokeWidth="2.5" />
              <line x1="0" y1="115" x2="200" y2="115" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="text-[10px] text-purple-300/60 font-serif tracking-wider uppercase -mt-1">
            Department Portal
          </span>
        </div>
      </aside>
    </>
  );
};

