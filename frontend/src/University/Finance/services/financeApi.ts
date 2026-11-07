import { API_BASE_URL } from '../../../config/apiConfig';

export interface FinanceOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const financeApi = {
  getOverview: async (): Promise<FinanceOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/finance/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Finance',
        title: 'University Finance & Accounts Department',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default financeApi;
