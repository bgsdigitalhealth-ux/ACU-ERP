import React, { useState } from 'react';
import {
  Info,
  Mail,
  Phone,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const StudentMentoringPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'empty' | 'details'>('empty');

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 4 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        MENTORING &amp; GUIDANCE &gt; MENTORING &amp; GUIDANCE
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-extrabold text-gray-800 tracking-wide uppercase">
          MENTORING &amp; GUIDANCE
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500 font-semibold">Demo state:</span>
          <button
            onClick={() => setViewMode(viewMode === 'empty' ? 'details' : 'empty')}
            className="px-3 py-1 rounded-md text-[11px] font-bold border border-gray-300 hover:bg-gray-100 text-purple-700 cursor-pointer"
          >
            {viewMode === 'empty' ? 'Show Assigned Mentor Group' : 'Show PDF Empty State'}
          </button>
        </div>
      </div>

      {viewMode === 'empty' ? (
        /* Empty State matching Page 4 exactly */
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-2xs flex items-center justify-center min-h-[360px]">
          <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>No Mentor Group Found</span>
          </div>
        </div>
      ) : (
        /* Assigned Mentor Details Card */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl">
                IR
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Prof. Dr. Mohammed Ismail Razee, MD</h3>
                <p className="text-xs text-purple-700 font-bold">Professor &amp; Clinical Mentor</p>
                <p className="text-[11px] text-gray-400">Faculty ID: ACU-MED-0084</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-gray-400" />
                <span>Department of Physiology, AIMS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-purple-700 font-semibold">ismail.razee@bgs.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>+91 94481 00223</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-gray-400" />
                <span>Cabin 204, AIMS Academic Block</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                Active Mentor Group: MBBS-2024-G01
              </span>
            </div>
          </div>

          <div className="md:col-span-8 bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
            <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-2">
              Mentoring &amp; Student Guidance History
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>1. Major Project Architecture &amp; Topic Approval</span>
                  <span className="text-purple-700">22-09-2026</span>
                </div>
                <p className="text-xs text-gray-600">
                  Discussed cyber physical digital twin framework. Advised to focus on real-time sensor sync and cloud orchestration pipelines.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Status: Completed</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>2. Semester 3 Academic Progress Review</span>
                  <span className="text-purple-700">14-08-2026</span>
                </div>
                <p className="text-xs text-gray-600">
                  Reviewed SGPA 8.42 performance. Commended consistent academic score across cloud computing and data structures.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Status: Completed</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>3. Industry Internship Guidance</span>
                  <span className="text-purple-700">10-07-2026</span>
                </div>
                <p className="text-xs text-gray-600">
                  Guidance regarding campus placement drives, resume preparation and competitive coding practice.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Status: Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
