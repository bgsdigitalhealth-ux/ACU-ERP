import React, { useState } from 'react';
import {
  Cpu,
  BarChart3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  KeyRound,
  Users,
  GraduationCap,
  X,
  Building2,
  School
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

export const AFFILIATED_COLLEGES = [
  { id: 'bgs-medical', name: 'BGS Medical College & Hospital', location: 'B.G. Nagara' },
  { id: 'bgs-pharmacy', name: 'BGS College of Pharmacy', location: 'B.G. Nagara' },
  { id: 'bgs-engg', name: 'BGS Institute of Technology', location: 'B.G. Nagara' },
  { id: 'acu-nursing', name: 'Adichunchanagiri Nursing College', location: 'B.G. Nagara' },
  { id: 'allied-health', name: 'Allied Health Sciences Institute', location: 'Mandya' }
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
  // Selected Card: 'hed' | 'university' | 'college' | null (initially null)
  const [selectedCard, setSelectedCard] = useState<'hed' | 'university' | 'college' | null>(null);

  // Form State
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('acu');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('bgs-medical');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('dce');
  const [username, setUsername] = useState<string>('admin@acu.edu.in');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'login' | 'sso'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCardClick = (card: 'hed' | 'university' | 'college') => {
    if (selectedCard === card) {
      setSelectedCard(null);
      return;
    }
    setSelectedCard(card);
    if (card === 'university') {
      const u = KARNATAKA_UNIVERSITIES.find((item) => item.id === selectedUniversityId) || KARNATAKA_UNIVERSITIES[0];
      setUsername(u.id === 'acu' ? 'admin@acu.edu.in' : `admin@${u.shortName.toLowerCase()}.karnataka.gov.in`);
      showToast('Select University from dropdown, enter credentials, and login');
    } else if (card === 'college') {
      setUsername('principal@bgs.edu.in');
      showToast('Select University & College from dropdown, enter credentials, and login');
    } else {
      setUsername('sec.hed@karnataka.gov.in');
      showToast('Higher Education Department selected. Enter credentials to proceed');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (selectedCard === 'university') {
      const univ = KARNATAKA_UNIVERSITIES.find((u) => u.id === selectedUniversityId) || KARNATAKA_UNIVERSITIES[0];
      showToast(`Authenticated for ${univ.name}. Redirecting to University Role Based Login...`);
      setTimeout(() => {
        setIsLoading(false);
        onProceedToUniversity(univ);
      }, 400);
    } else if (selectedCard === 'college') {
      const college = AFFILIATED_COLLEGES.find((c) => c.id === selectedCollegeId) || AFFILIATED_COLLEGES[0];
      showToast(`Authenticated for ${college.name}. Redirecting to College Role Based Login...`);
      setTimeout(() => {
        setIsLoading(false);
        onProceedToCollege();
      }, 400);
    } else {
      showToast('Authenticated for Higher Education Department. Redirecting to State Oversight Console...');
      setTimeout(() => {
        setIsLoading(false);
        if (onNavigateToHed) {
          onNavigateToHed();
        } else {
          onProceedToUniversity(KARNATAKA_UNIVERSITIES[0]);
        }
      }, 400);
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
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-[#8b0029] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-rose-300/40 text-xs animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar: Karnataka Seal & Title */}
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

      {/* Main Content Area - Shifted high in the sky so cards & form NEVER override Vidhana Soudha building */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-2 pb-2 relative z-20 flex items-start">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Column 1 (Left): Headline & 2x2 Feature Grid */}
          <div
            className={`transition-all duration-300 flex flex-col justify-start space-y-2.5 self-start ${
              selectedCard ? 'lg:col-span-3 xl:col-span-3' : 'lg:col-span-5 xl:col-span-5'
            }`}
          >
            <div>
              <h2 className="text-base sm:text-xl xl:text-2xl font-black text-[#29084e] leading-tight tracking-tight drop-shadow-2xs">
                University<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h2>
            </div>

            {/* 2x2 Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-2 max-w-[270px]">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (Center): The 3 Selection Cards */}
          <div
            className={`transition-all duration-300 flex flex-col gap-2.5 justify-start self-start w-full ${
              selectedCard
                ? 'lg:col-span-4 xl:col-span-4'
                : 'lg:col-span-7 xl:col-span-7 max-w-lg lg:ml-auto'
            }`}
          >
            {/* Card 1: Higher Education Department */}
            <button
              type="button"
              onClick={() => handleCardClick('hed')}
              className={`relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'hed'
                  ? 'border-red-600 ring-4 ring-red-400/25 scale-[1.01]'
                  : 'border-slate-200/90 hover:border-red-400'
              }`}
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

            {/* Card 2: University Login - Clicking opens Login Form on the right */}
            <button
              type="button"
              onClick={() => handleCardClick('university')}
              className={`relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'university'
                  ? 'border-blue-600 ring-4 ring-blue-400/25 scale-[1.01]'
                  : 'border-slate-200/90 hover:border-blue-500'
              }`}
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

              {/* Action Prompt */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-blue-700 pr-8 z-10 group-hover:translate-x-1 transition-transform">
                <span>Select &amp; Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Right Side Blue Gradient Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#0284c7] via-[#0ea5e9]/80 to-transparent rounded-r-2xl transform skew-x-[-12deg] translate-x-6 group-hover:translate-x-4 transition-transform opacity-90" />
              </div>
            </button>

            {/* Card 3: College Login - Clicking opens Login Form on the right */}
            <button
              type="button"
              onClick={() => handleCardClick('college')}
              className={`relative overflow-hidden w-full text-left bg-white/95 backdrop-blur-md rounded-2xl border-2 transition-all duration-200 py-2.5 px-3.5 flex items-center justify-between group cursor-pointer shadow-md hover:shadow-xl ${
                selectedCard === 'college'
                  ? 'border-amber-600 ring-4 ring-amber-400/25 scale-[1.01]'
                  : 'border-slate-200/90 hover:border-amber-400'
              }`}
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

              {/* Action Prompt */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 pr-8 z-10 group-hover:translate-x-1 transition-transform">
                <span>Select &amp; Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Right Side Orange Gradient Accent */}
              <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-l from-[#ea580c] via-[#f59e0b]/80 to-transparent rounded-r-2xl transform skew-x-[-12deg] translate-x-6 group-hover:translate-x-4 transition-transform opacity-90" />
              </div>
            </button>
          </div>

          {/* Column 3 (Right): Login Form Card (Rendered ONLY once a card is selected, styled like Image 1) */}
          {selectedCard && (
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end self-start animate-in fade-in slide-in-from-right-6 duration-300">
              <div className="w-full max-w-[390px] min-w-[320px] bg-white rounded-3xl p-5 border border-gray-200/90 shadow-2xl relative select-none">
                
                {/* Card Header matching Image 1 */}
                <div className="flex items-center justify-between pb-2.5 relative">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-[#8b0029] stroke-[2.2]" />
                    </div>

                    <div className="w-px h-8 bg-gray-200 shrink-0" />

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-[#8b0029] leading-tight whitespace-nowrap">
                        {selectedCard === 'university'
                          ? 'University Login'
                          : selectedCard === 'college'
                          ? 'College Login'
                          : 'State Secretariat Login'}
                      </h3>
                      <p className="text-[10.5px] text-gray-500 font-semibold mt-0.5 whitespace-nowrap">
                        Access Karnataka Higher Education ERP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#8b0029]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCard(null)}
                      className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Close login form"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative Rose Wave Curve Divider */}
                <div className="w-full h-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 rounded-full mb-3.5 opacity-90" />

                {/* Mode Toggle: Login vs SSO Login matching Image 1 */}
                <div className="flex items-center gap-3 mb-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'login'
                        ? 'bg-[#8b0029] text-white shadow-md'
                        : 'text-[#8b0029] hover:bg-rose-50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('sso');
                      showToast('SSO Single Sign-On selected');
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'sso'
                        ? 'bg-[#8b0029] text-white shadow-md'
                        : 'text-[#8b0029] hover:bg-rose-50'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#8b0029]" />
                    <span>SSO Login</span>
                  </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLoginSubmit} className="space-y-2.5">
                  
                  {/* Field 1: List of Universities in Dropdown */}
                  {(selectedCard === 'university' || selectedCard === 'college') && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
                        Select Registered University <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#8b0029] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={selectedUniversityId}
                          onChange={(e) => {
                            setSelectedUniversityId(e.target.value);
                            const u = KARNATAKA_UNIVERSITIES.find((item) => item.id === e.target.value);
                            if (u) {
                              if (selectedCard === 'university') {
                                setUsername(u.id === 'acu' ? 'admin@acu.edu.in' : `admin@${u.shortName.toLowerCase()}.karnataka.gov.in`);
                              }
                            }
                          }}
                          className="w-full pl-9 pr-7 py-2 bg-white text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all cursor-pointer shadow-2xs"
                        >
                          <optgroup label="Active Demo / Recommended">
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
                    </div>
                  )}

                  {/* College-specific Field: Select Affiliated College */}
                  {selectedCard === 'college' && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
                        Select Affiliated College <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <School className="w-4 h-4 text-[#8b0029] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={selectedCollegeId}
                          onChange={(e) => setSelectedCollegeId(e.target.value)}
                          className="w-full pl-9 pr-7 py-2 bg-white text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all cursor-pointer shadow-2xs"
                        >
                          {AFFILIATED_COLLEGES.map((col) => (
                            <option key={col.id} value={col.id}>
                              {col.name} ({col.location})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* HED-specific Field: Department Office */}
                  {selectedCard === 'hed' && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
                        Select Department Office <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#8b0029] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full pl-9 pr-7 py-2 bg-white text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all cursor-pointer shadow-2xs"
                        >
                          <option value="hed-sec">Department of Higher Education (Secretariat)</option>
                          <option value="dte">Directorate of Technical Education (DTE)</option>
                          <option value="dce">Department of Collegiate Education (DCE)</option>
                          <option value="kshec">Karnataka State Higher Education Council (KSHEC)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Username / Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
                      Username / Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8b0029] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username or email"
                        className="w-full pl-10 pr-4 py-2 bg-white text-xs text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all placeholder-gray-400 font-medium shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8b0029] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-10 py-2 bg-white text-xs text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all placeholder-gray-400 font-medium shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8b0029] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password? */}
                  <div className="flex items-center justify-between text-xs pt-0.5 gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 text-[#8b0029] focus:ring-[#8b0029] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Remember Me</span>
                    </label>
                    <button
                      type="button"
                      className="text-xs font-bold text-[#8b0029] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-5 bg-[#8b0029] hover:bg-[#a00030] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group mt-1"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>
                          {selectedCard === 'university'
                            ? 'Login to University ERP'
                            : selectedCard === 'college'
                            ? 'Login to College ERP'
                            : 'Login to Department Portal'}
                        </span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          )}

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
