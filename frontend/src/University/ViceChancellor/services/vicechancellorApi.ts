// Vice Chancellor ERP API Service & TypeScript Interfaces

export interface ViceChancellorMeeting {
  id: string;
  title: string;
  date: string;
  type?: string;
  venue?: string;
  time?: string;
}

export interface ViceChancellorNotification {
  id: string;
  message: string;
  timeAgo: string;
  category?: string;
  read?: boolean;
}

export interface ViceChancellorResponsibility {
  id: string;
  number: number;
  title: string;
  bullets: string[];
  iconType?: string;
}

export interface ViceChancellorModuleAccess {
  module: string;
  keyFeatures: string;
  iconType?: string;
}

export interface ViceChancellorFinanceOverview {
  fiscalYear: string;
  annualBudget: string;
  expenditureYtd: string;
  committed: string;
  balance: string;
}

export interface ViceChancellorOverviewData {
  academicYear: string;
  viceChancellorName: string;
  roleTitle?: string;
  motto: string;

  // 8 KPI Summary Cards
  totalStudents: number;
  totalStudentsGrowth: string;
  totalFaculty: number;
  totalFacultyGrowth: string;
  departments: number;
  academicPrograms: number;
  academicProgramsBreakdown?: string;
  affiliatedColleges?: number;
  researchProjects?: number;
  researchFunding?: string;
  activeMous?: number;
  mousBreakdown?: string;
  pendingApprovalsCount?: number;

  studentDistribution: {
    ug: number;
    pg: number;
    phd: number;
    others: number;
  };

  financeOverview?: ViceChancellorFinanceOverview;

  upcomingMeetings: ViceChancellorMeeting[];
  notifications: ViceChancellorNotification[];
  responsibilities: ViceChancellorResponsibility[];
  erpModulesAccess: ViceChancellorModuleAccess[];
  reportsList?: string[];
  importantComponents?: string[];
  goal: string;

  pendingApprovals: {
    total: number;
    breakdown: {
      category: string;
      count: number;
      iconType: string;
    }[];
  };
}

export interface ViceChancellorProposalItem {
  _id?: string;
  id?: string;
  proposalCode: string;
  title: string;
  category: string;
  department: string;
  submittedBy: string;
  submissionDate: string;
  urgency: 'Urgent' | 'High' | 'Normal';
  budgetInvolved: string;
  description: string;
  supportingDocs?: string[];
  delegatedAuthority: 'VC Final Authority' | 'Requires Chancellor Assent' | 'Board of Governors / Syndicate' | 'Syndicate & Academic Council';
  status: 'Pending VC Action' | 'Approved' | 'Endorsed for Chancellor Assent' | 'Rejected' | 'Returned for Correction';
  vcDecision?: {
    decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return' | null;
    remarks: string;
    decidedAt: string | null;
    digitalSignatureId: string | null;
    delegatedClause?: string;
  };
  auditTrail: {
    stage: string;
    actor: string;
    role: string;
    action: string;
    timestamp: string;
    remarks?: string;
    digitalSignatureId?: string;
  }[];
}

export interface ViceChancellorGovernanceRecord {
  _id?: string;
  id?: string;
  section: string;
  referenceCode: string;
  title: string;
  department: string;
  date: string;
  status: string;
  summary: string;
  metricOrValue?: string;
  leadOfficer?: string;
}

export interface ViceChancellorAnalyticsData {
  academicYear: string;
  enrollmentTrends: { month: string; students: number }[];
  departmentalSuccessIndex: { department: string; passRate: number; placementRate: number }[];
  facultyAllocation: { faculty: string; percentage: number; color?: string }[];
  strategicInsights: { title: string; description: string; type: string }[];
  multiCampus: { name: string; location: string; students: number; departments: number }[];
  accreditationReadiness: {
    naacStatus: string;
    nbaStatus: string;
    nirfStatus: string;
    overallReadinessPercentage: number;
  };
}

