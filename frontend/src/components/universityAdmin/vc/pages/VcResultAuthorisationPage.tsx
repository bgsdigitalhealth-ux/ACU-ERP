import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Check,
  X,
  ShieldCheck
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { RESULT_AUTHORISATION_DATA } from '../../../../data/vcSubmodulesData';

export const VcResultAuthorisationPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [results, setResults] = useState(RESULT_AUTHORISATION_DATA);
  const [activeModal, setActiveModal] = useState<any | null>(null);

  const handleAuthorise = (id: string) => {
    setResults((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              authorisationStatus: 'Authorised',
              signedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            }
          : r
      )
    );
    setToast(`Results for ${id} signed and authorized by Vice-Chancellor. Pushed to public web portal.`);
    setActiveModal(null);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Statutory Assent &amp; Gazetting</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Apex University Result Authorisation
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Final Vice-Chancellor statutory sign-off, grace mark validation &amp; digital seal release prior to student web publishing.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300">
          <span>{results.filter((r) => r.authorisationStatus === 'Pending VC Signature').length} Batches Awaiting Assent</span>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f9f5ff] text-[#4a157c] font-black border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Programme / Batch</th>
                <th className="py-3 px-3">Session</th>
                <th className="py-3 px-3 text-center">Appeared</th>
                <th className="py-3 px-3 text-center">Passed</th>
                <th className="py-3 px-3 text-center">Pass %</th>
                <th className="py-3 px-3 text-center">Distinctions</th>
                <th className="py-3 px-3 text-center">Moderation</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {results.map((res) => (
                <tr key={res.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{res.programme}</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {res.semester} • {res.college}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-700">{res.examSession}</td>
                  <td className="py-3 px-3 text-center font-bold text-gray-900">{res.totalStudents}</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700">{res.passedCount}</td>
                  <td className="py-3 px-3 text-center font-black text-purple-950 text-sm">
                    {res.passPercentage}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-amber-700">{res.distinctionCount}</td>
                  <td className="py-3 px-3 text-center">
                    {res.moderationApplied ? (
                      <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full">
                        +{res.moderationMarksAvg} avg marks
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        res.authorisationStatus === 'Authorised'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {res.authorisationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {res.authorisationStatus === 'Pending VC Signature' ? (
                      <button
                        onClick={() => setActiveModal(res)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs shadow-md hover:opacity-95 cursor-pointer"
                      >
                        Authorize &amp; Sign
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Signed ({res.signedDate})</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorisation Sign Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-base text-purple-950">Statutory Vice-Chancellor Assent</h3>
                <p className="text-xs text-gray-500">{activeModal.programme} ({activeModal.semester})</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Candidates Appeared</span>
                <span className="text-lg font-black text-gray-900">{activeModal.totalStudents}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-700 uppercase font-bold block">Pass Percentage</span>
                <span className="text-lg font-black text-emerald-800">{activeModal.passPercentage}%</span>
              </div>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-1">
              <div className="flex items-center gap-2 text-purple-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Controller of Examination &amp; Tabulation Board Attestation</span>
              </div>
              <p className="text-gray-700">
                Tabulation Register (TR) has been dual-audited. Internal marks, double evaluation variances and moderation policies strictly comply with University Ordinance 14-B.
              </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => handleAuthorise(activeModal.id)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Affix Vice-Chancellor Digital Seal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
