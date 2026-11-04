import React from 'react';
import { LayoutGrid, Calendar, CheckSquare, BarChart2, FileText, Award } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcQuickAccess: React.FC = () => {
  const { setActiveVcModal, setToast } = useUniversityAdmin();

  const accessItems = [
    {
      id: 'exam-status',
      label: 'University Exam Status',
      icon: Calendar,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      action: () => setToast('Opening University Comprehensive Exam Status.')
    },
    {
      id: 'approve-requests',
      label: 'Approve Requests',
      icon: CheckSquare,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      action: () => setActiveVcModal('approval')
    },
    {
      id: 'analytics',
      label: 'Performance Analytics',
      icon: BarChart2,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      action: () => setToast('Navigating to Detailed Faculty Analytics.')
    },
    {
      id: 'annual-report',
      label: 'Annual Exam Report',
      icon: FileText,
      color: 'text-pink-700',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      action: () => setToast('Generating Annual Examination Audit Report.')
    },
    {
      id: 'accreditation',
      label: 'Accreditation Inputs (NAAC / NIRF)',
      icon: Award,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      action: () => setToast('Exporting NIRF Criterion 2.5 exam outcome records.')
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Quick Access
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Executive Dashboards
        </span>
      </div>

      {/* Grid of 5 Cards */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
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
              <span className="text-xs font-bold text-gray-800 leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

