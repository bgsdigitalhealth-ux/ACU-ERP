export const erpData = {
  metrics: [
    {
      id: '1',
      title: 'Total Sales',
      value: '$25,890',
      change: '1.3%',
      isPositive: true,
      trendText: 'Up from past week',
      type: 'sales'
    },
    {
      id: '2',
      title: 'Total Orders',
      value: '$25,890',
      change: '1.5%',
      isPositive: true,
      trendText: 'Up from past week',
      type: 'orders'
    },
    {
      id: '3',
      title: 'Total Customers',
      value: '183.35M',
      change: '1.6%',
      isPositive: false,
      trendText: 'Up from past week',
      type: 'customers'
    }
  ],

  audience: [
    { month: 'Jan', orders: 40, revenue: 75, refunds: 30 },
    { month: 'Feb', orders: 52, revenue: 88, refunds: 40 },
    { month: 'Mar', orders: 60, revenue: 95, refunds: 35 },
    { month: 'Apr', orders: 48, revenue: 82, refunds: 25 },
    { month: 'May', orders: 58, revenue: 86, refunds: 45 },
    { month: 'Jun', orders: 62, revenue: 104, refunds: 48 },
    { month: 'Jul', orders: 65, revenue: 98, refunds: 50 },
    { month: 'Aug', orders: 60, revenue: 115, refunds: 52 },
    { month: 'Sep', orders: 68, revenue: 100, refunds: 55 },
    { month: 'Oct', orders: 78, revenue: 102, refunds: 54 },
    { month: 'Nov', orders: 74, revenue: 112, refunds: 44 },
    { month: 'Dec', orders: 80, revenue: 96, refunds: 58 }
  ],

  ratings: {
    year: 'YEAR OF 2026',
    reviewsCount: '8.14k',
    averageScore: 4.5,
    percentageChange: '+15.6%',
    distribution: {
      cyan: 35,
      teal: 25,
      pink: 20,
      purple: 20
    }
  },

  visits: {
    domestic: 56.3,
    international: 43.8
  },

  modules: [
    { id: '1', code: 'INV-2026-081', name: 'Campus Operations Fee', department: 'Finance', status: 'Completed', amount: '$14,250', date: '03 Nov 2026' },
    { id: '2', code: 'PO-9042', name: 'Lab Hardware Procurement', department: 'Logistics', status: 'Active', amount: '$8,400', date: '02 Nov 2026' },
    { id: '3', code: 'REG-1104', name: 'Faculty Payroll Batch #11', department: 'HR & Payroll', status: 'Completed', amount: '$42,800', date: '01 Nov 2026' },
    { id: '4', code: 'ADM-5531', name: 'Student Enrollment Dues', department: 'Academic', status: 'Pending', amount: '$5,120', date: '31 Oct 2026' },
    { id: '5', code: 'LIC-7719', name: 'Enterprise Cloud Licenses', department: 'IT Systems', status: 'Completed', amount: '$3,950', date: '30 Oct 2026' },
  ]
};

export const getDashboard = (req, res) => {
  res.json(erpData);
};

export const getModules = (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.json(erpData.modules);
  }
  const filtered = erpData.modules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.code.toLowerCase().includes(search.toLowerCase()) ||
    m.department.toLowerCase().includes(search.toLowerCase())
  );
  res.json(filtered);
};

