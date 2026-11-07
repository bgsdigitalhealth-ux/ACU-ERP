import { ViceChancellorProposal } from '../models/ViceChancellorProposal.js';
import { ViceChancellorOverview } from '../models/ViceChancellorOverview.js';
import { ViceChancellorGovernance } from '../models/ViceChancellorGovernance.js';
import { ViceChancellorAnalytics } from '../models/ViceChancellorAnalytics.js';

// Auto-seed Dynamic Data if Empty
const seedInitialDataIfEmpty = async () => {
  try {
    // 1. Seed Overview
    const countOverview = await ViceChancellorOverview.countDocuments();
    if (countOverview === 0) {
      await ViceChancellorOverview.create({
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
          {
            id: 'meet-1',
            title: 'Executive Council',
            date: '24 Apr 2025',
            type: 'Executive Council',
            venue: 'Senate Chamber, Main Campus',
            time: '11:00 AM',
          },
          {
            id: 'meet-2',
            title: 'Academic Council',
            date: '28 Apr 2025',
            type: 'Academic Council',
            venue: 'Council Hall, Knowledge Center',
            time: '02:30 PM',
          },
          {
            id: 'meet-3',
            title: 'Syndicate Meeting',
            date: '05 May 2025',
            type: 'Syndicate Meeting',
            venue: 'Apex Boardroom, Central Tower',
            time: '10:30 AM',
          },
        ],

        notifications: [
          {
            id: 'notif-1',
            message: 'New research grant proposal submitted',
            timeAgo: '2 hours ago',
            category: 'research',
            read: false,
          },
          {
            id: 'notif-2',
            message: 'Faculty appointment pending approval',
            timeAgo: '4 hours ago',
            category: 'faculty',
            read: false,
          },
          {
            id: 'notif-3',
            message: 'NAAC compliance report uploaded',
            timeAgo: '6 hours ago',
            category: 'accreditation',
            read: false,
          },
        ],

        responsibilities: [
          {
            id: 'resp-1',
            number: 1,
            title: 'Academic Leadership & Quality',
            bullets: [
              'Ensure academic excellence and innovation',
              'Monitor program effectiveness',
              'Promote research and interdisciplinary studies',
            ],
            iconType: 'academic',
          },
          {
            id: 'resp-2',
            number: 2,
            title: 'Policy Implementation & Compliance',
            bullets: [
              'Implement university policies and decisions',
              'Ensure regulatory compliance (UGC/NAAC/NIRF)',
              'Monitor risk and legal matters',
            ],
            iconType: 'policy',
          },
          {
            id: 'resp-3',
            number: 3,
            title: 'Administration & Governance',
            bullets: [
              'Oversee university administration',
              'Implement statutes and regulations',
              'Coordinate with Registrar and other authorities',
            ],
            iconType: 'admin',
          },
          {
            id: 'resp-4',
            number: 4,
            title: 'Faculty & Staff Management',
            bullets: [
              'Oversee faculty recruitment and development',
              'Ensure HR policies implementation',
              'Promote faculty performance and well-being',
            ],
            iconType: 'faculty',
          },
          {
            id: 'resp-5',
            number: 5,
            title: 'Finance & Resource Management',
            bullets: [
              'Monitor budget utilization',
              'Optimize resource allocation',
              'Ensure financial sustainability',
            ],
            iconType: 'finance',
          },
          {
            id: 'resp-6',
            number: 6,
            title: 'Statutory Meetings & Committees',
            bullets: [
              'Chair Executive Council / Academic Council',
              'Review committee reports and resolutions',
              'Ensure timely decisions and follow-ups',
            ],
            iconType: 'statutory',
          },
          {
            id: 'resp-7',
            number: 7,
            title: 'Research, Innovation & Collaboration',
            bullets: [
              'Promote research activities',
              'Facilitate industry and international collaborations',
              'Support innovation and incubation centers',
            ],
            iconType: 'research',
          },
          {
            id: 'resp-8',
            number: 8,
            title: 'Institutional Development',
            bullets: [
              'Drive strategic planning and expansion',
              'Enhance university reputation and rankings',
              'Strengthen alumni and stakeholder engagement',
            ],
            iconType: 'development',
          },
        ],

        erpModulesAccess: [
          { module: 'Vice Chancellor Dashboard', keyFeatures: 'University overview, KPIs, pending approvals, key alerts, quick actions', iconType: 'dashboard' },
          { module: 'Academic Oversight', keyFeatures: 'Program performance, departments, student results, faculty profile', iconType: 'academic' },
          { module: 'Administration', keyFeatures: 'Appointments, governance, committee reports, official notifications', iconType: 'admin' },
          { module: 'Finance & Budget', keyFeatures: 'Budget summary, expenditure, audit reports, financial approvals', iconType: 'finance' },
          { module: 'Research & Innovation', keyFeatures: 'Research projects, grants, MoUs, publications', iconType: 'research' },
          { module: 'Statutory Meetings', keyFeatures: 'Agendas, minutes, resolutions, follow-ups', iconType: 'statutory' },
          { module: 'Approvals & Decisions', keyFeatures: 'Pending proposals, approval workflow, digital signing', iconType: 'approvals' },
          { module: 'Quality & Accreditation', keyFeatures: 'NAAC/NIRF status, compliance reports, audit observations', iconType: 'quality' },
          { module: 'Reports & Analytics', keyFeatures: 'Performance reports, custom analytics, data export', iconType: 'reports' },
          { module: 'Communication', keyFeatures: 'Official circulars, announcements, messaging', iconType: 'communication' },
        ],

        goal: 'To provide visionary leadership, ensure academic excellence, and drive the university towards growth and global recognition.',
      });
    }

    // 2. Seed Proposals matching counts in Image 1:
    // New Program Proposals: 8
    // Faculty Appointments: 5
    // Budget Proposals: 3
    // Policy / Regulation Amendments: 4
    // MoU / Collaboration Requests: 6
    const countProposals = await ViceChancellorProposal.countDocuments();
    if (countProposals === 0) {
      const defaultProposals = [
        // New Program Proposals (8)
        {
          proposalCode: 'ACU-VC-NPP-01',
          title: 'Establishment of School of Data Science & Artificial Intelligence',
          category: 'New Program Proposals',
          department: 'Faculty of Engineering & Computer Science',
          submittedBy: 'Dean of Engineering',
          urgency: 'High',
          budgetInvolved: '₹ 1.25 Cr',
          description: 'Multidisciplinary 4-year B.Tech and 2-year M.Tech in Applied Generative AI & Big Data Analytics.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Board of Studies Submission', actor: 'HOD Computer Science', role: 'HOD', action: 'Approved BoS draft', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-02',
          title: 'Post-Graduate Super-Specialty Fellowship in Interventional Cardiology',
          category: 'New Program Proposals',
          department: 'AIMS Hospital & Medical Sciences',
          submittedBy: 'Director, Heart Institute',
          urgency: 'High',
          budgetInvolved: 'Self-Funded',
          description: 'NMC recognized 2-year clinical fellowship with high-volume cath-lab exposure.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Medical Board Submission', actor: 'Director Cardiology', role: 'Chair', action: 'Recommended', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-03',
          title: 'Master of Public Health (MPH) in Epidemiology & Biostatistics',
          category: 'New Program Proposals',
          department: 'Department of Community Medicine',
          submittedBy: 'Dean of Medical Faculty',
          urgency: 'Normal',
          budgetInvolved: '₹ 45 Lakhs',
          description: 'Interdisciplinary program addressing public health surveillance and digital disease mapping.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Faculty Board', actor: 'Dean Medical', role: 'Dean', action: 'Submitted', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-04',
          title: 'Integrated Dual Degree B.Tech + MBA in Technology Management',
          category: 'New Program Proposals',
          department: 'Faculty of Management & Technology',
          submittedBy: 'Dean Academic Affairs',
          urgency: 'Normal',
          budgetInvolved: 'Nil',
          description: 'Fast-track 5-year integrated leadership program for engineering students.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Academic Council Committee', actor: 'Academic Dean', role: 'Dean', action: 'Drafted', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-05',
          title: 'Ph.D in Translational Oncology & Precision Medicine',
          category: 'New Program Proposals',
          department: 'Cancer Research Center',
          submittedBy: 'Dean of Research',
          urgency: 'High',
          budgetInvolved: '₹ 60 Lakhs Seed Grant',
          description: 'Targeted doctoral program supporting ICMR extramural funded projects.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Research Advisory Board', actor: 'Dean Research', role: 'Dean', action: 'Approved', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-06',
          title: 'B.Sc. in Medical Laboratory Technology & Clinical Chemistry',
          category: 'New Program Proposals',
          department: 'Allied Health Sciences Institute',
          submittedBy: 'Principal Allied Health',
          urgency: 'Normal',
          budgetInvolved: '₹ 25 Lakhs',
          description: 'Allied healthcare vocational curriculum aligning with National Skill Qualification Framework (NSQF).',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Curriculum Committee', actor: 'Principal', role: 'Principal', action: 'Submitted', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-07',
          title: 'Executive Diploma in Regulatory Affairs & Patent Litigation',
          category: 'New Program Proposals',
          department: 'Sri Adichunchanagiri College of Pharmacy',
          submittedBy: 'Dean Pharmacy',
          urgency: 'Normal',
          budgetInvolved: 'Self-Funded',
          description: 'Hybrid weekend certification for pharmaceutical industry executives and patent agents.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Pharmacy BoS', actor: 'Dean Pharmacy', role: 'Dean', action: 'Submitted', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-NPP-08',
          title: 'Post-Doctoral Clinical Fellowship in Reproductive Endocrinology',
          category: 'New Program Proposals',
          department: 'Department of OBG, AIMS',
          submittedBy: 'Head of OBG',
          urgency: 'Normal',
          budgetInvolved: 'Grant Supported',
          description: 'Advanced assisted reproductive technology (ART) and laparoscopic training.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Departmental Review', actor: 'HOD OBG', role: 'HOD', action: 'Submitted', timestamp: new Date() }],
        },

        // Faculty Appointments (5)
        {
          proposalCode: 'ACU-VC-FA-01',
          title: 'Appointment of Professor & Chair – Department of Neurosurgery',
          category: 'Faculty Appointments',
          department: 'Faculty of Medicine',
          submittedBy: 'Registrar & Statutory Selection Panel',
          urgency: 'High',
          budgetInvolved: 'UGC Apex Pay Scale',
          description: 'Empanelment and appointment of Dr. V. Sundaresan, MCh (AIIMS), with 22 years of cranial surgery experience.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Selection Panel', actor: 'Statutory Selection Committee', role: 'Panel', action: 'Recommended Candidate', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-FA-02',
          title: 'Recruitment of 4 Associate Professors in Artificial Intelligence & Machine Learning',
          category: 'Faculty Appointments',
          department: 'BGS Institute of Technology',
          submittedBy: 'Principal BGSIT',
          urgency: 'High',
          budgetInvolved: 'Level 13A Scale',
          description: 'Recruitment to meet AICTE faculty-student ratio for expanded intake in CSE/AI.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Engineering Selection Board', actor: 'Principal BGSIT', role: 'Principal', action: 'Submitted dossier', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-FA-03',
          title: 'Appointment of Professor of Pharmacognosy & Natural Products',
          category: 'Faculty Appointments',
          department: 'College of Pharmacy',
          submittedBy: 'Dean Pharmacy',
          urgency: 'Normal',
          budgetInvolved: 'UGC Scale',
          description: 'Subject expert recruitment to lead herbal drug development research grant.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Screening Committee', actor: 'Dean Pharmacy', role: 'Dean', action: 'Scrutinized', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-FA-04',
          title: 'Promotions under Career Advancement Scheme (CAS) for 12 Assistant Professors',
          category: 'Faculty Appointments',
          department: 'University-wide Faculties',
          submittedBy: 'University Scrutiny Committee',
          urgency: 'Normal',
          budgetInvolved: 'Band Pay Revision',
          description: 'Senior scale promotion after verification of research papers and student evaluations.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'CAS Committee', actor: 'Registrar', role: 'Registrar', action: 'Audited records', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-FA-05',
          title: 'Visiting Chair Professor Appointment in Genomics: Prof. David Meyer (Univ of Zurich)',
          category: 'Faculty Appointments',
          department: 'Central Research Laboratory',
          submittedBy: 'Dean Research',
          urgency: 'Normal',
          budgetInvolved: 'Honorary Fellowship',
          description: 'Distinguished international scholar appointment for annual lecture series and grant co-supervision.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Research Advisory Panel', actor: 'Director Research', role: 'Director', action: 'Recommended', timestamp: new Date() }],
        },

        // Budget Proposals (3)
        {
          proposalCode: 'ACU-VC-BP-01',
          title: 'FY 2025-26 Departmental Research Grant & Modernization Outlay',
          category: 'Budget Proposals',
          department: 'Finance Branch & Deanery of Research',
          submittedBy: 'Finance Officer',
          urgency: 'High',
          budgetInvolved: '₹ 8.50 Cr',
          description: 'University-wide laboratory upgradation and seed grant allocation across 52 departments.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Finance Committee', actor: 'Finance Officer', role: 'FO', action: 'Recommended budget draft', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-BP-02',
          title: 'Hostel Complex Expansion & Sustainable Green Water Treatment Facility',
          category: 'Budget Proposals',
          department: 'Estate & Works Section',
          submittedBy: 'Executive Engineer',
          urgency: 'Normal',
          budgetInvolved: '₹ 4.20 Cr',
          description: 'Construction of 400-bed student residence and 500 KLD tertiary wastewater recycling plant.',
          delegatedAuthority: 'Board of Governors / Syndicate',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Works Committee', actor: 'Chief Engineer', role: 'Engineer', action: 'Submitted estimate', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-BP-03',
          title: 'Enterprise Campus Wi-Fi 6 Upgrade & Cloud Cyber-Security Perimeter',
          category: 'Budget Proposals',
          department: 'IT Infrastructure Division',
          submittedBy: 'IT Director & Finance Officer',
          urgency: 'Normal',
          budgetInvolved: '₹ 1.80 Cr',
          description: 'High-density Wi-Fi 6 coverage for 24,560 students and SOC firewall licensing.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'IT Steering Group', actor: 'IT Head', role: 'Director', action: 'Submitted', timestamp: new Date() }],
        },

        // Policy / Regulation Amendments (4)
        {
          proposalCode: 'ACU-VC-PRA-01',
          title: 'Revised Academic Regulation for Choice-Based Credit System (CBCS) & Dual Degree Framework',
          category: 'Policy / Regulation Amendments',
          department: 'Office of Academic Affairs',
          submittedBy: 'Registrar & Dean Academic',
          urgency: 'High',
          budgetInvolved: 'Nil',
          description: 'Enables students to simultaneously earn dual degrees and transfer credits via Academic Bank of Credits (ABC).',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Academic Council', actor: 'Registrar', role: 'Registrar', action: 'Passed resolution', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-PRA-02',
          title: 'University Code of Ethics for Generative AI in Academic Submissions & Theses',
          category: 'Policy / Regulation Amendments',
          department: 'IQAC & Examination Branch',
          submittedBy: 'Director IQAC',
          urgency: 'High',
          budgetInvolved: 'Nil',
          description: 'Guidelines for permissible AI tool usage, mandatory citation standards, and automated integrity scanning.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'IQAC Executive Board', actor: 'IQAC Coordinator', role: 'Coordinator', action: 'Submitted', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-PRA-03',
          title: 'Revised Consultancy & Corporate Testing Revenue Sharing Guidelines',
          category: 'Policy / Regulation Amendments',
          department: 'Research & Consultancy Cell',
          submittedBy: 'Dean Research',
          urgency: 'Normal',
          budgetInvolved: 'Revenue Incentive',
          description: '70:30 incentive model for faculty securing corporate consultancy and external testing projects.',
          delegatedAuthority: 'Board of Governors / Syndicate',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Research Cell', actor: 'Dean Research', role: 'Dean', action: 'Formulated draft', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-PRA-04',
          title: 'Student Grievance Redressal & Anti-Ragging Regulatory Framework (2025 Revision)',
          category: 'Policy / Regulation Amendments',
          department: 'Office of Student Welfare',
          submittedBy: 'Dean Student Welfare',
          urgency: 'Normal',
          budgetInvolved: 'Nil',
          description: 'Incorporates statutory digital portal reporting, anonymous ombudsman, and strict disciplinary timelines.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Student Welfare Board', actor: 'Dean Student Welfare', role: 'Dean', action: 'Submitted', timestamp: new Date() }],
        },

        // MoU / Collaboration Requests (6)
        {
          proposalCode: 'ACU-VC-MOU-01',
          title: 'Joint Bio-Medical Research & Exchange Program with Monash University, Australia',
          category: 'MoU / Collaboration Requests',
          department: 'International Affairs & AIMS',
          submittedBy: 'Dean International Relations',
          urgency: 'High',
          budgetInvolved: 'Exchange Subsidized',
          description: 'Clinical student electives, joint supervision of immunology doctorates, and shared grant applications.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'International Relations', actor: 'Dean IR', role: 'Dean', action: 'Finalized MoU draft', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-MOU-02',
          title: 'Technology Incubation & Startup Accelerator Tie-up with Karnataka Innovation Society (KITS)',
          category: 'MoU / Collaboration Requests',
          department: 'Center for Innovation & Entrepreneurship',
          submittedBy: 'Incubation Director',
          urgency: 'Normal',
          budgetInvolved: '₹ 50 Lakhs Grant Access',
          description: 'Mentorship, seed capital access, and patent acceleration for university student and faculty ventures.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Incubation Cell', actor: 'Director Innovation', role: 'Director', action: 'Submitted agreement', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-MOU-03',
          title: 'Clinical Trial Site Agreement with AstraZeneca India Bio-Pharma',
          category: 'MoU / Collaboration Requests',
          department: 'Department of Pharmacology & Clinical Trials Unit',
          submittedBy: 'Director, Clinical Research',
          urgency: 'High',
          budgetInvolved: '₹ 1.8 Cr Industry Funded',
          description: 'Phase-III multicentric clinical evaluation of innovative cardioprotective therapeutics.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Institutional Ethics Committee', actor: 'Ethics Chair', role: 'Chair', action: 'Approved protocol', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-MOU-04',
          title: 'Campus Recruitment & Cyber-Security Skill Academy MoU with Cisco Systems',
          category: 'MoU / Collaboration Requests',
          department: 'Placement & Training Division',
          submittedBy: 'Head Placements',
          urgency: 'Normal',
          budgetInvolved: 'Corporate CSR Funded',
          description: 'Certification laboratory and priority hiring for 200 graduate engineers annually.',
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Placement Committee', actor: 'Head Placements', role: 'Head', action: 'Submitted MoU', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-MOU-05',
          title: 'Rural Healthcare Tele-Consultation Network with Indian Space Research Organisation (ISRO SATCOM)',
          category: 'MoU / Collaboration Requests',
          department: 'Telemedicine Division, AIMS',
          submittedBy: 'Medical Superintendent',
          urgency: 'Normal',
          budgetInvolved: 'National Mission',
          description: 'Satellite connected mobile health vans providing remote diagnosis in tribal and rural regions of Karnataka.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Telemedicine Section', actor: 'MS AIMS', role: 'MS', action: 'Submitted proposal', timestamp: new Date() }],
        },
        {
          proposalCode: 'ACU-VC-MOU-06',
          title: 'Academic Credit Transfer & Semester Abroad Agreement with Leeds Beckett University, UK',
          category: 'MoU / Collaboration Requests',
          department: 'Deanery of Academic Affairs',
          submittedBy: 'Registrar',
          urgency: 'Normal',
          budgetInvolved: 'Student Funded',
          description: 'One semester study abroad option for undergraduate students in engineering and business with full credit recognition.',
          delegatedAuthority: 'Requires Chancellor Assent',
          status: 'Pending VC Action',
          auditTrail: [{ stage: 'Academic Council', actor: 'Registrar', role: 'Registrar', action: 'Verified equivalence', timestamp: new Date() }],
        },
      ];

      await ViceChancellorProposal.insertMany(defaultProposals);
    }

    // 3. Seed Analytics (Image 2 & 3)
    const countAnalytics = await ViceChancellorAnalytics.countDocuments();
    if (countAnalytics === 0) {
      await ViceChancellorAnalytics.create({
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
      });
    }

    // 4. Seed Governance Records across all 17 navigation modules
    const countGov = await ViceChancellorGovernance.countDocuments();
    if (countGov === 0) {
      const defaultGov = [
        // Governance
        {
          section: 'governance',
          referenceCode: 'ACU-VC-GOV-01',
          title: 'University Executive Governance & Statutory Matrix 2025',
          department: 'Vice-Chancellor Secretariat',
          date: '10 Apr 2025',
          status: 'Active',
          summary: 'Defines executive powers, delegated authority thresholds, and inter-institutional coordination between constituent units.',
          metricOrValue: 'Apex Matrix',
        },
        // Academic Affairs
        {
          section: 'academic-affairs',
          referenceCode: 'ACU-VC-ACAD-01',
          title: 'Curriculum Harmonization & CBCS Implementation Audit',
          department: 'Deanery of Academic Affairs',
          date: '05 Apr 2025',
          status: 'Approved',
          summary: 'Quarterly review of syllabus updates, NEP 2020 compliance, and credit equivalence across all 12 faculties.',
          metricOrValue: '320 Programs',
        },
        // Examinations
        {
          section: 'examinations',
          referenceCode: 'ACU-VC-EXAM-01',
          title: 'Summer 2025 Examination Readiness & Digital Valuation Security',
          department: 'Office of the COE',
          date: '12 Apr 2025',
          status: 'Operational',
          summary: 'Question paper generation security protocols, CCTV surveillance in valuation centers, and automated mark entry.',
          metricOrValue: '24,560 Examinees',
        },
        // Research & Innovation
        {
          section: 'research-innovation',
          referenceCode: 'ACU-VC-RES-01',
          title: 'Extramural Research Grants & Patent Commercialization Index',
          department: 'Center for Research & Innovation',
          date: '15 Apr 2025',
          status: 'Active',
          summary: '120 active funded projects with total sanctioned extramural grant funding of ₹ 28.4 Crore.',
          metricOrValue: '120 Active Grants',
        },
        // Human Resources
        {
          section: 'human-resources',
          referenceCode: 'ACU-VC-HR-01',
          title: 'Faculty Cadre Review & Cadre Roster Audit 2025',
          department: 'Human Resources Division',
          date: '02 Apr 2025',
          status: 'Audited',
          summary: 'Audit of sanctioned faculty strength (1,820 active teaching staff) and reservation roster verification.',
          metricOrValue: '1,820 Faculty',
        },
        // Finance & Budget
        {
          section: 'finance-budget',
          referenceCode: 'ACU-VC-FIN-01',
          title: 'Consolidated Institutional Budget Utilization Report',
          department: 'Finance Branch',
          date: '08 Apr 2025',
          status: 'On Target (78%)',
          summary: 'Review of revenue collections, operational expenditure, capital budget utilization, and statutory audits.',
          metricOrValue: '₹ 310.2 Cr Spend',
        },
        // Planning & Development
        {
          section: 'planning-development',
          referenceCode: 'ACU-VC-PLAN-01',
          title: 'Institutional Development Plan (Vision 2030)',
          department: 'Planning & Development Directorate',
          date: '20 Mar 2025',
          status: 'In Progress',
          summary: 'Strategic 5-year roadmap for campus infrastructure expansion, research funding acceleration, and global QS rankings.',
          metricOrValue: 'Vision 2030',
        },
        // Student Affairs
        {
          section: 'student-affairs',
          referenceCode: 'ACU-VC-STUD-01',
          title: 'Student Welfare, Scholarships & Campus Placement Review',
          department: 'Deanery of Student Welfare',
          date: '01 Apr 2025',
          status: 'Active',
          summary: 'Disbursement of institutional merit-cum-means freeships to 1,240 students and campus placement season milestones.',
          metricOrValue: '1,240 Scholars',
        },
        // College & Affiliation
        {
          section: 'college-affiliation',
          referenceCode: 'ACU-VC-AFF-01',
          title: 'Annual Inspection & Affiliation Renewal Status Report',
          department: 'College Development Council (CDC)',
          date: '25 Mar 2025',
          status: 'Completed',
          summary: 'Statutory compliance verification of 14 constituent and affiliated professional colleges for academic year 2025-26.',
          metricOrValue: '14 Colleges',
        },
        // Quality & Accreditation
        {
          section: 'quality-accreditation',
          referenceCode: 'ACU-VC-QUAL-01',
          title: 'Multi-Campus NAAC, NBA & NIRF Readiness Assessment',
          department: 'Internal Quality Assurance Cell (IQAC)',
          date: '18 Apr 2025',
          status: 'Readiness: 92%',
          summary: 'Comprehensive quantitative and qualitative metrics dashboard preparing all campuses for apex national accreditations.',
          metricOrValue: '92% Prepared',
        },
        // Statutory Bodies & Meetings
        {
          section: 'statutory-meetings',
          referenceCode: 'ACU-VC-STAT-01',
          title: 'Syndicate & Executive Council Action Taken Reports (ATR)',
          department: 'Registrar Secretariat',
          date: '14 Apr 2025',
          status: 'Compiled',
          summary: 'Implementation status of resolutions approved in previous statutory council meetings.',
          metricOrValue: '3 Apex Councils',
        },
        // Approvals & Workflow
        {
          section: 'approvals-workflow',
          referenceCode: 'ACU-VC-APPR-01',
          title: 'Statutory Delegated Approvals & Electronic Signature Ledger',
          department: 'Vice-Chancellor Secretariat',
          date: 'Current',
          status: '26 Pending',
          summary: 'Real-time workflow register tracking proposal endorsements, decisions, and immutable cryptographic audit trails.',
          metricOrValue: '26 Actions',
        },
        // Reports & Analytics
        {
          section: 'reports-analytics',
          referenceCode: 'ACU-VC-REP-01',
          title: 'University Executive Performance & Enrollment Growth Dashboard',
          department: 'Data Analytics & Institutional Research',
          date: 'Current',
          status: 'Live Real-Time',
          summary: 'Real-time business intelligence monitoring student progression, departmental success indices, and faculty ratios.',
          metricOrValue: 'Live BI',
        },
        // Communication
        {
          section: 'communication',
          referenceCode: 'ACU-VC-COMM-01',
          title: 'Official Executive Circulars & Academic Notifications',
          department: 'VC Office Communication Desk',
          date: '16 Apr 2025',
          status: 'Broadcasted',
          summary: 'Official gazette circulars, semester commencement schedules, and faculty academic directives.',
          metricOrValue: '18 Circulars',
        },
        // Documents & Policies
        {
          section: 'documents-policies',
          referenceCode: 'ACU-VC-DOCS-01',
          title: 'Statutory Policies, Handbooks & Standard Operating Procedures',
          department: 'Legal & Statutes Cell',
          date: 'Current',
          status: 'Published',
          summary: 'Searchable compendium of university statutes, ordinances, faculty service rules, and research codes.',
          metricOrValue: '45 Handbooks',
        },
        // Settings & Role Access
        {
          section: 'settings',
          referenceCode: 'ACU-VC-SET-01',
          title: 'Enterprise Role-Based Access Control & Delegation Matrix',
          department: 'University ERP Technical Administration',
          date: 'Current',
          status: 'Secure',
          summary: 'Configuration of administrative clearance levels, approval delegation thresholds, and digital seal security.',
          metricOrValue: 'Enterprise RBAC',
        },
      ];

      await ViceChancellorGovernance.insertMany(defaultGov);
    }
  } catch (err) {
    console.error('[Vice Chancellor Service] Auto-seed error:', err.message);
  }
};

