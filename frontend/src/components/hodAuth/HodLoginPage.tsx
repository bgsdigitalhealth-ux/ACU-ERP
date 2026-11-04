import React, { useState } from 'react';
import { Building, Mail, ArrowRight, Shield, AlertCircle, KeyRound } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { HodOtpVerification } from './HodOtpVerification';

interface HodLoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToCollegeAdmin?: () => void;
  prefilledEmail?: string;
}

export const HodLoginPage: React.FC<HodLoginPageProps> = ({
  onLoginSuccess,
  onNavigateToCollegeAdmin,
  prefilledEmail
}) => {
  const { colleges, sendOtp, pendingLogin, clearPendingLogin } = useHod();

  const [selectedCollegeId, setSelectedCollegeId] = useState(colleges[0]?.id || 'col-bgs-med');
  const [email, setEmail] = useState(prefilledEmail || 'hod.physiology@bgs.edu.in');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid official university/college email address.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      const res = sendOtp(selectedCollegeId, email.trim());
      setIsSending(false);

      if (!res.success) {
        setError(res.error || 'Failed to send OTP.');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf3fe] via-[#f7f4ff] to-[#f3ecff] flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2e1065] text-amber-300 font-extrabold flex items-center justify-center text-sm shadow-sm">
            ACU
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#1e1b4b] leading-tight">
              Adichunchanagiri University
            </h1>
            <p className="text-xs text-purple-700 font-semibold">
              Examination Management System • Head of Department (HOD) Portal
            </p>
          </div>
        </div>

        {onNavigateToCollegeAdmin && (
          <button
            onClick={onNavigateToCollegeAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-200 text-purple-900 rounded-xl text-xs font-bold hover:bg-purple-50 transition-colors shadow-2xs"
          >
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            <span>Switch to College Admin Console</span>
          </button>
        )}
      </div>

      {/* Main Authentication Card */}
      <div className="flex-1 flex items-center justify-center py-6">
        {pendingLogin ? (
          <HodOtpVerification
            onBackToEmail={() => clearPendingLogin()}
            onSuccess={onLoginSuccess}
          />
        ) : (
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200/90 shadow-2xl animate-in fade-in">
            {/* Title */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#4a157c] to-[#2e1065] text-amber-300 flex items-center justify-center shadow-md">
                <KeyRound className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[10.5px] uppercase tracking-wider font-extrabold text-purple-700 block">
                  Step 1 • Identity Verification
                </span>
                <h2 className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">
                  HOD Examination Login
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Secure email OTP authentication for verified HODs
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
              {/* Step 1: College Selection */}
              <div>
                <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Building className="w-3.5 h-3.5 text-purple-700" />
                  <span>Select Constituent College:</span>
                </label>
                <select
                  value={selectedCollegeId}
                  onChange={(e) => setSelectedCollegeId(e.target.value)}
                  className="w-full p-3 bg-purple-50/60 border border-purple-200 rounded-xl font-bold text-[#1e1b4b] outline-none focus:border-purple-600 focus:bg-white transition-all truncate shadow-2xs"
                >
                  {colleges.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Official Email Address */}
              <div>
                <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>Registered Official Email Address:</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. hod.physiology@bgs.edu.in"
                  className="w-full p-3 bg-white border border-purple-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400 shadow-2xs"
                />
                <span className="text-[10.5px] text-gray-400 mt-1 block">
                  Tip: Default active HOD: <strong className="text-purple-700">hod.physiology@bgs.edu.in</strong>
                </span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#4a157c] to-[#320b60] hover:from-[#3a0e69] hover:to-[#250646] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Generate &amp; Send OTP</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-gray-500 pt-4 border-t border-purple-100">
        © 2026 Adichunchanagiri University (ACU) • Examination Management Directorate
      </footer>
    </div>
  );
};

