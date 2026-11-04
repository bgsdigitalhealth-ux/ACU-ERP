import React, { useState } from 'react';
import {
  FileText,
  Download,
  Edit,
  Eye,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Save,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyInternalMarksPage: React.FC = () => {
  const { currentCourse, internalMarks, updateStudentMark, submitInternalMarks, profile } = useFaculty();

  const [showMarksSheet, setShowMarksSheet] = useState(true);
  const [editingRoll, setEditingRoll] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const handleMarksSubmit = () => {
    submitInternalMarks();
    setToastMsg('Internal Assessment marks verified and locked! Submitted to COE.');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 18 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; CA/INTERNAL MARKS
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

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          INTERNAL ASSESSMENT REPORT
        </h1>

        {/* IA Weightage Template Card matching Screenshot Page 18 */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-purple-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-gray-900 leading-tight">
                IA WEIGHTAGE TEMPLATE FOR THEORY (INTERNAL MARK REPORT)
              </h3>
              <div className="text-[11px] text-gray-500 mt-1">
                Applied To : <span className="font-bold text-gray-800">Course</span>
              </div>
              <div className="text-[11px] text-gray-500 font-semibold uppercase">
                {profile.fullName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setShowMarksSheet(true)}
              title="View Marks"
              className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowMarksSheet(true)}
              title="Edit / Enter Marks"
              className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleMarksSubmit}
              title="Submit to COE"
              className="p-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Marks Ledger */}
        {showMarksSheet && (
          <div className="space-y-4 pt-2 border-t border-gray-100 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Continuous Assessment Marks Ledger (Batch: {currentCourse.batch})
                </h2>
                <div className="text-xs text-gray-500">
                  CA1 (25) + CA2 (25) + CA3 (25) scaled to 50 marks.
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const csv = 'Roll,Name,CA1,CA2,CA3,TotalScaled50,Percentage\n' +
                      internalMarks.map(r => `${r.rollNo},"${r.studentName}",${r.ca1},${r.ca2},${r.ca3},${r.totalMarks},${r.percentage}%`).join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `IA_Report_${currentCourse.code}.csv`;
                    a.click();
                  }}
                  className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleMarksSubmit}
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Lock &amp; Submit to COE</span>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs min-w-[750px]">
                <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">SL</th>
                    <th className="py-2.5 px-3">ROLL NUMBER</th>
                    <th className="py-2.5 px-3">STUDENT NAME</th>
                    <th className="py-2.5 px-3 text-center">CA 1 (25)</th>
                    <th className="py-2.5 px-3 text-center">CA 2 (25)</th>
                    <th className="py-2.5 px-3 text-center">CA 3 (25)</th>
                    <th className="py-2.5 px-3 text-center">TOTAL (50)</th>
                    <th className="py-2.5 px-3 text-center">PERCENTAGE</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {internalMarks.map((row) => {
                    const isEditingThis = editingRoll === row.rollNo;

                    return (
                      <tr key={row.rollNo} className="hover:bg-purple-50/30 transition-colors">
                        <td className="py-2 px-3 font-bold text-gray-500">{row.slNo}</td>
                        <td className="py-2 px-3 font-mono font-medium text-gray-700">{row.rollNo}</td>
                        <td className="py-2 px-3 font-extrabold text-gray-900 uppercase">{row.studentName}</td>

                        <td className="py-2 px-3 text-center">
                          {isEditingThis ? (
                            <input
                              type="number"
                              min={0}
                              max={25}
                              value={row.ca1}
                              onChange={(e) => updateStudentMark(row.rollNo, { ca1: Number(e.target.value) })}
                              className="w-12 text-center p-1 border border-purple-500 rounded font-bold"
                            />
                          ) : (
                            <span className="font-bold text-gray-800">{row.ca1}</span>
                          )}
                        </td>

                        <td className="py-2 px-3 text-center">
                          {isEditingThis ? (
                            <input
                              type="number"
                              min={0}
                              max={25}
                              value={row.ca2}
                              onChange={(e) => updateStudentMark(row.rollNo, { ca2: Number(e.target.value) })}
                              className="w-12 text-center p-1 border border-purple-500 rounded font-bold"
                            />
                          ) : (
                            <span className="font-bold text-gray-800">{row.ca2}</span>
                          )}
                        </td>

                        <td className="py-2 px-3 text-center">
                          {isEditingThis ? (
                            <input
                              type="number"
                              min={0}
                              max={25}
                              value={row.ca3}
                              onChange={(e) => updateStudentMark(row.rollNo, { ca3: Number(e.target.value) })}
                              className="w-12 text-center p-1 border border-purple-500 rounded font-bold"
                            />
                          ) : (
                            <span className="font-bold text-gray-800">{row.ca3}</span>
                          )}
                        </td>

                        <td className="py-2 px-3 text-center font-black text-purple-800 text-sm">
                          {row.totalMarks}
                        </td>

                        <td className="py-2 px-3 text-center font-bold text-gray-800">
                          {row.percentage}%
                        </td>

                        <td className="py-2 px-3 text-right">
                          {isEditingThis ? (
                            <button
                              onClick={() => setEditingRoll(null)}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingRoll(row.rollNo)}
                              className="text-[11px] font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
