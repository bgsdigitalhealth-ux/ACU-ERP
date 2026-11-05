import React, { useState } from 'react';
import {
  Cpu,
  BarChart3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export interface UniversityOption {
  id: string;
  name: string;
  shortName: string;
  location: string;
  isRecommended?: boolean;
}

export const KARNATAKA_UNIVERSITIES: UniversityOption[] = [
  {
    id: 'acu',
    name: 'Adichunchanagiri University (ACU)',
    shortName: 'ACU',
    location: 'B.G. Nagara, Mandya',
    isRecommended: true
  },
  {
    id: 'rguhs',
    name: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    shortName: 'RGUHS',
    location: 'Bengaluru'
  },
  {
    id: 'vtu',
    name: 'Visvesvaraya Technological University (VTU)',
    shortName: 'VTU',
    location: 'Belagavi'
  },
  {
    id: 'bu',
    name: 'Bangalore University',
    shortName: 'BU',
    location: 'Bengaluru'
  },
  {
    id: 'uom',
    name: 'University of Mysore',
    shortName: 'UoM',
    location: 'Mysuru'
  },
  {
    id: 'mu',
    name: 'Mangalore University',
    shortName: 'MU',
    location: 'Mangaluru'
  },
  {
    id: 'kuvempu',
    name: 'Kuvempu University',
    shortName: 'KU',
    location: 'Shivamogga'
  },
  {
    id: 'gulbarga',
    name: 'Gulbarga University',
    shortName: 'GU',
    location: 'Kalaburagi'
  },
  {
    id: 'ksou',
    name: 'Karnataka State Open University (KSOU)',
    shortName: 'KSOU',
    location: 'Mysuru'
  },
  {
    id: 'davangere',
    name: 'Davangere University',
    shortName: 'DU',
    location: 'Davangere'
  },
  {
    id: 'rcub',
    name: 'Rani Channamma University',
    shortName: 'RCUB',
    location: 'Belagavi'
  },
  {
    id: 'bcu',
    name: 'Bengaluru City University',
    shortName: 'BCU',
    location: 'Bengaluru'
  },
  {
    id: 'bnu',
    name: 'Bengaluru North University',
    shortName: 'BNU',
    location: 'Kolar'
  },
  {
    id: 'kud',
    name: 'Karnataka University',
    shortName: 'KUD',
    location: 'Dharwad'
  },
  {
    id: 'tu',
    name: 'Tumkur University',
    shortName: 'TU',
    location: 'Tumakuru'
  }
];

interface KarnatakaHomePageProps {
  onProceedToUniversity: (university: UniversityOption) => void;
  onProceedToCollege: () => void;
  onNavigateToHed?: () => void;
}

export const KarnatakaHomePage: React.FC<KarnatakaHomePageProps> = ({
  onProceedToUniversity,
  onProceedToCollege,
  onNavigateToHed
}) => {
  const [selectedUniversity] = useState<UniversityOption>(KARNATAKA_UNIVERSITIES[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUniversityClick = () => {
    showToast(`Redirecting to ${selectedUniversity.name} Role Based Login...`);
    setTimeout(() => {
      onProceedToUniversity(selectedUniversity);
    }, 300);
  };

  const handleHedClick = () => {
    if (onNavigateToHed) {
      onNavigateToHed();
    } else {
      showToast('Redirecting to Higher Education Department Apex Governance...');
      setTimeout(() => {
        onProceedToUniversity(selectedUniversity);
      }, 350);
    }
  };

  const handleCollegeClick = () => {
    showToast('Redirecting to College Role Based Login...');
    setTimeout(() => {
      onProceedToCollege();
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto select-none flex flex-col justify-between">
      {/* Official Karnataka Higher Education ERP Background Image */}
      <img
        src="/karnataka-background.jpg"
        alt="Karnataka Higher Education ERP Background"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none -z-10 select-none"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-[#8b0029] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-rose-300/40 text-xs animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar: Karnataka Seal & Title (Compact & pinned to top) */}
      <header className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-2 pb-0 relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Karnataka State Seal */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center p-0.5 bg-white/80 backdrop-blur-xs border border-purple-200/60 shadow-2xs">
            <img
              src="/karnataka-seal.png"
              alt="Seal of Karnataka"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="border-l-2 border-purple-300/80 pl-3">
            <h1 className="text-lg sm:text-xl md:text-[22px] font-black tracking-tight text-[#29084e] leading-tight">
              Karnataka Higher Education ERP
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-600 tracking-normal">
              Integrated Higher Education Management Platform
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area - Grid with valid Tailwind columns (5 + 7 = 12) */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-2 pb-2 relative z-20 flex items-start">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1 (Left): Headline & 2x2 Feature Grid - lg:col-span-5 */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-3 self-start">
            <div>
              <h2 className="text-lg sm:text-xl xl:text-2xl font-black text-[#29084e] leading-tight tracking-tight drop-shadow-2xs">
                University<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h2>
            </div>

            {/* 2x2 Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-2 max-w-[280px]">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (Right): 3 Selection Cards - lg:col-span-7, positioned in upper sky above building */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 justify-start self-start w-full max-w-lg lg:ml-auto">
            {/* Card 1: Higher Education Department */}
            <button
              type="button"
              onClick={handleHedClick}
              className="relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 border-slate-200/90 hover:border-red-400 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="flex items-center gap-3 z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-1 bg-red-50 border border-red-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/hed-icon.png"
                    alt="Higher Education Department"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-red-200/80 pl-3">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                    Higher Education Department
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    Apex Secretariat &amp; State Councils
                  </p>
                </div>
              </div>

              {/* Right Side Red Gradient Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#f43f5e] via-[#e11d48]/80 to-transparent rounded-r-2xl transform skew-x-[-12deg] translate-x-6 group-hover:translate-x-4 transition-transform opacity-90" />
              </div>
            </button>

            {/* Card 2: University Login - Clicking redirects to 2nd Home page for University */}
            <button
              type="button"
              onClick={handleUniversityClick}
              className="relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 border-blue-500/80 ring-2 ring-blue-400/20 hover:border-blue-600 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="flex items-center gap-3 z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-1 bg-blue-50 border border-blue-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/univ-icon.png"
                    alt="University Login"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-blue-200/80 pl-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      University Login
                    </h3>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      Multi-Campus
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    State &amp; Autonomous University Portals
                  </p>
                </div>
              </div>

              {/* Action Prompt with arrow */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-blue-700 pr-8 z-10 group-hover:translate-x-1 transition-transform">
                <span>Access Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Right Side Blue Gradient Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#0284c7] via-[#0ea5e9]/80 to-transparent rounded-r-2xl transform skew-x-[-12deg] translate-x-6 group-hover:translate-x-4 transition-transform opacity-90" />
              </div>
            </button>

            {/* Card 3: College Login - Clicking redirects to 2nd Home page for College */}
            <button
              type="button"
              onClick={handleCollegeClick}
              className="relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 border-slate-200/90 hover:border-amber-400 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="flex items-center gap-3 z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-1 bg-amber-50 border border-amber-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/college-icon.png"
                    alt="College Login"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-amber-200/80 pl-3">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors leading-tight">
                    College Login
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    Affiliated, Constituent &amp; Autonomous
                  </p>
                </div>
              </div>

              {/* Action Prompt with arrow */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 pr-8 z-10 group-hover:translate-x-1 transition-transform">
                <span>Access Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Right Side Orange Gradient Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#ea580c] via-[#f59e0b]/80 to-transparent rounded-r-2xl transform skew-x-[-12deg] translate-x-6 group-hover:translate-x-4 transition-transform opacity-90" />
              </div>
            </button>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-2 relative z-20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-950/70 font-semibold gap-1">
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
