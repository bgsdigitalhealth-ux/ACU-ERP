import React, { useState } from 'react';
import { Menu, Building2, LogOut, KeyRound, CheckCircle2, X } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { useCollegeAdmin } from '../../context/CollegeAdminContext';
import { CollegeAdminRoleSwitcher } from './CollegeAdminRoleSwitcher';
import { CollegeAdminSidebar } from './CollegeAdminSidebar';
import { HodManagementPage } from './HodManagementPage';
import { DeanHeader } from './dean/DeanHeader';
import { DeanSidebar } from './dean/DeanSidebar';
import { DeanDashboard } from './dean/DeanDashboard';
import { DeputyHeader } from './deputy/DeputyHeader';
import { DeputySidebar } from './deputy/DeputySidebar';
import { DeputyDashboard } from './deputy/DeputyDashboard';

interface CollegeAdminLayoutProps {
  onLogout: () => void;
  onNavigateToHodLogin: (email?: string) => void;
}

export const CollegeAdminLayout: React.FC<CollegeAdminLayoutProps> = ({
  onLogout,
  onNavigateToHodLogin
}) => {
  const { currentCollegeAdminCollege } = useHod();
  const { activeSubRole, toastMessage, clearToast } = useCollegeAdmin();

  // Tabs for Dean & Deputy
  const [deanActiveTab, setDeanActiveTab] = useState('dashboard');
  const [deputyActiveTab, setDeputyActiveTab] = useState('dashboard');
  const [hodActiveTab, setHodActiveTab] = useState('hod-management');

  // Mobile sidebar states
  const [deanMobileOpen, setDeanMobileOpen] = useState(false);
  const [deputyMobileOpen, setDeputyMobileOpen] = useState(false);
  const [hodMobileOpen, setHodMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f5fc] flex flex-col font-sans select-none">
      {/* 1. Global College Admin Sub-Role Switcher (Dean, Deputy Superintendent, HOD Management) */}
      <CollegeAdminRoleSwitcher />

      {/* Dynamic Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-gradient-to-r from-purple-900 to-indigo-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-purple-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed flex-1">{toastMessage}</p>
          <button
            onClick={clearToast}
            className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Content Based on Sub-Role */}
      {activeSubRole === 'dean' && (
        <div className="flex-1 flex flex-col">
          <DeanHeader
            onLogout={onLogout}
            onToggleSidebar={() => setDeanMobileOpen(prev => !prev)}
          />
          <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
            <DeanSidebar
              activeTab={deanActiveTab}
              setActiveTab={setDeanActiveTab}
              isMobileOpen={deanMobileOpen}
              setIsMobileOpen={setDeanMobileOpen}
            />
            <main className="flex-1 min-w-0 overflow-y-auto">
              {deanActiveTab === 'dashboard' ? (
                <DeanDashboard />
              ) : (
                <div className="p-6">
                  <div className="bg-white rounded-2xl p-8 border border-purple-100 text-center space-y-4 shadow-sm">
                    <Building2 className="w-12 h-12 text-purple-600 mx-auto" />
                    <h3 className="text-lg font-bold text-gray-900 capitalize">
                      {deanActiveTab.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      Chief Superintendent (Dean) Section – active examination operations for BGS Medical College & Hospital.
                    </p>
                    <button
                      onClick={() => setDeanActiveTab('dashboard')}
                      className="px-4 py-2 bg-gradient-to-r from-[#4B087B] to-[#7900B8] text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 cursor-pointer"
                    >
                      Return to Dean Dashboard
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {activeSubRole === 'deputy-superintendent' && (
        <div className="flex-1 flex flex-col">
          <DeputyHeader
            onLogout={onLogout}
            onToggleSidebar={() => setDeputyMobileOpen(prev => !prev)}
          />
          <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
            <DeputySidebar
              activeTab={deputyActiveTab}
              setActiveTab={setDeputyActiveTab}
              isMobileOpen={deputyMobileOpen}
              setIsMobileOpen={setDeputyMobileOpen}
            />
            <main className="flex-1 min-w-0 overflow-y-auto">
              {deputyActiveTab === 'dashboard' ? (
                <DeputyDashboard />
              ) : (
                <div className="p-6">
                  <div className="bg-white rounded-2xl p-8 border border-purple-100 text-center space-y-4 shadow-sm">
                    <Building2 className="w-12 h-12 text-purple-600 mx-auto" />
                    <h3 className="text-lg font-bold text-gray-900 capitalize">
                      {deputyActiveTab.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      Deputy Superintendent Section – Invigilation rosters, hall readiness, and exam session control.
                    </p>
                    <button
                      onClick={() => setDeputyActiveTab('dashboard')}
                      className="px-4 py-2 bg-gradient-to-r from-[#4B087B] to-[#7900B8] text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 cursor-pointer"
                    >
                      Return to Deputy Dashboard
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {activeSubRole === 'hod-management' && (
        <div className="flex-1 flex flex-col">
          {/* College Admin Header */}
          <header className="w-full bg-gradient-to-r from-[#29084e] via-[#3a0e69] to-[#250646] text-white px-4 sm:px-8 py-3.5 shadow-lg border-b border-[#581c87] z-30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-extrabold text-base shadow-sm">
                ACU
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-white leading-tight">
                  {currentCollegeAdminCollege.name}
                </h1>
                <p className="text-xs text-amber-300 font-semibold">
                  College Administration &amp; Examination Controller Office
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateToHodLogin()}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-amber-300 rounded-xl text-xs font-bold border border-purple-400/30 transition-all cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Open HOD Login Portal</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer border border-rose-400/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* Main Container */}
          <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
            <CollegeAdminSidebar
              activeTab={hodActiveTab}
              setActiveTab={setHodActiveTab}
              isMobileOpen={hodMobileOpen}
              setIsMobileOpen={setHodMobileOpen}
            />

            <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
              <div className="lg:hidden pb-3 flex items-center justify-between">
                <button
                  onClick={() => setHodMobileOpen(true)}
                  className="p-2 bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Menu className="w-4 h-4" />
                  <span>Menu</span>
                </button>
                <span className="text-xs font-bold text-purple-900 capitalize">
                  {hodActiveTab.replace('-', ' ')}
                </span>
              </div>

              {hodActiveTab === 'hod-management' ? (
                <HodManagementPage onProceedToHodLogin={(email) => onNavigateToHodLogin(email)} />
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-purple-100 text-center space-y-3 shadow-sm">
                  <Building2 className="w-12 h-12 text-purple-600 mx-auto" />
                  <h3 className="text-lg font-bold text-[#1e1b4b] capitalize">{hodActiveTab.replace('-', ' ')}</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Module managed under BGS Medical College &amp; Hospital administrative council.
                  </p>
                  <button
                    onClick={() => setHodActiveTab('hod-management')}
                    className="px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Go to HOD Management
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
