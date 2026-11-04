import React, { useState } from 'react';
import { FileText, Download, Shield } from 'lucide-react';

export const AcademicGovernancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policies' | 'regulations' | 'documents'>('policies');

  const policies = [
    { title: 'University Examination Policy 2024-25', status: 'Enforced', date: '15 Jan 2025', ref: 'ACU/POL/2025/01' },
    { title: 'Moderation & Re-evaluation Guidelines', status: 'Active', date: '04 Dec 2024', ref: 'ACU/POL/2024/09' },
    { title: 'Disciplinary & Malpractice Ordinance', status: 'Active', date: '18 Oct 2024', ref: 'ACU/ORD/2024/04' },
    { title: 'Digital Evaluation & Barcoded Answer Scripts Framework', status: 'Active', date: '01 Aug 2024', ref: 'ACU/POL/2024/03' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in">
      {/* Title */}
      <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Academic Governance</h2>
          <p className="text-xs sm:text-sm text-amber-300 mt-1">
            Statutory Examination Policies, University Ordinances &amp; Guidelines
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
          <Shield className="w-4 h-4 text-amber-300" />
          <span>Statutory Authority</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-100 pb-2">
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'policies'
              ? 'bg-[#4a157c] text-white shadow-xs'
              : 'text-gray-600 hover:bg-purple-50'
          }`}
        >
          Examination Policies
        </button>
        <button
          onClick={() => setActiveTab('regulations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'regulations'
              ? 'bg-[#4a157c] text-white shadow-xs'
              : 'text-gray-600 hover:bg-purple-50'
          }`}
        >
          Regulations &amp; Ordinances
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-[#4a157c] text-white shadow-xs'
              : 'text-gray-600 hover:bg-purple-50'
          }`}
        >
          Governance Documents
        </button>
      </div>

      {/* Policies List */}
      <div className="bg-white rounded-2xl border border-purple-100/90 shadow-xs divide-y divide-purple-50">
        {policies.map((p, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between hover:bg-purple-50/40 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1e1b4b]">{p.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span>Ref: {p.ref}</span>
                  <span>•</span>
                  <span>Notified: {p.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full">
                {p.status}
              </span>
              <button
                onClick={() => alert(`Downloading statutory gazette: ${p.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gazette</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
