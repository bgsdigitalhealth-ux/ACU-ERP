import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Home,
  Eye,
  Scroll,
  Gavel,
  FileCheck2,
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface SubmenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: SubmenuItem[];
}

interface VcSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed?: boolean;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

const VC_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
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

export const VcSidebar: React.FC<VcSidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed = false,
  isMobileOpen = false,
  setIsMobileOpen
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    oversight: true,
    governance: false,
    approvals: true,
    results: false,
    reports: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Auto-expand section containing active tab
  useEffect(() => {
    VC_MENU_ITEMS.forEach((section) => {
      if (section.subItems && section.subItems.some((sub) => sub.id === activeTab)) {
        setExpandedMenus((prev) => ({ ...prev, [section.id]: true }));
      }
    });
  }, [activeTab]);

  const toggleExpand = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const filteredItems = VC_MENU_ITEMS.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchParent = item.label.toLowerCase().includes(term);
    const matchChild = item.subItems?.some((sub) => sub.label.toLowerCase().includes(term));
    return matchParent || matchChild;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && setIsMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-2xs"
        />
      )}

      {/* Sidebar Container matching Teacher and Student Portals: bg-[#1d2434] & border-[#2d3748] */}
      <aside
        className={`fixed top-14 sm:top-16 left-0 bottom-0 z-20 bg-[#1d2434] text-[#a0aec0] flex flex-col transition-all duration-300 border-r border-[#2d3748] select-none ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Mobile Header */}
        {setIsMobileOpen && (
          <div className="flex items-center justify-between p-3 border-b border-[#2d3748] lg:hidden">
            <span className="font-bold text-xs text-white">VC Navigation</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Search Box inside Sidebar matching Teacher & Student Portals */}
        {!sidebarCollapsed && (
          <div className="p-3 border-b border-[#2d3748]/70">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full bg-[#141a28] text-gray-200 placeholder-gray-500 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#7047eb] border border-gray-700/60 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Mode Indicator Banner matching Faculty / Student */}
        {!sidebarCollapsed && (
          <div className="px-3 py-1.5 bg-[#141a28]/60 border-b border-[#2d3748]/50 flex items-center justify-between text-[10px] font-bold">
            <span className="text-purple-300 uppercase tracking-wider">OFFICE OF THE VICE-CHANCELLOR</span>
            <span className="text-gray-400 font-mono">ACU</span>
          </div>
        )}

        {/* Scrollable Navigation List matching Teacher & Student design */}
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 custom-scrollbar">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus[item.id] || searchTerm.length > 0;
            const isItemActive = activeTab === item.id || item.subItems.some((s) => s.id === activeTab);

            return (
              <div key={item.id} className="text-xs">
                {/* Parent Menu Item */}
                <button
                  onClick={() => {
                    if (hasSub) {
                      toggleExpand(item.id);
                      if (!isItemActive && item.subItems.length > 0) {
                        setActiveTab(item.subItems[0].id);
                      }
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all group cursor-pointer ${
                    isItemActive && !hasSub
                      ? 'bg-[#7047eb] text-white shadow-sm'
                      : isItemActive
                      ? 'bg-[#2d3748] text-white'
                      : 'text-[#94a3b8] hover:bg-[#2d3748]/60 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                        isItemActive ? 'text-white' : 'text-[#94a3b8] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {!sidebarCollapsed && (
                      <span className="truncate tracking-tight font-medium">{item.label}</span>
                    )}
                  </div>

                  {!sidebarCollapsed && hasSub && (
                    <div className="text-gray-400 pl-1">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenus matching Teacher/Student: #7047eb active pill with white dot */}
                {!sidebarCollapsed && hasSub && isExpanded && (
                  <div className="pl-6 pr-1 py-1 space-y-0.5 animate-in fade-in duration-150">
                    {item.subItems.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveTab(sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                            isSubActive
                              ? 'bg-[#7047eb] text-white font-semibold shadow-xs'
                              : 'text-[#94a3b8] hover:text-white hover:bg-[#2d3748]/40'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSubActive ? 'bg-white' : 'bg-[#64748b]'
                            }`}
                          />
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

        {/* Sidebar Footer matching Faculty & Student */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-[#2d3748]/70 text-[10px] text-gray-500 font-medium flex items-center justify-between">
            <span>ACU ERP v4.4.1</span>
            <span className="text-purple-400 font-mono font-bold">EXECUTIVE</span>
          </div>
        )}
      </aside>
    </>
  );
};
