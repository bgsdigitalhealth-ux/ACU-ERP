import { API_BASE_URL } from '../../../config/apiConfig';

export interface LeaveAdminOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const leaveadminApi = {
  getOverview: async (): Promise<LeaveAdminOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/leaveadmin/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'LeaveAdmin',
        title: 'College Staff Leave Approvals',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default leaveadminApi;
