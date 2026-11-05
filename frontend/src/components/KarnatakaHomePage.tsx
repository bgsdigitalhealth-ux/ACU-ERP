import React, { useState, useRef, useEffect } from 'react';
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
  onProceedToCollege
}) => {
  // Selected Card: 'university' | 'college' | null (initially null)
  const [selectedCard, setSelectedCard] = useState<'university' | 'college' | null>(null);

  // Form State
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('acu');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('bgs-medical');
  const [username, setUsername] = useState<string>('admin@acu.edu.in');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Moveable / Draggable Login Badges State (both cards moveable in different directions)
  const [univOffset, setUnivOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [collegeOffset, setCollegeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggingCard, setDraggingCard] = useState<'university' | 'college' | null>(null);

  const dragDataRef = useRef<{
    card: 'university' | 'college' | null;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    card: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false
  });

  const startDrag = (card: 'university' | 'college', clientX: number, clientY: number) => {
    const currentOffset = card === 'university' ? univOffset : collegeOffset;
    dragDataRef.current = {
      card,
      startX: clientX,
      startY: clientY,
      initialX: currentOffset.x,
      initialY: currentOffset.y,
      hasMoved: false
    };
    setDraggingCard(card);
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragDataRef.current.card) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragDataRef.current.startX;
      const dy = clientY - dragDataRef.current.startY;

      if (Math.hypot(dx, dy) > 6) {
        dragDataRef.current.hasMoved = true;
      }

      if (dragDataRef.current.card === 'university') {
        setUnivOffset({
          x: dragDataRef.current.initialX + dx,
          y: dragDataRef.current.initialY + dy
        });
      } else if (dragDataRef.current.card === 'college') {
        setCollegeOffset({
          x: dragDataRef.current.initialX + dx,
          y: dragDataRef.current.initialY + dy
        });
      }
    };

    const handlePointerUp = () => {
      if (!dragDataRef.current.card) return;
      const { card, hasMoved } = dragDataRef.current;
      dragDataRef.current.card = null;
      setDraggingCard(null);

      if (!hasMoved && card) {
        handleCardClick(card);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [univOffset, collegeOffset]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCardClick = (card: 'university' | 'college') => {
    if (selectedCard === card) {
      setSelectedCard(null);
      return;
    }
    setSelectedCard(card);
    if (card === 'university') {
      const u = KARNATAKA_UNIVERSITIES.find((item) => item.id === selectedUniversityId) || KARNATAKA_UNIVERSITIES[0];
      setUsername(u.id === 'acu' ? 'admin@acu.edu.in' : `admin@${u.shortName.toLowerCase()}.karnataka.gov.in`);
      showToast('Select University from dropdown, enter credentials, and login');
    } else {
      setUsername('principal@bgs.edu.in');
      showToast('Select University & College from dropdown, enter credentials, and login');
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
    } else {
      const college = AFFILIATED_COLLEGES.find((c) => c.id === selectedCollegeId) || AFFILIATED_COLLEGES[0];
      showToast(`Authenticated for ${college.name}. Redirecting to College Role Based Login...`);
      setTimeout(() => {
        setIsLoading(false);
        onProceedToCollege();
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto select-none flex flex-col justify-between">
      {/* Dynamic Keyframe Animations for Autonomous Movement in Different Directions */}
      <style>{`
        @keyframes floatDirectionA {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(-7px, -12px) rotate(-1.5deg);
          }
          50% {
            transform: translate(6px, -20px) rotate(1.2deg);
          }
          75% {
            transform: translate(-4px, -8px) rotate(-0.8deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }
        @keyframes floatDirectionB {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(9px, 14px) rotate(1.8deg);
          }
          50% {
            transform: translate(-7px, 20px) rotate(-1.4deg);
          }
          75% {
            transform: translate(5px, 8px) rotate(0.9deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }
        .animate-float-a {
          animation: floatDirectionA 6s ease-in-out infinite;
        }
        .animate-float-b {
          animation: floatDirectionB 6.5s ease-in-out infinite;
        }
      `}</style>

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

      {/* Main Content Area - Positioned in upper sky area matching headline and card alignment */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 pt-8 sm:pt-11 lg:pt-14 pb-4 relative z-20 flex items-start">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* Column 1 (Left): Headline & 2x2 Feature Grid */}
          <div
            className={`flex flex-col justify-start space-y-3.5 self-start ${
              selectedCard ? 'lg:col-span-3 xl:col-span-3' : 'lg:col-span-4 xl:col-span-4'
            }`}
          >
            <div>
              <h2 className="text-base sm:text-xl xl:text-2xl font-black text-[#29084e] leading-snug tracking-tight drop-shadow-2xs">
                University<br />
                Management &amp;<br />
                Institutional<br />
                Intelligence Platform
              </h2>
            </div>

            {/* 2x2 Feature Badges Grid - Increased size as requested */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-[310px] sm:max-w-[340px]">
              {/* Feature 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">
                  Integrated<br />Operations
                </span>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">
                  Data-driven<br />Governance
                </span>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">
                  AI-powered<br />Insights
                </span>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">
                  Accreditation<br />Ready
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (Center): The 2 Moveable Circular Selection Cards (University Login & College Login) */}
          <div
            className={`transition-all duration-300 flex flex-col items-center justify-start self-start w-full ${
              selectedCard
                ? 'lg:col-span-4 xl:col-span-4 max-w-[420px] xl:max-w-[450px]'
                : 'lg:col-span-8 xl:col-span-8'
            }`}
          >
            {/* The Two Moveable Cards Container */}
            <div
              className={`w-full flex ${
                selectedCard
                  ? 'flex-row sm:flex-col gap-4 items-center justify-center'
                  : 'flex-col sm:flex-row items-center justify-center gap-8 lg:gap-10 xl:gap-14'
              }`}
            >
              {/* Card 1: University Login (Moveable in Direction A - Up & Left Ambient Drift) */}
              <div
                style={{
                  transform: `translate3d(${univOffset.x}px, ${univOffset.y}px, 0px)`
                }}
                className={`relative flex flex-col items-center select-none ${
                  draggingCard === 'university'
                    ? 'z-50 cursor-grabbing'
                    : 'cursor-grab group'
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  startDrag('university', e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  if (e.touches.length === 1) {
                    startDrag('university', e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onDoubleClick={() => setUnivOffset({ x: 0, y: 0 })}
                title="University Login – Click to login or drag freely"
              >
                <div
                  className={`flex flex-col items-center transition-all duration-300 ${
                    draggingCard === 'university' ? '' : 'animate-float-a'
                  } ${
                    selectedCard === 'university'
                      ? 'scale-[1.04]'
                      : selectedCard
                      ? 'opacity-70 hover:opacity-100 scale-95 hover:scale-100'
                      : 'hover:scale-[1.04]'
                  }`}
                >
                  {/* Circular Badge Artwork */}
                  <div
                    className={`relative rounded-full transition-all duration-300 ${
                      selectedCard
                        ? 'w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]'
                        : 'w-[230px] h-[230px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px]'
                    } ${
                      selectedCard === 'university'
                        ? 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-white/90 drop-shadow-[0_20px_40px_rgba(2,132,199,0.7)]'
                        : 'drop-shadow-[0_16px_32px_rgba(2,132,199,0.45)] group-hover:drop-shadow-[0_22px_44px_rgba(2,132,199,0.65)]'
                    }`}
                  >
                    <img
                      src="/university-login-badge.png"
                      alt="University Login"
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: College Login (Moveable in Direction B - Down & Right Ambient Drift) */}
              <div
                style={{
                  transform: `translate3d(${collegeOffset.x}px, ${collegeOffset.y}px, 0px)`
                }}
                className={`relative flex flex-col items-center select-none ${
                  draggingCard === 'college'
                    ? 'z-50 cursor-grabbing'
                    : 'cursor-grab group'
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  startDrag('college', e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  if (e.touches.length === 1) {
                    startDrag('college', e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onDoubleClick={() => setCollegeOffset({ x: 0, y: 0 })}
                title="College Login – Click to login or drag freely"
              >
                <div
                  className={`flex flex-col items-center transition-all duration-300 ${
                    draggingCard === 'college' ? '' : 'animate-float-b'
                  } ${
                    selectedCard === 'college'
                      ? 'scale-[1.04]'
                      : selectedCard
                      ? 'opacity-70 hover:opacity-100 scale-95 hover:scale-100'
                      : 'hover:scale-[1.04]'
                  }`}
                >
                  {/* Circular Badge Artwork */}
                  <div
                    className={`relative rounded-full transition-all duration-300 ${
                      selectedCard
                        ? 'w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]'
                        : 'w-[230px] h-[230px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px]'
                    } ${
                      selectedCard === 'college'
                        ? 'ring-4 ring-amber-400 ring-offset-4 ring-offset-white/90 drop-shadow-[0_20px_40px_rgba(234,88,12,0.7)]'
                        : 'drop-shadow-[0_16px_32px_rgba(234,88,12,0.45)] group-hover:drop-shadow-[0_22px_44px_rgba(234,88,12,0.65)]'
                    }`}
                  >
                    <img
                      src="/college-login-badge.png"
                      alt="College Login"
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 (Right): Login Form Card - Increased breadth to 480px-500px */}
          {selectedCard && (
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start self-start animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-full max-w-[480px] sm:max-w-[500px] min-w-[340px] bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xl relative select-none">
                
                {/* Card Header matching Image 1 */}
                <div className="flex items-center justify-between pb-2.5 relative">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-[#8b0029] stroke-[2.2]" />
                    </div>

                    <div className="w-px h-8 bg-gray-200 shrink-0" />

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-[#8b0029] leading-tight whitespace-nowrap">
                        {selectedCard === 'college' ? 'College Login' : 'University Login'}
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
                <div className="w-full h-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 rounded-full mb-3 opacity-90" />

                {/* Form Fields - SSO Login completely removed as requested */}
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
                    className="w-full py-2.5 px-5 bg-[#8b0029] hover:bg-[#a00030] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group mt-2"
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
