// Chancellor ERP API Service & TypeScript Interfaces

export interface ChancellorMeeting {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  type?: string;
  agendaCount?: number;
  status?: string;
}

export interface ChancellorResponsibility {
  id: string;
  title: string;
  description: string;
  iconType: string;
}

export interface PendingActionItem {
  category: string;
  count: number;
  iconType: string;
}

export interface ChancellorOverviewData {
  academicYear: string;
  totalStudents: number;
  totalStudentsGrowth: string;
  totalFaculty: number;
  totalFacultyGrowth: string;
  departments: number;
  activePrograms: number;
  studentDistribution: {
    ug: number;
    pg: number;
    phd: number;
    others: number;
  };
  academicResearchHighlights: {
    naacGrade: string;
    researchProjects: number;
    activeMoUs: number;
  };
  upcomingMeetings: ChancellorMeeting[];
  goal: string;
  responsibilities: ChancellorResponsibility[];
  pendingActions: {
    total: number;
    breakdown: PendingActionItem[];
  };
}

export interface ChancellorAuditTrailEntry {
  stage: string;
  actor: string;
  role: string;
  action: string;
  timestamp: string;
  remarks?: string;
}

export interface ChancellorProposalItem {
  _id?: string;
  id?: string;
  proposalCode: string;
  title: string;
  category:
    | 'New Program Proposals'
    | 'Policy / Regulation Amendments'
    | 'Major Expenditure Approvals'
    | 'MoU / Collaboration Requests'
    | 'Appointment / Promotion Cases';
  department: string;
  submittedBy: string;
  submissionDate: string;
  urgency: 'Urgent' | 'High' | 'Normal';
  budgetInvolved: string;
  description: string;
  supportingDocs?: string[];
  registrarVerification?: {
    status: string;
    verifiedBy: string;
    date: string;
    remarks: string;
  };
  vcRecommendation?: {
    status: string;
    endorsedBy: string;
    date: string;
    remarks: string;
  };
  requiresChancellorAction: boolean;
  status: 'Pending Chancellor Action' | 'Approved' | 'Rejected' | 'Returned for Correction';
  chancellorDecision?: {
    decision: 'Approve' | 'Reject' | 'Return' | null;
    remarks: string;
    decidedAt: string | null;
    digitalSignatureId: string | null;
  };
  auditTrail: ChancellorAuditTrailEntry[];
}

export interface ChancellorGovernanceRecord {
  _id?: string;
  id?: string;
  section: string;
  referenceCode: string;
  title: string;
  department: string;
  date: string;
  status: string;
  summary: string;
  amountOrMetric?: string;
  leadPerson?: string;
  tags?: string[];
}

export interface ChancellorAdmsMetricsData {
  academicYear: string;
  enrollment: {
    parameter: string;
    value: number;
    maxScale: number;
    color: string;
  }[];
  curriculumAcademics: {
    parameter: string;
    value: number;
    maxScale: number;
    color: string;
  }[];
  research: {
    label: string;
    value: number;
    color: string;
  }[];
  infrastructureGovernance: {
    parameter: string;
    value: number;
    maxScale: number;
    color: string;
  }[];
}

