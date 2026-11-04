import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  UploadCloud,
  FlaskConical,
  Check,
  Printer,
  Download,
  Send,
  Plus,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { ELIGIBLE_FACULTY_LIST, SAMPLE_MARKS_DATA } from '../../data/hodData';

export const HodModals: React.FC = () => {
  const {
    activeQuickModal,
    setActiveQuickModal,
    selectedStage,
    setSelectedStage,
    filters,
    hodSession,
    handleNominateExaminers,
    handleProposeSchedule,
    handleReviewQuestionPaper,
    handleUploadMarks,
    handleSavePracticalViva
  } = useHod();

  // Local state for Nominate Examiners
  const [examType, setExamType] = useState<'Theory' | 'Practical'>('Practical');
  const [selectedInternals, setSelectedInternals] = useState<string[]>([
    'Dr. Meera Nambiar (Assoc. Prof)',
    'Dr. Vikramaditya Rao (Assoc. Prof)'
  ]);
  const [externalFaculty, setExternalFaculty] = useState<string[]>([
    'Dr. K. M. Swamy - Professor, Bangalore Medical College (BMCRI)',
    'Dr. Rekha Patil - Professor, Mysore Medical College (MMCRI)'
  ]);
  const [newExternal, setNewExternal] = useState('');
  const [chiefExaminer, setChiefExaminer] = useState(hodSession?.fullName || 'Dr. Ranjan Kumar');
  const [nominationRemarks, setNominationRemarks] = useState(
    'Panel satisfies NMC norms with 50% internal and 50% external examiner quota.'
  );

  // Local state for Propose Schedule
  const [scheduleExam, setScheduleExam] = useState('First MBBS Annual Theory Examination 2024–25');
  const [examDate, setExamDate] = useState('2025-03-18');
  const [startTime, setStartTime] = useState('09:30 AM');
  const [endTime, setEndTime] = useState('12:30 PM');
  const [venue, setVenue] = useState('Physiology Examination Hall 1 (Ground Floor)');
  const [invigilatorsCount, setInvigilatorsCount] = useState(4);
  const [batchStrength, setBatchStrength] = useState(150);

  // Local state for Review Question Paper
  const qpCode = 'PHY-101 (Paper I)';
  const [blueprintChecked, setBlueprintChecked] = useState(true);
  const [marksChecked, setMarksChecked] = useState(true);
  const [clarityChecked, setClarityChecked] = useState(true);
  const [qpRemarks, setQpRemarks] = useState(
    'Syllabus coverage 100%. Adequate distribution of MCQs, Short Essays, and Long Questions as per NMC CBME curriculum.'
  );

  // Local state for Upload / Verify Marks
  const marksList = SAMPLE_MARKS_DATA;

  // Local state for Practical Viva
  const [stationsCount, setStationsCount] = useState('3 Stations');
  const [vivaBatchDetails, setVivaBatchDetails] = useState(
    'Station 1: Hematology Practical (Lab 1)\nStation 2: Amphibian / Human Physiology Graphs (Lab 2)\nStation 3: Clinical Examination & Viva Voce (Seminar Room)'
  );
  const [labEquipped, setLabEquipped] = useState(true);

  if (!activeQuickModal && !selectedStage) {
    return null;
  }

  // 1. Nominate Examiners Modal
  const renderNominateModal = () => (
    <div className="p-6 space-y-5">
      <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-200/80 flex items-center justify-between text-xs">
        <div>
          <span className="text-gray-500 font-medium">Department & Subject: </span>
          <span className="font-bold text-purple-900">{filters.subject}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500 font-medium">Programme: </span>
          <span className="font-bold text-purple-900">{filters.programme} ({filters.phase})</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-300">
          Academic Year: {filters.academicYear}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Exam Component</label>
          <div className="flex gap-2">
            {(['Practical', 'Theory'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setExamType(type)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  examType === type
                    ? 'bg-[#4B087B] text-white border-[#4B087B] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {type} Examination
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Chief Examiner (HOD / Senior Lead)</label>
          <input
            type="text"
            value={chiefExaminer}
            onChange={e => setChiefExaminer(e.target.value)}
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl font-semibold bg-gray-50 text-gray-800"
          />
        </div>
      </div>

      {/* Internal Examiners */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">
          Internal Examiners Panel ({selectedInternals.length} selected from department faculty)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50/70 border border-gray-200 rounded-xl">
          {ELIGIBLE_FACULTY_LIST.map(fac => {
            const facLabel = `${fac.name} (${fac.designation})`;
            const isSelected = selectedInternals.includes(facLabel);
            return (
              <div
                key={fac.name}
                onClick={() => {
                  if (isSelected) {
                    setSelectedInternals(prev => prev.filter(item => item !== facLabel));
                  } else {
                    setSelectedInternals(prev => [...prev, facLabel]);
                  }
                }}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#4B087B] border-[#4B087B]' : 'border-gray-400'}`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="truncate">
                  <span>{fac.name}</span>
                  <span className="text-[10px] text-gray-500 block truncate">{fac.designation} • {fac.specialization}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* External Examiners */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-gray-700">
            External Examiners Panel ({externalFaculty.length} empanelled)
          </label>
          <span className="text-[11px] text-purple-700 font-medium">As per statutory NMC guidelines</span>
        </div>
        <div className="space-y-2 mb-2">
          {externalFaculty.map((ext, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs">
              <span className="font-semibold text-gray-800">{ext}</span>
              <button
                type="button"
                onClick={() => setExternalFaculty(prev => prev.filter((_, i) => i !== idx))}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add external professor (e.g. Dr. Name, AIIMS / BMCRI)"
            value={newExternal}
            onChange={e => setNewExternal(e.target.value)}
            className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-xl"
          />
          <button
            type="button"
            onClick={() => {
              if (newExternal.trim()) {
                setExternalFaculty(prev => [...prev, newExternal.trim()]);
                setNewExternal('');
              }
            }}
            className="px-3.5 py-2 bg-purple-100 text-purple-900 border border-purple-300 rounded-xl text-xs font-bold hover:bg-purple-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add External</span>
          </button>
        </div>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">HOD Endorsement & Remarks</label>
        <textarea
          rows={2}
          value={nominationRemarks}
          onChange={e => setNominationRemarks(e.target.value)}
          className="w-full text-xs p-2.5 border border-gray-300 rounded-xl"
        />
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setActiveQuickModal(null)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            handleNominateExaminers({
              examinationId: 'EXAM-2025-PHY',
              examType,
              subject: filters.subject,
              internalExaminers: selectedInternals,
              externalExaminers: externalFaculty,
              chiefExaminer,
              remarks: nominationRemarks
            });
          }}
          className="px-5 py-2 bg-[#4B087B] hover:bg-[#39045e] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Nomination to Dean & COE</span>
        </button>
      </div>
    </div>
  );

  // 2. Propose Schedule Modal
  const renderScheduleModal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex items-center gap-2 text-xs text-sky-900">
        <Calendar className="w-4 h-4 text-sky-700 shrink-0" />
        <span>Department Exam Timetable proposal for <strong>{filters.subject}</strong></span>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Examination Title</label>
        <input
          type="text"
          value={scheduleExam}
          onChange={e => setScheduleExam(e.target.value)}
          className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-semibold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Proposed Date</label>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="w-full text-xs p-2 border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Start Time</label>
          <input
            type="text"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full text-xs p-2 border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">End Time</label>
          <input
            type="text"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full text-xs p-2 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Venue / Examination Hall</label>
          <input
            type="text"
            value={venue}
            onChange={e => setVenue(e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Invigilators Required</label>
          <input
            type="number"
            value={invigilatorsCount}
            onChange={e => setInvigilatorsCount(Number(e.target.value))}
            className="w-full text-xs p-2.5 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Candidate Batch Strength</label>
        <input
          type="number"
          value={batchStrength}
          onChange={e => setBatchStrength(Number(e.target.value))}
          className="w-full text-xs p-2.5 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setActiveQuickModal(null)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            handleProposeSchedule({
              academicYear: filters.academicYear,
              programme: filters.programme,
              phase: filters.phase,
              examType: 'Theory',
              subject: filters.subject,
              examDate,
              startTime,
              endTime,
              venue,
              invigilatorCount: invigilatorsCount,
              remarks: scheduleExam
            });
          }}
          className="px-5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Propose Schedule to College Exam Cell</span>
        </button>
      </div>
    </div>
  );

  // 3. Review Question Paper Modal
  const renderReviewModal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-amber-950">Question Paper Moderation & Review: </span>
          <span className="font-extrabold text-[#7e22ce]">{qpCode}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
          Status: Pending Scrutiny
        </span>
      </div>

      <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">HOD Scrutiny Checklist</h4>
        
        <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={blueprintChecked}
            onChange={e => setBlueprintChecked(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
          />
          <span>Blueprint Adherence: 100% syllabus mapping with no out-of-syllabus questions.</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={marksChecked}
            onChange={e => setMarksChecked(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
          />
          <span>Marks Distribution: Total sum equals exactly 100 marks (Section A: 20, Section B: 40, Section C: 40).</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={clarityChecked}
            onChange={e => setClarityChecked(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
          />
          <span>Question Clarity & Diagrams: Questions are unambiguous, diagrams clear, and time allocated (3 hours) is sufficient.</span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Scrutiny Remarks / Feedback</label>
        <textarea
          rows={3}
          value={qpRemarks}
          onChange={e => setQpRemarks(e.target.value)}
          className="w-full text-xs p-2.5 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            handleReviewQuestionPaper('Modification Requested', qpRemarks);
          }}
          className="px-4 py-2 border border-amber-300 bg-amber-50 text-amber-900 rounded-xl text-xs font-bold hover:bg-amber-100 cursor-pointer"
        >
          Request Revision from Paper Setter
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveQuickModal(null)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleReviewQuestionPaper('Approved', qpRemarks);
            }}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve & Seal Question Paper</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 4. Upload / Verify Marks Modal
  const renderUploadMarksModal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-emerald-950">Subject: {filters.subject} — Marks Verification & COE Dispatch</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
          Double Valuation Verified
        </span>
      </div>

      {/* File Drag & Drop Simulation */}
      <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/30 rounded-2xl p-4 text-center">
        <FileSpreadsheet className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
        <p className="text-xs font-bold text-gray-800">
          Verified Excel Marks Sheet Loaded: <span className="text-emerald-700 font-mono">BGS_MBBS_PHY_MARKS_2025.xlsx</span>
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">150 Students • Double valuation checked & variance within limits</p>
      </div>

      {/* Marks Table Preview */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
          <span>Marks Statement Preview (Showing 5 of 150)</span>
          <span className="text-purple-700 font-semibold text-[11px]">Max Marks: Theory 30 | Practical 40</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/75 text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="py-2 px-3">Roll No</th>
                <th className="py-2 px-3">Student Name</th>
                <th className="py-2 px-3">Internal (30)</th>
                <th className="py-2 px-3">Practical (40)</th>
                <th className="py-2 px-3">Total (70)</th>
                <th className="py-2 px-3">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {marksList.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-50/40">
                  <td className="py-2 px-3 font-mono font-bold text-purple-900">{row.regNumber}</td>
                  <td className="py-2 px-3 font-semibold text-gray-800">{row.studentName}</td>
                  <td className="py-2 px-3 font-bold text-gray-700">{row.internalMarks}</td>
                  <td className="py-2 px-3 font-bold text-gray-700">{row.practicalMarks}</td>
                  <td className="py-2 px-3 font-extrabold text-emerald-700">{row.totalMarks}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                      {row.attendance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>HOD Digital Signature verified for Dr. Ranjan Kumar</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveQuickModal(null)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleUploadMarks('Physiology Theory Paper I & Practical', 150);
            }}
            className="px-5 py-2 bg-[#4B087B] hover:bg-[#38055c] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Verify & Submit Marks to COE</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 5. Practical Viva Details Modal
  const renderPracticalModal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-pink-50 p-3 rounded-xl border border-pink-200 flex items-center gap-2 text-xs text-pink-900">
        <FlaskConical className="w-4 h-4 text-pink-700 shrink-0" />
        <span>Practical & Clinical Examination Setup for <strong>{filters.subject}</strong></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Stations Setup</label>
          <input
            type="text"
            value={stationsCount}
            onChange={e => setStationsCount(e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Department Lab Status</label>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="labCheck"
              checked={labEquipped}
              onChange={e => setLabEquipped(e.target.checked)}
              className="w-4 h-4 rounded text-pink-600"
            />
            <label htmlFor="labCheck" className="text-xs text-gray-700 font-semibold cursor-pointer">
              Instruments, reagents, and clinical kits ready
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">OSCE / OSPE Station Details & Clinical Cases</label>
        <textarea
          rows={4}
          value={vivaBatchDetails}
          onChange={e => setVivaBatchDetails(e.target.value)}
          className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-mono"
        />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setActiveQuickModal(null)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            handleSavePracticalViva(vivaBatchDetails);
          }}
          className="px-5 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save Practical Exam Setup</span>
        </button>
      </div>
    </div>
  );

  // 6. View Department Report Modal
  const renderReportModal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-[#4B087B] text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">Adichunchanagiri University</span>
          <h3 className="font-extrabold text-base">Department Examination Performance Report</h3>
          <p className="text-xs text-purple-200 mt-0.5">Physiology • BGS Medical College & Hospital • AY 2024–25</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer"
            title="Print Report"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
          <span className="text-[11px] text-gray-500 font-medium block">Total Students</span>
          <span className="text-xl font-extrabold text-purple-900">150</span>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
          <span className="text-[11px] text-gray-500 font-medium block">Overall Pass Rate</span>
          <span className="text-xl font-extrabold text-emerald-700">96.4%</span>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
          <span className="text-[11px] text-gray-500 font-medium block">Department Avg</span>
          <span className="text-xl font-extrabold text-blue-700">76.8 / 100</span>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
          <span className="text-[11px] text-gray-500 font-medium block">Distinctions</span>
          <span className="text-xl font-extrabold text-amber-700">38</span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50 text-xs space-y-2">
        <h5 className="font-bold text-gray-800">Department Examination Highlights:</h5>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>100% adherence to NMC CBME question blueprint and double blind valuation guidelines.</li>
          <li>Zero examination malpractice or discrepancy cases recorded during AY 2024–25.</li>
          <li>All internal assessment marks forwarded 5 days prior to university deadline.</li>
        </ul>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={() => setActiveQuickModal(null)}
          className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
        >
          Close Report
        </button>
      </div>
    </div>
  );

  // 7. Workflow Stage Details Modal
  const renderWorkflowStageModal = () => {
    if (!selectedStage) return null;
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-[#7900B8]" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-purple-600 font-bold block">
              Department Workflow Stage
            </span>
            <h3 className="text-lg font-extrabold text-gray-900">{selectedStage.label} {selectedStage.subLabel}</h3>
          </div>
        </div>

        <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Status:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
              selectedStage.status === 'Completed'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : selectedStage.status === 'In Progress'
                ? 'bg-purple-100 text-purple-900 border border-purple-400 font-extrabold'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {selectedStage.status}
            </span>
          </div>

          {selectedStage.completionDate && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Timeline / Completion:</span>
              <span className="font-semibold text-gray-800">{selectedStage.completionDate}</span>
            </div>
          )}

          {selectedStage.responsibleFaculty && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Responsible Authority:</span>
              <span className="font-semibold text-gray-800">{selectedStage.responsibleFaculty}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Operational Description</label>
          <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
            {selectedStage.description}
          </p>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setSelectedStage(null)}
            className="px-5 py-2 bg-purple-900 text-white rounded-xl text-xs font-bold hover:bg-purple-950 cursor-pointer"
          >
            Close Stage Details
          </button>
        </div>
      </div>
    );
  };

  const getModalTitle = () => {
    if (selectedStage) return `Workflow: ${selectedStage.label}`;
    switch (activeQuickModal) {
      case 'nominate':
        return 'Nominate Department Examiners';
      case 'schedule':
        return 'Propose Examination Schedule';
      case 'review':
        return 'Review & Moderate Question Paper';
      case 'upload':
        return 'Upload & Verify Department Marks';
      case 'practical':
        return 'Practical & Viva Voce Setup';
      case 'report':
        return 'Department Evaluation Report';
      default:
        return 'Department Action';
    }
  };

  const closeModal = () => {
    setActiveQuickModal(null);
    setSelectedStage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-200/80 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#380665] via-[#4B087B] to-[#250444] text-white px-5 py-3.5 flex items-center justify-between select-none shrink-0">
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
            <span>{getModalTitle()}</span>
          </h3>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1">
          {selectedStage ? renderWorkflowStageModal() : null}
          {!selectedStage && activeQuickModal === 'nominate' && renderNominateModal()}
          {!selectedStage && activeQuickModal === 'schedule' && renderScheduleModal()}
          {!selectedStage && activeQuickModal === 'review' && renderReviewModal()}
          {!selectedStage && activeQuickModal === 'upload' && renderUploadMarksModal()}
          {!selectedStage && activeQuickModal === 'practical' && renderPracticalModal()}
          {!selectedStage && activeQuickModal === 'report' && renderReportModal()}
        </div>
      </div>
    </div>
  );
};
