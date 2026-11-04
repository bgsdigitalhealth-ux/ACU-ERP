import React, { useState } from 'react';
import {
  Search,
  Download,
  List,
  User,
  X,
  Phone,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { StudentFacultyView } from '../../../types/faculty';

export const FacultyStudentInfoPage: React.FC = () => {
  const { students, currentCourse, profile } = useFaculty();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentFacultyView | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 3 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; STUDENT INFORMATION
      </div>

      {/* Main Container matching screenshot */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">STUDENT DETAILS</h2>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 mt-0.5">
              {currentCourse.name} ({currentCourse.code})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csv = 'Sl,Roll,Reg,Name,Status,Attendance%\n' + students.map(s => `${s.slNo},${s.rollNo},${s.regNo},${s.name},${s.status},${s.attendanceAvg}%`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Students_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              Export
            </button>
            <button
              onClick={() => alert(`Total Enrolled Students: ${students.length}`)}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <List className="w-3.5 h-3.5 text-gray-500" />
              Student List
            </button>
          </div>
        </div>

        {/* Teaching Staff Pill matching Page 3 */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-gray-500 uppercase">TEACHING STAFF</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-medium text-gray-700">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span>{profile.fullName} ({profile.empCode})</span>
          </div>
        </div>

        {/* Search input and Count row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Roll Number"
              className="w-full text-xs pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <span>Batch: <strong className="text-gray-900">{currentCourse.batch}</strong></span>
            <span>STUDENTS COUNT: <strong className="text-purple-700">{students.length}</strong></span>
          </div>
        </div>

        {/* 3-Column Student Cards Grid matching Screenshot Page 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {filteredStudents.map((student) => {
            const initials = student.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('');

            return (
              <div
                key={student.rollNo}
                onClick={() => setSelectedStudent(student)}
                className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 group-hover:bg-purple-100 group-hover:text-purple-800 transition-colors flex items-center justify-center font-bold text-xs shrink-0 uppercase tracking-tight">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-gray-900 truncate group-hover:text-purple-700 transition-colors uppercase">
                      {student.name}
                    </h4>
                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                      Roll No : {student.rollNo}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      Reg No : {student.regNo}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {student.status}
                  </span>
                  <button
                    title="View Profile"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-sm font-bold uppercase">
                  {selectedStudent.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight uppercase">{selectedStudent.name}</h3>
                  <div className="text-xs text-purple-200 font-mono mt-0.5">
                    Roll: {selectedStudent.rollNo} • Reg: {selectedStudent.regNo}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                <div>
                  <span className="text-gray-500 text-[11px]">Enrolled Programme</span>
                  <div className="font-bold text-gray-900">{currentCourse.programme}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px]">Assigned Batch</span>
                  <div className="font-bold text-gray-900">{currentCourse.batch}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px]">Attendance Average</span>
                  <div className="font-bold text-emerald-700 text-sm">{selectedStudent.attendanceAvg}%</div>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px]">Internal Assessment Total</span>
                  <div className="font-bold text-purple-700 text-sm">{selectedStudent.caMarks.total} / 50</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span>{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span>{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Subject: {currentCourse.code} - {currentCourse.name}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg text-gray-600 space-y-1">
                <div className="font-bold text-gray-800">CA Component Breakdown:</div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-1.5 bg-white rounded border border-gray-200">
                    <div className="text-[10px] text-gray-400">CA 1</div>
                    <div className="font-bold text-gray-800">{selectedStudent.caMarks.ca1} / 25</div>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-gray-200">
                    <div className="text-[10px] text-gray-400">CA 2</div>
                    <div className="font-bold text-gray-800">{selectedStudent.caMarks.ca2} / 25</div>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-gray-200">
                    <div className="text-[10px] text-gray-400">CA 3</div>
                    <div className="font-bold text-gray-800">{selectedStudent.caMarks.ca3} / 25</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex justify-end border-t border-gray-200">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
