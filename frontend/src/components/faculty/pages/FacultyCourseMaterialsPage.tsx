import React, { useState } from 'react';
import {
  Copy,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Plus,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { CourseMaterialFaculty } from '../../../types/faculty';

export const FacultyCourseMaterialsPage: React.FC = () => {
  const { currentCourse, materials, addMaterial, profile } = useFaculty();

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Upload modal states
  const [docName, setDocName] = useState('');
  const [docDesc, setDocDesc] = useState('');
  const [docType, setDocType] = useState<'DOCUMENT' | 'PRESENTATION' | 'CODE_LAB' | 'VIDEO'>('DOCUMENT');

  const filteredMaterials = materials.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyMaterial = (mat: CourseMaterialFaculty) => {
    setToastMsg(`Material "${mat.name}" copied successfully to your active course!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    addMaterial({
      name: docName,
      type: docType,
      description: docDesc,
      uploadedOn: new Date().toLocaleDateString('en-GB') + ' 10:00 AM',
      uploadedBy: profile.fullName,
      fileSize: '1.5 MB',
      fileExt: 'PDF',
      downloadUrl: '#',
    });

    setDocName('');
    setDocDesc('');
    setShowUploadModal(false);
    setToastMsg(`Document "${docName}" uploaded and published to students!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 16 & 17 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; COURSE MATERIALS &gt; COPY
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

      {/* Main Card matching Page 16 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              COPY COURSE MATERIAL
            </h1>
            <p className="text-xs text-gray-600 mt-0.5">
              You can copy your course materials from other courses or course materials uploaded by other staff to your course here: Use filter to search for course materials.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Material</span>
          </button>
        </div>

        {/* Search Bar & Materials Count matching Page 16 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search with title"
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
          </div>

          <div className="flex items-center gap-3 text-gray-500 font-semibold">
            <span>{filteredMaterials.length} course materials found</span>
            <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Materials Table matching Screenshot Pages 16 & 17 */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-600 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3 text-center w-12">#</th>
                <th className="py-2.5 px-4 min-w-[180px]">NAME</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-4 min-w-[260px]">DESCRIPTION</th>
                <th className="py-2.5 px-3">UPLOADED ON</th>
                <th className="py-2.5 px-3">UPLOADED BY</th>
                <th className="py-2.5 px-3 text-center w-24">COPY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-2.5 px-3 text-center font-bold text-gray-500">{mat.slNo}</td>
                  <td className="py-2.5 px-4 font-bold text-gray-900">{mat.name}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-500 text-[10px] uppercase">
                    {mat.type}
                  </td>
                  <td className="py-2.5 px-4 text-gray-600 truncate max-w-xs">{mat.description}</td>
                  <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{mat.uploadedOn}</td>
                  <td className="py-2.5 px-3 text-gray-800 font-medium whitespace-nowrap">
                    {mat.uploadedBy}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleCopyMaterial(mat)}
                      className="px-3 py-1 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs mx-auto"
                    >
                      <Copy className="w-3 h-3 text-gray-400" />
                      <span>Copy</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Upload New Course Material</h3>
              <button
                onClick={() => setShowUploadModal(false)}
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
                  placeholder="e.g. Redux Toolkit Architecture & Best Practices"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Material Type</label>
                <select
                  value={docType}
                  onChange={(e: any) => setDocType(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="DOCUMENT">DOCUMENT (PDF/DOC)</option>
                  <option value="PRESENTATION">PRESENTATION (PPTX)</option>
                  <option value="CODE_LAB">CODE LAB ARCHIVE (ZIP)</option>
                  <option value="VIDEO">VIDEO TUTORIAL</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Description / Student Instructions</label>
                <textarea
                  rows={3}
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  placeholder="Refer to this document for..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Select File</label>
                <input type="file" className="w-full text-xs p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
