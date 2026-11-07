import { API_BASE_URL } from '../../../config/apiConfig';

export interface CollegeHROverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const collegehrApi = {
  getOverview: async (): Promise<CollegeHROverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/collegehr/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'CollegeHR',
        title: 'College Personnel & Attendance Office',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default collegehrApi;
