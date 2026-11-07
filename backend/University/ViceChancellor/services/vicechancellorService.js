import { ViceChancellorProposal } from '../models/ViceChancellorProposal.js';
import { ViceChancellorOverview } from '../models/ViceChancellorOverview.js';
import { ViceChancellorGovernance } from '../models/ViceChancellorGovernance.js';
import { ViceChancellorAnalytics } from '../models/ViceChancellorAnalytics.js';

// Auto-seed Dynamic Data if Empty or needing 2026-2027 schema
const seedInitialDataIfEmpty = async () => {
  try {
    // 1. Seed or update Overview for 2026 - 2027
    const existingOverview = await ViceChancellorOverview.findOne({
      $or: [{ academicYear: '2026 – 2027' }, { academicYear: '2026 - 2027' }],
    });

    if (!existingOverview) {
      await ViceChancellorOverview.deleteMany({});
      await ViceChancellorOverview.create({
        academicYear: '2026 – 2027',
        viceChancellorName: 'Prof. (Dr.) Ramesh K.',
        roleTitle: 'Vice Chancellor',
        motto: 'Oversee • Lead • Approve • Monitor • Develop',

        // 8 KPI Summary Cards matching Mockup
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
          {
            id: 'meet-1',
            title: 'Executive Council Meeting',
            date: '15 Nov 2026',
            type: 'Executive Council',
            venue: 'Senate Chamber, Apex Tower',
            time: '11:00 AM',
          },
          {
            id: 'meet-2',
            title: 'Academic Council Meeting',
            date: '20 Nov 2026',
            type: 'Academic Council',
            venue: 'Council Hall, Knowledge Center',
            time: '02:30 PM',
          },
          {
            id: 'meet-3',
            title: 'Syndicate Meeting',
            date: '28 Nov 2026',
            type: 'Syndicate',
            venue: 'Boardroom 1, Central Secretariat',
            time: '10:30 AM',
          },
          {
            id: 'meet-4',
            title: 'Planning & Development Committee',
            date: '05 Dec 2026',
            type: 'Planning & Development',
            venue: 'Strategic Planning Center',
            time: '03:00 PM',
          },
        ],

        notifications: [
          {
            id: 'notif-1',
            message: 'Board of Governors meeting scheduled for 15 Nov 2026.',
            timeAgo: '1 hour ago',
            category: 'statutory',
            read: false,
          },
          {
            id: 'notif-2',
            message: '7 Faculty appointment selection files submitted for VC sanction.',
            timeAgo: '3 hours ago',
            category: 'recruitment',
            read: false,
          },
          {
            id: 'notif-3',
            message: 'Annual College Affiliation Inspection Reports ready for review.',
            timeAgo: '5 hours ago',
            category: 'affiliation',
            read: false,
          },
        ],

        // 10 Key Work & Responsibilities matching Part 2
        responsibilities: [
          {
            id: 'resp-1',
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
            id: 'resp-2',
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
            id: 'resp-3',
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
            id: 'resp-4',
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
            id: 'resp-5',
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
            id: 'resp-6',
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
            id: 'resp-7',
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
            id: 'resp-8',
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
            id: 'resp-9',
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
            id: 'resp-10',
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

        // 12 ERP Modules & Subcontents for Vice Chancellor matching Part 2
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
      });
    }

    // 2. Seed Proposals (37 total matching image counts)
    const countProposals = await ViceChancellorProposal.countDocuments();
    if (countProposals < 30) {
      await ViceChancellorProposal.deleteMany({});
      const defaultProposals = [];

      // 6 Program / Curriculum Proposals
      const progItems = [
        { code: 'PRG-2026-01', title: 'M.Tech in Artificial Intelligence & Robotics Curriculum', dept: 'Faculty of Engineering', budget: '₹ 1.85 Cr', authority: 'VC Final Authority', desc: 'Syllabus revised per IEEE/AICTE 2026 guidelines, approved by BoS.' },
        { code: 'PRG-2026-02', title: 'Ph.D. in Nanomedicine & Translational Therapeutics', dept: 'Faculty of Medicine & Allied Sciences', budget: '₹ 2.40 Cr', authority: 'VC Final Authority', desc: 'Interdisciplinary program partnering with Indian Council of Medical Research (ICMR).' },
        { code: 'PRG-2026-03', title: 'B.Sc. Data Science & Big Data Analytics (Honours)', dept: 'Dept of Computer Science', budget: '₹ 80 Lakhs', authority: 'VC Final Authority', desc: 'NEP 2020 four-year credit framework integration.' },
        { code: 'PRG-2026-04', title: 'Executive MBA in Healthcare & Hospital Management', dept: 'School of Management Studies', budget: 'Self-Financing', authority: 'VC Final Authority', desc: 'Weekend cohort designed for senior healthcare administrators.' },
        { code: 'PRG-2026-05', title: 'Integrated M.Sc. in Genomic Sciences & Bioinformatics', dept: 'Dept of Biotechnology', budget: '₹ 1.20 Cr', authority: 'VC Final Authority', desc: 'High-throughput sequencing lab curriculum approved by Academic Council committee.' },
        { code: 'PRG-2026-06', title: 'Diploma in Cyber Law & Digital Forensics', dept: 'Faculty of Law & Governance', budget: '₹ 35 Lakhs', authority: 'VC Final Authority', desc: 'Specialized certificate program with Karnataka Cyber Police Training Academy.' },
      ];
      progItems.forEach((p) => {
        defaultProposals.push({
          proposalCode: p.code,
          title: p.title,
          category: 'Program / Curriculum Proposals',
          department: p.dept,
          submittedBy: 'Dean / Board of Studies Chairman',
          submissionDate: new Date(Date.now() - Math.floor(Math.random() * 5 + 1) * 86400000),
          urgency: 'High',
          budgetInvolved: p.budget,
          description: p.desc,
          delegatedAuthority: p.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Board of Studies Review',
              actor: 'Prof. BoS Chairman',
              role: 'Board of Studies',
              action: 'Endorsed Curriculum & Forwarded to VC',
              timestamp: new Date(Date.now() - 4 * 86400000),
              remarks: 'Academic rigor verified under Statute 24(1).',
            },
            {
              stage: 'Registrar Scrutiny',
              actor: 'Registrar (Evaluation)',
              role: 'Registrar',
              action: 'Credit equivalence certified, placed before Vice Chancellor',
              timestamp: new Date(Date.now() - 2 * 86400000),
              remarks: 'All statutory compliances fulfilled.',
            },
          ],
        });
      });

      // 4 College Affiliation / Renewal Proposals
      const affilItems = [
        { code: 'AFF-2026-01', title: 'Annual Affiliation Renewal – BGS Institute of Technology', dept: 'College Development Council', budget: '₹ 12 Lakhs (Fee)', authority: 'VC Final Authority', desc: 'Local Inspection Committee (LIC) confirmed 100% faculty compliance.' },
        { code: 'AFF-2026-02', title: 'Permanent Affiliation & Intake Expansion – Sri Adichunchanagiri College of Pharmacy', dept: 'College Development Council', budget: '₹ 25 Lakhs (Fee)', authority: 'Board of Governors / Syndicate', desc: 'Intake enhancement from 100 to 120 seats in Pharm.D.' },
        { code: 'AFF-2026-03', title: 'New Affiliation Inspection Report – BGS College of Nursing', dept: 'Affiliation & Academic Wing', budget: '₹ 8 Lakhs (Fee)', authority: 'VC Final Authority', desc: 'Statutory compliance inspection by University Expert Panel completed.' },
        { code: 'AFF-2026-04', title: 'Provisional Affiliation for B.Sc. Forensic Sciences – City Campus', dept: 'College Development Council', budget: '₹ 10 Lakhs (Fee)', authority: 'VC Final Authority', desc: 'Laboratory infrastructure and faculty cadre norms certified.' },
      ];
      affilItems.forEach((a) => {
        defaultProposals.push({
          proposalCode: a.code,
          title: a.title,
          category: 'College Affiliation / Renewal',
          department: a.dept,
          submittedBy: 'Director, College Development Council (CDC)',
          submissionDate: new Date(Date.now() - 3 * 86400000),
          urgency: 'Normal',
          budgetInvolved: a.budget,
          description: a.desc,
          delegatedAuthority: a.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Local Inspection Committee (LIC)',
              actor: 'LIC Chairperson',
              role: 'Inspection Committee',
              action: 'Physical inspection completed; recommended for sanction',
              timestamp: new Date(Date.now() - 5 * 86400000),
              remarks: 'Infrastructure and faculty ratios meet statutory standards.',
            },
          ],
        });
      });

      // 7 Recruitment / Appointments Proposals
      const recItems = [
        { code: 'REC-2026-01', title: 'Professor & Head in Artificial Intelligence Selection Committee Report', dept: 'Central HR Directorate', budget: '₹ 32 Lakhs p.a.', authority: 'VC Final Authority', desc: 'Statutory Selection Committee ranked candidate recommended for sanction.' },
        { code: 'REC-2026-02', title: 'Dean of Faculty of Health & Allied Sciences Appointment', dept: 'Executive Governance Cell', budget: '₹ 38 Lakhs p.a.', authority: 'Requires Chancellor Assent', desc: 'Statutory search committee recommendation placed before VC for assent forwarding.' },
        { code: 'REC-2026-03', title: 'Associate Professors (3 Posts) in Pharmaceutical Chemistry', dept: 'Faculty of Pharmacy', budget: '₹ 64 Lakhs p.a.', authority: 'VC Final Authority', desc: 'Cadre reservation roster and API score benchmark certified by Registrar.' },
        { code: 'REC-2026-04', title: 'Finance Officer Statutory Appointment Panel', dept: 'Finance & Accounts', budget: '₹ 28 Lakhs p.a.', authority: 'Requires Chancellor Assent', desc: 'Statutory panel selection per University Act Section 14.' },
        { code: 'REC-2026-05', title: 'Career Advancement Scheme (CAS) Promotions – 14 Faculty Members', dept: 'Central HR Cell', budget: '₹ 45 Lakhs p.a.', authority: 'VC Final Authority', desc: 'UGC Regulations 2018 score validation and subject expert review completed.' },
        { code: 'REC-2026-06', title: 'Visiting Chair Professor in Ancient Indian Philosophy & Heritage', dept: 'Humanities & Culture Center', budget: '₹ 15 Lakhs p.a.', authority: 'VC Final Authority', desc: 'Endowment funded visiting professorship appointment file.' },
        { code: 'REC-2026-07', title: 'Chief Vigilance & Compliance Officer (Part-Time Deputation)', dept: 'Legal & Vigilance Cell', budget: '₹ 8 Lakhs p.a.', authority: 'VC Final Authority', desc: 'Institutional transparency cell statutory head recommendation.' },
      ];
      recItems.forEach((r) => {
        defaultProposals.push({
          proposalCode: r.code,
          title: r.title,
          category: 'Recruitment / Appointments',
          department: r.dept,
          submittedBy: 'Registrar & Chairman, Selection Committee',
          submissionDate: new Date(Date.now() - 2 * 86400000),
          urgency: 'High',
          budgetInvolved: r.budget,
          description: r.desc,
          delegatedAuthority: r.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Selection Committee Proceeding',
              actor: 'Statutory Committee Panel',
              role: 'Selection Committee',
              action: 'Interviews concluded and merit list finalized in sealed envelope',
              timestamp: new Date(Date.now() - 3 * 86400000),
              remarks: 'Selected per Karnataka State Universities Act statutes.',
            },
          ],
        });
      });

      // 5 Research & MoU Proposals
      const mouItems = [
        { code: 'RES-2026-01', title: 'International MoU – University of Oxford Collaborative Genomics Hub', dept: 'International Relations & Research', budget: '₹ 8.50 Cr (Grant)', authority: 'VC Final Authority', desc: 'Joint faculty exchange, doctoral research fellowships, and bio-specimen research.' },
        { code: 'RES-2026-02', title: 'National MoU – Indian Council of Medical Research (ICMR) Viral Vector Lab', dept: 'Dept of Microbiology', budget: '₹ 4.20 Cr (Grant)', authority: 'VC Final Authority', desc: 'Establishment of Level-3 Regional Viral Surveillance and Diagnostic Center.' },
        { code: 'RES-2026-03', title: 'Industry Collaboration with Siemens Healthineers for AI Imaging Incubator', dept: 'Biomedical Engineering', budget: '₹ 2.80 Cr', authority: 'VC Final Authority', desc: 'Technology transfer and student internship sponsorship program.' },
        { code: 'RES-2026-04', title: 'DST-SERB Core Research Grant – Quantum Computing in Drug Discovery', dept: 'Computational Biology', budget: '₹ 1.65 Cr (Grant)', authority: 'VC Final Authority', desc: 'Grant sanction and institutional co-funding approval.' },
        { code: 'RES-2026-05', title: 'MoU with ISRO (NRSC) for Satellite Environmental Monitoring Center', dept: 'Earth & Environmental Sciences', budget: '₹ 3.10 Cr', authority: 'VC Final Authority', desc: 'Geospatial mapping and regional climate analysis research cluster.' },
      ];
      mouItems.forEach((m) => {
        defaultProposals.push({
          proposalCode: m.code,
          title: m.title,
          category: 'Research & MoU Proposals',
          department: m.dept,
          submittedBy: 'Dean of Research & Innovation',
          submissionDate: new Date(Date.now() - 4 * 86400000),
          urgency: 'Normal',
          budgetInvolved: m.budget,
          description: m.desc,
          delegatedAuthority: m.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Research Advisory Board',
              actor: 'Director of Research',
              role: 'Research Board',
              action: 'Intellectual Property & Legal Terms approved',
              timestamp: new Date(Date.now() - 5 * 86400000),
              remarks: 'MoU drafted adhering to Ministry of External Affairs and UGC international norms.',
            },
          ],
        });
      });

      // 4 Budget / Major Expenditure Proposals
      const budItems = [
        { code: 'BUD-2026-01', title: 'FY 2026-27 Revised Central Library Digital Knowledge Repository Budget', dept: 'Central Library Directorate', budget: '₹ 4.80 Cr', authority: 'VC Final Authority', desc: 'Consortium access for IEEE, Nature, ScienceDirect and Elsevier databases.' },
        { code: 'BUD-2026-02', title: 'Phase-2 Rooftop Solar Grid Expansion across North & City Campuses', dept: 'Estate & Infrastructure Wing', budget: '₹ 6.40 Cr', authority: 'Board of Governors / Syndicate', desc: 'Green Campus 1.2 MW solar project with 60% state subsidy allocation.' },
        { code: 'BUD-2026-03', title: 'Central High-Performance Computing (HPC) Supercomputing Cluster Purchase', dept: 'IT Infrastructure Directorate', budget: '₹ 8.20 Cr', authority: 'VC Final Authority', desc: 'Tender committee scrutinized e-procurement bid per KTPP Act.' },
        { code: 'BUD-2026-04', title: 'Annual Student Sports & Inter-University Athletic Championship Allocation', dept: 'Directorate of Physical Education', budget: '₹ 1.10 Cr', authority: 'VC Final Authority', desc: 'Funding for national sports meet host facilities.' },
      ];
      budItems.forEach((b) => {
        defaultProposals.push({
          proposalCode: b.code,
          title: b.title,
          category: 'Budget / Major Expenditure',
          department: b.dept,
          submittedBy: 'Finance Officer & Comptroller',
          submissionDate: new Date(Date.now() - 1 * 86400000),
          urgency: 'High',
          budgetInvolved: b.budget,
          description: b.desc,
          delegatedAuthority: b.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Finance Committee Scrutiny',
              actor: 'Finance Officer',
              role: 'Finance Officer',
              action: 'Budget head verified and fund allocation certified',
              timestamp: new Date(Date.now() - 2 * 86400000),
              remarks: 'Complies with University Financial Code rules.',
            },
          ],
        });
      });

      // 3 Policy / Regulation Amendments
      const polItems = [
        { code: 'POL-2026-01', title: 'Amendment to University Examination & Revaluation Ordinance (Rule 18.4)', dept: 'Office of Controller of Examinations', budget: 'Nil', authority: 'Requires Chancellor Assent', desc: 'Introduction of AI-assisted double evaluation and instant online marksheet verification.' },
        { code: 'POL-2026-02', title: 'Comprehensive Ph.D. Regulations Revision aligning with UGC 2026 Gazette', dept: 'Academic Governance Council', budget: 'Nil', authority: 'VC Final Authority', desc: 'Mandatory publication requirements and coursework credit framework update.' },
        { code: 'POL-2026-03', title: 'University Intellectual Property (IPR) & Technology Commercialization Policy', dept: 'Innovation & Incubation Center', budget: 'Nil', authority: 'Requires Chancellor Assent', desc: 'Royalty-sharing framework between inventors, student entrepreneurs and the university.' },
      ];
      polItems.forEach((pl) => {
        defaultProposals.push({
          proposalCode: pl.code,
          title: pl.title,
          category: 'Policy / Regulation Amendments',
          department: pl.dept,
          submittedBy: 'Registrar & Chairman, Statutes Drafting Panel',
          submissionDate: new Date(Date.now() - 6 * 86400000),
          urgency: 'High',
          budgetInvolved: pl.budget,
          description: pl.desc,
          delegatedAuthority: pl.authority,
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Academic Council Resolution',
              actor: 'Academic Council Secretary',
              role: 'Academic Council',
              action: 'Passed unanimously in meeting dated 20 Sep 2026',
              timestamp: new Date(Date.now() - 7 * 86400000),
              remarks: 'Placed before Vice Chancellor for executive review and Chancellor assent forwarding.',
            },
          ],
        });
      });

      // 8 General Statutory & Grievance Proposals to make total = 37
      for (let i = 1; i <= 8; i++) {
        defaultProposals.push({
          proposalCode: `STAT-2026-0${i}`,
          title: `Statutory Committee Appeal & Grievance Case #${1040 + i}`,
          category: 'Statutory Appeal / Grievance',
          department: i % 2 === 0 ? 'Faculty of Allied Health' : 'Student Welfare Board',
          submittedBy: 'Statutory Grievance Redressal Committee',
          submissionDate: new Date(Date.now() - i * 86400000),
          urgency: 'Normal',
          budgetInvolved: 'Nil',
          description: `Statutory inquiry report and recommendations for Vice-Chancellor final adjudication under Section 22 of University Act.`,
          delegatedAuthority: 'VC Final Authority',
          status: 'Pending VC Action',
          auditTrail: [
            {
              stage: 'Inquiry Committee Hearing',
              actor: 'Ombudsman / Committee Convener',
              role: 'Grievance Redressal Cell',
              action: 'Hearing concluded, findings submitted to Vice Chancellor',
              timestamp: new Date(Date.now() - (i + 1) * 86400000),
              remarks: 'Adjudication per statutory principles of natural justice.',
            },
          ],
        });
      }

      await ViceChancellorProposal.insertMany(defaultProposals);
    }

    // 3. Seed Governance Records if empty
    const countGov = await ViceChancellorGovernance.countDocuments();
    if (countGov === 0) {
      const defaultGov = [
        { section: 'governance', referenceCode: 'GOV-ORD-2026-01', title: 'Statutory Syndicate Resolution No. 42 on Institutional Decentralization', department: 'Central Secretariat', date: '02 Nov 2026', status: 'Gazetted', summary: 'Delegation of administrative and financial sanctions to Campus Directors and Deans.', leadOfficer: 'Registrar', metricOrValue: 'Enacted' },
        { section: 'academic-affairs', referenceCode: 'ACAD-BOS-2026-14', title: 'Curriculum Harmonization for Multidisciplinary Major/Minor Degrees', department: 'Academic Section', date: '28 Oct 2026', status: 'Approved', summary: 'Implementation of National Higher Education Qualifications Framework (NHEQF).', leadOfficer: 'Dean (Academic Affairs)', metricOrValue: '320 Programs' },
        { section: 'examinations', referenceCode: 'EXAM-GAZ-2026-09', title: 'End Semester Valuation & Results Gazette Publication Notice', department: 'Evaluation Wing', date: '25 Oct 2026', status: 'Approved', summary: 'Results announced for 24,560 students within 14 days of examination completion.', leadOfficer: 'Controller of Examinations', metricOrValue: '91.8% Overall Pass' },
        { section: 'human-resources', referenceCode: 'HR-CAS-2026-03', title: 'Executive Sanction of Faculty Career Advancement Scheme (CAS) Stage 4 to 5', department: 'HR Cell', date: '22 Oct 2026', status: 'Approved', summary: '18 Associate Professors promoted to Professor Cadre following external screening.', leadOfficer: 'Director (HR)', metricOrValue: '18 Promoted' },
        { section: 'finance-budget', referenceCode: 'FIN-SAN-2026-88', title: 'Quarterly Financial Sanction & Capital Expenditure Utilization Audit', department: 'Finance Directorate', date: '18 Oct 2026', status: 'Approved', summary: 'Audit confirmed zero deviations in FY 2026-27 Q2 expenditure.', leadOfficer: 'Finance Officer', metricOrValue: '₹ 286.40 Cr Spent' },
        { section: 'college-affiliation', referenceCode: 'CDC-AFF-2026-12', title: 'Annual Affiliation Inspection Report for 186 Constituent & Affiliated Colleges', department: 'College Development Council', date: '15 Oct 2026', status: 'Approved', summary: 'All 186 affiliated colleges inspected; 182 compliant, 4 issued improvement notices.', leadOfficer: 'Director (CDC)', metricOrValue: '186 Colleges' },
      ];
      await ViceChancellorGovernance.insertMany(defaultGov);
    }

    // 4. Seed Analytics if empty
    const countAnalytics = await ViceChancellorAnalytics.countDocuments();
    if (countAnalytics === 0) {
      await ViceChancellorAnalytics.create({
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
      });
    }
  } catch (err) {
    console.error('[Vice Chancellor Service] Auto-seed error:', err.message);
  }
};

