import { API_BASE_URL } from '../../../config/apiConfig';

export interface AdmissionOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const admissionApi = {
  getOverview: async (): Promise<AdmissionOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/admission/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Admission',
        title: 'University Admissions & Counselling Cell',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default admissionApi;
