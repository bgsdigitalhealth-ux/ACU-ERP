import React, { useState } from 'react';
import {
  ChevronDown,
  Filter,
  Mail,
  FolderX,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyTutorBatchesPage: React.FC = () => {
  const { currentCourse, students } = useFaculty();

  const [expandedBatch, setExpandedBatch] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 27 & 28 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        MY COMMUNITIES &gt; MY TUTOR BATCHES
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            MY TUTOR BATCHES
          </h1>

          <button
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
          >
            {showEmptyState ? 'Show Assigned Tutor Batch' : 'Preview Empty State (Page 28)'}
          </button>
        </div>

        {/* Filter button */}
        <div className="pt-1">
          <button className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Show Filters</span>
          </button>
        </div>

        {showEmptyState ? (
          /* Empty State matching Screenshot Page 28 */
          <div className="py-24 text-center space-y-2">
            <FolderX className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-xs font-semibold text-gray-500">
              There is no tutor batch assigned to you
            </p>
          </div>
        ) : (
          /* Active Batch Card matching Screenshot Page 27 */
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => setExpandedBatch(!expandedBatch)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 font-extrabold text-xs text-gray-700 flex items-center justify-center uppercase">
                    BA
                  </span>
                  <div>
                    <h3 className="text-xs font-extrabold text-gray-900">
                      {currentCourse.batch} - {currentCourse.semester}
                    </h3>
                    <div className="text-[11px] text-gray-500">{currentCourse.programme}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
                  <span>{students.length} Mentees</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedBatch ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedBatch && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/40 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs text-gray-600 font-bold">
                    <span>Mentoring &amp; Academic Tutorship Roster</span>
                    <span className="text-emerald-700">All Students Active</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {students.slice(0, 12).map((st) => (
                      <div
                        key={st.rollNo}
                        className="p-3 bg-white rounded-lg border border-gray-200 space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-gray-900 text-xs uppercase truncate max-w-[140px]">
                            {st.name}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {st.attendanceAvg}% Att.
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500">Roll: {st.rollNo}</div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{st.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