const API_BASE = (import.meta as any).env?.VITE_API_URL
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api/university/chancellor`
  : '/api/university/chancellor';

// Fallback initial dataset in case backend is loading
export const FALLBACK_CHANCELLOR_OVERVIEW: ChancellorOverviewData = {
  academicYear: '2026 - 2027',
  totalStudents: 24560,
  totalStudentsGrowth: '+6.2%',
  totalFaculty: 1820,
  totalFacultyGrowth: '+3.8%',
  departments: 52,
  activePrograms: 320,
  studentDistribution: { ug: 55, pg: 32, phd: 8, others: 5 },
  academicResearchHighlights: {
    naacGrade: 'A++',
    researchProjects: 420,
    activeMoUs: 68,
  },
  upcomingMeetings: [
    {
      id: 'meet-1',
      title: 'Executive Council Meeting',
      date: '15 Nov 2026',
      time: '10:30 AM',
      venue: 'Senate Chamber, Administrative Block',
      type: 'Executive Council',
      agendaCount: 9,
      status: 'Scheduled',
    },
    {
      id: 'meet-2',
      title: 'Academic Council Meeting',
      date: '20 Nov 2026',
      time: '02:00 PM',
      venue: 'Council Hall, Knowledge Center',
      type: 'Academic Council',
      agendaCount: 14,
      status: 'Scheduled',
    },
    {
      id: 'meet-3',
      title: 'Syndicate Meeting',
      date: '28 Nov 2026',
      time: '11:00 AM',
      venue: 'Apex Boardroom, Central Tower',
      type: 'Syndicate',
      agendaCount: 6,
      status: 'Scheduled',
    },
  ],
  goal: 'Ensure academic excellence, good governance, financial sustainability, regulatory compliance, and long-term growth of the university.',
  responsibilities: [
    {
      id: 'resp-1',
      title: 'Strategic Leadership & Governance',
      description:
        'Provide overall vision, direction and oversight for the university\'s academic, administrative and developmental goals.',
      iconType: 'building',
    },
    {
      id: 'resp-2',
      title: 'Policy & Statutory Approvals',
      description:
        'Approve university policies, statutes, ordinances, and amendments; ensure regulatory compliance (UGC/AICTE, etc.).',
      iconType: 'clipboard',
    },
    {
      id: 'resp-3',
      title: 'Academic Oversight',
      description:
        'Approve new academic programs, curricula, and major academic reforms; review academic performance and quality.',
      iconType: 'graduation',
    },
    {
      id: 'resp-4',
      title: 'Key Appointments',
      description:
        'Appoint Vice-Chancellor (as per regulations), Pro-Vice Chancellor, Registrar and other senior functionaries; approve promotions.',
      iconType: 'users',
    },
    {
      id: 'resp-5',
      title: 'Finance & Resource Approval',
      description:
        'Approve annual budgets, major expenditures, grants, and resource allocation; oversee financial integrity and audits.',
      iconType: 'coins',
    },
    {
      id: 'resp-6',
      title: 'Research, Innovation & Collaboration',
      description:
        'Promote research and innovation, approve major research initiatives, and authorize MoUs and strategic partnerships.',
      iconType: 'flask',
    },
    {
      id: 'resp-7',
      title: 'Preside Over Statutory Bodies',
      description:
        'Chair key bodies such as the Executive Council, Academic Council, Syndicate, and other apex committees.',
      iconType: 'users-group',
    },
    {
      id: 'resp-8',
      title: 'Quality, Compliance & Risk Oversight',
      description:
        'Ensure adherence to statutory requirements, quality standards (NAAC/NIRF), and risk management.',
      iconType: 'shield',
    },
    {
      id: 'resp-9',
      title: 'Performance & Impact Review',
      description:
        'Review periodic reports on academics, research, finance, and administration; monitor university rankings and outcomes.',
      iconType: 'chart',
    },
    {
      id: 'resp-10',
      title: 'Represent & Promote the University',
      description:
        'Act as the ceremonial head and brand ambassador, foster industry, alumni and global academic relations.',
      iconType: 'star',
    },
  ],
  pendingActions: {
    total: 25,
    breakdown: [
      { category: 'New Program Proposals', count: 5, iconType: 'document' },
      { category: 'Policy / Regulation Amendments', count: 3, iconType: 'gear' },
      { category: 'Major Expenditure Approvals', count: 4, iconType: 'coins' },
      { category: 'MoU / Collaboration Requests', count: 6, iconType: 'handshake' },
      { category: 'Appointment / Promotion Cases', count: 7, iconType: 'user' },
    ],
  },
};

export const chancellorApi = {
  // Fetch Dashboard Overview
  fetchOverview: async (academicYear = '2026 - 2027'): Promise<ChancellorOverviewData> => {
    try {
      const res = await fetch(`${API_BASE}/overview?academicYear=${encodeURIComponent(academicYear)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Chancellor API] Using fallback overview data:', err);
    }
    return FALLBACK_CHANCELLOR_OVERVIEW;
  },

  // Fetch Proposals with Filtering
  fetchProposals: async (params?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ChancellorProposalItem[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category && params.category !== 'All') queryParams.append('category', params.category);
      if (params?.status && params.status !== 'All') queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);

      const url = `${API_BASE}/proposals?${queryParams.toString()}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Chancellor API] Error fetching proposals:', err);
    }
    return [];
  },

  // Fetch Single Proposal
  fetchProposalById: async (id: string): Promise<ChancellorProposalItem | null> => {
    try {
      const res = await fetch(`${API_BASE}/proposals/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Chancellor API] Error fetching proposal by ID:', err);
    }
    return null;
  },

  // Flowchart Decision Action: Approve | Reject | Return
  decideProposal: async (
    id: string,
    payload: {
      decision: 'Approve' | 'Reject' | 'Return';
      remarks?: string;
      digitalSignatureId?: string;
    }
  ): Promise<ChancellorProposalItem> => {
    const res = await fetch(`${API_BASE}/proposals/${id}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Failed to process decision: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  },

  // Fetch Subcontent Governance Records
  fetchGovernanceRecords: async (section: string, search?: string): Promise<ChancellorGovernanceRecord[]> => {
    try {
      const url = `${API_BASE}/governance/${encodeURIComponent(section)}${
        search ? `?search=${encodeURIComponent(search)}` : ''
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Chancellor API] Error fetching governance records:', err);
    }
    return [];
  },

  // Fetch ADMS Parameter's Dashboard (Image 2)
  fetchAdmsMetrics: async (academicYear = '2026 - 2027'): Promise<ChancellorAdmsMetricsData> => {
    try {
      const res = await fetch(`${API_BASE}/adms-metrics?academicYear=${encodeURIComponent(academicYear)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Chancellor API] Using fallback ADMS metrics:', err);
    }
    return {
      academicYear: '2026 - 2027',
      enrollment: [
        { parameter: 'Student Sanction Strength', value: 72, maxScale: 80, color: '#0284c7' },
        { parameter: 'Students to mentor', value: 15, maxScale: 80, color: '#84cc16' },
        { parameter: 'Scholarship & Freeships', value: 5, maxScale: 80, color: '#a3e635' },
      ],
      curriculumAcademics: [
        { parameter: 'Revision Programs', value: 11, maxScale: 20, color: '#84cc16' },
        { parameter: 'Course for Skill Development', value: 15, maxScale: 20, color: '#dc2626' },
        { parameter: 'Cert/Dip/Add on course', value: 13, maxScale: 20, color: '#b91c1c' },
        { parameter: 'Student Projects', value: 9, maxScale: 20, color: '#eab308' },
        { parameter: 'Teacher Ph.D Details', value: 6, maxScale: 20, color: '#0284c7' },
      ],
      research: [
        { label: 'Publications (Indexed)', value: 3, color: '#dc2626' },
        { label: 'Funded Research Projects', value: 7, color: '#0284c7' },
        { label: 'Patents Filed & Granted', value: 5, color: '#eab308' },
        { label: 'Consultancy & Tech Transfers', value: 8, color: '#0284c7' },
      ],
      infrastructureGovernance: [
        { parameter: 'Classroom/Seminar Hall with ICT', value: 5, maxScale: 6, color: '#84cc16' },
        { parameter: 'Book & Journals Annual Expenditure', value: 2, maxScale: 6, color: '#eab308' },
        { parameter: 'Expenditure on Physical and Academic Facilities', value: 5, maxScale: 6, color: '#84cc16' },
        { parameter: 'Quality Initiatives by IQAC', value: 3, maxScale: 6, color: '#0284c7' },
        { parameter: 'Equity Promotion Programs Organized', value: 5, maxScale: 6, color: '#dc2626' },
      ],
    };
  },
};

export default chancellorApi;
