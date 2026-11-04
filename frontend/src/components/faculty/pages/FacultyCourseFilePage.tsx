import React, { useState } from 'react';
import {
  FolderArchive,
  Plus,
  Eye,
  CheckCircle2,
  Download,
  Upload,
  FileText,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyCourseFilePage: React.FC = () => {
  const { currentCourse, courseFileCategories, uploadCourseDocument } = useFaculty();

  const [activeUploadCat, setActiveUploadCat] = useState<string | null>(null);
  const [docName, setDocName] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const totalRequired = courseFileCategories.reduce((acc, c) => acc + c.requiredDocuments, 0);
  const totalUploaded = courseFileCategories.reduce((acc, c) => acc + c.uploadedDocuments, 0);
  const overallPercentage = Math.round((totalUploaded / totalRequired) * 100);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUploadCat || !docName.trim()) return;

    uploadCourseDocument(activeUploadCat, docName);
    setDocName('');
    setActiveUploadCat(null);
    setToastMsg('Dossier document uploaded to Course File successfully!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 19 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; COURSE FILE
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

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
              Course File Repository (NAAC / NBA Accreditation Dossier)
            </h1>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {currentCourse.code} - {currentCourse.name} • Batch: {currentCourse.batch}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Completeness</div>
              <div className="text-sm font-black text-purple-700">{overallPercentage}% Complete</div>
            </div>
            <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 2 Top Folder Tiles matching Screenshot Page 19 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-purple-50/20 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-purple-700 flex items-center justify-center font-bold">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase">COURSE FILE</h3>
                <div className="text-[11px] text-gray-500">Autonomous Accreditation 2026-27</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveUploadCat('cf-1')}
                title="Add Document"
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('Viewing complete Course File Index')}
                title="View All"
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-purple-50/20 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-purple-700 flex items-center justify-center font-bold">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase">TEST / EVALUATION</h3>
                <div className="text-[11px] text-gray-500">Continuous Assessment Papers &amp; Keys</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveUploadCat('cf-3')}
                title="Add Document"
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('Viewing Evaluation archive')}
                title="View All"
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Category Sections */}
        <div className="space-y-4 pt-2">
          {courseFileCategories.map((cat) => (
            <div key={cat.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{cat.title}</h4>
                  <p className="text-[11px] text-gray-500">{cat.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cat.status === 'Complete'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {cat.status} ({cat.uploadedDocuments}/{cat.requiredDocuments})
                  </span>
                  <button
                    onClick={() => setActiveUploadCat(cat.id)}
                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                  </button>
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-1.5">
                {cat.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-2.5 bg-gray-50 rounded-lg flex items-center justify-between text-xs text-gray-700 hover:bg-purple-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-gray-800">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-400 font-mono">{doc.uploadedDate}</span>
                      <button
                        onClick={() => alert(`Downloading: ${doc.name}`)}
                        className="text-purple-700 hover:text-purple-900 cursor-pointer font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {activeUploadCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Upload Course File Document</h3>
              <button
                onClick={() => setActiveUploadCat(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. End_Sem_Question_Paper_Rubric.pdf"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Select File (.pdf, .xlsx)</label>
                <input type="file" className="w-full text-xs p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveUploadCat(null)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
