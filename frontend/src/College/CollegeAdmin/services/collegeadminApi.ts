import { API_BASE_URL } from '../../../config/apiConfig';

export interface CollegeAdminOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const collegeadminApi = {
  getOverview: async (): Promise<CollegeAdminOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/collegeadmin/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'CollegeAdmin',
        title: 'College Institutional Administration',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default collegeadminApi;
