import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  Smartphone,
  Save,
  Mail,
  Phone
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';

export const VcSettingsPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'sessions'>('profile');

  // Form states
  const [phone, setPhone] = useState('+91 8234 287285');
  const [email, setEmail] = useState('vc@acu.edu.in');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [smsMalpractice, setSmsMalpractice] = useState(true);
  const [emailValuation, setEmailValuation] = useState(true);
  const [urgentSchedule, setUrgentSchedule] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('Vice-Chancellor executive profile updated successfully.');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setToast('Passwords do not match or cannot be empty.');
      return;
    }
    setToast('Executive master password successfully updated with 2FA re-verification.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Executive Preferences &amp; Access Controls</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Vice-Chancellor Account &amp; System Settings
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Executive profile management, cryptographic signature verification &amp; high-security multi-factor authentication.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-200/90 shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-purple-900 text-amber-300 shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile Information</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-purple-900 text-amber-300 shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security &amp; 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-purple-900 text-amber-300 shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Alert Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sessions'
              ? 'bg-purple-900 text-amber-300 shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Active Sessions</span>
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 p-5 sm:p-6 shadow-2xs">
          <form onSubmit={handleSaveProfile} className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 font-black text-xl flex items-center justify-center ring-4 ring-purple-200 shadow-md">
                VC
              </div>
              <div>
                <h3 className="font-black text-base text-purple-950">Prof. (Dr.) M. A. Shekar</h3>
                <p className="text-xs text-gray-500 font-medium">Vice-Chancellor, Adichunchanagiri University</p>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 inline-block mt-1">
                  Statutory Academic Head &amp; Chief Executive
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Official Executive Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Office Telephone / Intercom</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Executive Office Address</label>
                <input
                  type="text"
                  readOnly
                  value="Office of the Vice-Chancellor, Adichunchanagiri University, B.G. Nagara, Mandya District - 571448"
                  className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Current Statutory Term</label>
                <input
                  type="text"
                  readOnly
                  value="2023 – 2026 (Triennial Term)"
                  className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Digital Certificate Thumbprint</label>
                <input
                  type="text"
                  readOnly
                  value="SHA-256: 7F:89:C4:B2:AC:00:1E:99"
                  className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl font-mono text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 p-5 sm:p-6 shadow-2xs space-y-6 max-w-2xl">
          {/* Change Password */}
          <div>
            <h3 className="font-extrabold text-sm text-purple-950 mb-1">Change Master Password</h3>
            <p className="text-xs text-gray-500 mb-4">Master credential for statutory assent and decree authorization</p>

            <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Current Master Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">New Master Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 12 characters"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-purple-900 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-purple-800 transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* 2FA Toggle */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-gray-900">Two-Factor Authentication (TOTP)</h4>
              <p className="text-[11px] text-gray-500">Require biometric or authenticator app code for result releases</p>
            </div>
            <button
              onClick={() => {
                setTwoFactor(!twoFactor);
                setToast(`Two-Factor Authentication ${!twoFactor ? 'enabled' : 'disabled'}.`);
              }}
              className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                twoFactor ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  twoFactor ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 p-5 sm:p-6 shadow-2xs space-y-4 max-w-2xl text-xs">
          <h3 className="font-extrabold text-sm text-purple-950 mb-1">High-Priority Alert Channels</h3>
          <p className="text-xs text-gray-500 mb-4">Configure direct executive notifications sent to your personal mobile and email</p>

          <div className="space-y-3">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Immediate SMS on Reported Examination Malpractice</h4>
                <p className="text-[11px] text-gray-500">Instant alert when Flying Squad files an apex unfair means report</p>
              </div>
              <input
                type="checkbox"
                checked={smsMalpractice}
                onChange={(e) => setSmsMalpractice(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Daily Central Valuation Velocity Digest</h4>
                <p className="text-[11px] text-gray-500">Nightly email report summarizing answer booklet evaluation progress</p>
              </div>
              <input
                type="checkbox"
                checked={emailValuation}
                onChange={(e) => setEmailValuation(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Emergency Timetable Modification Requisitions</h4>
                <p className="text-[11px] text-gray-500">Push notification when any college principal requests schedule alteration</p>
              </div>
              <input
                type="checkbox"
                checked={urgentSchedule}
                onChange={(e) => setUrgentSchedule(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-purple-950">Authenticated Executive Sessions</h3>
            <span className="text-xs text-emerald-600 font-bold">2 Devices Authorized</span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Vice-Chancellor Desktop Workstation (Current)</span>
                <span className="text-gray-500">Chrome on Windows 11 • IP: 10.14.0.12 (University Secure VPN)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Active Now
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Apple iPad Pro (Executive Mobile Portal)</span>
                <span className="text-gray-500">Safari on iPadOS 18 • IP: 172.16.8.44 • Last active 2 hours ago</span>
              </div>
              <button
                onClick={() => setToast('Remote session revoked.')}
                className="px-3 py-1 bg-rose-50 text-rose-700 font-bold text-xs rounded-lg border border-rose-200 hover:bg-rose-100 cursor-pointer"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