const API_BASE = (import.meta as any).env?.VITE_API_URL
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api/university/vice-chancellor`
  : '/api/university/vice-chancellor';

// Fallback dataset matching Image 1 & updated mockup
export const FALLBACK_VC_OVERVIEW: ViceChancellorOverviewData = {
  academicYear: '2026 – 2027',
  viceChancellorName: 'Prof. (Dr.) Ramesh K.',
  roleTitle: 'Vice Chancellor',
  motto: 'Oversee • Lead • Approve • Monitor • Develop',

  totalStudents: 24560,
  totalStudentsGrowth: '↑ 6.2%',
  totalFaculty: 1820,
  totalFacultyGrowth: '↑ 3.8%',
  departments: 52,
  academicPrograms: 320,
  academicProgramsBreakdown: '(UG 198 | PG 92 | PhD 30)',
  affiliatedColleges: 186,
  researchProjects: 420,
  researchFunding: '(₹ 86.4 Cr)',
  activeMous: 68,
  mousBreakdown: '(National 42 | International 26)',
  pendingApprovalsCount: 37,

  studentDistribution: { ug: 55, pg: 32, phd: 8, others: 5 },

  financeOverview: {
    fiscalYear: 'FY 2026–27',
    annualBudget: '₹ 520.00 Cr',
    expenditureYtd: '₹ 286.40 Cr (55.1%)',
    committed: '₹ 112.30 Cr (21.6%)',
    balance: '₹ 121.30 Cr (23.3%)',
  },

  upcomingMeetings: [
    { id: 'm-1', title: 'Executive Council Meeting', date: '15 Nov 2026', type: 'Executive Council' },
    { id: 'm-2', title: 'Academic Council Meeting', date: '20 Nov 2026', type: 'Academic Council' },
    { id: 'm-3', title: 'Syndicate Meeting', date: '28 Nov 2026', type: 'Syndicate' },
    { id: 'm-4', title: 'Planning & Development Committee', date: '05 Dec 2026', type: 'Planning & Development' },
  ],

  notifications: [
    { id: 'n-1', message: 'Board of Governors meeting scheduled for 15 Nov 2026.', timeAgo: '1 hour ago', category: 'statutory' },
    { id: 'n-2', message: '7 Faculty appointment selection files submitted for VC sanction.', timeAgo: '3 hours ago', category: 'recruitment' },
    { id: 'n-3', message: 'Annual College Affiliation Inspection Reports ready for review.', timeAgo: '5 hours ago', category: 'affiliation' },
  ],

  responsibilities: [
    {
      id: 'r-1',
      number: 1,
      title: 'Academic Leadership',
      bullets: [
        'Lead academic planning and policy implementation.',
        'Ensure quality of teaching, learning and evaluation.',
        'Approve new programs and curriculum changes.',
      ],
      iconType: 'academic',
    },
    {
      id: 'r-2',
      number: 2,
      title: 'Administration & Governance',
      bullets: [
        'Overall administration and day-to-day management.',
        'Implement decisions of Executive Council, Academic Council & Syndicate.',
        'Ensure efficient and transparent governance.',
      ],
      iconType: 'governance',
    },
    {
      id: 'r-3',
      number: 3,
      title: 'Research & Innovation',
      bullets: [
        'Promote research culture and innovation.',
        'Approve major research projects and MoUs.',
        'Facilitate funding, industry and international collaborations.',
      ],
      iconType: 'research',
    },
    {
      id: 'r-4',
      number: 4,
      title: 'Finance & Resource Management',
      bullets: [
        'Prepare and present the annual budget.',
        'Approve major expenditures and resource allocations.',
        'Ensure financial discipline and audit compliance.',
      ],
      iconType: 'finance',
    },
    {
      id: 'r-5',
      number: 5,
      title: 'Human Resource Management',
      bullets: [
        'Oversee recruitment, promotions and service matters.',
        'Ensure faculty and staff development.',
        'Approve key HR policies and initiatives.',
      ],
      iconType: 'hr',
    },
    {
      id: 'r-6',
      number: 6,
      title: 'Student Welfare & Development',
      bullets: [
        'Ensure student support, scholarships and inclusion.',
        'Monitor student services, placements and career support.',
        'Promote a safe, equitable and conducive campus environment.',
      ],
      iconType: 'student',
    },
    {
      id: 'r-7',
      number: 7,
      title: 'Quality, Accreditation & Compliance',
      bullets: [
        'Ensure compliance with UGC/AICTE/PCI/NCTE and State regulations.',
        'Lead NAAC, NIRF and other accreditation/ranking initiatives.',
        'Monitor quality assurance and institutional audits.',
      ],
      iconType: 'quality',
    },
    {
      id: 'r-8',
      number: 8,
      title: 'Planning, Development & Expansion',
      bullets: [
        'Prepare and execute long-term development plans.',
        'Approve infrastructure, ICT and campus development projects.',
        'Drive digital transformation and capacity building.',
      ],
      iconType: 'planning',
    },
    {
      id: 'r-9',
      number: 9,
      title: 'Statutory Meetings & Decision Implementation',
      bullets: [
        'Preside over Academic Council, Executive Council & Syndicate.',
        'Ensure implementation of resolutions and follow-up actions.',
        'Review progress of key initiatives and projects.',
      ],
      iconType: 'statutory',
    },
    {
      id: 'r-10',
      number: 10,
      title: 'External Relations & Representation',
      bullets: [
        'Represent the university at national and international forums.',
        'Foster industry, alumni and community engagement.',
        'Build strategic partnerships and enhance the university’s reputation.',
      ],
      iconType: 'external',
    },
  ],

  erpModulesAccess: [
    {
      module: 'University Governance',
      keyFeatures: 'Policies, Statutes & Ordinances | Regulatory Compliance (UGC/AICTE) | Institutional Audit & Governance Reports',
      iconType: 'governance',
    },
    {
      module: 'Academic Affairs',
      keyFeatures: 'Programs & Curriculum Approval | Academic Planning & Monitoring | Academic Performance & Quality',
      iconType: 'academic',
    },
    {
      module: 'Examinations',
      keyFeatures: 'Examination Policies & Scheduling | Results & Performance Analytics | Evaluation Reforms & Oversight',
      iconType: 'exam',
    },
    {
      module: 'Research & Innovation',
      keyFeatures: 'Research Projects & Grants | MoUs & Collaborations | IPR, Innovation & Incubation',
      iconType: 'research',
    },
    {
      module: 'Human Resources',
      keyFeatures: 'Recruitment & Appointments | Promotions & Service Matters | Faculty Development & Training',
      iconType: 'hr',
    },
    {
      module: 'Finance & Budget',
      keyFeatures: 'Annual Budget & Allocations | Expenditure & Financial Approvals | Audit Reports & Financial Compliance',
      iconType: 'finance',
    },
    {
      module: 'Planning & Development',
      keyFeatures: 'University Development Plan (UDP) | Infrastructure & Campus Projects | ICT & Digital Campus Initiatives',
      iconType: 'planning',
    },
    {
      module: 'Student Affairs',
      keyFeatures: 'Scholarships & Welfare Schemes | Placements & Career Services | Student Grievances & Support',
      iconType: 'student',
    },
    {
      module: 'College & Affiliation',
      keyFeatures: 'Affiliation / Renewal / Extension | College Performance & Compliance | Inspection & Approval Reports',
      iconType: 'college',
    },
    {
      module: 'Quality & Accreditation',
      keyFeatures: 'NAAC / NIRF / Rankings | IQAC Activities & Quality Reports | Continuous Improvement Plans',
      iconType: 'quality',
    },
    {
      module: 'Statutory Bodies & Meetings',
      keyFeatures: 'Academic Council / Executive Council | Syndicate / Board Meetings | Agendas, Minutes & Resolutions',
      iconType: 'statutory',
    },
    {
      module: 'Approvals & Workflow',
      keyFeatures: 'Program / Policy Approvals | Administrative & Financial Approvals | e-File Tracking & Decision History',
      iconType: 'approvals',
    },
  ],

  reportsList: [
    'University Performance Dashboard',
    'Academic & Examination Reports',
    'Research, Grants & MoU Reports',
    'Finance & Budget Utilization Reports',
    'HR & Employee Strength Reports',
    'Accreditation & Compliance Reports',
    'Project & Development Progress Reports',
  ],

  importantComponents: [
    'Digital Signature',
    'Document Management',
    'Role-based Access Control',
    'Notifications & Alerts',
    'Calendar & Meetings',
    'MIS & Data Analytics',
    'Audit Trail & History',
    'Mobile Access',
  ],

  goal: 'Ensure academic excellence, research innovation, good governance, financial sustainability, regulatory compliance and holistic development of the university.',

  pendingApprovals: {
    total: 37,
    breakdown: [
      { category: 'Program / Curriculum Proposals', count: 6, iconType: 'program' },
      { category: 'College Affiliation / Renewal', count: 4, iconType: 'affiliation' },
      { category: 'Recruitment / Appointments', count: 7, iconType: 'recruitment' },
      { category: 'Research & MoU Proposals', count: 5, iconType: 'research' },
      { category: 'Budget / Major Expenditure', count: 4, iconType: 'budget' },
      { category: 'Policy / Regulation Amendments', count: 3, iconType: 'policy' },
    ],
  },
};

export const vicechancellorApi = {
  // Fetch Overview Data
  fetchOverview: async (academicYear = '2026 – 2027'): Promise<ViceChancellorOverviewData> => {
    try {
      const res = await fetch(`${API_BASE}/overview?academicYear=${encodeURIComponent(academicYear)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Using fallback overview data:', err);
    }
    return FALLBACK_VC_OVERVIEW;
  },

  // Fetch Proposals with Category/Status/Search filters
  fetchProposals: async (params?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ViceChancellorProposalItem[]> => {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.status) query.append('status', params.status);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/proposals?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Using fallback proposals data:', err);
    }
    return [];
  },

  // Statutory Delegated Authority Decision Endpoint
  decideProposal: async (
    id: string,
    payload: {
      decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return';
      remarks: string;
      digitalSignatureId?: string;
    }
  ): Promise<ViceChancellorProposalItem> => {
    const res = await fetch(`${API_BASE}/proposals/${id}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || 'Failed to submit Vice Chancellor statutory decision');
    }

    const json = await res.json();
    return json.data;
  },

  // Fetch Governance Records for Subcontent Pages
  fetchGovernanceRecords: async (
    section = 'all',
    search = ''
  ): Promise<ViceChancellorGovernanceRecord[]> => {
    try {
      const query = new URLSearchParams();
      if (section && section !== 'all') query.append('section', section);
      if (search) query.append('search', search);

      const res = await fetch(`${API_BASE}/governance-records?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Using fallback governance data:', err);
    }
    return [];
  },

  // Fetch Analytics Data (Image 2 & 3)
  fetchAnalytics: async (academicYear = '2026 – 2027'): Promise<ViceChancellorAnalyticsData> => {
    try {
      const res = await fetch(`${API_BASE}/analytics?academicYear=${encodeURIComponent(academicYear)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Using fallback analytics data:', err);
    }
    return {
      academicYear: '2026 – 2027',
      enrollmentTrends: [
        { month: 'Jan', students: 650 },
        { month: 'Feb', students: 950 },
        { month: 'Mar', students: 1300 },
        { month: 'Apr', students: 1650 },
        { month: 'May', students: 2100 },
        { month: 'Jun', students: 2600 },
      ],
      departmentalSuccessIndex: [
        { department: 'CS', passRate: 85, placementRate: 90 },
        { department: 'ENG', passRate: 80, placementRate: 82 },
        { department: 'ART', passRate: 92, placementRate: 75 },
        { department: 'BUS', passRate: 82, placementRate: 78 },
        { department: 'SCI', passRate: 88, placementRate: 95 },
      ],
      facultyAllocation: [
        { faculty: 'Arts & Humanities', percentage: 25, color: '#ec4899' },
        { faculty: 'Business', percentage: 15, color: '#eab308' },
        { faculty: 'Computer Science', percentage: 30, color: '#3b82f6' },
        { faculty: 'Engineering', percentage: 20, color: '#8b5cf6' },
        { faculty: 'Science', percentage: 10, color: '#10b981' },
      ],
      strategicInsights: [
        {
          title: 'Inscriptions en hausse',
          description: "La faculté d'informatique a enregistré une croissance de 15% ce trimestre, dépassant les prévisions initiales.",
          type: 'growth',
        },
        {
          title: 'Optimisation des ressources',
          description: 'Le ratio étudiants/enseignants en ingénierie est actuellement à 22:1, suggérant un besoin de recrutement stratégique.',
          type: 'resource',
        },
        {
          title: 'Alerte Rétention',
          description: "Une baisse de 3% de l'engagement a été détectée en Arts & Humanités. Une intervention pédagogique est recommandée.",
          type: 'retention',
        },
      ],
      multiCampus: [
        { name: 'Main Campus (B.G. Nagara)', location: 'Mandya District', students: 16200, departments: 34 },
        { name: 'North Campus', location: 'Bengaluru Rural', students: 5100, departments: 12 },
        { name: 'City Campus', location: 'Mysuru Knowledge Hub', students: 3260, departments: 6 },
      ],
      accreditationReadiness: {
        naacStatus: 'Prepared (A++)',
        nbaStatus: 'Compliant (Tier-1)',
        nirfStatus: 'Data Ready (Top 50 Rank Band)',
        overallReadinessPercentage: 92,
      },
    };
  },
};

export default vicechancellorApi;