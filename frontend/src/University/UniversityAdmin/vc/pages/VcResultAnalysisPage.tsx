import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Download
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { RANK_HOLDERS_DATA } from '../../../../data/vcSubmodulesData';

export const VcResultAnalysisPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();

  const collegePerformance = [
    { name: 'AIMS, B.G. Nagara (Medical)', passRate: 94.2, students: 250, distinctions: 68 },
    { name: 'BGS Medical College & Hospital', passRate: 93.8, students: 250, distinctions: 62 },
    { name: 'Sri Adichunchanagiri Pharmacy', passRate: 92.7, students: 110, distinctions: 31 },
    { name: 'BGS Dental College', passRate: 91.5, students: 100, distinctions: 24 },
    { name: 'Adichunchanagiri Nursing', passRate: 90.4, students: 120, distinctions: 28 },
    { name: 'BGS Institute of Technology', passRate: 88.5, students: 480, distinctions: 95 },
    { name: 'BGS Aviation & Allied Health', passRate: 87.8, students: 145, distinctions: 22 }
  ];

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Academic Performance Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Result Analytics &amp; Gold Medalists
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            College-wise pass benchmark comparisons, rank holder rosters &amp; distinction distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setToast('Consolidated Result Analytics PDF generated.')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Consolidated Pass Rate</span>
          <div className="text-2xl font-black text-purple-950">92.4%</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+0.8% vs 2023-24</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Total Distinctions</span>
          <div className="text-2xl font-black text-amber-600">330</div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">22.7% of all candidates</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">University Gold Medals</span>
          <div className="text-2xl font-black text-emerald-700">14 Awardees</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Highest: 88.6% (MBBS)</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/90 shadow-2xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Revaluation Success</span>
          <div className="text-2xl font-black text-sky-700">1.8%</div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">Sub-2% High Evaluation Integrity</p>
        </div>
      </div>

      {/* Two Column Section: Top Rank Holders + College Pass Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Rank Holders */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <h3 className="font-extrabold text-sm text-white">University Rank Holders &amp; Medals</h3>
            </div>
            <span className="text-[10px] text-purple-200 font-bold bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
              Convocation 2025 Roster
            </span>
          </div>

          <div className="divide-y divide-purple-100 p-2">
            {RANK_HOLDERS_DATA.map((rank) => (
              <div key={rank.rank} className="p-3 flex items-center justify-between gap-3 hover:bg-purple-50/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                      rank.rank === 1
                        ? 'bg-amber-400 text-purple-950 ring-2 ring-amber-200'
                        : rank.rank === 2
                        ? 'bg-gray-200 text-gray-800'
                        : rank.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    #{rank.rank}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-gray-900">{rank.studentName}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {rank.college.split('(')[0]} • {rank.usn}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-purple-950 block">{rank.percentage}%</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {rank.medal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* College Pass Benchmarks */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-300" />
              <h3 className="font-extrabold text-sm text-white">Constituent College Pass Benchmarks</h3>
            </div>
            <span className="text-[10px] text-purple-200 font-bold bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
              Benchmark Target: 90%
            </span>
          </div>

          <div className="p-4 space-y-3">
            {collegePerformance.map((col, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-800 truncate max-w-[260px]">{col.name}</span>
                  <span className="text-purple-950 font-black">{col.passRate}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      col.passRate >= 92 ? 'bg-emerald-500' : col.passRate >= 90 ? 'bg-purple-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${col.passRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span>{col.students} Appeared</span>
                  <span>{col.distinctions} Distinctions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
