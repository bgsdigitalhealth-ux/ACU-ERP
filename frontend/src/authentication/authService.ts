import { UserSession, RoleInfo } from './authTypes';

export const authService = {
  login: (email: string, role: RoleInfo): UserSession => {
    const session: UserSession = {
      userId: `usr-${Date.now()}`,
      name: role.title,
      email,
      role,
      token: `token_${role.id}_${Date.now()}`,
      loginTime: new Date().toISOString(),
    };
    try {
      localStorage.setItem('acu_erp_session', JSON.stringify(session));
      localStorage.setItem('acu_erp_role', JSON.stringify(role));
    } catch (e) {
      console.warn('Could not store session in localStorage', e);
    }
    return session;
  },

  logout: () => {
    try {
      localStorage.removeItem('acu_erp_session');
      localStorage.removeItem('acu_erp_role');
      localStorage.removeItem('acu_erp_view_mode');
    } catch (e) {
      console.warn('Could not clear session', e);
    }
  },

  getCurrentSession: (): UserSession | null => {
    try {
      const data = localStorage.getItem('acu_erp_session');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};

export default authService;

