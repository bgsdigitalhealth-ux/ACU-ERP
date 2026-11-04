import React, { useState } from 'react';
import { X, UserPlus, Building, Mail, Phone, Calendar, Briefcase, Hash, AlertCircle } from 'lucide-react';
import { useHod } from '../../context/HodContext';

interface AddHodModalProps {
  onClose: () => void;
}

export const AddHodModal: React.FC<AddHodModalProps> = ({ onClose }) => {
  const { currentCollegeAdminCollege, addHodAssignment } = useHod();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    department: currentCollegeAdminCollege.departments[0] || 'Physiology',
    designation: 'Professor & Head of Department',
    mobileNumber: '',
    joiningDate: new Date().toISOString().split('T')[0],
    accountStatus: 'Invited' as const
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid official university/college email address.');
      return;
    }

    if (!formData.employeeId.trim()) {
      setError('Employee ID is required.');
      return;
    }

    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = addHodAssignment({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        employeeId: formData.employeeId.trim().toUpperCase(),
        department: formData.department,
        designation: formData.designation,
        mobileNumber: formData.mobileNumber.trim(),
        joiningDate: formData.joiningDate,
        accountStatus: 'Invited'
      });

      setIsSubmitting(false);

      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Failed to assign HOD.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in select-none">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-2 border-purple-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
                College Admin • HOD Assignment
              </span>
              <h3 className="text-lg font-extrabold text-white leading-tight">
                Assign Head of Department (HOD)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Locked College Field */}
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <Building className="w-3.5 h-3.5 text-purple-600" />
              <span>Assigned College (Locked to Authenticated Institution):</span>
            </label>
            <input
              type="text"
              disabled
              value={currentCollegeAdminCollege.name}
              className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-700 cursor-not-allowed text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Full Name (with Honorific): *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Dr. Ramesh Babu"
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none focus:border-purple-600"
              />
            </div>

            {/* Official Email */}
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Mail className="w-3.5 h-3.5 text-purple-600" />
                <span>Official Email Address: *</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. hod.anatomy@bgs.edu.in"
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none focus:border-purple-600"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Hash className="w-3.5 h-3.5 text-purple-600" />
                <span>Employee ID (Unique): *</span>
              </label>
              <input
                type="text"
                required
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                placeholder="e.g. BGS-MED-068"
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none focus:border-purple-600 uppercase"
              />
            </div>

            {/* Department Dropdown (Loaded from College) */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Department to Assign: *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl font-bold text-[#1e1b4b] outline-none focus:border-purple-600"
              >
                {currentCollegeAdminCollege.departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                <span>Designation:</span>
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Professor & HOD"
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none focus:border-purple-600"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Phone className="w-3.5 h-3.5 text-purple-600" />
                <span>Mobile Number: *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>Joining Date as HOD:</span>
            </label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="w-full p-2.5 bg-white border border-purple-200 rounded-xl font-medium text-gray-900 outline-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-[#4a157c] to-[#320b60] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? 'Sending Invitation...' : 'Assign HOD & Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

