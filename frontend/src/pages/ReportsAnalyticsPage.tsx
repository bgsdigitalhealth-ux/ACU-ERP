import React from 'react';
import { BarChart3 } from 'lucide-react';
import { QuickReportsSection } from '../components/chancellor/QuickReportsSection';

export const ReportsAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in">
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Reports &amp; Analytics</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Executive NAAC / NIRF Indicators, Programme Result Gazettes &amp; Annual Statistical Abstracts
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <span>Institutional Intelligence</span>
        </div>
      </div>

      <QuickReportsSection />
    </div>
  );
};
