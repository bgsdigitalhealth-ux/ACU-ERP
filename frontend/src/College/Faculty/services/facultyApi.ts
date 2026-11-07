import { API_BASE_URL } from '../../../config/apiConfig';

export interface FacultyOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const facultyApi = {
  getOverview: async (): Promise<FacultyOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/faculty/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Faculty',
        title: 'Faculty Academic & Teaching Station',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default facultyApi;
