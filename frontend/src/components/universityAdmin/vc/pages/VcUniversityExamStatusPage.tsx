import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  CheckCircle2,
  Search,
  Download,
  FileSpreadsheet,
  Eye,
  TrendingUp,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { COLLEGE_MONITORING_DATA } from '../../../../data/vcSubmodulesData';

export const VcUniversityExamStatusPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCollegeModal, setSelectedCollegeModal] = useState<any | null>(null);

  const filteredColleges = COLLEGE_MONITORING_DATA.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(search.toLowerCase()) ||
      col.code.toLowerCase().includes(search.toLowerCase()) ||
      col.principal.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Completed' && col.evaluationProgress === 100) ||
      (selectedStatus === 'In Progress' && col.evaluationProgress < 100);
    return matchesSearch && matchesStatus;
  });

  const totalExams = COLLEGE_MONITORING_DATA.reduce((acc, c) => acc + c.examsScheduled, 0);
  const totalConducted = COLLEGE_MONITORING_DATA.reduce((acc, c) => acc + c.examsConducted, 0);
  const totalStudents = COLLEGE_MONITORING_DATA.reduce((acc, c) => acc + c.totalStudents, 0);
  const avgCompliance = (
    COLLEGE_MONITORING_DATA.reduce((acc, c) => acc + c.complianceScore, 0) /
    COLLEGE_MONITORING_DATA.length
  ).toFixed(1);

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Eye className="w-4 h-4" />
            <span>Examination Oversight • Apex Monitoring</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Comprehensive Examination Status
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Real-time examination conduction, valuation velocity &amp; result publication status across all 14 constituent colleges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setToast('Exporting University Examination Status to Excel...')}
            className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 border border-purple-400/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => setToast('Generating consolidated Examination Status PDF report...')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Total Examinations</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-950">{totalExams}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">
            {totalConducted} Conducted (100% on schedule)
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Registered Candidates</span>
            <Building2 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-cyan-950">{totalStudents.toLocaleString()}</div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">Across 14 Constituent Colleges</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Valuation Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">95.3%</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+4.2% faster than 2023-24</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Regulatory Compliance</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{avgCompliance}%</div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">NMC / PCI / INC Standard</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-purple-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search college name, code, or principal..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 hidden sm:inline">Status:</span>
          {['All', 'Completed', 'In Progress'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-purple-900 text-amber-300 shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* College Examination Status Table */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f9f5ff] text-[#4a157c] font-black border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">College / Institution</th>
                <th className="py-3 px-3 text-center">Code</th>
                <th className="py-3 px-3 text-center">Students</th>
                <th className="py-3 px-3 text-center">Exams</th>
                <th className="py-3 px-3 text-center">Conducted</th>
                <th className="py-3 px-4">Valuation Velocity</th>
                <th className="py-3 px-3 text-center">Results</th>
                <th className="py-3 px-3 text-center">CCTV Link</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredColleges.map((col) => (
                <tr key={col.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{col.name}</div>
                    <div className="text-[11px] text-gray-500 font-medium">Principal: {col.principal}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-purple-900">{col.code}</td>
                  <td className="py-3 px-3 text-center font-semibold text-gray-700">{col.totalStudents}</td>
                  <td className="py-3 px-3 text-center font-bold text-gray-800">{col.examsScheduled}</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700">{col.examsConducted}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 mb-1">
                      <span>{col.evaluationProgress}%</span>
                      <span className={col.evaluationProgress === 100 ? 'text-emerald-600' : 'text-purple-600'}>
                        {col.evaluationProgress === 100 ? 'Evaluated' : 'Valuing'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          col.evaluationProgress === 100 ? 'bg-emerald-500' : 'bg-purple-600'
                        }`}
                        style={{ width: `${col.evaluationProgress}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        col.resultsPublished === 100
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : col.resultsPublished > 0
                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {col.resultsPublished === 100
                        ? '100% Published'
                        : col.resultsPublished > 0
                        ? `${col.resultsPublished}%`
                        : 'In Evaluation'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        col.cctvStatus === 'Online'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          col.cctvStatus === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      />
                      {col.cctvStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedCollegeModal(col)}
                      className="px-3 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs border border-purple-200 transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* College Detail Inspection Modal */}
      {selectedCollegeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-purple-950">{selectedCollegeModal.name}</h3>
                <p className="text-xs text-gray-500">Institution Code: {selectedCollegeModal.code}</p>
              </div>
              <button
                onClick={() => setSelectedCollegeModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-[10px] text-gray-500 font-bold block">Head of Institution</span>
                <span className="font-bold text-purple-950">{selectedCollegeModal.principal}</span>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-[10px] text-gray-500 font-bold block">Academic Dean</span>
                <span className="font-bold text-purple-950">{selectedCollegeModal.deanName}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">Active Invigilators</span>
                <span className="font-extrabold text-gray-900">{selectedCollegeModal.invigilatorsActive} Faculty</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">Reported Malpractice</span>
                <span className="font-extrabold text-rose-600">{selectedCollegeModal.malpracticeCount} Incident(s)</span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-950 block">Statutory Compliance Score</span>
                <span className="text-[11px] text-emerald-800">Verified against University Board standards</span>
              </div>
              <span className="text-xl font-black text-emerald-700">{selectedCollegeModal.complianceScore}%</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setToast(`Direct communication channel opened with Principal ${selectedCollegeModal.principal}.`);
                  setSelectedCollegeModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95"
              >
                Send Vice-Chancellor Memo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
