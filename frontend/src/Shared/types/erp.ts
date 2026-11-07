export interface MetricStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  trendText: string;
  type: 'sales' | 'orders' | 'customers';
}

export interface MonthlyChartData {
  month: string;
  orders: number;
  revenue: number;
  refunds: number;
}

export interface RatingsData {
  year: string;
  reviewsCount: string;
  averageScore: number;
  percentageChange: string;
  distribution: {
    cyan: number;
    teal: number;
    pink: number;
    purple: number;
  };
}

export interface VisitsDistribution {
  domestic: number;
  international: number;
}

export interface ErpModuleItem {
  id: string;
  code: string;
  name: string;
  department: string;
  status: 'Active' | 'Completed' | 'Pending';
  amount: string;
  date: string;
}

