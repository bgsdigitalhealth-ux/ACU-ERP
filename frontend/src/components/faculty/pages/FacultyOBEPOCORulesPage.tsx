import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyOBEPOCORulesPage: React.FC = () => {
  const { currentCourse } = useFaculty();

  const [hasTree, setHasTree] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [directWeight, setDirectWeight] = useState(80);
  const [indirectWeight, setIndirectWeight] = useState(20);
  const lvl1Threshold = 60;
  const lvl2Threshold = 70;
  const lvl3Threshold = 80;

  const handleAssignTree = () => {
    setHasTree(true);
    setToastMsg('OBE Curriculum & Attainment Framework Tree assigned to Batch!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 21 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; OBE &gt; PO CO ATTAINMENT RULES
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

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            ATTAINMENT RULES
          </h1>

          <button
            onClick={() => setHasTree(false)}
            className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            <span>Back to batch list</span>
          </button>
        </div>

        {/* Empty / Configuration State matching Screenshot Page 21 */}
        {!hasTree ? (
          <div className="py-24 text-center space-y-3">
            <Sliders className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-xs font-semibold text-gray-600">
              No tree assigned to the batch!{' '}
              <button
                onClick={handleAssignTree}
                className="text-purple-700 font-bold hover:underline cursor-pointer"
              >
                Click here to assign the tree
              </button>
            </p>
          </div>
        ) : (
          /* Attainment Rules Configuration Matrix */
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-900">
              <div>
                <span className="font-extrabold text-sm">Active Tree: NMC CBME GMER-2024 Medical Competency Framework</span>
                <div className="text-purple-700 mt-0.5">Applied to {currentCourse.code} • Batch: {currentCourse.batch}</div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-full text-[11px] self-start sm:self-auto">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Direct & Indirect Weightage */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <h4 className="font-extrabold text-gray-900 uppercase">Assessment Weightage Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Direct Assessment (CA Marks + Sem Exam):</span>
                    <input
                      type="number"
                      value={directWeight}
                      onChange={(e) => setDirectWeight(Number(e.target.value))}
                      className="w-16 text-center p-1 border border-gray-300 rounded font-bold bg-white"
                    />
                    <span className="font-bold text-gray-600">%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Indirect Assessment (Course Exit Survey):</span>
                    <input
                      type="number"
                      value={indirectWeight}
                      onChange={(e) => setIndirectWeight(Number(e.target.value))}
                      className="w-16 text-center p-1 border border-gray-300 rounded font-bold bg-white"
                    />
                    <span className="font-bold text-gray-600">%</span>
                  </div>
                </div>
              </div>

              {/* Threshold Levels */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <h4 className="font-extrabold text-gray-900 uppercase">Attainment Level Thresholds</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Level 1 (&gt;= Threshold):</span>
                    <span className="font-bold text-gray-900">{lvl1Threshold}% Students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Level 2 (&gt;= Threshold):</span>
                    <span className="font-bold text-gray-900">{lvl2Threshold}% Students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Level 3 (&gt;= Threshold):</span>
                    <span className="font-bold text-gray-900">{lvl3Threshold}% Students</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setToastMsg('Attainment Rules configuration updated and saved!');
                  setTimeout(() => setToastMsg(''), 3000);
                }}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg shadow-sm"
              >
                Save Attainment Rules
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
