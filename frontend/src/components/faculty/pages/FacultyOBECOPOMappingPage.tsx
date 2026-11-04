import React, { useState } from 'react';
import {
  Printer,
  Download,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyOBECOPOMappingPage: React.FC = () => {
  const { currentCourse, obeOutcomes } = useFaculty();

  const [dismissNotice, setDismissNotice] = useState(false);
  const [selectedCriteria] = useState('PO&PSO');
  const [toastMsg, setToastMsg] = useState('');

  // CO-PO Matrix initial state
  // CO1..CO6 vs PO1..PO12, PSO1..PSO3
  const [matrix, setMatrix] = useState<{ [coKey: string]: { [poKey: string]: number } }>({
    CO1: { PO1: 3, PO2: 3, PO3: 2, PO4: 2, PO5: 3, PO6: 1, PO7: 1, PO8: 1, PO9: 2, PO10: 2, PO11: 2, PO12: 3, PSO1: 3, PSO2: 2, PSO3: 2 },
    CO2: { PO1: 3, PO2: 3, PO3: 3, PO4: 2, PO5: 3, PO6: 1, PO7: 1, PO8: 1, PO9: 2, PO10: 2, PO11: 3, PO12: 3, PSO1: 3, PSO2: 3, PSO3: 2 },
    CO3: { PO1: 3, PO2: 3, PO3: 2, PO4: 2, PO5: 2, PO6: 0, PO7: 1, PO8: 1, PO9: 2, PO10: 2, PO11: 2, PO12: 3, PSO1: 3, PSO2: 2, PSO3: 2 },
    CO4: { PO1: 3, PO2: 3, PO3: 3, PO4: 3, PO5: 3, PO6: 1, PO7: 1, PO8: 1, PO9: 3, PO10: 2, PO11: 2, PO12: 3, PSO1: 3, PSO2: 3, PSO3: 3 },
    CO5: { PO1: 3, PO2: 3, PO3: 3, PO4: 3, PO5: 3, PO6: 1, PO7: 1, PO8: 1, PO9: 3, PO10: 2, PO11: 3, PO12: 3, PSO1: 3, PSO2: 3, PSO3: 3 },
    CO6: { PO1: 2, PO2: 3, PO3: 3, PO4: 3, PO5: 3, PO6: 2, PO7: 2, PO8: 2, PO9: 3, PO10: 3, PO11: 3, PO12: 3, PSO1: 3, PSO2: 3, PSO3: 3 },
  });

  const poHeaders = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'];
  const psoHeaders = ['PSO1', 'PSO2', 'PSO3'];

  const handleCellChange = (co: string, col: string, val: number) => {
    setMatrix((prev) => ({
      ...prev,
      [co]: {
        ...(prev[co] || {}),
        [col]: Math.max(0, Math.min(3, val)),
      },
    }));
  };

  const handleSaveMatrix = () => {
    setToastMsg('CO-PO and PSO correlation matrix saved and verified!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 22 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; OBE &gt; CO-PO &amp; PSO MAPPING
      </div>

      {toastMsg && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Warning Banner matching Screenshot Page 22 */}
      {!dismissNotice && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span>Active Correlation Matrix: Autonomous Curriculum Framework (NBA Tier 1 Mapped)</span>
          <button onClick={() => setDismissNotice(true)} className="text-rose-500 hover:text-rose-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            CO-PO/PSO MAPPING REPORT
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                const csv = 'CO,' + poHeaders.join(',') + ',' + psoHeaders.join(',') + '\n' +
                  obeOutcomes.map(co => `${co.coCode},` + poHeaders.map(po => matrix[co.coCode]?.[po] ?? 0).join(',') + ',' + psoHeaders.map(pso => matrix[co.coCode]?.[pso] ?? 0).join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `CO_PO_Mapping_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Inputs matching Screenshot Page 22 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg text-xs">
          <div>
            <label className="block text-gray-600 font-bold mb-1">PO/PSO</label>
            <input
              type="text"
              readOnly
              value={selectedCriteria}
              className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-gray-50 font-bold text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-bold mb-1">Show Other Mapped Criteria</label>
            <select className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white text-gray-700">
              <option value="">Choose mapped criteria</option>
              <option value="direct">Direct Assessment Only</option>
              <option value="indirect">Indirect Attainment Only</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
          <span>Correlation scale:</span>
          <span className="font-bold text-gray-800">0 – No correlation</span>
          <span className="font-bold text-blue-700">1 – Slight / Low</span>
          <span className="font-bold text-purple-700">2 – Moderate / Medium</span>
          <span className="font-bold text-emerald-700">3 – Substantial / High</span>
        </div>

        {/* Matrix Table */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3 w-16 text-center">CO</th>
                {poHeaders.map((po) => (
                  <th key={po} className="py-2.5 px-1.5 text-center w-10">
                    {po}
                  </th>
                ))}
                {psoHeaders.map((pso) => (
                  <th key={pso} className="py-2.5 px-1.5 text-center w-12 bg-purple-50 text-purple-900 border-l border-gray-200">
                    {pso}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {obeOutcomes.map((co) => (
                <tr key={co.id} className="hover:bg-purple-50/20 transition-colors">
                  <td className="py-2.5 px-3 font-extrabold text-purple-900 text-center">
                    {co.coCode}
                  </td>
                  {poHeaders.map((po) => {
                    const val = matrix[co.coCode]?.[po] ?? 0;
                    return (
                      <td key={po} className="py-2 px-1 text-center">
                        <input
                          type="number"
                          min={0}
                          max={3}
                          value={val}
                          onChange={(e) => handleCellChange(co.coCode, po, Number(e.target.value))}
                          className={`w-8 h-7 text-center font-bold text-xs rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600 ${
                            val === 3
                              ? 'bg-emerald-50 text-emerald-800'
                              : val === 2
                              ? 'bg-purple-50 text-purple-800'
                              : val === 1
                              ? 'bg-blue-50 text-blue-800'
                              : 'text-gray-400'
                          }`}
                        />
                      </td>
                    );
                  })}
                  {psoHeaders.map((pso) => {
                    const val = matrix[co.coCode]?.[pso] ?? 0;
                    return (
                      <td key={pso} className="py-2 px-1 text-center bg-purple-50/30 border-l border-gray-100">
                        <input
                          type="number"
                          min={0}
                          max={3}
                          value={val}
                          onChange={(e) => handleCellChange(co.coCode, pso, Number(e.target.value))}
                          className={`w-8 h-7 text-center font-bold text-xs rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600 ${
                            val === 3
                              ? 'bg-emerald-50 text-emerald-800'
                              : val === 2
                              ? 'bg-purple-50 text-purple-800'
                              : 'text-gray-400'
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveMatrix}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg shadow-sm"
          >
            Save Correlation Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
