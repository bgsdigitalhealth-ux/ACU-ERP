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

export interface ViceChancellorOverviewData {
  academicYear: string;
  viceChancellorName: string;
  motto: string;
  totalStudents: number;
  totalStudentsGrowth: string;
  totalFaculty: number;
  totalFacultyGrowth: string;
  departments: number;
  departmentsGrowth: string;
  academicPrograms: number;
  academicProgramsGrowth: string;
  studentDistribution: {
    ug: number;
    pg: number;
    phd: number;
    others: number;
  };
  academicPerformance: {
    ugPassCurrent: number;
    ugPassPrevious: number;
    pgPassCurrent: number;
    pgPassPrevious: number;
    phdCompletionCurrent: number;
    phdCompletionPrevious: number;
  };
  researchInnovation: {
    activeProjects: number;
    grantsReceived: number;
    mousCollaborations: number;
    publicationsLastYear: number;
  };
  upcomingMeetings: ViceChancellorMeeting[];
  notifications: ViceChancellorNotification[];
  responsibilities: ViceChancellorResponsibility[];
  erpModulesAccess: ViceChancellorModuleAccess[];
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
  category:
    | 'New Program Proposals'
    | 'Faculty Appointments'
    | 'Budget Proposals'
    | 'Policy / Regulation Amendments'
    | 'MoU / Collaboration Requests';
  department: string;
  submittedBy: string;
  submissionDate: string;
  urgency: 'Urgent' | 'High' | 'Normal';
  budgetInvolved: string;
  description: string;
  supportingDocs?: string[];
  delegatedAuthority: 'VC Final Authority' | 'Requires Chancellor Assent' | 'Board of Governors / Syndicate';
  status: 'Pending VC Action' | 'Approved' | 'Endorsed for Chancellor Assent' | 'Rejected' | 'Returned for Correction';
  vcDecision?: {
    decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return' | null;
    remarks: string;
    decidedAt: string | null;
    digitalSignatureId: string | null;
  };
  auditTrail: {
    stage: string;
    actor: string;
    role: string;
    action: string;
    timestamp: string;
    remarks?: string;
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

// Fallback dataset matching Image 1
export const FALLBACK_VC_OVERVIEW: ViceChancellorOverviewData = {
  academicYear: '2024 - 2025',
  viceChancellorName: 'Dr. R. Sharma',
  motto: 'Committed to Academic Excellence, Research, Innovation and Holistic Development',
  totalStudents: 24560,
  totalStudentsGrowth: '↑ 6.2%',
  totalFaculty: 1820,
  totalFacultyGrowth: '↑ 3.8%',
  departments: 52,
  departmentsGrowth: '↑ 2.0%',
  academicPrograms: 320,
  academicProgramsGrowth: '↑ 4.5%',
  studentDistribution: { ug: 55, pg: 32, phd: 8, others: 5 },
  academicPerformance: {
    ugPassCurrent: 87,
    ugPassPrevious: 83,
    pgPassCurrent: 92,
    pgPassPrevious: 88,
    phdCompletionCurrent: 76,
    phdCompletionPrevious: 70,
  },
  researchInnovation: {
    activeProjects: 120,
    grantsReceived: 48,
    mousCollaborations: 36,
    publicationsLastYear: 245,
  },
  upcomingMeetings: [
    { id: 'm-1', title: 'Executive Council', date: '24 Apr 2025', type: 'Executive Council' },
    { id: 'm-2', title: 'Academic Council', date: '28 Apr 2025', type: 'Academic Council' },
    { id: 'm-3', title: 'Syndicate Meeting', date: '05 May 2025', type: 'Syndicate Meeting' },
  ],
  notifications: [
    { id: 'n-1', message: 'New research grant proposal submitted', timeAgo: '2 hours ago', category: 'research' },
    { id: 'n-2', message: 'Faculty appointment pending approval', timeAgo: '4 hours ago', category: 'faculty' },
    { id: 'n-3', message: 'NAAC compliance report uploaded', timeAgo: '6 hours ago', category: 'accreditation' },
  ],
  responsibilities: [
    {
      id: 'r-1',
      number: 1,
      title: 'Academic Leadership & Quality',
      bullets: ['Ensure academic excellence and innovation', 'Monitor program effectiveness', 'Promote research and interdisciplinary studies'],
      iconType: 'academic',
    },
    {
      id: 'r-2',
      number: 2,
      title: 'Policy Implementation & Compliance',
      bullets: ['Implement university policies and decisions', 'Ensure regulatory compliance (UGC/NAAC/NIRF)', 'Monitor risk and legal matters'],
      iconType: 'policy',
    },
    {
      id: 'r-3',
      number: 3,
      title: 'Administration & Governance',
      bullets: ['Oversee university administration', 'Implement statutes and regulations', 'Coordinate with Registrar and other authorities'],
      iconType: 'admin',
    },
    {
      id: 'r-4',
      number: 4,
      title: 'Faculty & Staff Management',
      bullets: ['Oversee faculty recruitment and development', 'Ensure HR policies implementation', 'Promote faculty performance and well-being'],
      iconType: 'faculty',
    },
    {
      id: 'r-5',
      number: 5,
      title: 'Finance & Resource Management',
      bullets: ['Monitor budget utilization', 'Optimize resource allocation', 'Ensure financial sustainability'],
      iconType: 'finance',
    },
    {
      id: 'r-6',
      number: 6,
      title: 'Statutory Meetings & Committees',
      bullets: ['Chair Executive Council / Academic Council', 'Review committee reports and resolutions', 'Ensure timely decisions and follow-ups'],
      iconType: 'statutory',
    },
    {
      id: 'r-7',
      number: 7,
      title: 'Research, Innovation & Collaboration',
      bullets: ['Promote research activities', 'Facilitate industry and international collaborations', 'Support innovation and incubation centers'],
      iconType: 'research',
    },
    {
      id: 'r-8',
      number: 8,
      title: 'Institutional Development',
      bullets: ['Drive strategic planning and expansion', 'Enhance university reputation and rankings', 'Strengthen alumni and stakeholder engagement'],
      iconType: 'development',
    },
  ],
  erpModulesAccess: [
    { module: 'Vice Chancellor Dashboard', keyFeatures: 'University overview, KPIs, pending approvals, key alerts, quick actions' },
    { module: 'Academic Oversight', keyFeatures: 'Program performance, departments, student results, faculty profile' },
    { module: 'Administration', keyFeatures: 'Appointments, governance, committee reports, official notifications' },
    { module: 'Finance & Budget', keyFeatures: 'Budget summary, expenditure, audit reports, financial approvals' },
    { module: 'Research & Innovation', keyFeatures: 'Research projects, grants, MoUs, publications' },
    { module: 'Statutory Meetings', keyFeatures: 'Agendas, minutes, resolutions, follow-ups' },
    { module: 'Approvals & Decisions', keyFeatures: 'Pending proposals, approval workflow, digital signing' },
    { module: 'Quality & Accreditation', keyFeatures: 'NAAC/NIRF status, compliance reports, audit observations' },
    { module: 'Reports & Analytics', keyFeatures: 'Performance reports, custom analytics, data export' },
    { module: 'Communication', keyFeatures: 'Official circulars, announcements, messaging' },
  ],
  goal: 'To provide visionary leadership, ensure academic excellence, and drive the university towards growth and global recognition.',
  pendingApprovals: {
    total: 26,
    breakdown: [
      { category: 'New Program Proposals', count: 8, iconType: 'document' },
      { category: 'Faculty Appointments', count: 5, iconType: 'faculty' },
      { category: 'Budget Proposals', count: 3, iconType: 'budget' },
      { category: 'Policy / Regulation Amendments', count: 4, iconType: 'policy' },
      { category: 'MoU / Collaboration Requests', count: 6, iconType: 'handshake' },
    ],
  },
};

export const vicechancellorApi = {
  // Fetch Dashboard Overview
  fetchOverview: async (academicYear = '2024 - 2025'): Promise<ViceChancellorOverviewData> => {
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

  // Fetch Proposals
  fetchProposals: async (params?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ViceChancellorProposalItem[]> => {
    try {
      const q = new URLSearchParams();
      if (params?.category && params.category !== 'All') q.append('category', params.category);
      if (params?.status && params.status !== 'All') q.append('status', params.status);
      if (params?.search) q.append('search', params.search);

      const res = await fetch(`${API_BASE}/proposals?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Error fetching proposals:', err);
    }
    return [];
  },

  // Statutory Decision
  decideProposal: async (
    id: string,
    payload: {
      decision: 'Approve' | 'Endorse for Chancellor' | 'Reject' | 'Return';
      remarks?: string;
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
      throw new Error(errorJson.message || 'Failed to submit decision.');
    }
    const json = await res.json();
    return json.data;
  },

  // Fetch Subcontent Governance Records
  fetchGovernanceRecords: async (
    section: string,
    search?: string
  ): Promise<ViceChancellorGovernanceRecord[]> => {
    try {
      const url = `${API_BASE}/governance/${encodeURIComponent(section)}${
        search ? `?search=${encodeURIComponent(search)}` : ''
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) return json.data;
      }
    } catch (err) {
      console.warn('[Vice Chancellor API] Error fetching governance records:', err);
    }
    return [];
  },

  // Fetch Analytics Data (Image 2 & 3)
  fetchAnalytics: async (academicYear = '2024 - 2025'): Promise<ViceChancellorAnalyticsData> => {
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
      academicYear: '2024 - 2025',
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
          description: 'La faculté d\'informatique a enregistré une croissance de 15% ce trimestre, dépassant les prévisions initiales.',
          type: 'growth',
        },
        {
          title: 'Optimisation des ressources',
          description: 'Le ratio étudiants/enseignants en ingénierie est actuellement à 22:1, suggérant un besoin de recrutement stratégique.',
          type: 'resource',
        },
        {
          title: 'Alerte Rétention',
          description: 'Une baisse de 3% de l\'engagement a été détectée en Arts & Humanités. Une intervention pédagogique est recommandée.',
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
