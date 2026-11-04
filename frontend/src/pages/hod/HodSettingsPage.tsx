import React from 'react';
import { Shield, Lock, Building, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { useHod } from '../../context/HodContext';

export const HodSettingsPage: React.FC = () => {
  const { hodSession, filters } = useHod();

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-[#f8f9fe] min-h-screen">
      <div className="bg-white p-5 rounded-2xl border border-purple-200/80 shadow-2xs">
        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Department Configuration</span>
        <h2 className="text-xl font-extrabold text-[#2a084e]">HOD Profile & Security Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-purple-200 shadow-2xs text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3a0b63] to-[#7900B8] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
            RK
          </div>
          <div>
            <h3 className="font-extrabold text-base text-gray-900">{hodSession?.fullName || 'Dr. Ranjan Kumar'}</h3>
            <p className="text-xs text-purple-700 font-semibold">{hodSession?.employeeId || 'BGS-MED-042'}</p>
            <p className="text-xs text-gray-500 mt-1">Professor & Head of Department</p>
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active HOD Mandate</span>
          </div>
        </div>

        {/* Assigned Details & Institutional Locks */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-purple-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-purple-900 border-b border-gray-100 pb-3">
            <Shield className="w-5 h-5 text-[#4B087B]" />
            <h4 className="font-extrabold text-sm">Institutional Department Mandate (Locked by College Admin)</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
              <span className="text-gray-500 font-medium flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-purple-700" />
                <span>Assigned College (Locked)</span>
              </span>
              <p className="font-extrabold text-purple-950 text-sm">{hodSession?.collegeName || 'BGS Medical College & Hospital'}</p>
            </div>

            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
              <span className="text-gray-500 font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-purple-700" />
                <span>Assigned Department (Locked)</span>
              </span>
              <p className="font-extrabold text-purple-950 text-sm">{filters.subject}</p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-gray-500 font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-700" />
                <span>Official Institutional Email</span>
              </span>
              <p className="font-bold text-gray-800 text-xs">{hodSession?.email || 'hod.physiology@bgs.edu.in'}</p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-gray-500 font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-700" />
                <span>Authorized Mobile Number</span>
              </span>
              <p className="font-bold text-gray-800 text-xs">+91 98451 23456</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              As per university governance protocols, departmental reassignment or college transfer can only be authorized by the College Dean / Admin from the College Admin Portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
