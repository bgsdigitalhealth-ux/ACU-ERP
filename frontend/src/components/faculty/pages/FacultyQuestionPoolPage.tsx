import React, { useState } from 'react';
import {
  Plus,
  Download,
  Upload,
  FileText,
  Filter,
  CheckCircle2,
  X,
  Search,
  Eye,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { QuestionPoolItem } from '../../../types/faculty';

export const FacultyQuestionPoolPage: React.FC = () => {
  const { currentCourse, questionPool, addQuestion } = useFaculty();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionPoolItem | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [qText, setQText] = useState('');
  const [qType, setQType] = useState<'MCQ' | 'Short Answer' | 'Descriptive' | 'True / False'>('MCQ');
  const [topic, setTopic] = useState('React Hooks & Lifecycle');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [marks, setMarks] = useState(5);
  const [mappedCO, setMappedCO] = useState('CO4');
  const [bloomsLevel, setBloomsLevel] = useState<'L1 - Remember' | 'L2 - Understand' | 'L3 - Apply' | 'L4 - Analyze'>('L3 - Apply');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const filteredQuestions = questionPool.filter((q) => {
    if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
    if (searchTerm && !q.questionText.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;

    addQuestion({
      questionText: qText,
      questionType: qType,
      topic,
      difficulty,
      marks: Number(marks),
      mappedCO,
      bloomsLevel,
      options: qType === 'MCQ' ? [optionA, optionB, optionC, optionD] : undefined,
      correctOption: qType === 'MCQ' ? correctOption : undefined,
    });

    setQText('');
    setShowCreateModal(false);
    setToastMsg('New question successfully added to Question Pool!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 13 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; ASSESSMENTS &gt; QUESTION POOL
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

      {/* Main Card matching Screenshot Page 13 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        {/* Top Action Buttons row */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <button
            onClick={() => {}}
            className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csv = 'ID,Question,Type,Marks,CO,BloomsLevel\n' + questionPool.map(q => `${q.id},"${q.questionText}",${q.questionType},${q.marks},${q.mappedCO},${q.bloomsLevel}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Question_Pool_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Question</span>
            </button>
          </div>
        </div>

        {/* Import Questions From Excel Card matching Page 13 */}
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
              <span className="font-bold text-gray-700">Import Questions From Excel:</span>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  placeholder="Choose File (.xls, .xlsx)"
                  className="px-3 py-1.5 border border-r-0 border-gray-300 rounded-l-lg bg-white text-xs text-gray-500 w-48 sm:w-60 focus:outline-none"
                />
                <label className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-r-lg cursor-pointer">
                  Browse
                  <input type="file" accept=".xls,.xlsx" className="hidden" onChange={() => alert('Excel file selected for import.')} />
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                setToastMsg('10 Questions imported successfully from Excel sheet!');
                setTimeout(() => setToastMsg(''), 4000);
              }}
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1 border-t border-gray-200/60">
            <button
              onClick={() => alert('Downloading Question_Bank_Template.xlsx')}
              className="text-purple-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel Format</span>
            </button>
            <button
              onClick={() => alert('Excel instructions: Column A: Question text, Column B: Type, Column C: Marks, Column D: Bloom Level, Column E: CO')}
              className="text-purple-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Instructions</span>
            </button>
          </div>
        </div>

        {/* Search & Difficulty Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search question pool..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-600"
            >
              <option value="ALL">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-3"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-gray-500 text-xs">Q{idx + 1}.</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    {q.questionType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {q.mappedCO}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                    {q.bloomsLevel}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="font-extrabold text-gray-900 text-xs ml-auto">
                    {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                  </span>
                </div>

                <p className="text-xs font-bold text-gray-900 leading-relaxed">{q.questionText}</p>

                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] text-gray-700">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border ${
                          opt === q.correctOption
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-gray-50/60 border-gray-200'
                        }`}
                      >
                        <span className="font-mono text-gray-400 mr-1.5">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-1">
                <button
                  onClick={() => setPreviewQuestion(q)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Create Assessment Question</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Enter the question text..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Question Type</label>
                  <select
                    value={qType}
                    onChange={(e: any) => setQType(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="MCQ">Multiple Choice (MCQ)</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="Descriptive">Descriptive</option>
                    <option value="True / False">True / False</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Topic / Unit</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e: any) => setDifficulty(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Marks</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Course Outcome</label>
                  <select
                    value={mappedCO}
                    onChange={(e) => setMappedCO(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="CO1">CO1</option>
                    <option value="CO2">CO2</option>
                    <option value="CO3">CO3</option>
                    <option value="CO4">CO4</option>
                    <option value="CO5">CO5</option>
                    <option value="CO6">CO6</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Bloom's Taxonomy Level</label>
                <select
                  value={bloomsLevel}
                  onChange={(e: any) => setBloomsLevel(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="L1 - Remember">L1 - Remember</option>
                  <option value="L2 - Understand">L2 - Understand</option>
                  <option value="L3 - Apply">L3 - Apply</option>
                  <option value="L4 - Analyze">L4 - Analyze</option>
                </select>
              </div>

              {qType === 'MCQ' && (
                <div className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="font-bold text-gray-700">Answer Options:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Option A"
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option B"
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option C"
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option D"
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Exact Correct Option string"
                    value={correctOption}
                    onChange={(e) => setCorrectOption(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Preview Question Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Question Preview</h3>
              <button
                onClick={() => setPreviewQuestion(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                  {previewQuestion.questionType}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  {previewQuestion.mappedCO}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold">
                  {previewQuestion.bloomsLevel}
                </span>
                <span className="ml-auto font-bold text-gray-900">
                  {previewQuestion.marks} Marks
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 leading-relaxed">
                {previewQuestion.questionText}
              </p>
              {previewQuestion.options && (
                <div className="space-y-1.5 pt-2">
                  <div className="font-bold text-gray-700">Options:</div>
                  {previewQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border text-xs ${
                        opt === previewQuestion.correctOption
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-800'
                      }`}
                    >
                      <span className="font-mono text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                      {opt === previewQuestion.correctOption && (
                        <span className="ml-2 text-emerald-600 font-bold text-[10px] uppercase">
                          (Correct Answer)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  onClick={() => setPreviewQuestion(null)}
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
