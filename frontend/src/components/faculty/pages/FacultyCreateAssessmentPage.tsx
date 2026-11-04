import React, { useState } from 'react';
import { useFaculty } from '../../../context/FacultyContext';
import {
  PlusCircle,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Send,
  Eye,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const FacultyCreateAssessmentPage: React.FC = () => {
  const { currentCourse, courses, addAssessment, navigate } = useFaculty();

  const [title, setTitle] = useState('');
  const [selectedCourseCode, setSelectedCourseCode] = useState(currentCourse.code);
  const [assessmentType, setAssessmentType] = useState<
    '1. CA (Continuous Assessments)' | '2. Mid-Term Exam' | 'End Semester Exam' | 'Lab Experiment'
  >('1. CA (Continuous Assessments)');
  const [batch, setBatch] = useState('2024MBBS01 - First MBBS');
  const [programme] = useState('MBBS (Bachelor of Medicine and Bachelor of Surgery)');
  const [maxMarks, setMaxMarks] = useState<number>(50);
  const [weightage, setWeightage] = useState<number>(20);
  const [assignedDate, setAssignedDate] = useState('2024-11-15');
  const [dueDate, setDueDate] = useState('2024-11-25');
  const [topics, setTopics] = useState(
    '12-Lead ECG Analysis, Cardiac Cycle Pressure Dynamics, Spirometry Lung Volumes, and Arterial Blood Gas (ABG)'
  );
  const [instructions, setInstructions] = useState(
    'Attempt all OSPE stations. Graph paper and non-programmable calculators are permitted. Verify your student barcode before final submission.'
  );

  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState('');

  const selectedCourseObj = courses.find((c) => c.code === selectedCourseCode) || currentCourse;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAssessment({
      title: title.trim(),
      assessmentType,
      courseCode: selectedCourseObj.code,
      courseName: selectedCourseObj.name,
      batch,
      maxMarks: Number(maxMarks),
      weightage: Number(weightage),
      assignedDate,
      submissionDeadline: dueDate,
      status: 'Published',
      totalCount: 53,
    });

    const newId = `ASM-${Date.now()}`;
    setLastCreatedId(newId);
    setPublishedSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching Linways AMS hierarchy */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
              <span>Home</span>
              <span>&gt;</span>
              <span>Subject Community</span>
              <span>&gt;</span>
              <span>{selectedCourseObj.code} - {selectedCourseObj.name}</span>
              <span>&gt;</span>
              <span>Assessments</span>
              <span>&gt;</span>
              <span className="text-purple-700">Create Assessment</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
              <PlusCircle className="w-6 h-6 text-purple-700" />
              <span>Create Medical Assessment &amp; Sync to Students</span>
            </h1>
            <p className="text-sm text-slate-500">
              Publish continuous or summative clinical assessments. Automatically synched to all enrolled MBBS students of the same class &amp; branch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('assessments', 'management')}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition"
            >
              View All Assessments
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {publishedSuccess && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 mb-1">
                SYNCHRONIZATION ACTIVE &bull; REF: {lastCreatedId}
              </span>
              <h3 className="text-lg font-bold">
                Assessment Published Successfully!
              </h3>
              <p className="text-emerald-100 text-sm mt-1 max-w-2xl leading-relaxed">
                <span className="font-semibold text-white">"{title}"</span> has been dynamically registered in the university database.
                It is now instantly visible and accessible to all 53 students of <span className="underline font-bold">{batch}</span> under course <span className="underline font-bold">{selectedCourseObj.code} ({selectedCourseObj.name})</span> in their Student Portal.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setPublishedSuccess(false);
                    setTitle('');
                  }}
                  className="px-4 py-2 bg-white text-emerald-800 rounded-lg text-xs font-bold shadow hover:bg-emerald-50 transition"
                >
                  Create Another Assessment
                </button>
                <button
                  onClick={() => navigate('assessments', 'management')}
                  className="px-4 py-2 bg-emerald-800/60 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Go to Assessment Management</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Creation Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Assessment Details &amp; Competency Configuration</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                NMC Competency-Based Medical Education (CBME) Assessment Form
              </p>
            </div>

            {/* Assessment Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assessment Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. IA-1: Cardiovascular Dynamics & 12-Lead ECG Analysis OSPE"
                className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium"
              />
            </div>

            {/* Course & Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject / Course *
                </label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => setSelectedCourseCode(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold"
                >
                  {courses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assessment Category *
                </label>
                <select
                  value={assessmentType}
                  onChange={(e: any) => setAssessmentType(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium"
                >
                  <option value="1. CA (Continuous Assessments)">1. CA (Continuous Internal Assessment / IA)</option>
                  <option value="2. Mid-Term Exam">2. Mid-Term / Model Pre-Summative Exam</option>
                  <option value="Lab Experiment">3. Practical Clinical OSPE Station Exam</option>
                  <option value="End Semester Exam">4. University Summative Professional Board Exam</option>
                </select>
              </div>
            </div>

            {/* Branch, Programme & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Programme &amp; Department
                </label>
                <input
                  type="text"
                  readOnly
                  value={programme}
                  className="w-full text-xs font-bold border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Target Batch &amp; Class *
                </label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full text-xs font-bold border border-slate-200 rounded-lg px-3 py-2 bg-white text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="2024MBBS01 - First MBBS">2024MBBS01 - First MBBS (53 Enrolled Students)</option>
                  <option value="2024MBBS02 - Phase 1 Batch B">2024MBBS02 - Phase 1 Batch B (50 Students)</option>
                  <option value="2023MBBS01 - Second MBBS">2023MBBS01 - Second MBBS (100 Students)</option>
                </select>
              </div>
            </div>

            {/* Marks & Weightage */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Max Marks *
                </label>
                <input
                  type="number"
                  min={10}
                  max={200}
                  required
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weightage (%) *
                </label>
                <input
                  type="number"
                  min={5}
                  max={50}
                  required
                  value={weightage}
                  onChange={(e) => setWeightage(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assigned Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={assignedDate}
                    onChange={(e) => setAssignedDate(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg pl-9 pr-2 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Due / Exam Date *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg pl-9 pr-2 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Topics & Syllabus */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Curriculum Topics &amp; NMC Competency Mapping
              </label>
              <textarea
                rows={2}
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="List clinical and theoretical topics covered in this examination..."
                className="w-full text-xs border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instructions to Students
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter examination instructions, items permitted, reporting time..."
                className="w-full text-xs border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('assessments', 'management')}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish &amp; Sync to Student Portal</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Student View Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-600" />
                <span>Live Student Portal Preview</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                DYNAMIC PREVIEW
              </span>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    NEW ASSESSMENT
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                    {title || 'Cardiovascular & Respiratory OSPE Examination'}
                  </h4>
                  <div className="text-xs text-purple-800 font-semibold mt-0.5">
                    {selectedCourseObj.code} &bull; {selectedCourseObj.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-purple-900">{maxMarks} Marks</div>
                  <div className="text-[10px] text-slate-500">{weightage}% Weightage</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-purple-200/60">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Target Cohort:</span>
                  <span className="font-bold text-slate-800">{batch}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Exam Window:</span>
                  <span className="font-semibold text-slate-800">{assignedDate} to {dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="font-semibold text-slate-800">{selectedCourseObj.incharge.split(' - ')[1] || selectedCourseObj.incharge}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NMC CBME Automated Sync Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                When you click "Publish &amp; Sync", the evaluation record is stored into MongoDB / local store, and directly propagated to the authenticated Student Profile of <strong>Haribhushan Kumar</strong> and all classmates in First MBBS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
