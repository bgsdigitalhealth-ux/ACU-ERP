import React, { useState } from 'react';
import {
  Cpu,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle2,
  X
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
}

export const KarnatakaHomePage: React.FC<KarnatakaHomePageProps> = ({
  onProceedToUniversity
}) => {
  // Selected Card: Initially null - only show login form once a login role card is clicked
  const [selectedCard, setSelectedCard] = useState<'hed' | 'university' | 'college' | null>(null);

  // Form State
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('acu');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('dce');
  const [selectedCollegeType, setSelectedCollegeType] = useState<string>('medical');
  const [username, setUsername] = useState<string>('admin@acu.edu.in');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCard === 'university') {
      const university = KARNATAKA_UNIVERSITIES.find((u) => u.id === selectedUniversityId) || KARNATAKA_UNIVERSITIES[0];
      setIsLoading(true);
      showToast(`Connecting to ${university.name}...`);
      setTimeout(() => {
        setIsLoading(false);
        onProceedToUniversity(university);
      }, 600);
    } else if (selectedCard === 'hed') {
      showToast('Higher Education Department authentication successful. Redirecting to State Oversight Console.');
      setTimeout(() => {
        onProceedToUniversity(KARNATAKA_UNIVERSITIES[0]);
      }, 700);
    } else {
      showToast('College portal authentication successful. Redirecting to College Admin suite.');
      setTimeout(() => {
        onProceedToUniversity(KARNATAKA_UNIVERSITIES[0]);
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto select-none flex flex-col justify-between">
      {/* Official Karnataka Higher Education ERP Full Background Image */}
      <img
        src="/karnataka-background.jpg"
        alt="Karnataka Higher Education ERP Background"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none -z-10 select-none"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-[#2a084e] text-white px-4 py-3 rounded-2xl shadow-2xl border border-purple-400/40 text-xs animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar: Karnataka Seal & Title */}
      <header className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-3 sm:pt-4 pb-2 relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Karnataka State Seal */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-0.5 bg-white/70 backdrop-blur-xs border border-purple-200/60 shadow-2xs">
            <img
              src="/karnataka-seal.png"
              alt="Seal of Karnataka"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="border-l-2 border-purple-300/80 pl-3 sm:pl-4">
            <h1 className="text-xl sm:text-2xl md:text-[26px] font-black tracking-tight text-[#29084e] leading-tight">
              Karnataka Higher Education ERP
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 tracking-normal">
              Integrated Higher Education Management Platform
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-2 sm:py-3 relative z-20 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          
          {/* Column 1 (Left): Headline & 2x2 Feature Grid */}
          <div
            className={`transition-all duration-300 flex flex-col justify-start space-y-3 sm:space-y-4 ${
              selectedCard ? 'lg:col-span-4 xl:col-span-3.5' : 'lg:col-span-5 xl:col-span-4'
            }`}
          >
            <div>
              <h2 className="text-lg sm:text-2xl xl:text-[27px] font-black text-[#29084e] leading-[1.15] tracking-tight drop-shadow-2xs">
                University<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h2>
            </div>

            {/* 2x2 Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-2.5 max-w-[300px]">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (Center): 3 Interactive Large Selection Cards */}
          <div
            className={`transition-all duration-300 flex flex-col gap-3.5 sm:gap-4 justify-center w-full ${
              selectedCard
                ? 'lg:col-span-4 xl:col-span-4.5'
                : 'lg:col-span-7 xl:col-span-7 max-w-xl mx-auto'
            }`}
          >
            {/* Card 1: Higher Education Department */}
            <button
              type="button"
              onClick={() => {
                if (selectedCard === 'hed') {
                  setSelectedCard(null);
                } else {
                  setSelectedCard('hed');
                  showToast('Selected Higher Education Department');
                }
              }}
              className={`relative overflow-hidden w-full text-left bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 p-4 sm:p-5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'hed'
                  ? 'border-red-500 ring-4 ring-red-400/20 scale-[1.02]'
                  : 'border-slate-200/90 hover:border-red-300'
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-5 z-10">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center p-1 bg-red-50 border border-red-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/hed-icon.png"
                    alt="Higher Education Department"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-red-200/80 pl-3.5 sm:pl-4">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                    Higher Education<br className="hidden sm:block" /> Department
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    Apex Secretariat &amp; State Councils
                  </p>
                </div>
              </div>

              {/* Right Side Red Gradient Swoosh Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-28 sm:w-36 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#f43f5e] via-[#e11d48]/80 to-transparent rounded-r-2xl sm:rounded-r-3xl transform skew-x-[-12deg] translate-x-10 group-hover:translate-x-6 transition-transform opacity-90" />
              </div>
            </button>

            {/* Card 2: University Login */}
            <button
              type="button"
              onClick={() => {
                if (selectedCard === 'university') {
                  setSelectedCard(null);
                } else {
                  setSelectedCard('university');
                  showToast('Selected University Login. Enter credentials to proceed.');
                }
              }}
              className={`relative overflow-hidden w-full text-left bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 p-4 sm:p-5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'university'
                  ? 'border-blue-600 ring-4 ring-blue-400/25 scale-[1.02]'
                  : 'border-slate-200/90 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-5 z-10">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center p-1 bg-blue-50 border border-blue-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/univ-icon.png"
                    alt="University Login"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-blue-200/80 pl-3.5 sm:pl-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      University Login
                    </h3>
                    <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      Multi-Campus
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    State &amp; Autonomous University Portals
                  </p>
                </div>
              </div>

              {/* Right Side Blue Gradient Swoosh Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-28 sm:w-36 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#0284c7] via-[#0ea5e9]/80 to-transparent rounded-r-2xl sm:rounded-r-3xl transform skew-x-[-12deg] translate-x-10 group-hover:translate-x-6 transition-transform opacity-90" />
              </div>
            </button>

            {/* Card 3: College Login */}
            <button
              type="button"
              onClick={() => {
                if (selectedCard === 'college') {
                  setSelectedCard(null);
                } else {
                  setSelectedCard('college');
                  showToast('Selected College Login');
                }
              }}
              className={`relative overflow-hidden w-full text-left bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 p-4 sm:p-5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'college'
                  ? 'border-amber-500 ring-4 ring-amber-400/25 scale-[1.02]'
                  : 'border-slate-200/90 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-5 z-10">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center p-1 bg-amber-50 border border-amber-200 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <img
                    src="/college-icon.png"
                    alt="College Login"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="border-l-2 border-amber-200/80 pl-3.5 sm:pl-4">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors leading-tight">
                    College Login
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    Affiliated, Constituent &amp; Autonomous
                  </p>
                </div>
              </div>

              {/* Right Side Orange Gradient Swoosh Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-28 sm:w-36 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#ea580c] via-[#f59e0b]/80 to-transparent rounded-r-2xl sm:rounded-r-3xl transform skew-x-[-12deg] translate-x-10 group-hover:translate-x-6 transition-transform opacity-90" />
              </div>
            </button>
          </div>

          {/* Column 3 (Right): Role Based / University Login Form Card (Displayed ONLY when a role is clicked) */}
          {selectedCard && (
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-6 duration-300">
              <div className="w-full max-w-[420px] bg-white rounded-3xl border border-purple-200/80 shadow-2xl overflow-hidden select-none">
                
                {/* Card Header: Gradient Banner with Graduation Cap and Dismiss Button */}
                <div className="bg-gradient-to-r from-[#7a00c2] via-[#610499] to-[#3f0068] text-white p-4 sm:p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Users className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                          {selectedCard === 'university'
                            ? 'University Login'
                            : selectedCard === 'hed'
                            ? 'Higher Education Portal'
                            : 'College Administration'}
                        </h3>
                        <p className="text-[11px] text-purple-200 font-medium">
                          Access Karnataka Higher Education ERP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 shadow-xs">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCard(null)}
                        className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Close Login Form"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Form Elements */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    
                    {/* First Field: Registered University List in Dropdown */}
                    {selectedCard === 'university' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-800">
                          Select Registered University <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={selectedUniversityId}
                            onChange={(e) => {
                              setSelectedUniversityId(e.target.value);
                              const u = KARNATAKA_UNIVERSITIES.find((item) => item.id === e.target.value);
                              if (u) {
                                if (u.id === 'acu') {
                                  setUsername('admin@acu.edu.in');
                                } else {
                                  setUsername(`admin@${u.shortName.toLowerCase()}.karnataka.gov.in`);
                                }
                              }
                            }}
                            className="w-full bg-white border border-purple-200/90 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all cursor-pointer shadow-2xs"
                          >
                            <optgroup label="Recommended / Active Demo">
                              <option value="acu">
                                🌟 Adichunchanagiri University (ACU), B.G. Nagara
                              </option>
                            </optgroup>
                            <optgroup label="Karnataka State Universities">
                              {KARNATAKA_UNIVERSITIES.filter((u) => u.id !== 'acu').map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.name} – {u.location}
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                        <p className="text-[10px] text-purple-700 font-medium">
                          Selecting university loads its executive role dial &amp; portals
                        </p>
                      </div>
                    )}

                    {/* Form for Higher Education Department */}
                    {selectedCard === 'hed' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-800">
                          Select Department Office <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full bg-white border border-purple-200/90 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 transition-all cursor-pointer shadow-2xs"
                        >
                          <option value="hed-sec">Department of Higher Education (Secretariat)</option>
                          <option value="dte">Directorate of Technical Education (DTE)</option>
                          <option value="dce">Department of Collegiate Education (DCE)</option>
                          <option value="kshec">Karnataka State Higher Education Council (KSHEC)</option>
                        </select>
                      </div>
                    )}

                    {/* Form for College Login */}
                    {selectedCard === 'college' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-800">
                          Select College Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedCollegeType}
                          onChange={(e) => setSelectedCollegeType(e.target.value)}
                          className="w-full bg-white border border-purple-200/90 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer shadow-2xs"
                        >
                          <option value="medical">BGS Medical College &amp; Hospital</option>
                          <option value="pharmacy">BGS College of Pharmacy</option>
                          <option value="engg">BGS Institute of Technology</option>
                          <option value="nursing">Adichunchanagiri Nursing College</option>
                          <option value="allied">Allied Health Sciences Institute</option>
                        </select>
                      </div>
                    )}

                    {/* Username / Email Field */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800">
                        Username / Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-700">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username or email"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-white border border-purple-200/90 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-purple-600 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Password Field with Eye Toggle */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-700">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          required
                          className="w-full pl-9 pr-10 py-2 bg-white border border-purple-200/90 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-purple-600 transition-all shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>Remember Me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Password recovery instructions dispatched to registered email.')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Login Action Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-[#6b0f9c] via-[#520979] to-[#3b0257] hover:from-[#7e14b6] hover:to-[#49056c] text-white rounded-xl text-xs font-black shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>Login to University ERP</span>
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

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
