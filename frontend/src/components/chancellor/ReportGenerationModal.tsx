import React, { useState } from 'react';
import { X, FileText, Download } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import { ACADEMIC_YEARS, COLLEGES_LIST } from '../../data/chancellorData';

export const ReportGenerationModal: React.FC = () => {
  const { activeReportModal, setActiveReportModal, handleGenerateReport } = useChancellor();
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'Excel'>('PDF');
  const [selectedYear, setSelectedYear] = useState('2024 – 25');
  const [selectedCollege, setSelectedCollege] = useState('All Colleges');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!activeReportModal) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      handleGenerateReport(activeReportModal.id, selectedFormat);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-purple-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
                Statutory University Report
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                {activeReportModal.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActiveReportModal(null)}
            className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Options */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-gray-600 leading-relaxed text-[12.5px]">
            {activeReportModal.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Target Academic Year:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl font-bold text-[#1e1b4b] outline-none"
              >
                {ACADEMIC_YEARS.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                College Jurisdiction:
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl font-bold text-[#1e1b4b] outline-none truncate"
              >
                {COLLEGES_LIST.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Format Radio Selection */}
          <div className="pt-2">
            <label className="text-[11px] font-bold text-gray-700 block mb-1.5">
              Export Output Format:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedFormat('PDF')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold transition-all ${
                  selectedFormat === 'PDF'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs ring-1 ring-purple-600'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span>Official PDF Document</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('Excel')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold transition-all ${
                  selectedFormat === 'Excel'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs ring-1 ring-purple-600'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Raw Excel Dataset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setActiveReportModal(null)}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4a157c] to-[#320b60] text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate &amp; Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
