import React, { useEffect } from 'react';
import {
  Cpu,
  BarChart3,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { RoleInfo } from '../types/auth';
import {
  KarnatakaCollegeRoleDial,
  KARNATAKA_COLLEGE_ROLES
} from './KarnatakaCollegeRoleDial';
import { LoginFormCard } from './LoginFormCard';

interface CollegeHomePageProps {
  onLoginSuccess: (role: RoleInfo, email: string) => void;
  selectedRole: RoleInfo | null;
  setSelectedRole: (role: RoleInfo | null) => void;
  onBackToStatePortal?: () => void;
  selectedCollegeName?: string;
}

export const CollegeHomePage: React.FC<CollegeHomePageProps> = ({
  onLoginSuccess,
  selectedRole,
  setSelectedRole,
  onBackToStatePortal,
  selectedCollegeName = 'BGS Medical College & Hospital'
}) => {
  // Ensure a college role is selected by default so the Role Based Login card is visible
  useEffect(() => {
    const isCollegeRole = selectedRole && KARNATAKA_COLLEGE_ROLES.some((r) => r.id === selectedRole.id);
    if (!isCollegeRole) {
      // Default to Principal
      setSelectedRole(KARNATAKA_COLLEGE_ROLES[0]);
    }
  }, [selectedRole, setSelectedRole]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto select-none flex flex-col justify-between">
      {/* Official Karnataka Higher Education ERP Full Background Image */}
      <img
        src="/karnataka-background.jpg"
        alt="Karnataka Higher Education ERP Background"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none -z-10 select-none"
      />

      {/* Top Banner / Switch Portal Breadcrumb Bar */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-2 pb-1 flex items-center justify-between relative z-30">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-950 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-200/80 shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-[#8b0029]" />
          <span className="hidden sm:inline text-gray-600">Karnataka Higher Education ERP</span>
          <span className="hidden sm:inline text-gray-400">&rsaquo;</span>
          <span className="text-[#8b0029] font-extrabold">{selectedCollegeName}</span>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
            College Portal
          </span>
        </div>

        {onBackToStatePortal && (
          <button
            onClick={onBackToStatePortal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#8b0029] border border-rose-200 text-xs font-bold shadow-2xs hover:shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch Portal / Back to State Portal</span>
          </button>
        )}
      </div>

      {/* Main Content Area - Balanced 3-column grid (3 + 5 + 4 = 12) */}
      <div className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-2 flex items-center relative z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Left Column: Heading, and 2x2 Feature Grid - lg:col-span-3 (25% width) */}
          <div className="lg:col-span-3 flex flex-col justify-start space-y-3 self-center">
            {/* Platform Headline */}
            <div>
              <h1 className="text-lg sm:text-xl xl:text-2xl font-black text-[#29084e] leading-tight tracking-tight drop-shadow-2xs">
                College<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h1>
            </div>

            {/* 2x2 Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-2 max-w-[280px]">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: 10-Role Karnataka College Dial - lg:col-span-5 (41.6% width) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center self-center py-1">
            <KarnatakaCollegeRoleDial
              selectedRoleId={selectedRole?.id || null}
              onSelectRole={(role) => setSelectedRole(role)}
            />
          </div>

          {/* Right Column: Role Based Login Card - lg:col-span-4 (33.3% width) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end self-center animate-in fade-in slide-in-from-right-6 duration-300">
            <LoginFormCard
              role={selectedRole}
              availableRoles={KARNATAKA_COLLEGE_ROLES}
              onRoleChange={(role) => setSelectedRole(role)}
              onLogin={onLoginSuccess}
            />
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <footer className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-2 relative z-20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-950/70 font-semibold gap-2">
        <div>
          &copy; {new Date().getFullYear()} Government of Karnataka &bull; Department of Higher Education ERP Platform
        </div>
        <div className="flex items-center gap-4 text-[10.5px]">
          <span className="hover:text-purple-900 cursor-pointer">Security Policy</span>
          <span>&bull;</span>
          <span className="hover:text-purple-900 cursor-pointer">Terms of Use</span>
          <span>&bull;</span>
          <span className="hover:text-purple-900 cursor-pointer">Helpdesk</span>
        </div>
      </footer>
    </div>
  );
};
