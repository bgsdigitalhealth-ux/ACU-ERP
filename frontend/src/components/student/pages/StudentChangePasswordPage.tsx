import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export const StudentChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg(false);

    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    setSuccessMsg(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-6">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase tracking-wide">
          CHANGE PASSWORD
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Choose a strong password containing letters, numbers and special symbols.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Password changed successfully! Next login requires the new password.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Current Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-800 outline-hidden focus:border-[#7047eb] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            New Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new strong password"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-800 outline-hidden focus:border-[#7047eb] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password strength meter */}
          {newPassword && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1.5 w-full">
                <div
                  className={`flex-1 rounded-full ${
                    strength >= 1 ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`flex-1 rounded-full ${
                    strength >= 2 ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`flex-1 rounded-full ${
                    strength >= 3 ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`flex-1 rounded-full ${
                    strength >= 4 ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              </div>
              <p className="text-[10px] text-gray-500 font-semibold">
                Strength:{' '}
                {strength <= 1
                  ? 'Weak'
                  : strength === 2
                  ? 'Medium'
                  : strength === 3
                  ? 'Good'
                  : 'Very Strong'}
              </p>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Confirm New Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-800 outline-hidden focus:border-[#7047eb] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};
