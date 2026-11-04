import React, { useState, useEffect } from 'react';
import { HodProvider } from './context/HodContext';
import { ChancellorProvider } from './context/ChancellorContext';
import { UniversityAdminProvider } from './context/UniversityAdminContext';
import { CollegeAdminProvider } from './context/CollegeAdminContext';
import { UniversityAdminLayout } from './components/universityAdmin/UniversityAdminLayout';
import { HodDashboardLayout } from './components/hod/HodDashboardLayout';
import { HodLoginPage } from './components/hodAuth/HodLoginPage';
import { CollegeAdminLayout } from './components/collegeAdmin/CollegeAdminLayout';
import { ChancellorDashboardLayout } from './components/chancellor/ChancellorDashboardLayout';
import { StudentProvider } from './context/StudentContext';
import { StudentLayout } from './components/student/StudentLayout';
import { FacultyProvider } from './context/FacultyContext';
import { FacultyLayout } from './components/faculty/FacultyLayout';
import { HomePage } from './components/HomePage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCards } from './components/StatCards';
import { AudienceChart } from './components/AudienceChart';
import { RatingsCard } from './components/RatingsCard';
import { LiveVisitsCard } from './components/LiveVisitsCard';
import { ModulesTable } from './components/ModulesTable';
import { fetchDashboardData, fallbackData } from './services/api';
import { RoleInfo, UserSession } from './types/auth';

