import { API_BASE_URL } from '../../../config/apiConfig';

export interface ChancellorOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const chancellorApi = {
  getOverview: async (): Promise<ChancellorOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/chancellor/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Chancellor',
        title: 'Chancellor Apex Governance',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default chancellorApi;
