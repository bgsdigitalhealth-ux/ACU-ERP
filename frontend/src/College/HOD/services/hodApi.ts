import { API_BASE_URL } from '../../../config/apiConfig';

export interface HODOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const hodApi = {
  getOverview: async (): Promise<HODOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/hod/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'HOD',
        title: 'Head of Department Operations',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default hodApi;
