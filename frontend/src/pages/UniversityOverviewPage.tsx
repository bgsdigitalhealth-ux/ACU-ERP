import React from 'react';
import { Building2, Award, Users, GraduationCap } from 'lucide-react';

export const UniversityOverviewPage: React.FC = () => {
  const collegesData = [
    { name: 'BGS Medical College & Hospital', dean: 'Dr. M. E. Mohan', intake: 150, faculty: 185, pass: '94.2%' },
    { name: 'AIMS, B.G. Nagara', dean: 'Dr. M. G. Shivaramu', intake: 250, faculty: 210, pass: '96.0%' },
    { name: 'BGSVIAHS (Allied Health Sciences)', dean: 'Dr. K. N. Shashidhar', intake: 180, faculty: 75, pass: '91.5%' },
    { name: 'BGS Institute of Technology', dean: 'Dr. B. K. Narendra', intake: 600, faculty: 140, pass: '89.8%' },
    { name: 'Adichunchanagiri College of Pharmacy', dean: 'Dr. B. Ramesh', intake: 160, faculty: 58, pass: '95.1%' },
    { name: 'Adichunchanagiri College of Nursing', dean: 'Prof. Komala H. K.', intake: 120, faculty: 42, pass: '97.4%' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">University Overview</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Constituent Institutions, Academic Councils &amp; Accreditation Metrics
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <Award className="w-4 h-4 text-amber-300" />
          <span>NAAC 'A+' Grade Accredited</span>
        </div>
      </div>

      {/* Constituent Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collegesData.map((col, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-purple-100/90 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm border border-purple-200">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Pass: {col.pass}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-[#1e1b4b] text-sm leading-snug">{col.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Head: {col.dean}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-50 text-[11px] text-gray-600">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span>Annual Intake: <strong>{col.intake}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Faculty: <strong>{col.faculty}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
