import React, { useState } from 'react';
import {
  FileText,
  Download,
  Edit,
  ChevronDown,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyCourseInfoPage: React.FC = () => {
  const { currentCourse, profile, students } = useFaculty();
  const [aboutText, setAboutText] = useState(currentCourse.aboutCourse);
  const [learnText, setLearnText] = useState(currentCourse.whatYoullLearn);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingCourse(false);
    setToastMsg('Course Information updated successfully!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 5 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; COURSE INFO
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

      {/* Main Container matching Page 5 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 uppercase">
              {currentCourse.code} - {currentCourse.name}
            </h1>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {currentCourse.programme} • Batch: {currentCourse.batch} • {currentCourse.credits}
            </div>
          </div>

          <button
            onClick={() => setIsEditingCourse(true)}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Course</span>
          </button>
        </div>

        {/* Course Plan Card matching Page 5 */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-gray-500 uppercase">COURSE PLAN</div>
          <div className="inline-flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            <FileText className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="text-xs font-bold text-gray-800">{currentCourse.coursePlanUrl}</span>
            <button
              onClick={() => alert(`Downloading: ${currentCourse.coursePlanUrl}`)}
              className="p-1.5 rounded-lg hover:bg-white text-gray-500 hover:text-purple-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Layout matching Screenshot Page 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): About & What You'll Learn */}
          <div className="lg:col-span-8 space-y-6">
            {/* ABOUT COURSE */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">ABOUT COURSE</div>
              <div
                onClick={() => setIsEditingCourse(true)}
                className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-purple-400 bg-gray-50/50 hover:bg-purple-50/20 text-xs text-gray-700 leading-relaxed cursor-pointer transition-colors"
              >
                {aboutText ? (
                  <p>{aboutText}</p>
                ) : (
                  <span className="text-gray-400">No content added. Click here to add the content</span>
                )}
              </div>
            </div>

            {/* WHAT YOU'LL LEARN */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">WHAT YOU'LL LEARN</div>
              <div
                onClick={() => setIsEditingCourse(true)}
                className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-purple-400 bg-gray-50/50 hover:bg-purple-50/20 text-xs text-gray-700 leading-relaxed cursor-pointer transition-colors"
              >
                {learnText ? (
                  <p>{learnText}</p>
                ) : (
                  <span className="text-gray-400">No content added. Click here to add the content</span>
                )}
              </div>
            </div>

            {/* CLASS SCHEDULES Dropdown */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full bg-gray-50 px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span>CLASS SCHEDULES</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${showSchedule ? 'rotate-180' : ''}`}
                />
              </button>

              {showSchedule && (
                <div className="p-4 space-y-2 bg-white text-xs divide-y divide-gray-100">
                  <div className="flex items-center justify-between py-1.5">
                    <span className="font-semibold text-gray-800">Tuesday • Hour 2 (09:45 AM - 10:40 AM)</span>
                    <span className="text-gray-500">Lecture Hall 1 • AIMS Academic Block</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="font-semibold text-gray-800">Thursday • Hour 4 (01:00 PM - 02:00 PM)</span>
                    <span className="text-gray-500">Hematology &amp; Clinical Physiology Lab</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Instructor, Students, Assessments */}
          <div className="lg:col-span-4 space-y-6">
            {/* INSTRUCTOR DETAILS */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase">INSTRUCTOR DETAILS</div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {profile.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">{profile.fullName}</div>
                  <div className="text-[11px] text-gray-500 font-mono">Code: {profile.empCode}</div>
                </div>
              </div>
            </div>

            {/* STUDENT DETAILS matching Screenshot Page 5 */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase">STUDENT DETAILS</div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                {/* Avatar Circles */}
                <div className="flex items-center -space-x-2 overflow-hidden py-1">
                  {students.slice(0, 9).map((st, i) => {
                    const initials = st.name.split(' ').map(n => n[0]).slice(0, 2).join('');
                    const colors = [
                      'bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
                      'bg-rose-500', 'bg-purple-500', 'bg-teal-500', 'bg-cyan-500', 'bg-violet-500'
                    ];
                    return (
                      <div
                        key={st.rollNo}
                        title={st.name}
                        className={`inline-block h-8 w-8 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white uppercase ${colors[i % colors.length]}`}
                      >
                        {initials}
                      </div>
                    );
                  })}
                  <div className="inline-block h-8 w-8 rounded-full bg-gray-700 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    +{students.length - 9}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-gray-600 font-semibold">Total: {students.length} Enrolled</span>
                  <button
                    onClick={() => alert(`Batch: ${currentCourse.batch} has ${students.length} active students.`)}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900"
                  >
                    View More &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* ASSESSMENTS SUMMARY TABLE matching Screenshot Page 5 */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase">ASSESSMENTS</div>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white text-xs">
                <div className="bg-gray-100/80 px-3 py-2 flex items-center justify-between text-gray-600 font-bold text-[11px] uppercase">
                  <span>ASSESSMENT TYPE</span>
                  <span>COUNT</span>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="text-gray-800">1. CA (Continuous Assessments)</span>
                    <span className="font-bold text-purple-700">3</span>
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="text-gray-800">2. Mid-Term Exam</span>
                    <span className="font-bold text-purple-700">1</span>
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="text-gray-800">End Semester Exam</span>
                    <span className="font-bold text-purple-700">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      {isEditingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Course Information</h3>
              <button
                onClick={() => setIsEditingCourse(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">About Course Description:</label>
                <textarea
                  rows={4}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">What You'll Learn Objectives:</label>
                <textarea
                  rows={4}
                  value={learnText}
                  onChange={(e) => setLearnText(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditingCourse(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Information
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
