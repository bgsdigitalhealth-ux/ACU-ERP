import { API_BASE_URL } from '../../../config/apiConfig';

export interface RegistrarOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const registrarApi = {
  getOverview: async (): Promise<RegistrarOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/registrar/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Registrar',
        title: 'Registrar Result & Evaluation Directorate',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default registrarApi;
