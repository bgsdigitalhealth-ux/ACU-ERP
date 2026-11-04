import React from 'react';
import {
  FileText,
  ClipboardList,
  UserCheck,
  Building,
  AlertTriangle,
  ChevronRight,
  Download
} from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyReportsDownloads: React.FC = () => {
  const { setToast } = useCollegeAdmin();

  const reports = [
    {
      id: 'duty-alloc',
      title: 'Invigilator Duty Allocation Report',
      icon: ClipboardList,
    },
    {
      id: 'invig-attend',
      title: 'Invigilation Attendance Report',
      icon: UserCheck,
    },
    {
      id: 'centre-summary',
      title: 'Centre-wise Summary',
      icon: Building,
    },
    {
      id: 'malpractice',
      title: 'Incident / Malpractice Report',
      icon: AlertTriangle,
    },
    {
      id: 'conduct-rep',
      title: 'Examination Conduct Report',
      icon: FileText,
    },
  ];

  const handleDownload = (reportName: string) => {
    setToast(`Generating and downloading: ${reportName} (PDF/Excel)`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Reports & Downloads
          </h2>
        </div>
      </div>

      <div className="space-y-1.5 flex-1">
        {reports.map((rep) => {
          const Icon = rep.icon;
          return (
            <button
              key={rep.id}
              onClick={() => handleDownload(rep.title)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-purple-100 hover:border-purple-300 bg-purple-50/20 hover:bg-purple-50/70 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800 group-hover:text-purple-950">
                  {rep.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 group-hover:text-purple-700">
                <Download className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

