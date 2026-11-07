import React from 'react';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';

export const VcPerformanceReportsPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();

  const reportList = [
    {
      id: 'rep-1',
      title: 'Annual University Examination Governance & Quality Audit 2024–25',
      code: 'ACU/REP/AUD/2025-01',
      period: 'Full Academic Year',
      category: 'Statutory Audit',
      size: '4.8 MB PDF',
      generatedDate: '01 Mar 2025'
    },
    {
      id: 'rep-2',
      title: 'Constituent Colleges Pass Rate Benchmark & Faculty Comparison',
      code: 'ACU/REP/CMP/2025-04',
      period: 'Odd & Even Sessions',
      category: 'Academic Benchmarking',
      size: '2.4 MB PDF',
      generatedDate: '28 Feb 2025'
    },
    {
      id: 'rep-3',
      title: 'Examiner Turnout, Daily Valuation Velocity & Variance Analysis',
      code: 'ACU/REP/VAL/2025-09',
      period: 'Central Camps A, B, C',
      category: 'Evaluation Operations',
      size: '1.9 MB PDF',
      generatedDate: '25 Feb 2025'
    },
    {
      id: 'rep-4',
      title: 'Moderation Board Expenditure & Grace Mark Attestation Ledger',
      code: 'ACU/REP/MOD/2025-02',
      period: 'Annual Board Review',
      category: 'Statutory Ledger',
      size: '1.2 MB PDF',
      generatedDate: '20 Feb 2025'
    },
    {
      id: 'rep-5',
      title: 'University Revaluation & Challenge Valuation Efficacy Report',
      code: 'ACU/REP/REV/2025-03',
      period: 'Previous 3 Sessions',
      category: 'Quality Assurance',
      size: '1.5 MB PDF',
      generatedDate: '15 Feb 2025'
    }
  ];

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Official University Publications</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Performance Reports &amp; Statutory Ledgers
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Executive audit documents, valuation quality analyses &amp; official syndicate examination reports.
          </p>
        </div>

        <button
          onClick={() => setToast('Consolidated Annual Examination Audit Package generating...')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download All Reports (ZIP)</span>
        </button>
      </div>

      {/* Reports Listing */}
      <div className="space-y-3">
        {reportList.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-[10px] font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  {rep.code}
                </span>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  {rep.category}
                </span>
                <span className="text-[11px] text-gray-400">Published: {rep.generatedDate}</span>
                <span className="text-[11px] text-gray-500 font-semibold">{rep.size}</span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">{rep.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Coverage Scope: {rep.period}</p>
            </div>

            <div className="flex items-center gap-2 md:shrink-0">
              <button
                onClick={() => setToast(`Generating PDF for ${rep.title}...`)}
                className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-purple-700" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => setToast(`Exporting data tables to Excel for ${rep.code}...`)}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => setToast(`Sending ${rep.code} to default university network printer...`)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
