import React from 'react';
import { Building2 } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';
import { CollegeExamStatusItem } from '../../../types/universityAdmin';

interface VcCollegeStatusTableProps {
  onNavigate?: (tab: string) => void;
}

export const VcCollegeStatusTable: React.FC<VcCollegeStatusTableProps> = ({ onNavigate }) => {
  const { collegeStatusList } = useUniversityAdmin();

  const getStatusBadge = (status: CollegeExamStatusItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress':
        return 'bg-sky-100 text-sky-800 border-sky-300 font-bold';
      case 'Evaluation':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Ongoing':
      default:
        return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  const totalExams = collegeStatusList.reduce((acc, c) => acc + c.exams, 0);
  const totalConducted = collegeStatusList.reduce((acc, c) => acc + c.conducted, 0);
  const totalEvaluation = collegeStatusList.reduce((acc, c) => acc + c.evaluation, 0);
  const totalResults = collegeStatusList.reduce((acc, c) => acc + (typeof c.results === 'number' ? c.results : 0), 0);

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            College-wise Examination Status
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          ACU Affiliated Institutions
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100">
            <tr>
              <th className="py-2.5 px-4">College / Institution</th>
              <th className="py-2.5 px-3 text-center">Exams</th>
              <th className="py-2.5 px-3 text-center">Conducted</th>
              <th className="py-2.5 px-3 text-center">Evaluation</th>
              <th className="py-2.5 px-3 text-center">Results</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {collegeStatusList.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  if (onNavigate) onNavigate('college-monitoring');
                }}
                className="hover:bg-purple-50/70 transition-colors cursor-pointer group"
                title="Click to view college monitoring details"
              >
                <td className="py-2.5 px-4 font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                  {item.collegeName}
                </td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{item.exams}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{item.conducted}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{item.evaluation}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{item.results}</td>
                <td className="py-2.5 px-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {/* University Total Row matching image */}
          <tfoot>
            <tr className="bg-[#380b61] text-white font-extrabold text-xs">
              <td className="py-3 px-4">University Total</td>
              <td className="py-3 px-3 text-center text-amber-300 font-black">{totalExams}</td>
              <td className="py-3 px-3 text-center text-amber-300 font-black">{totalConducted}</td>
              <td className="py-3 px-3 text-center text-amber-300 font-black">{totalEvaluation}</td>
              <td className="py-3 px-3 text-center text-amber-300 font-black">{totalResults}</td>
              <td className="py-3 px-3 text-center text-purple-200 text-[11px]">Consolidated</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

