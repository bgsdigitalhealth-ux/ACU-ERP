import React, { useState } from 'react';
import {
  FlaskConical,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyExperimentStatusPage: React.FC = () => {
  const { currentCourse, students } = useFaculty();

  const [isLabSubjectMode, setIsLabSubjectMode] = useState(false);

  const labExperiments = [
    { no: 1, title: 'Node.js Core Modules, HTTP Web Server & Asynchronous I/O' },
    { no: 2, title: 'Express.js Application Architecture, Routers and Custom Middleware' },
    { no: 3, title: 'Mongoose Schemas, MongoDB Atlas Connectivity & Aggregation Pipelines' },
    { no: 4, title: 'JWT Authentication, bcrypt Hashing and Protected Routes' },
    { no: 5, title: 'React Hooks, Custom Hook for Data Fetching with Axios & Tailwind' },
    { no: 6, title: 'Redux Toolkit Store, Slices and AsyncThunk State Management' },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 15 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; ASSESSMENTS &gt; EXPERIMENT COMPLETION STATUS
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
              EXPERIMENT COMPLETION STATUS (LAB / PRACTICAL)
            </h1>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {currentCourse.code} - {currentCourse.name}
            </div>
          </div>

          <button
            onClick={() => setIsLabSubjectMode(!isLabSubjectMode)}
            className="flex items-center gap-2 px-3.5 py-1.5 border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            {isLabSubjectMode ? (
              <ToggleRight className="w-5 h-5 text-purple-700" />
            ) : (
              <ToggleLeft className="w-5 h-5 text-gray-400" />
            )}
            <span>{isLabSubjectMode ? 'Viewing Lab Practical Matrix' : 'Preview Lab Subject View'}</span>
          </button>
        </div>

        {/* Default View Matching Screenshot Page 15 */}
        {!isLabSubjectMode ? (
          <div className="py-24 text-center space-y-3">
            <FlaskConical className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-xs font-semibold text-gray-500">
              This feature is currently available for lab subjects only.
            </p>
            <button
              onClick={() => setIsLabSubjectMode(true)}
              className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
            >
              Toggle to preview Lab Practical Matrix for Hematology &amp; Clinical Physiology Lab &rarr;
            </button>
          </div>
        ) : (
          /* Active Lab Experiment Tracker Table */
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-purple-50 p-3 rounded-lg border border-purple-200 text-xs text-purple-900">
              <span className="font-bold">
                Practical Course: {currentCourse.code}-L (Hematology &amp; Clinical Physiology Lab) • 6 Experiments Mapped
              </span>
              <span className="font-bold">Total Batch Students: {students.length}</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs min-w-[800px]">
                <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">ROLL NO</th>
                    <th className="py-2.5 px-3">STUDENT NAME</th>
                    {labExperiments.map((exp) => (
                      <th key={exp.no} className="py-2.5 px-2 text-center text-[9px] w-24">
                        EXP #{exp.no}
                      </th>
                    ))}
                    <th className="py-2.5 px-3 text-right">COMPLETED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {students.slice(0, 15).map((st) => (
                    <tr key={st.rollNo} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-2 px-3 font-mono font-medium text-gray-700">{st.rollNo}</td>
                      <td className="py-2 px-3 font-extrabold text-gray-900 uppercase truncate max-w-[170px]">
                        {st.name}
                      </td>
                      {labExperiments.map((exp) => (
                        <td key={exp.no} className="py-2 px-2 text-center">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                            Verified
                          </span>
                        </td>
                      ))}
                      <td className="py-2 px-3 text-right font-bold text-emerald-700">6 / 6</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
