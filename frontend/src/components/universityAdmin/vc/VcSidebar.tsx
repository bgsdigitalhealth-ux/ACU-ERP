import React, { useState } from 'react';
import {
  LayoutDashboard,
  Eye,
  Scroll,
  Gavel,
  FileCheck2,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface VcSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const VcSidebar: React.FC<VcSidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'oversight': true,
    'governance': false,
    'approvals': true,
    'results': false,
    'reports': false
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
      id: 'oversight',
      label: 'Examination Oversight',
      icon: Eye,
      subItems: [
        { id: 'univ-exam-status', label: 'University Exam Status' },
        { id: 'college-monitoring', label: 'College-wise Monitoring' },
        { id: 'exam-readiness', label: 'Exam Readiness' },
      ]
    },
    {
      id: 'governance',
      label: 'Academic & Exam Governance',
      icon: Scroll,
      subItems: [
        { id: 'exam-regulations', label: 'Examination Regulations' },
        { id: 'policies-guidelines', label: 'Policies & Guidelines' },
        { id: 'academic-calendar', label: 'Academic Calendar' },
        { id: 'scheme-reforms', label: 'Scheme & Reforms' },
      ]
    },
    {
      id: 'approvals',
      label: 'Approvals & Decisions',
      icon: Gavel,
      subItems: [
        { id: 'exceptional-cases', label: 'Exceptional Cases' },
        { id: 'schedule-modifications', label: 'Schedule Modifications' },
        { id: 'malpractice-disciplinary', label: 'Malpractice & Disciplinary' },
        { id: 'result-authorisation', label: 'Result Authorisation' },
      ]
    },
    {
      id: 'results',
      label: 'Evaluation & Results',
      icon: FileCheck2,
      subItems: [
        { id: 'valuation-progress-vc', label: 'Valuation Progress' },
        { id: 'result-processing-vc', label: 'Result Processing' },
        { id: 'result-analysis-vc', label: 'Result Analysis' },
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      subItems: [
        { id: 'performance-reports-vc', label: 'Performance Reports' },
        { id: 'trend-analysis-vc', label: 'Trend Analysis' },
        { id: 'accreditation-vc', label: 'Accreditation & Compliance' },
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
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 xl:w-72 bg-gradient-to-b from-[#260548] via-[#350a63] to-[#20043c] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 select-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-800/40 lg:hidden">
          <span className="font-bold text-sm text-purple-200">VC Navigation</span>
          <button onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-purple-800">
          {menuSections.map((item) => {
            const Icon = item.icon;
            const hasSub = item.subItems.length > 0;
            const isOpen = openSections[item.id];
            const isItemActive = activeTab === item.id;

            return (
              <div key={item.id} className="space-y-1">
                {hasSub ? (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-purple-300 group-hover:text-amber-300 transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isItemActive
                        ? 'bg-gradient-to-r from-[#9333ea] to-[#7e22ce] text-white shadow-lg shadow-purple-950/40 border border-purple-400/40'
                        : 'text-purple-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isItemActive ? 'text-amber-300' : 'text-purple-300'}`} />
                    <span>{item.label}</span>
                  </button>
                )}

                {/* Submenu */}
                {hasSub && isOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-purple-700/50 ml-4">
                    {item.subItems.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveTab(sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                            isSubActive
                              ? 'bg-purple-900/80 text-amber-300 font-bold border-l-2 border-amber-300'
                              : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span className="truncate">{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* University Engraving Watermark */}
        <div className="p-4 pt-1 border-t border-purple-800/40 flex flex-col items-center opacity-85">
          <svg viewBox="0 0 200 90" className="w-36 h-18 text-purple-300/40 fill-current">
            <path d="M100 10 L190 40 L10 40 Z" />
            <rect x="25" y="42" width="12" height="38" rx="2" />
            <rect x="55" y="42" width="12" height="38" rx="2" />
            <rect x="85" y="42" width="12" height="38" rx="2" />
            <rect x="115" y="42" width="12" height="38" rx="2" />
            <rect x="145" y="42" width="12" height="38" rx="2" />
            <rect x="175" y="42" width="12" height="38" rx="2" />
            <rect x="5" y="80" width="190" height="8" rx="2" />
          </svg>
          <span className="text-[10px] text-purple-300/60 font-semibold uppercase tracking-widest mt-1">
            Adichunchanagiri University
          </span>
        </div>
      </aside>
    </>
  );
};

