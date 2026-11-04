import React, { useState } from 'react';
import { BarChart3, FileText, Users, BarChart2, Download } from 'lucide-react';
import { useHod } from '../../context/HodContext';

export const HodReportsOutputs: React.FC = () => {
  const { hodSession, setToast } = useHod();
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const reports = [
    {
      id: 'rep-eval',
      title: 'Department Evaluation Report',
      icon: FileText,
      bg: 'bg-[#fdf2f8]',
      border: 'border-[#fce7f3]',
      color: 'text-purple-700'
    },
    {
      id: 'rep-examiner',
      title: 'Examiner Allocation (Dept.)',
      icon: Users,
      bg: 'bg-[#f0f9ff]',
      border: 'border-[#e0f2fe]',
      color: 'text-sky-700'
    },
    {
      id: 'rep-marks',
      title: 'Marks Statement (Dept.)',
      icon: BarChart2,
      bg: 'bg-[#f5eeff]',
      border: 'border-[#e9d5ff]',
      color: 'text-purple-800'
    },
    {
      id: 'rep-export',
      title: 'Export Reports',
      icon: Download,
      bg: 'bg-[#ecfeff]',
      border: 'border-[#cffafe]',
      color: 'text-teal-700'
    }
  ];

  const handleDownload = (reportTitle: string) => {
    setDownloadingReport(reportTitle);
    setTimeout(() => {
      setDownloadingReport(null);
      setToast(`Downloaded: ${reportTitle} for Department of ${hodSession?.department || 'Physiology'}.`);
    }, 600);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Reports &amp; Outputs
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Gazetted Records
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reports.map((rep) => {
          const Icon = rep.icon;
          const isBusy = downloadingReport === rep.title;

          return (
            <button
              key={rep.id}
              onClick={() => handleDownload(rep.title)}
              disabled={isBusy}
              className="p-3 bg-[#fcfaff] rounded-xl border border-purple-100/90 hover:border-purple-300 hover:bg-purple-50/60 transition-all flex flex-col items-center text-center group cursor-pointer shadow-2xs disabled:opacity-75"
            >
              <div
                className={`w-11 h-11 rounded-xl ${rep.bg} ${rep.border} border flex items-center justify-center shrink-0 mb-2 group-hover:scale-105 transition-transform shadow-xs`}
              >
                {isBusy ? (
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Icon className={`w-5 h-5 ${rep.color} stroke-[2.2]`} />
                )}
              </div>

              <span className="text-xs font-bold text-[#1e1b4b] leading-snug line-clamp-2 group-hover:text-purple-900 transition-colors">
                {rep.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
