import React, { useState } from 'react';
import { Landmark, Search, Download, Eye, X } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import { CollegeExamStatusItem } from '../../types/chancellor';

export const UniversityExamStatusTable: React.FC = () => {
  const { collegeExamList } = useChancellor();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCollegeModal, setSelectedCollegeModal] = useState<CollegeExamStatusItem | null>(null);

  const filteredList = collegeExamList.filter((item) => {
    const matchesSearch =
      item.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.collegeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate dynamic totals
  const totalExams = filteredList.reduce((acc, curr) => acc + curr.totalExams, 0);
  const totalConducted = filteredList.reduce((acc, curr) => acc + curr.examsConducted, 0);
  const totalEvaluation = filteredList.reduce((acc, curr) => acc + curr.evaluationCompleted, 0);
  const totalResults = filteredList.reduce((acc, curr) => acc + curr.resultsPublished, 0);

  const getStatusBadge = (status: CollegeExamStatusItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-300';
      case 'In Progress':
        return 'bg-sky-100 text-sky-700 border border-sky-300';
      case 'Evaluation':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'Ongoing':
      default:
        return 'bg-purple-100 text-purple-700 border border-purple-300';
    }
  };

  const handleExportCSV = () => {
    const headers = ['College / Institution', 'Exams', 'Conducted', 'Evaluation', 'Results', 'Status'];
    const rows = filteredList.map(r => [
      `"${r.collegeName}"`,
      r.totalExams,
      r.examsConducted,
      r.evaluationCompleted,
      r.resultsPublished || '-',
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `University_Exam_Status_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Table Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Landmark className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            University-wide Examination Status
          </h3>
        </div>

        {/* Quick Search & Export */}
        <div className="flex items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-purple-300 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search college..."
              className="pl-8 pr-3 py-1 bg-purple-950/70 border border-purple-400/40 rounded-lg text-xs text-white placeholder-purple-300/70 outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 bg-purple-950/70 border border-purple-400/40 rounded-lg text-xs text-purple-200 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Evaluation">Evaluation</option>
            <option value="Ongoing">Ongoing</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-800/80 hover:bg-purple-700/90 text-purple-100 rounded-lg border border-purple-400/30 transition-colors cursor-pointer"
            title="Export CSV data"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#fcfaff] text-[#475569] font-bold border-b border-purple-100 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-4 sm:px-5 font-extrabold text-[#2e1065]">College / Institution</th>
              <th className="py-2.5 px-3 text-center">Exams</th>
              <th className="py-2.5 px-3 text-center">Conducted</th>
              <th className="py-2.5 px-3 text-center">Evaluation</th>
              <th className="py-2.5 px-3 text-center">Results</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 text-[12.5px] font-medium text-[#1e293b]">
            {filteredList.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedCollegeModal(row)}
                className="hover:bg-purple-50/60 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-4 sm:px-5 font-bold text-[#1e1b4b] flex items-center justify-between">
                  <span>{row.collegeName}</span>
                  <Eye className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </td>
                <td className="py-3 px-3 text-center font-semibold text-[#1e293b]">{row.totalExams}</td>
                <td className="py-3 px-3 text-center font-semibold text-[#1e293b]">{row.examsConducted}</td>
                <td className="py-3 px-3 text-center font-semibold text-[#1e293b]">{row.evaluationCompleted}</td>
                <td className="py-3 px-3 text-center font-semibold text-[#1e293b]">
                  {row.resultsPublished > 0 ? row.resultsPublished : '–'}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadge(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer Total Row */}
          <tfoot>
            <tr className="bg-[#2a084e] text-white font-extrabold text-[12.5px]">
              <td className="py-2.5 px-4 sm:px-5 tracking-wide">University Total</td>
              <td className="py-2.5 px-3 text-center">{totalExams}</td>
              <td className="py-2.5 px-3 text-center">{totalConducted}</td>
              <td className="py-2.5 px-3 text-center">{totalEvaluation}</td>
              <td className="py-2.5 px-3 text-center">{totalResults}</td>
              <td className="py-2.5 px-4 text-center">
                <span className="text-amber-300 text-[11px] font-bold">Consolidated</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* College Examination Details Modal */}
      {selectedCollegeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-2 border-purple-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  {selectedCollegeModal.collegeCode}
                </span>
                <h3 className="text-lg font-extrabold text-[#1e1b4b] mt-1">
                  {selectedCollegeModal.collegeName}
                </h3>
                <p className="text-xs text-gray-500">{selectedCollegeModal.programmeType}</p>
              </div>
              <button
                onClick={() => setSelectedCollegeModal(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4 text-xs">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="text-gray-500 font-medium">Exams Scheduled:</span>
                <p className="text-xl font-bold text-purple-900">{selectedCollegeModal.totalExams}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <span className="text-gray-500 font-medium">Conducted:</span>
                <p className="text-xl font-bold text-emerald-900">{selectedCollegeModal.examsConducted}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="text-gray-500 font-medium">Evaluation Completed:</span>
                <p className="text-xl font-bold text-amber-900">{selectedCollegeModal.evaluationCompleted}</p>
              </div>
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-100">
                <span className="text-gray-500 font-medium">Results Gazetted:</span>
                <p className="text-xl font-bold text-sky-900">{selectedCollegeModal.resultsPublished}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCollegeModal(null)}
                className="px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold hover:bg-[#320b60]"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
