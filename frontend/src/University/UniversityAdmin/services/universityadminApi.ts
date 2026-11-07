import { API_BASE_URL } from '../../../config/apiConfig';

export interface UniversityAdminOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const universityadminApi = {
  getOverview: async (): Promise<UniversityAdminOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/universityadmin/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'UniversityAdmin',
        title: 'University Institutional Admin Platform',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default universityadminApi;
