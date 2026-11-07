import React, { useState } from 'react';
import {
  ClipboardCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { VALUATION_CAMPS_DATA } from '../../../../data/vcSubmodulesData';

export const VcValuationProgressPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [selectedCamp] = useState('All');

  const filteredCamps = VALUATION_CAMPS_DATA.filter(
    (c) => selectedCamp === 'All' || c.campName.includes(selectedCamp)
  );

  const totalScripts = VALUATION_CAMPS_DATA.reduce((acc, c) => acc + c.scriptsReceived, 0);
  const totalValuedFirst = VALUATION_CAMPS_DATA.reduce((acc, c) => acc + c.evaluatedFirst, 0);
  const totalValuedSecond = VALUATION_CAMPS_DATA.reduce((acc, c) => acc + c.evaluatedSecond, 0);
  const totalThird = VALUATION_CAMPS_DATA.reduce((acc, c) => acc + c.thirdValuationTriggered, 0);

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ClipboardCheck className="w-4 h-4" />
            <span>Central Valuation Monitoring</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Valuation Progress &amp; Camp Velocity
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Double valuation tracking, third-evaluator variance alerts &amp; central camp completion projections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setToast('Consolidated Valuation Audit Report generated in Excel format.')}
            className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 border border-purple-400/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Total Answer Scripts</span>
          <div className="text-2xl font-black text-purple-950">{totalScripts.toLocaleString()}</div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">Across All 3 Central Camps</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">1st Valuation Complete</span>
          <div className="text-2xl font-black text-emerald-700">{totalValuedFirst.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">99.5% Velocity</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">2nd Valuation Complete</span>
          <div className="text-2xl font-black text-sky-700">{totalValuedSecond.toLocaleString()}</div>
          <p className="text-[11px] text-sky-600 font-bold mt-1">97.8% Dual Verified</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">3rd Valuation Triggered</span>
          <div className="text-2xl font-black text-amber-700">{totalThird}</div>
          <p className="text-[11px] text-amber-700 font-bold mt-1">Variance &gt;15% (Ordinance 14-B)</p>
        </div>
      </div>

      {/* Camp Cards */}
      <div className="space-y-4">
        {filteredCamps.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md mb-1 inline-block">
                  {camp.location}
                </span>
                <h3 className="font-black text-base text-gray-900">{camp.campName}</h3>
                <p className="text-xs text-gray-500 font-semibold">Chief Custodian: {camp.chiefValuer}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-gray-400 font-bold block">Estimated Completion</span>
                <span className="text-sm font-black text-purple-950">{camp.estimatedCompletionDate}</span>
              </div>
            </div>

            {/* Valuation Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-black mb-1.5">
                <span className="text-gray-700">Consolidated Camp Progress</span>
                <span className="text-emerald-700">{camp.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${camp.completionRate}%` }} />
              </div>
            </div>

            {/* Sub-Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">Total Bundles Received</span>
                <span className="font-black text-gray-900 text-sm">{camp.totalBundles} Bundles</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">Total Answer Scripts</span>
                <span className="font-black text-gray-900 text-sm">{camp.scriptsReceived.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">Evaluators Turnout</span>
                <span className="font-black text-emerald-700 text-sm">{camp.evaluatorsTurnout}% Attendance</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-800 font-bold block">Variance 3rd Valuations</span>
                <span className="font-black text-amber-900 text-sm">{camp.thirdValuationTriggered} Scripts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
