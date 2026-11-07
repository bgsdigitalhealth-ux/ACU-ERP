import React, { useState } from 'react';
import {
  Microscope,
  Send,
  CheckCircle2,
  TrendingUp,
  Award,
  Download,
  Building2,
  ChevronRight,
  Filter
} from 'lucide-react';

interface VcResearchReportProps {
  onNavigate?: (tab: string) => void;
}

export const VcResearchReport: React.FC<VcResearchReportProps> = ({ onNavigate }) => {
  const [selectedFaculty, setSelectedFaculty] = useState('all');

  // Summary Research Metrics
  const researchStats = [
    {
      id: 'ongoing',
      title: 'Ongoing Research',
      count: 48,
      delta: '+6 this quarter',
      sublabel: 'Active Clinical & Scientific Trials',
      icon: Microscope,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-500 text-white',
      breakdown: [
        { label: 'Clinical & Biomedical Trials', count: 22 },
        { label: 'Pharmaceutical Formulation Studies', count: 14 },
        { label: 'AI in Healthcare & MedTech', count: 8 },
        { label: 'Allied & Community Health', count: 4 }
      ]
    },
    {
      id: 'submitted',
      title: 'Research Proposals Submitted',
      count: 26,
      delta: 'Awaiting review',
      sublabel: 'Submitted to National & Global Agencies',
      icon: Send,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-500 text-white',
      breakdown: [
        { label: 'ICMR (Indian Council of Medical Research)', count: 11 },
        { label: 'DST / SERB (Science & Engineering Board)', count: 8 },
        { label: 'DBT (Dept of Biotechnology)', count: 5 },
        { label: 'AYUSH & Industry Sponsored', count: 2 }
      ]
    },
    {
      id: 'completed',
      title: 'Completed Research',
      count: 114,
      delta: '100% Indexed',
      sublabel: 'Concluded, Published & Adopted',
      icon: CheckCircle2,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-500 text-white',
      breakdown: [
        { label: 'Scopus / PubMed Indexed Publications', count: 78 },
        { label: 'Clinical Protocols Implemented', count: 24 },
        { label: 'Intellectual Property & Tech Transfers', count: 12 }
      ]
    },
    {
      id: 'grants',
      title: 'Total Research Grants',
      count: '₹16.42 Cr',
      delta: '+18.5% YoY',
      sublabel: 'Sanctioned Extramural & Intramural Funds',
      icon: TrendingUp,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-600 text-white',
      breakdown: [
        { label: 'Extramural Grants (Govt / ICMR / DST)', count: '₹12.80 Cr' },
        { label: 'ACU Seed & Intramural Grants', count: '₹2.10 Cr' },
        { label: 'Industry & Hospital Sponsorships', count: '₹1.52 Cr' }
      ]
    }
  ];

  // Faculty wise breakdown
  const facultyData = [
    {
      name: 'Adichunchanagiri Institute of Medical Sciences (AIMS)',
      faculty: 'medical',
      ongoing: 24,
      submitted: 12,
      completed: 58,
      funding: '₹8.90 Cr',
      patents: 6,
      lead: 'Prof. (Dr.) B. G. Dharshan'
    },
    {
      name: 'BGS College of Pharmacy',
      faculty: 'pharmacy',
      ongoing: 10,
      submitted: 6,
      completed: 24,
      funding: '₹3.40 Cr',
      patents: 4,
      lead: 'Prof. (Dr.) Ramesh B.'
    },
    {
      name: 'BGS Institute of Technology (Biomedical & Engineering)',
      faculty: 'engineering',
      ongoing: 8,
      submitted: 5,
      completed: 18,
      funding: '₹2.30 Cr',
      patents: 3,
      lead: 'Prof. (Dr.) Narendra Kumar S.'
    },
    {
      name: 'Adichunchanagiri College of Nursing & Allied Health',
      faculty: 'allied',
      ongoing: 6,
      submitted: 3,
      completed: 14,
      funding: '₹1.82 Cr',
      patents: 1,
      lead: 'Prof. (Dr.) Victoria D’Souza'
    }
  ];

  const filteredFaculties =
    selectedFaculty === 'all'
      ? facultyData
      : facultyData.filter((f) => f.faculty === selectedFaculty);

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow-sm">
            <Microscope className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                University Research & Innovation Report
              </h3>
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-300/30">
                Institutional R&D
              </span>
            </div>
            <p className="text-[11px] text-purple-200">
              Ongoing clinical projects, submitted research proposals & peer-reviewed completions
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-purple-950/70 border border-purple-400/30 rounded-xl px-2.5 py-1 text-xs text-white">
            <Filter className="w-3.5 h-3.5 text-purple-300" />
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all" className="bg-[#2d0850] text-white">All Constituent Colleges</option>
              <option value="medical" className="bg-[#2d0850] text-white">AIMS Medical College</option>
              <option value="pharmacy" className="bg-[#2d0850] text-white">BGS Pharmacy</option>
              <option value="engineering" className="bg-[#2d0850] text-white">Biomedical Engineering</option>
              <option value="allied" className="bg-[#2d0850] text-white">Nursing & Allied Health</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('performance-reports-vc');
            }}
            className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export R&D Report</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* 4 Research KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchStats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#fcfbff] border border-purple-100 hover:border-purple-300 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-700 tracking-tight">
                      {item.title}
                    </span>
                    <div className={`w-8 h-8 rounded-xl ${item.iconBg} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      {item.count}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.delta}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 font-medium mb-3">
                    {item.sublabel}
                  </p>
                </div>

                {/* Sub-breakdown items */}
                <div className="pt-3 border-t border-purple-100/80 space-y-1.5">
                  {item.breakdown.map((b, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-600 truncate max-w-[170px]">{b.label}</span>
                      <span className="font-extrabold text-purple-900">{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* College-wise Research Portfolio Table */}
        <div className="border border-purple-100 rounded-2xl overflow-hidden shadow-2xs">
          <div className="bg-[#f8f5fd] px-4 py-2.5 border-b border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-700" />
              <span className="text-xs font-extrabold text-[#3b1263] uppercase tracking-wide">
                Faculty-wise Research & Grant Distribution
              </span>
            </div>
            <span className="text-[11px] font-semibold text-purple-600">
              Showing {filteredFaculties.length} Academic Divisions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8fe] text-gray-600 font-extrabold border-b border-purple-100 uppercase text-[10.5px]">
                <tr>
                  <th className="py-2.5 px-4">Constituent College / Division</th>
                  <th className="py-2.5 px-3 text-center">Ongoing Projects</th>
                  <th className="py-2.5 px-3 text-center">Proposals Submitted</th>
                  <th className="py-2.5 px-3 text-center">Completed Research</th>
                  <th className="py-2.5 px-3 text-right">Sanctioned Grants</th>
                  <th className="py-2.5 px-3 text-center">Patents</th>
                  <th className="py-2.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/70">
                {filteredFaculties.map((f, i) => (
                  <tr key={i} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{f.name}</div>
                      <div className="text-[10.5px] text-gray-500 font-medium">Head of Research: {f.lead}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        {f.ongoing} Active
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-amber-700">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                        {f.submitted} Pending
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-blue-700">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                        {f.completed} Published
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-black text-purple-950 font-mono">
                      {f.funding}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-gray-700">
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {f.patents}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          if (onNavigate) onNavigate('performance-reports-vc');
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-950 hover:underline cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
