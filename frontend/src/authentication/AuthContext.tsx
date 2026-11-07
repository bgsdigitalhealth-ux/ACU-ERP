import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, RoleInfo } from './authTypes';
import { authService } from './authService';

interface AuthContextType {
  session: UserSession | null;
  role: RoleInfo | null;
  login: (email: string, role: RoleInfo) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(() => authService.getCurrentSession());
  const [role, setRole] = useState<RoleInfo | null>(() => session?.role || null);

  useEffect(() => {
    if (session) {
      setRole(session.role);
    }
  }, [session]);

  const login = (email: string, roleInfo: RoleInfo) => {
    const newSession = authService.login(email, roleInfo);
    setSession(newSession);
    setRole(roleInfo);
  };

  const logout = () => {
    authService.logout();
    setSession(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        role,
        login,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

