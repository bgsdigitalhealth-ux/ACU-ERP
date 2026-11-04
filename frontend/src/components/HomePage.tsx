import React from 'react';
import {
  Cpu,
  BarChart3,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { RoleInfo } from '../types/auth';
import { ACU_ERP_ROLES } from '../data/roles';
import { AcuLogo } from './AcuLogo';
import { RoleDial } from './RoleDial';
import { LoginFormCard } from './LoginFormCard';

interface HomePageProps {
  onLoginSuccess: (role: RoleInfo, email: string) => void;
  selectedRole: RoleInfo | null;
  setSelectedRole: (role: RoleInfo | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onLoginSuccess,
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden select-none flex flex-col justify-between">
      {/* 
        2nd Campus Background Image (media_1793724891368_0893d982.jpg):
        Displayed edge-to-edge with object-fill so the top-left leaves,
        bottom-left campus building (ADICHUNCHANAGIRI UNIVERSITY) with dome and lawn,
        and bottom purple-yellow waves are completely visible without any cropping.
      */}
      <img
        src="/background.jpg"
        alt="Adichunchanagiri University Campus Background"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none -z-10 select-none"
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center relative z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start h-full">
          
          {/* Left Column: Official ACU ERP Logo, Heading, and 2x2 Feature Grid - Pinned to TOP */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-start space-y-2.5 sm:space-y-3 pt-1 self-start">
            {/* 1. Official ACU Logo */}
            <div>
              <AcuLogo size="md" />
            </div>

            {/* 2. Platform Headline */}
            <div>
              <h1 className="text-base sm:text-xl xl:text-2xl font-black text-[#29084e] leading-tight tracking-tight drop-shadow-2xs">
                University<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h1>
            </div>

            {/* 3. 2x2 Feature Badges Grid matching reference image */}
            <div className="grid grid-cols-2 gap-2 max-w-[280px] pt-0.5">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>

            {/* Note: The bottom half of this left column is completely clear so the entire campus building (ADICHUNCHANAGIRI UNIVERSITY) and front lawn in the 2nd background image are 100% visible and unobstructed! */}
          </div>

          {/* Center Column: 11-Petal Flower Dial with Cropped Center Circle Logo */}
          <div
            className={`transition-all duration-300 flex flex-col items-center justify-center self-center ${
              selectedRole ? 'lg:col-span-5 xl:col-span-5' : 'lg:col-span-8 xl:col-span-8'
            }`}
          >
            <RoleDial
              roles={ACU_ERP_ROLES}
              selectedRoleId={selectedRole?.id || null}
              onSelectRole={(role) => {
                if (selectedRole?.id === role.id) {
                  setSelectedRole(null);
                } else {
                  setSelectedRole(role);
                }
              }}
            />
          </div>

          {/* Right Column: Role-Wise Login Form Card (Rendered ONLY when a role is clicked) */}
          {selectedRole && (
            <div className="lg:col-span-3 xl:col-span-3 flex justify-center lg:justify-end self-center animate-in fade-in slide-in-from-right-6 duration-300">
              <LoginFormCard
                role={selectedRole}
                onClose={() => setSelectedRole(null)}
                onLogin={onLoginSuccess}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
