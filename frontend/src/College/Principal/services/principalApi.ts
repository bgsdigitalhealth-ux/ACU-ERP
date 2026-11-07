import { API_BASE_URL } from '../../../config/apiConfig';

export interface PrincipalOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const principalApi = {
  getOverview: async (): Promise<PrincipalOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/principal/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Principal',
        title: 'Principal Executive Office',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default principalApi;