export const App: React.FC = () => {
  // Primary view mode: 'portal' (Home Page with Dial) | 'university-admin' | 'hod-dashboard' | 'hod-login' | 'college-admin' | 'chancellor' | 'student' | 'faculty'
  const [viewMode, setViewMode] = useState<
    'university-admin' | 'hod-dashboard' | 'hod-login' | 'college-admin' | 'chancellor' | 'portal' | 'student' | 'faculty'
  >(() => {
    try {
      const saved = localStorage.getItem('acu_erp_view_mode');
      if (saved && ['university-admin', 'hod-dashboard', 'hod-login', 'college-admin', 'chancellor', 'portal', 'student', 'faculty'].includes(saved)) {
        return saved as any;
      }
    } catch {
      // fallback
    }
    return 'portal';
  });

  const [loginPrefilledEmail, setLoginPrefilledEmail] = useState('hod.physiology@bgs.edu.in');

  // Portal session & navigation state (for public dial portal)
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('acu_erp_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(() => {
    try {
      const saved = localStorage.getItem('acu_erp_role');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist viewMode, session, and role changes to survive page refresh
  useEffect(() => {
    try {
      localStorage.setItem('acu_erp_view_mode', viewMode);
    } catch (e) {
      console.warn('Could not save viewMode to localStorage:', e);
    }
  }, [viewMode]);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('acu_erp_session', JSON.stringify(session));
      } else {
        localStorage.removeItem('acu_erp_session');
      }
    } catch (e) {
      console.warn('Could not save session to localStorage:', e);
    }
  }, [session]);

  useEffect(() => {
    try {
      if (selectedRole) {
        localStorage.setItem('acu_erp_role', JSON.stringify(selectedRole));
      } else {
        localStorage.removeItem('acu_erp_role');
      }
    } catch (e) {
      console.warn('Could not save role to localStorage:', e);
    }
  }, [selectedRole]);

  // ERP Dashboard state (when logged in via portal)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('eCommerce');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    fetchDashboardData().then((res) => {
      if (res) setData(res);
    });
  }, []);

  const handlePortalLogin = (role: RoleInfo, email: string) => {
    setSelectedRole(role);
    if (
      role.id === 'vice-chancellor' ||
      role.id === 'coe' ||
      role.id === 'registrar' ||
      role.id === 'university-admin' ||
      role.id === 'hed'
    ) {
      setViewMode('university-admin');
    } else if (role.id === 'chancellor' || role.id === 'counselor') {
      setViewMode('chancellor');
    } else if (role.id === 'hod') {
      setViewMode('hod-dashboard');
    } else if (
      role.id === 'dean' ||
      role.id === 'deputy-superintendent' ||
      role.id === 'college-admin' ||
      role.id === 'college_admin'
    ) {
      setViewMode('college-admin');
    } else if (role.id === 'student') {
      setViewMode('student');
    } else if (role.id === 'faculty' || role.id === 'faculty/staff') {
      setViewMode('faculty');
    } else {
      setSession({
        role,
        email,
        isAuthenticated: true,
      });
    }
  };

  // Global clean logout redirecting back to Home Page
  const handleLogout = () => {
    try {
      localStorage.removeItem('acu_erp_view_mode');
      localStorage.removeItem('acu_erp_session');
      localStorage.removeItem('acu_erp_role');
    } catch (e) {
      console.warn('Error clearing localStorage on logout:', e);
    }
    setSession(null);
    setSelectedRole(null);
    setViewMode('portal');
  };

  return (
    <UniversityAdminProvider>
      <HodProvider>
        <div className="relative min-h-screen">
          {/* Render View Based on Active Mode */}
          {viewMode === 'university-admin' && (
            <UniversityAdminLayout onLogout={handleLogout} />
          )}

          {viewMode === 'hod-dashboard' && (
            <HodDashboardLayout
              onLogout={handleLogout}
              onNavigateToAuth={() => setViewMode('hod-login')}
            />
          )}

          {viewMode === 'hod-login' && (
            <HodLoginPage
              prefilledEmail={loginPrefilledEmail}
              onLoginSuccess={() => setViewMode('hod-dashboard')}
              onNavigateToCollegeAdmin={() => setViewMode('college-admin')}
            />
          )}

          {viewMode === 'college-admin' && (
            <CollegeAdminProvider>
              <CollegeAdminLayout
                onLogout={handleLogout}
                onNavigateToHodLogin={(email) => {
                  if (email) setLoginPrefilledEmail(email);
                  setViewMode('hod-login');
                }}
              />
            </CollegeAdminProvider>
          )}

          {viewMode === 'chancellor' && (
            <ChancellorProvider>
              <ChancellorDashboardLayout onLogout={handleLogout} />
            </ChancellorProvider>
          )}

          {viewMode === 'student' && (
            <StudentProvider>
              <StudentLayout onLogout={handleLogout} />
            </StudentProvider>
          )}

          {viewMode === 'faculty' && (
            <FacultyProvider>
              <FacultyLayout onLogout={handleLogout} />
            </FacultyProvider>
          )}

          {viewMode === 'portal' && (
            <>
              {!session?.isAuthenticated ? (
                <HomePage
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                  onLoginSuccess={handlePortalLogin}
                />
              ) : (
                <div className="min-h-screen bg-[#f4f6fc] text-[#1e293b] flex">
                  <Sidebar
                    isOpen={sidebarOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <div
                    className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
                      sidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
                  >
                    <Header
                      toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      currentRole={session.role}
                      onLogout={handleLogout}
                    />
                    <main className="p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h1 className="text-xl md:text-2xl font-bold text-[#1e293b] tracking-tight">
                          {activeTab}
                        </h1>
                        <div className="text-xs font-medium text-[#8a92a6] flex items-center gap-1.5">
                          <span>Dashboard</span>
                          <span>/</span>
                          <span className="text-[#7047eb] font-semibold">{activeTab}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        <div className="xl:col-span-3">
                          <StatCards metrics={data.metrics} />
                        </div>
                        <div className="xl:col-span-1">
                          <RatingsCard ratings={data.ratings} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2">
                          <AudienceChart data={data.audience} />
                        </div>
                        <div className="xl:col-span-1">
                          <LiveVisitsCard visits={data.visits} />
                        </div>
                      </div>
                      <ModulesTable
                        items={data.modules.filter((m) =>
                          searchTerm
                            ? m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              m.department.toLowerCase().includes(searchTerm.toLowerCase())
                            : true
                        )}
                      />
                    </main>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </HodProvider>
    </UniversityAdminProvider>
  );
};

export default App;
