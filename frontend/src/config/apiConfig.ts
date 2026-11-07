export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  dashboard: `${API_BASE_URL}/dashboard`,
  modules: `${API_BASE_URL}/modules`,
  collegeFinance: `${API_BASE_URL}/college-finance`,
  hr: `${API_BASE_URL}/hr`,
  academic: `${API_BASE_URL}/university/academic`,
  assessments: `${API_BASE_URL}/assessments`,
  calendar: `${API_BASE_URL}/academic-calendar`,
};

export default API_ENDPOINTS;

