import { API_BASE_URL } from '../../../config/apiConfig';

export interface VicePrincipalOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const viceprincipalApi = {
  getOverview: async (): Promise<VicePrincipalOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/viceprincipal/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'VicePrincipal',
        title: 'Vice Principal Academic Office',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default viceprincipalApi;
