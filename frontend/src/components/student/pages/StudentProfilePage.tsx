import React, { useState } from 'react';
import {
  Upload,
  Save,
  CheckCircle2,
  Home,
  BarChart2,
  KeyRound,
  CalendarX,
  FileCheck,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

export const StudentProfilePage: React.FC = () => {
  const { profile, updateProfile, navigate } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile.photoUrl);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);
      handleChange('photoUrl', preview);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Blue Top Sub-bar matching Page 2 & 3 */}
      <div className="bg-[#1b75bb] text-white rounded-lg px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          Adichunchanagiri University, B.G. Nagara
        </span>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => navigate('home', 'my-courses')}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate('outcomes', 'student-performance')}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>My performance</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sub-Sidebar matching Page 2 & 3 */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="bg-[#337ab7] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
              Profile Settings
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <button
                onClick={() => navigate('profile', 'my-profile')}
                className="w-full text-left px-4 py-2.5 font-bold text-[#337ab7] bg-blue-50/50 flex items-center gap-2 cursor-pointer"
              >
                <span className="text-blue-600">▸</span>
                <span>My profile</span>
              </button>
              <button
                onClick={() => navigate('profile', 'change-password')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                <span>Change password</span>
              </button>
              <button
                onClick={() => navigate('leave', 'apply-leave')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <CalendarX className="w-3.5 h-3.5 text-gray-400" />
                <span>Leave Management</span>
              </button>
              <button
                onClick={() => navigate('surveys', 'course-survey')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-gray-400" />
                <span>Evaluation</span>
              </button>
            </div>
          </div>

          {/* Student Photo Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex flex-col items-center text-center">
            <div className="w-36 h-44 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner mb-3 bg-gray-100 flex items-center justify-center">
              <img
                src={photoPreview || '/student/haribhushan_photo.jpg'}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <label className="w-full cursor-pointer py-1.5 px-3 rounded-lg border border-gray-300 hover:border-[#7047eb] text-[11px] font-bold text-gray-700 hover:text-[#7047eb] bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload passport size photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-gray-400 mt-1">
              Supported formats: JPEG, PNG (Max 500KB)
            </p>
          </div>
        </div>

        {/* Right Content: MY PROFILE Form matching Page 2 & 3 */}
        <div className="lg:col-span-9 bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-wide uppercase">
                MY PROFILE
              </h2>
              <p className="text-[11px] text-red-500 font-semibold mt-0.5">
                Field(s) marked with * are required
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Details */}
            <div>
              <div className="text-right text-xs font-extrabold text-gray-700 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider">
                Account Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    RollNo:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.rollNo}
                    className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    University Reg.No:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.universityRegNo}
                    className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Admission No:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.admissionNo}
                    className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div>
              <div className="text-right text-xs font-extrabold text-gray-700 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider">
                Profile Details
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Name:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 font-bold text-gray-900 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Email:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Gender:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <select
                      disabled={!isEditing}
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>

                {/* Birth Day */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Birth Day:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.birthDay}
                      onChange={(e) => handleChange('birthDay', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Birth Place */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Birth Place:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.birthPlace}
                      onChange={(e) => handleChange('birthPlace', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Birth State */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Birth State:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.birthState}
                      onChange={(e) => handleChange('birthState', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Birth Country */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Birth Country:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.birthCountry}
                      onChange={(e) => handleChange('birthCountry', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Mother Tongue */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <label className="font-bold text-gray-700">
                    Mother Tongue:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.motherTongue}
                      onChange={(e) => handleChange('motherTongue', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Permanent Address */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
                  <label className="font-bold text-gray-700 pt-1">
                    Permanent Address:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={formData.permanentAddress}
                      onChange={(e) => handleChange('permanentAddress', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>

                {/* Current Address */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
                  <label className="font-bold text-gray-700 pt-1">
                    Current Address:<span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-3">
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={formData.currentAddress}
                      onChange={(e) => handleChange('currentAddress', e.target.value)}
                      className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-gray-800 outline-hidden focus:border-[#7047eb]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
