import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Edit2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { CourseHandoutElement } from '../../../types/faculty';

export const FacultyCourseHandoutPage: React.FC = () => {
  const { currentCourse, handoutElements } = useFaculty();
  const [activeElementModal, setActiveElementModal] = useState<CourseHandoutElement | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleOpenElement = (elem: CourseHandoutElement, editMode = false) => {
    setActiveElementModal(elem);
    setIsEditing(editMode);
    setEditContent(elem.description);
  };

  const handleSave = () => {
    if (activeElementModal) {
      activeElementModal.description = editContent;
    }
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 4 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; COURSE HANDOUT
      </div>

      {saveToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Course Handout element updated successfully!</span>
          </div>
          <button onClick={() => setSaveToast(false)} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Card matching Page 4 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Course Handout</h1>
            <p className="text-xs text-gray-500 italic mt-0.5">
              Guiding Educators, Shaping Excellence—Your Blueprint for Effective Teaching!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Downloading course plan: ${currentCourse.coursePlanUrl}`)}
              className="px-3.5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Course Plan</span>
              <Download className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Course Attributes Banner matching Page 4 */}
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200 text-xs text-gray-700 space-y-1">
          <div className="font-bold text-gray-900">
            Course : <span className="font-extrabold text-purple-900">{currentCourse.code} - {currentCourse.name}</span>
          </div>
          <div>
            Incharge : <span className="font-semibold text-gray-800">{currentCourse.incharge}</span>
          </div>
          <div>
            Credit Structure : <span className="font-mono font-bold text-purple-800">{currentCourse.credits}</span>
          </div>
        </div>

        {/* 8 Handout Elements Table matching Page 4 */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/80 border-b border-gray-200 text-gray-600 uppercase font-bold text-[11px]">
              <tr>
                <th className="py-3 px-4">ELEMENT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {handoutElements.map((elem) => (
                <tr key={elem.id} className="hover:bg-purple-50/40 transition-colors group">
                  <td className="py-3 px-4 font-bold text-gray-800 uppercase tracking-tight">
                    {elem.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {elem.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenElement(elem, false)}
                        title="View Element"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenElement(elem, true)}
                        title="Edit Element"
                        className="p-1.5 rounded-lg text-purple-600 hover:text-purple-800 hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Element Detail/Edit Modal */}
      {activeElementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Course Handout Component
                </span>
                <h3 className="font-bold text-sm uppercase">{activeElementModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveElementModal(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <span className="text-gray-500 font-semibold">Course:</span>{' '}
                <strong>{currentCourse.code} - {currentCourse.name}</strong>
              </div>

              {isEditing ? (
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Edit {activeElementModal.title} Content:
                  </label>
                  <textarea
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans"
                  />
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 leading-relaxed text-gray-700">
                  {activeElementModal.description}
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-3">
                <span>Status: <strong className="text-emerald-600">{activeElementModal.status}</strong></span>
                <span>Last Updated: {activeElementModal.lastUpdated}</span>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex items-center justify-end gap-2 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold rounded-lg"
                  >
                    Edit Component
                  </button>
                  <button
                    onClick={() => setActiveElementModal(null)}
                    className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Handout Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Complete Course Handout Document</h3>
                <p className="text-xs text-purple-200">{currentCourse.code} - {currentCourse.name}</p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs max-h-[70vh] overflow-y-auto">
              {handoutElements.map((elem, i) => (
                <div key={elem.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-purple-900 uppercase">
                      {i + 1}. {elem.title}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      {elem.status}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{elem.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200 text-xs">
              <span className="text-gray-500">Autonomous Curriculum Framework - ACU ERP</span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