export const vicechancellorService = {
  // Get Comprehensive VC Dashboard Overview
  getOverview: async (academicYear = '2026 – 2027') => {
    await seedInitialDataIfEmpty();

    let overview = await ViceChancellorOverview.findOne({
      $or: [{ academicYear }, { academicYear: '2026 – 2027' }, { academicYear: '2026 - 2027' }],
    }).lean();

    if (!overview) {
      overview = await ViceChancellorOverview.findOne().sort({ createdAt: -1 }).lean();
    }

    // Dynamic pending approvals counts by category from database
    const pendingCounts = await ViceChancellorProposal.aggregate([
      { $match: { status: 'Pending VC Action' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const pendingMap = {
      'Program / Curriculum Proposals': 0,
      'College Affiliation / Renewal': 0,
      'Recruitment / Appointments': 0,
      'Research & MoU Proposals': 0,
      'Budget / Major Expenditure': 0,
      'Policy / Regulation Amendments': 0,
    };

    let totalPendingInDb = 0;
    pendingCounts.forEach((p) => {
      totalPendingInDb += p.count;
      if (pendingMap.hasOwnProperty(p._id)) {
        pendingMap[p._id] = p.count;
      }
    });

    return {
      academicYear: overview?.academicYear || '2026 – 2027',
      viceChancellorName: overview?.viceChancellorName || 'Prof. (Dr.) Ramesh K.',
      roleTitle: overview?.roleTitle || 'Vice Chancellor',
      motto: overview?.motto || 'Oversee • Lead • Approve • Monitor • Develop',

      // 8 KPI Summary Cards matching Mockup
      totalStudents: overview?.totalStudents || 24560,
      totalStudentsGrowth: overview?.totalStudentsGrowth || '↑ 6.2%',
      totalFaculty: overview?.totalFaculty || 1820,
      totalFacultyGrowth: overview?.totalFacultyGrowth || '↑ 3.8%',
      departments: overview?.departments || 52,
      academicPrograms: overview?.academicPrograms || 320,
      academicProgramsBreakdown: overview?.academicProgramsBreakdown || '(UG 198 | PG 92 | PhD 30)',
      affiliatedColleges: overview?.affiliatedColleges || 186,
      researchProjects: overview?.researchProjects || 420,
      researchFunding: overview?.researchFunding || '(₹ 86.4 Cr)',
      activeMous: overview?.activeMous || 68,
      mousBreakdown: overview?.mousBreakdown || '(National 42 | International 26)',
      pendingApprovalsCount: totalPendingInDb || overview?.pendingApprovalsCount || 37,

      studentDistribution: overview?.studentDistribution || { ug: 55, pg: 32, phd: 8, others: 5 },

      financeOverview: overview?.financeOverview || {
        fiscalYear: 'FY 2026–27',
        annualBudget: '₹ 520.00 Cr',
        expenditureYtd: '₹ 286.40 Cr (55.1%)',
        committed: '₹ 112.30 Cr (21.6%)',
        balance: '₹ 121.30 Cr (23.3%)',
      },

      upcomingMeetings: overview?.upcomingMeetings || [],
      notifications: overview?.notifications || [],
      responsibilities: overview?.responsibilities || [],
      erpModulesAccess: overview?.erpModulesAccess || [],
      reportsList: overview?.reportsList || [],
      importantComponents: overview?.importantComponents || [],
      goal: overview?.goal || 'Ensure academic excellence, research innovation, good governance, financial sustainability, regulatory compliance and holistic development of the university.',

      // 6 Key Approvals & Pending Actions
      pendingApprovals: {
        total: totalPendingInDb || 37,
        breakdown: [
          { category: 'Program / Curriculum Proposals', count: pendingMap['Program / Curriculum Proposals'] || 6, iconType: 'program' },
          { category: 'College Affiliation / Renewal', count: pendingMap['College Affiliation / Renewal'] || 4, iconType: 'affiliation' },
          { category: 'Recruitment / Appointments', count: pendingMap['Recruitment / Appointments'] || 7, iconType: 'recruitment' },
          { category: 'Research & MoU Proposals', count: pendingMap['Research & MoU Proposals'] || 5, iconType: 'research' },
          { category: 'Budget / Major Expenditure', count: pendingMap['Budget / Major Expenditure'] || 4, iconType: 'budget' },
          { category: 'Policy / Regulation Amendments', count: pendingMap['Policy / Regulation Amendments'] || 3, iconType: 'policy' },
        ],
      },
    };
  },

  // Get Proposals with Filtering
  getProposals: async ({ category, status, search }) => {
    await seedInitialDataIfEmpty();

    const query = {};
    if (category && category !== 'All') {
      // Map simplified filters
      if (category === 'program') query.category = 'Program / Curriculum Proposals';
      else if (category === 'affiliation') query.category = 'College Affiliation / Renewal';
      else if (category === 'recruitment') query.category = 'Recruitment / Appointments';
      else if (category === 'research') query.category = 'Research & MoU Proposals';
      else if (category === 'budget') query.category = 'Budget / Major Expenditure';
      else if (category === 'policy') query.category = 'Policy / Regulation Amendments';
      else query.category = category;
    }
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

  // Statutory Delegated Authority Decision Workflow: Approve / Endorse for Chancellor / Reject / Return
  decideProposal: async (id, { decision, remarks = '', digitalSignatureId = '' }) => {
    const proposal = await ViceChancellorProposal.findById(id);
    if (!proposal) throw new Error(`Proposal with ID ${id} not found.`);

    // Enforce Statutory Delegated Authority Check:
    // If a proposal strictly requires Chancellor Assent, the VC cannot issue a final order, but must endorse for Chancellor assent
    if (proposal.delegatedAuthority === 'Requires Chancellor Assent' && decision === 'Approve') {
      // In accordance with statutory rules, mark as Endorsed for Chancellor Assent
      decision = 'Endorse for Chancellor';
    }

    let updatedStatus = 'Pending VC Action';
    let auditAction = '';
    const timestamp = new Date();
    const generatedSig =
      digitalSignatureId ||
      `VC-DS-ACU-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    if (decision === 'Approve') {
      updatedStatus = 'Approved';
      auditAction = 'Sanctioned under Delegated Vice-Chancellor Statutory Authority (Statute 14(2))';
      proposal.vcDecision = {
        decision: 'Approve',
        remarks: remarks || 'Sanctioned under delegated executive and academic powers.',
        decidedAt: timestamp,
        digitalSignatureId: generatedSig,
        delegatedClause: 'Section 14(2) of Karnataka State Universities Act',
      };
    } else if (decision === 'Endorse for Chancellor') {
      updatedStatus = 'Endorsed for Chancellor Assent';
      auditAction = 'Statutory Merit Verified; Endorsed & Placed Before Chancellor for Apex Assent';
      proposal.vcDecision = {
        decision: 'Endorse for Chancellor',
        remarks: remarks || 'Statutory review concluded; recommended for Chancellor apex assent per Statute 12(4).',
        decidedAt: timestamp,
        digitalSignatureId: generatedSig,
        delegatedClause: 'Section 12(4) of University Act (Chancellor Apex Jurisdiction)',
      };
    } else if (decision === 'Reject') {
      updatedStatus = 'Rejected';
      auditAction = 'Declined with Vice-Chancellor Executive Observations';
      proposal.vcDecision = {
        decision: 'Reject',
        remarks: remarks || 'Declined per executive observations and regulatory non-alignment.',
        decidedAt: timestamp,
        digitalSignatureId: generatedSig,
        delegatedClause: 'Section 14(3) Executive Discretion',
      };
    } else if (decision === 'Return') {
      updatedStatus = 'Returned for Correction';
      auditAction = 'Returned to Originating Department / Registrar for Compliance Rectification';
      proposal.vcDecision = {
        decision: 'Return',
        remarks: remarks || 'Returned for necessary statutory rectifications and documentation.',
        decidedAt: timestamp,
        digitalSignatureId: generatedSig,
        delegatedClause: 'Statutory Review & Remediation Order',
      };
    }

    proposal.status = updatedStatus;

    // Append Immutable Audit Trail Entry
    proposal.auditTrail.push({
      stage: 'Vice-Chancellor Review & Decision',
      actor: 'Prof. (Dr.) Ramesh K.',
      role: 'Vice Chancellor',
      action: auditAction,
      timestamp: timestamp,
      remarks: remarks || auditAction,
      digitalSignatureId: generatedSig,
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
  getAnalytics: async (academicYear = '2026 – 2027') => {
    await seedInitialDataIfEmpty();

    let analytics = await ViceChancellorAnalytics.findOne({
      $or: [{ academicYear }, { academicYear: '2026 – 2027' }, { academicYear: '2026 - 2027' }],
    }).lean();

    if (!analytics) {
      analytics = await ViceChancellorAnalytics.findOne().lean();
    }
    return analytics;
  },
};

export default vicechancellorService;