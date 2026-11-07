import React, { useState } from 'react';
import {
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  Layers,
  Mail,
  Contact2,
  FolderKanban,
  BarChart3,
  ShoppingCart,
  Wallet,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);

  const subMenuItems = [
    'eCommerce',
    'Analytics',
    'Project Management',
    'LMS Courses',
    'Crypto',
    'Help/Support Desk',
    'SaaS App',
  ];

  const mainNavItems = [
    { name: 'Apps', icon: Layers },
    { name: 'Email', icon: Mail },
    { name: 'Contact List', icon: Contact2 },
    { name: 'Projects', icon: FolderKanban },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'eCommerce', icon: ShoppingCart },
    { name: 'Finance', icon: Wallet },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-[#edf2f7] transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-[#edf2f7]/50">
        <div className="w-9 h-9 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <polygon points="6,6 18,13 6,20" fill="#7047eb" />
            <polygon points="18,13 30,6 30,20 18,13" fill="#e83e8c" opacity="0.9" />
            <polygon points="6,20 18,27 18,13" fill="#00cfe8" opacity="0.85" />
            <polygon points="18,27 30,20 18,13" fill="#7047eb" opacity="0.75" />
          </svg>
        </div>
        {isOpen && (
          <span className="font-bold text-xl tracking-tight text-[#1e293b]">
            ACU <span className="text-[#7047eb]">ERP</span>
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
        {/* Active Dashboard Accordion */}
        <div>
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
              dashboardOpen
                ? 'bg-[#f0ebff] border border-[#dcd1fc] text-[#7047eb]'
                : 'text-[#475569] hover:bg-[#f8fafc]'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 text-[#7047eb]" />
              {isOpen && <span className="font-medium text-sm text-[#1e293b]">Dashboard</span>}
            </div>
            {isOpen && (
              <ChevronDown
                className={`w-4 h-4 text-[#7047eb] transition-transform duration-200 ${
                  dashboardOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            )}
          </button>

          {/* Submenu List */}
          {dashboardOpen && isOpen && (
            <ul className="mt-2 space-y-1 pl-4 pr-1">
              {subMenuItems.map((item) => {
                const isActive = activeTab === item;
                return (
                  <li key={item}>
                    <button
                      onClick={() => setActiveTab(item)}
                      className={`w-full flex items-center gap-3 py-2 px-3 text-[13px] rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#7047eb] font-semibold'
                          : 'text-[#64748b] hover:text-[#1e293b] font-normal'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#7047eb]' : 'bg-[#a0aec0]'
                        }`}
                      />
                      <span>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Other Navigation Items */}
        <div className="pt-2 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                  isSelected
                    ? 'bg-[#f0ebff] text-[#7047eb] font-medium'
                    : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#8a92a6]" />
                  {isOpen && <span>{item.name}</span>}
                </div>
                {isOpen && <ChevronRight className="w-4 h-4 text-[#cbd5e1]" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

