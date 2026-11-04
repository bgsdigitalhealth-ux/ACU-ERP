import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  FileCheck2,
  Trophy,
  Download,
  FileSpreadsheet,
  Award,
  Layers
} from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarMidSection: React.FC = () => {
  const { valuationProgress, resultStatus, setToast } = useUniversityAdmin();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 select-none">
      {/* 1. Valuation Progress - Theory */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
        <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-300" />
            <h4 className="font-extrabold text-xs sm:text-sm text-white">Valuation Progress – Theory</h4>
          </div>
        </div>

        <div className="p-3.5 space-y-3">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-gray-500 font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="pb-1.5">Paper</th>
                <th className="pb-1.5 text-center">Total</th>
                <th className="pb-1.5 text-center">Evaluated</th>
                <th className="pb-1.5 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {valuationProgress.map((row, idx) => {
                const isTotal = row.paper === 'Total';
                return (
                  <tr key={idx} className={isTotal ? 'font-black bg-purple-50/70' : 'font-semibold text-gray-700'}>
                    <td className="py-2">{row.paper}</td>
                    <td className="py-2 text-center">{row.totalScripts.toLocaleString()}</td>
                    <td className="py-2 text-center text-purple-900 font-bold">{row.evaluated.toLocaleString()}</td>
                    <td className="py-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isTotal ? 'bg-purple-700' : 'bg-emerald-600'}`}
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                        <span className={`text-[11px] font-bold ${isTotal ? 'text-purple-900' : 'text-emerald-700'}`}>
                          {row.percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Marks Processing Summary */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
        <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-amber-300" />
            <h4 className="font-extrabold text-xs sm:text-sm text-white">Marks Processing Summary</h4>
          </div>
        </div>

        <div className="p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/70 border border-purple-100">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Theory Marks (Verified)</span>
            </span>
            <span className="font-mono font-black text-purple-900 flex items-center gap-1">
              <span>2,980</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Practical Marks (Received)</span>
            </span>
            <span className="font-mono font-black text-emerald-900 flex items-center gap-1">
              <span>142</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/70 border border-blue-100">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>IA Marks (Consolidated)</span>
            </span>
            <span className="font-mono font-black text-blue-900 flex items-center gap-1">
              <span>142</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-gray-800">Result Processing Status</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-extrabold text-[10px]">
              Draft Ready
            </span>
          </div>
        </div>
      </div>

      {/* 3. Result Status - Physiology */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
        <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-300" />
            <h4 className="font-extrabold text-xs sm:text-sm text-white">Result Status – Physiology</h4>
          </div>
        </div>

        <div className="p-3.5 space-y-2 text-xs">
          {resultStatus.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-2 rounded-xl border ${
                item.component === 'Overall Result'
                  ? 'bg-purple-100/70 border-purple-300 font-extrabold'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div>
                <span className="font-bold text-gray-900">{item.component}</span>
                <span className="text-[10px] text-gray-500 block">Max: {item.maxMarks}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  item.status === 'Finalised'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300 font-black'
                }`}
              >
                {item.status === 'Finalised' ? '✓ Finalised' : item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Reports & Outputs */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
        <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-300" />
            <h4 className="font-extrabold text-xs sm:text-sm text-white">Reports & Outputs</h4>
          </div>
        </div>

        <div className="p-3 grid grid-cols-2 gap-2 text-center text-xs">
          <button
            onClick={() => setToast('Downloading Marks Statement (Subject-wise)...')}
            className="p-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
          >
            <FileSpreadsheet className="w-5 h-5 text-purple-700 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">Marks Statement (Subject-wise)</span>
          </button>

          <button
            onClick={() => setToast('Generating Valuation Status Report...')}
            className="p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
          >
            <BarChart3 className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">Valuation Status Report</span>
          </button>

          <button
            onClick={() => setToast('Exporting Consolidated Result Sheet...')}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
          >
            <Layers className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">Consolidated Result Sheet</span>
          </button>

          <button
            onClick={() => setToast('Generating Result Analysis (Pass %, Grade)...')}
            className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
          >
            <Award className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">Result Analysis (Pass %, Grade)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

