import React from 'react';
import {
  LayoutGrid,
  Calendar,
  Microscope,
  Coins,
  MessageSquareHeart,
  CalendarDays,
  Award
} from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

interface VcQuickAccessProps {
  onNavigate?: (tab: string) => void;
}

export const VcQuickAccess: React.FC<VcQuickAccessProps> = ({ onNavigate }) => {
  const { setToast } = useUniversityAdmin();

  const accessItems = [
    {
      id: 'exam-status',
      label: 'University Exam Status',
      subtext: 'Centralized live oversight',
      icon: Calendar,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      action: () => {
        if (onNavigate) onNavigate('univ-exam-status');
        else setToast('Opening University Comprehensive Exam Status.');
      }
    },
    {
      id: 'research-rnd',
      label: 'R&D & Research Grants',
      subtext: '48 ongoing • ₹16.42 Cr',
      icon: Microscope,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      action: () => {
        if (onNavigate) onNavigate('performance-reports-vc');
        else setToast('Navigating to University Research & Grants.');
      }
    },
    {
      id: 'financial-reports',
      label: 'Financial Statements',
      subtext: 'FY 24–25 Audit & Outlay',
      icon: Coins,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      action: () => {
        if (onNavigate) onNavigate('performance-reports-vc');
        else setToast('Opening Institutional Financial Statements.');
      }
    },
    {
      id: 'feedback-analytics',
      label: 'Feedback Analytics',
      subtext: 'Students & Parents CSAT',
      icon: MessageSquareHeart,
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      action: () => {
        if (onNavigate) onNavigate('result-analysis-vc');
        else setToast('Viewing Stakeholder Feedback Analytics.');
      }
    },
    {
      id: 'academic-calendar',
      label: 'Academic Calendar',
      subtext: 'Statutory meetings & terms',
      icon: CalendarDays,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      action: () => {
        if (onNavigate) onNavigate('academic-calendar');
        else setToast('Navigating to University Academic Calendar.');
      }
    },
    {
      id: 'accreditation',
      label: 'Accreditation (NAAC/NIRF)',
      subtext: 'Apex compliance & ranks',
      icon: Award,
      color: 'text-violet-700',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      action: () => {
        if (onNavigate) onNavigate('accreditation-vc');
        else setToast('Exporting NAAC & NIRF Institutional Dossier.');
      }
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Executive Quick Access
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Statutory Dashboards
        </span>
      </div>

      {/* Grid of 6 Cards */}
      <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {accessItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`p-3.5 ${item.bg} ${item.border} border rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:scale-102 transition-all cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${item.color} stroke-[2.2]`} />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 leading-tight block">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 font-medium hidden sm:block mt-0.5">
                  {item.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
