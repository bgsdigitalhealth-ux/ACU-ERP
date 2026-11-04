import React, { useState } from 'react';
import { Printer, Download } from 'lucide-react';
import { useHod } from '../../context/HodContext';

interface Props {
  initialSubTab?: 'dept-eval-report' | 'faculty-contribution' | 'pending-actions-view';
}

export const HodReportsPage: React.FC<Props> = ({ initialSubTab = 'dept-eval-report' }) => {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const { filters, pendingActions } = useHod();

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-[#f8f9fe] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-purple-200/80 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Reports & Documentation</span>
          <h2 className="text-xl font-extrabold text-[#2a084e]">Department Reports — {filters.subject}</h2>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-purple-50 p-1.5 rounded-xl border border-purple-200">
          <button
            onClick={() => setActiveSubTab('dept-eval-report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'dept-eval-report'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Evaluation Report
          </button>
          <button
            onClick={() => setActiveSubTab('faculty-contribution')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'faculty-contribution'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Faculty Contribution
          </button>
          <button
            onClick={() => setActiveSubTab('pending-actions-view')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'pending-actions-view'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Pending Actions ({pendingActions.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'dept-eval-report' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-gray-900">Annual Departmental Examination Audit Report</h3>
              <p className="text-xs text-gray-500">Adichunchanagiri University • BGS Medical College & Hospital</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold hover:bg-purple-100 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button className="px-3 py-1.5 bg-[#4B087B] text-white rounded-xl text-xs font-bold hover:bg-[#380665] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200">
              <span className="text-xs text-gray-500 font-semibold">Total Examined</span>
              <p className="text-2xl font-extrabold text-purple-950 mt-1">150</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs text-gray-500 font-semibold">Passed</span>
              <p className="text-2xl font-extrabold text-emerald-800 mt-1">145</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-xs text-gray-500 font-semibold">Pass Percentage</span>
              <p className="text-2xl font-extrabold text-blue-800 mt-1">96.7%</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs text-gray-500 font-semibold">Distinctions</span>
              <p className="text-2xl font-extrabold text-amber-800 mt-1">38</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'faculty-contribution' && (
        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900">Faculty Examination Duty & Valuation Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#4B087B] text-white font-bold">
                <tr>
                  <th className="py-2.5 px-4">Faculty Member</th>
                  <th className="py-2.5 px-4">Designation</th>
                  <th className="py-2.5 px-4">Invigilation Sessions</th>
                  <th className="py-2.5 px-4">Scripts Valued</th>
                  <th className="py-2.5 px-4">Practical Stations</th>
                  <th className="py-2.5 px-4">Contribution Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                <tr className="hover:bg-purple-50/50">
                  <td className="py-2.5 px-4 font-bold text-purple-900">Dr. Ranjan Kumar</td>
                  <td className="py-2.5 px-4 text-gray-700">Professor & HOD</td>
                  <td className="py-2.5 px-4 font-semibold">6 Sessions</td>
                  <td className="py-2.5 px-4 font-semibold">150 Scripts (Scrutiny)</td>
                  <td className="py-2.5 px-4 font-semibold">Chief Viva Examiner</td>
                  <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">100% Exemplary</span></td>
                </tr>
                <tr className="hover:bg-purple-50/50">
                  <td className="py-2.5 px-4 font-bold text-purple-900">Dr. Meera Nambiar</td>
                  <td className="py-2.5 px-4 text-gray-700">Associate Professor</td>
                  <td className="py-2.5 px-4 font-semibold">4 Sessions</td>
                  <td className="py-2.5 px-4 font-semibold">75 Scripts</td>
                  <td className="py-2.5 px-4 font-semibold">Station 1 Lead</td>
                  <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">98% Compliant</span></td>
                </tr>
                <tr className="hover:bg-purple-50/50">
                  <td className="py-2.5 px-4 font-bold text-purple-900">Dr. Vikramaditya Rao</td>
                  <td className="py-2.5 px-4 text-gray-700">Associate Professor</td>
                  <td className="py-2.5 px-4 font-semibold">4 Sessions</td>
                  <td className="py-2.5 px-4 font-semibold">75 Scripts</td>
                  <td className="py-2.5 px-4 font-semibold">Station 2 Lead</td>
                  <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">98% Compliant</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'pending-actions-view' && (
        <div className="space-y-3">
          {pendingActions.map(act => (
            <div key={act.id} className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  {act.dueDate}
                </span>
                <h4 className="font-extrabold text-sm text-gray-900 mt-1">{act.title}</h4>
                <p className="text-xs text-gray-500">{act.subtitle} • {act.examination}</p>
              </div>
              <span className="px-3 py-1 bg-[#4B087B] text-white rounded-xl text-xs font-bold">
                Action Required
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