export const vicechancellorService = {
  // Get Comprehensive VC Dashboard Overview
  getOverview: async (academicYear = '2024 - 2025') => {
    await seedInitialDataIfEmpty();

    let overview = await ViceChancellorOverview.findOne({ academicYear }).lean();
    if (!overview) {
      overview = await ViceChancellorOverview.findOne().sort({ createdAt: -1 }).lean();
    }

    // Dynamic pending approvals counts by category from database
    const pendingCounts = await ViceChancellorProposal.aggregate([
      { $match: { status: 'Pending VC Action' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const pendingMap = {
      'New Program Proposals': 0,
      'Faculty Appointments': 0,
      'Budget Proposals': 0,
      'Policy / Regulation Amendments': 0,
      'MoU / Collaboration Requests': 0,
    };

    pendingCounts.forEach((p) => {
      if (pendingMap.hasOwnProperty(p._id)) {
        pendingMap[p._id] = p.count;
      }
    });

    const totalPending = Object.values(pendingMap).reduce((a, b) => a + b, 0);

    return {
      academicYear: overview?.academicYear || academicYear,
      viceChancellorName: overview?.viceChancellorName || 'Dr. R. Sharma',
      motto: overview?.motto || 'Committed to Academic Excellence, Research, Innovation and Holistic Development',
      totalStudents: overview?.totalStudents || 24560,
      totalStudentsGrowth: overview?.totalStudentsGrowth || '↑ 6.2%',
      totalFaculty: overview?.totalFaculty || 1820,
      totalFacultyGrowth: overview?.totalFacultyGrowth || '↑ 3.8%',
      departments: overview?.departments || 52,
      departmentsGrowth: overview?.departmentsGrowth || '↑ 2.0%',
      academicPrograms: overview?.academicPrograms || 320,
      academicProgramsGrowth: overview?.academicProgramsGrowth || '↑ 4.5%',
      studentDistribution: overview?.studentDistribution || { ug: 55, pg: 32, phd: 8, others: 5 },
      academicPerformance: overview?.academicPerformance || {
        ugPassCurrent: 87,
        ugPassPrevious: 83,
        pgPassCurrent: 92,
        pgPassPrevious: 88,
        phdCompletionCurrent: 76,
        phdCompletionPrevious: 70,
      },
      researchInnovation: overview?.researchInnovation || {
        activeProjects: 120,
        grantsReceived: 48,
        mousCollaborations: 36,
        publicationsLastYear: 245,
      },
      upcomingMeetings: overview?.upcomingMeetings || [],
      notifications: overview?.notifications || [],
      responsibilities: overview?.responsibilities || [],
      erpModulesAccess: overview?.erpModulesAccess || [],
      goal: overview?.goal || 'To provide visionary leadership, ensure academic excellence, and drive the university towards growth and global recognition.',
      pendingApprovals: {
        total: totalPending,
        breakdown: [
          { category: 'New Program Proposals', count: pendingMap['New Program Proposals'], iconType: 'document' },
          { category: 'Faculty Appointments', count: pendingMap['Faculty Appointments'], iconType: 'faculty' },
          { category: 'Budget Proposals', count: pendingMap['Budget Proposals'], iconType: 'budget' },
          { category: 'Policy / Regulation Amendments', count: pendingMap['Policy / Regulation Amendments'], iconType: 'policy' },
          { category: 'MoU / Collaboration Requests', count: pendingMap['MoU / Collaboration Requests'], iconType: 'handshake' },
        ],
      },
    };
  },

  // Get Proposals with Filtering
  getProposals: async ({ category, status, search }) => {
    await seedInitialDataIfEmpty();

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { proposalCode: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    const proposals = await ViceChancellorProposal.find(query).sort({ urgency: -1, createdAt: -1 }).lean();
    return proposals;
  },

  // Get Single Proposal
  getProposalById: async (id) => {
    await seedInitialDataIfEmpty();
    return await ViceChancellorProposal.findById(id).lean();
  },

  // Statutory Decision Workflow: Approve / Endorse for Chancellor / Reject / Return
  decideProposal: async (id, { decision, remarks = '', digitalSignatureId = '' }) => {
    const proposal = await ViceChancellorProposal.findById(id);
    if (!proposal) throw new Error(`Proposal with ID ${id} not found.`);

    let updatedStatus = 'Pending VC Action';
    let auditAction = '';

    if (decision === 'Approve') {
      updatedStatus = 'Approved';
      auditAction = 'Sanctioned under Delegated Vice-Chancellor Authority';
      proposal.vcDecision = {
        decision: 'Approve',
        remarks: remarks || 'Sanctioned under delegated executive powers.',
        decidedAt: new Date(),
        digitalSignatureId: digitalSignatureId || 'VC-ACU-DIGITAL-SIGN-' + Date.now().toString(36).toUpperCase(),
      };
    } else if (decision === 'Endorse for Chancellor') {
      updatedStatus = 'Endorsed for Chancellor Assent';
      auditAction = 'Endorsed & Forwarded for Chancellor Apex Assent';
      proposal.vcDecision = {
        decision: 'Endorse for Chancellor',
        remarks: remarks || 'Academic and statutory merit verified; placed before Chancellor for assent.',
        decidedAt: new Date(),
        digitalSignatureId: digitalSignatureId || 'VC-ACU-ENDORSE-SEAL-' + Date.now().toString(36).toUpperCase(),
      };
    } else if (decision === 'Reject') {
      updatedStatus = 'Rejected';
      auditAction = 'Rejected with Executive Observations';
      proposal.vcDecision = {
        decision: 'Reject',
        remarks: remarks || 'Declined with executive observations.',
        decidedAt: new Date(),
        digitalSignatureId: '',
      };
    } else if (decision === 'Return') {
      updatedStatus = 'Returned for Correction';
      auditAction = 'Sent for Revision / Corrections to Department or Registrar';
      proposal.vcDecision = {
        decision: 'Return',
        remarks: remarks || 'Returned for compliance rectifications.',
        decidedAt: new Date(),
        digitalSignatureId: '',
      };
    }

    proposal.status = updatedStatus;

    proposal.auditTrail.push({
      stage: 'Vice-Chancellor Review & Decision',
      actor: 'Prof. / Dr. Vice-Chancellor',
      role: 'Vice Chancellor',
      action: auditAction,
      timestamp: new Date(),
      remarks: remarks || auditAction,
    });

    await proposal.save();
    return proposal;
  },

  // Get Subcontent Governance Records
  getGovernanceRecords: async (section, search) => {
    await seedInitialDataIfEmpty();

    const query = {};
    if (section && section !== 'all') query.section = section;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { referenceCode: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    return await ViceChancellorGovernance.find(query).sort({ createdAt: -1 }).lean();
  },

  // Get Analytics (Images 2 & 3)
  getAnalytics: async (academicYear = '2024 - 2025') => {
    await seedInitialDataIfEmpty();

    let analytics = await ViceChancellorAnalytics.findOne({ academicYear }).lean();
    if (!analytics) {
      analytics = await ViceChancellorAnalytics.findOne().lean();
    }
    return analytics;
  },
};

export default vicechancellorService;
