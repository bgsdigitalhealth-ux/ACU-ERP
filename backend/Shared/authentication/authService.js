export const authService = {
  login: async (email, password, role) => {
    return {
      token: `token_${role}_${Date.now()}`,
      user: {
        email,
        role,
        name: role.toUpperCase().replace('-', ' '),
        institution: 'Adichunchanagiri University',
      },
    };
  },
  verifySession: (token) => {
    return !!token;
  },
};
export default authService;

