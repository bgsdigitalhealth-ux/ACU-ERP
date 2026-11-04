import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Mail,
  Send,
  Trash2,
  CheckCircle2,
  XCircle,
  KeyRound
} from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { AddHodModal } from './AddHodModal';
import { HodAssignment } from '../../types/hod';

export const HodManagementPage: React.FC<{ onProceedToHodLogin?: (email: string) => void }> = ({
  onProceedToHodLogin
}) => {
  const {
    currentCollegeAdminCollege,
    hodAssignments,
    updateHodStatus,
    resendInvitation,
    removeHodAssignment
  } = useHod();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredHods = hodAssignments.filter((h) => {
    const matchesSearch =
      h.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || h.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const getStatusBadge = (status: HodAssignment['accountStatus']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Invited':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Deactivated':
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in select-none">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#320b60] via-[#4a157c] to-[#250646] text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-purple-950">
              College Admin Console
            </span>
            <span className="text-xs text-purple-200">
              {currentCollegeAdminCollege.name} ({currentCollegeAdminCollege.code})
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Head of Department (HOD) Management
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
            Department Assignments, Credential Onboarding &amp; Examination Controller Authorization
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-purple-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 stroke-[2.5]" />
          <span>Assign New HOD</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-purple-100/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by HOD name, email, employee ID..."
              className="w-full pl-9 pr-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-purple-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-gray-600">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl text-xs font-bold text-[#1e1b4b] outline-none"
            >
              <option value="All">All Departments ({currentCollegeAdminCollege.departments.length})</option>
              {currentCollegeAdminCollege.departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs font-bold text-gray-500 text-right">
          Total Assigned HODs: <strong className="text-purple-900">{filteredHods.length}</strong>
        </div>
      </div>

      {/* HODs Table */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#fcfaff] text-[#475569] font-bold border-b border-purple-100 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-5 font-extrabold text-[#2e1065]">HOD Faculty Details</th>
                <th className="py-3 px-3">Employee ID</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Assigned Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-[12.5px] font-medium text-[#1e293b]">
              {filteredHods.map((hod) => (
                <tr key={hod.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-5">
                    <div>
                      <span className="font-extrabold text-[#1e1b4b] text-sm block">
                        {hod.fullName}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-purple-600" />
                        <span>{hod.email}</span>
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-purple-900">
                    {hod.employeeId}
                  </td>

                  <td className="py-3.5 px-3 font-bold text-[#1e1b4b]">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-lg text-xs font-bold">
                      {hod.department}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-gray-600 font-medium">
                    {hod.designation}
                  </td>

                  <td className="py-3.5 px-3 text-gray-500 whitespace-nowrap">
                    {hod.assignedDate}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getStatusBadge(
                        hod.accountStatus
                      )}`}
                    >
                      {hod.accountStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Fast login as this HOD shortcut */}
                      {onProceedToHodLogin && (
                        <button
                          onClick={() => onProceedToHodLogin(hod.email)}
                          className="p-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors"
                          title="Simulate HOD OTP Login with this faculty email"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Resend Invitation */}
                      <button
                        onClick={() => resendInvitation(hod.id)}
                        className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
                        title="Resend Invitation Email"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      {/* Activate / Deactivate Toggle */}
                      {hod.accountStatus === 'Active' ? (
                        <button
                          onClick={() => updateHodStatus(hod.id, 'Deactivated')}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                          title="Deactivate HOD Assignment"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateHodStatus(hod.id, 'Active')}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Activate HOD Account"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Remove */}
                      <button
                        onClick={() => {
                          if (confirm(`Revoke HOD assignment for ${hod.fullName} (${hod.department})?`)) {
                            removeHodAssignment(hod.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                        title="Delete Assignment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddHodModal onClose={() => setIsAddModalOpen(false)} />}
    </div>
  );
};
