import { ChancellorProposal } from '../models/ChancellorProposal.js';
import { ChancellorOverview } from '../models/ChancellorOverview.js';
import { ChancellorGovernance } from '../models/ChancellorGovernance.js';
import { ChancellorAdmsMetrics } from '../models/ChancellorAdmsMetrics.js';

// Auto-seed Initial Dynamic Data if Collections are Empty
const seedInitialDataIfEmpty = async () => {
  try {
    // 1. Seed Overview
    const overviewCount = await ChancellorOverview.countDocuments();
    if (overviewCount === 0) {
      await ChancellorOverview.create({
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
            venue: 'Senate Chamber, ACU Administrative Block',
            type: 'Executive Council',
            agendaCount: 9,
            status: 'Scheduled',
          },
          {
            id: 'meet-2',
            title: 'Academic Council Meeting',
            date: '20 Nov 2026',
            time: '02:00 PM',
            venue: 'Council Hall, ACU Knowledge Center',
            type: 'Academic Council',
            agendaCount: 14,
            status: 'Scheduled',
          },
          {
            id: 'meet-3',
            title: 'Syndicate Meeting',
            date: '28 Nov 2026',
            time: '11:00 AM',
            venue: 'Apex Boardroom, ACU Central Tower',
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
      });
    }

    // 2. Seed Proposals matching the counts in Image 1:
    // New Program Proposals: 5
    // Policy / Regulation Amendments: 3
    // Major Expenditure Approvals: 4
    // MoU / Collaboration Requests: 6
    // Appointment / Promotion Cases: 7
    const proposalCount = await ChancellorProposal.countDocuments();
    if (proposalCount === 0) {
      const defaultProposals = [
        // Category 1: New Program Proposals (5)
        {
          proposalCode: 'ACU/ACAD/2026/011',
          title: 'Establishment of M.Tech in Healthcare AI & Robotic Surgery Systems',
          category: 'New Program Proposals',
          department: 'Faculty of Engineering & Health Informatics',
          submittedBy: 'Dr. Ramesh B., Dean Engineering',
          urgency: 'High',
          budgetInvolved: '₹ 85,00,000 (Lab Setup)',
          description:
            'Proposal to introduce 2-year super-specialty post-graduate curriculum in medical robotics and healthcare artificial intelligence in collaboration with Adichunchanagiri Institute of Medical Sciences (AIMS).',
          supportingDocs: ['curriculum_syllabus_v1.pdf', 'bos_minutes_oct26.pdf', 'infrastructure_readiness.pdf'],
          registrarVerification: {
            status: 'Verified & Recommended',
            verifiedBy: 'Dr. C. K. Subbaraya, Registrar',
            date: new Date('2026-10-28'),
            remarks: 'AICTE and university statutory norms verified. Academic Council recommendation on record.',
          },
          vcRecommendation: {
            status: 'Endorsed for Chancellor Action',
            endorsedBy: 'Prof. M. A. Shekar, Vice-Chancellor',
            date: new Date('2026-11-02'),
            remarks: 'High strategic potential for university NIRF and medical-engineering interdisciplinary excellence.',
          },
          status: 'Pending Chancellor Action',
          auditTrail: [
            {
              stage: 'Department Submission',
              actor: 'Dr. Ramesh B., Dean Engineering',
              role: 'Dean / Proponent',
              action: 'Submitted proposal with BoS recommendations',
              timestamp: new Date('2026-10-24'),
              remarks: 'Proposal formulated following industry Advisory Board meeting.',
            },
            {
              stage: 'Registrar Scrutiny',
              actor: 'Dr. C. K. Subbaraya',
              role: 'Registrar',
              action: 'Scrutinized & Recommended',
              timestamp: new Date('2026-10-28'),
              remarks: 'All statutory affiliation criteria fulfilled.',
            },
            {
              stage: 'Vice-Chancellor Endorsement',
              actor: 'Prof. M. A. Shekar',
              role: 'Vice-Chancellor',
              action: 'Endorsed for Chancellor Apex Action',
              timestamp: new Date('2026-11-02'),
              remarks: 'Recommended for Chancellor final assent and gazette notification.',
            },
          ],
        },
        {
          proposalCode: 'ACU/ACAD/2026/012',
          title: 'M.Sc. in Genomic Sciences & Molecular Diagnostics Program',
          category: 'New Program Proposals',
          department: 'Department of Biochemistry, AIMS',
          submittedBy: 'Prof. Anitha S., Head of Biochemistry',
          urgency: 'Normal',
          budgetInvolved: '₹ 45,00,000',
          description: 'Introduction of specialized M.Sc curriculum with DST-FIST lab integration.',
          supportingDocs: ['bos_resolution_biochem.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Department Submission', actor: 'Prof. Anitha S.', role: 'HOD', action: 'Submitted', timestamp: new Date('2026-10-25') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar Office', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-29') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-03') },
          ],
        },
        {
          proposalCode: 'ACU/ACAD/2026/013',
          title: 'Integrated Ph.D. in Nanotechnology & Drug Delivery',
          category: 'New Program Proposals',
          department: 'Faculty of Pharmacy',
          submittedBy: 'Dr. Prakash G., Dean Pharmacy',
          urgency: 'Normal',
          budgetInvolved: '₹ 30,00,000',
          description: 'Inter-institutional integrated doctoral program with CSIR laboratory fellowship.',
          supportingDocs: ['phd_regulations_draft.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Department Submission', actor: 'Dr. Prakash G.', role: 'Dean', action: 'Submitted', timestamp: new Date('2026-10-26') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-30') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-04') },
          ],
        },
        {
          proposalCode: 'ACU/ACAD/2026/014',
          title: 'Executive MBA in Hospital Governance & Healthcare Analytics',
          category: 'New Program Proposals',
          department: 'ACU Department of Management Studies',
          submittedBy: 'Dr. Naveen Kumar, Director MBA',
          urgency: 'Normal',
          budgetInvolved: 'Self-sustaining',
          description: 'Weekend executive masters degree for practicing doctors, administrators, and healthcare executives.',
          supportingDocs: ['emba_brochure_bos.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Department Submission', actor: 'Dr. Naveen Kumar', role: 'Director', action: 'Submitted', timestamp: new Date('2026-10-27') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar Office', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-31') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-05') },
          ],
        },
        {
          proposalCode: 'ACU/ACAD/2026/015',
          title: 'Post-Basic B.Sc. in Critical Care & Emergency Nursing',
          category: 'New Program Proposals',
          department: 'Adichunchanagiri College of Nursing',
          submittedBy: 'Prof. Marykutty T., Principal Nursing',
          urgency: 'High',
          budgetInvolved: '₹ 22,00,000',
          description: 'Specialty nursing education in emergency resuscitation, ICU trauma management and clinical ventilation.',
          supportingDocs: ['inc_compliance_report.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Department Submission', actor: 'Prof. Marykutty T.', role: 'Principal', action: 'Submitted', timestamp: new Date('2026-10-28') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar Office', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-11-01') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-05') },
          ],
        },

        // Category 2: Policy / Regulation Amendments (3)
        {
          proposalCode: 'ACU/POL/2026/001',
          title: 'University Statute Amendment: Credit Transfer Framework (NEP 2020 Compliance)',
          category: 'Policy / Regulation Amendments',
          department: 'Academic Council Secretariat',
          submittedBy: 'Dr. C. K. Subbaraya, Registrar',
          urgency: 'Urgent',
          budgetInvolved: 'Nil',
          description:
            'Comprehensive statutory amendment to enable National Academic Depository (NAD) DigiLocker credit bank and multiple entry-exit pathways across constituent colleges.',
          supportingDocs: ['statute_amendment_gazette_draft.pdf', 'academic_council_minutes.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Academic Council Drafting', actor: 'Academic Council', role: 'Council', action: 'Formulated amendment draft', timestamp: new Date('2026-10-20') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Vetted by University Legal Cell', timestamp: new Date('2026-10-26') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Placed before Chancellor', timestamp: new Date('2026-10-31') },
          ],
        },
        {
          proposalCode: 'ACU/POL/2026/002',
          title: 'Intellectual Property, Patent Monetization & Incubation Policy 2026',
          category: 'Policy / Regulation Amendments',
          department: 'Center for Research & Innovation',
          submittedBy: 'Prof. Shivashankar M., Director Research',
          urgency: 'High',
          budgetInvolved: '₹ 15,00,000 Seed Fund',
          description:
            'New policy guidelines for faculty-student startup spin-offs, patent royalty revenue sharing (60:40 formula), and equity holding by university incubation hub.',
          supportingDocs: ['ipr_policy_2026_draft.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Research Cell Formulation', actor: 'Director Research', role: 'Director', action: 'Submitted', timestamp: new Date('2026-10-22') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Reviewed with Finance Officer', timestamp: new Date('2026-10-27') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Recommended for approval', timestamp: new Date('2026-11-01') },
          ],
        },
        {
          proposalCode: 'ACU/POL/2026/003',
          title: 'Faculty Research Grant & International Travel Grant Regulations',
          category: 'Policy / Regulation Amendments',
          department: 'Deanery of Research',
          submittedBy: 'Dr. C. K. Subbaraya, Registrar',
          urgency: 'Normal',
          budgetInvolved: '₹ 50,00,000 Annual Corpus',
          description: 'Updated criteria for university seed research grants and travel subsidies for SCOPUS indexed conferences.',
          supportingDocs: ['travel_grant_amendment.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Deanery Submission', actor: 'Director Research', role: 'Director', action: 'Submitted', timestamp: new Date('2026-10-23') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Scrutinized', timestamp: new Date('2026-10-28') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-02') },
          ],
        },

        // Category 3: Major Expenditure Approvals (4)
        {
          proposalCode: 'ACU/FIN/2026/088',
          title: 'Phase-II Central Advanced Research Laboratory: Genomic Sequencing & Mass Spectrometry Infrastructure',
          category: 'Major Expenditure Approvals',
          department: 'Central University Research Facility',
          submittedBy: 'Finance Officer & Director Research',
          urgency: 'High',
          budgetInvolved: '₹ 4,85,00,000',
          description:
            'Turnkey procurement of Next-Generation Sequencing (NGS) platforms, high-resolution triple quadrupole mass spectrometers, and cleanroom bio-safety Level 3 infrastructure.',
          supportingDocs: ['tender_evaluation_report.pdf', 'finance_committee_minutes.pdf', 'equipment_specs.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Purchase Committee', actor: 'Central Purchase Committee', role: 'Committee', action: 'Technical tender evaluation completed', timestamp: new Date('2026-10-15') },
            { stage: 'Finance Committee', actor: 'Finance Officer', role: 'FO', action: 'Budget allocation verified against state/university grant', timestamp: new Date('2026-10-22') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Syndicate resolution passed; placed for Chancellor assent', timestamp: new Date('2026-10-30') },
          ],
        },
        {
          proposalCode: 'ACU/FIN/2026/089',
          title: 'Smart Campus 1.5 MW Rooftop Solar Photovoltaic Grid & Energy Storage',
          category: 'Major Expenditure Approvals',
          department: 'Estate & Engineering Division',
          submittedBy: 'Executive Engineer & Finance Officer',
          urgency: 'Normal',
          budgetInvolved: '₹ 3,20,00,000',
          description: 'Green energy transition project with 25-year power purchase agreement and net-metering approval from BESCOM.',
          supportingDocs: ['solar_dpr_bescom.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Estate Division', actor: 'Executive Engineer', role: 'Engineer', action: 'Submitted DPR', timestamp: new Date('2026-10-18') },
            { stage: 'Finance Committee', actor: 'Finance Officer', role: 'FO', action: 'ROI payback period calculated at 4.2 years', timestamp: new Date('2026-10-25') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed for execution', timestamp: new Date('2026-11-01') },
          ],
        },
        {
          proposalCode: 'ACU/FIN/2026/090',
          title: 'High-Performance Supercomputing Cluster for Drug Discovery & Bioinformatics',
          category: 'Major Expenditure Approvals',
          department: 'Department of Computer Science & Health Informatics',
          submittedBy: 'Finance Officer',
          urgency: 'Normal',
          budgetInvolved: '₹ 2,40,00,000',
          description: 'NVIDIA H100 GPU computing cluster for molecular docking simulations, genomic mapping, and AI diagnostics.',
          supportingDocs: ['supercomputing_spec.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Technical Committee', actor: 'IT Director', role: 'IT Head', action: 'Submitted', timestamp: new Date('2026-10-19') },
            { stage: 'Finance Officer', actor: 'Finance Officer', role: 'FO', action: 'Vetted', timestamp: new Date('2026-10-26') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Recommended', timestamp: new Date('2026-11-02') },
          ],
        },
        {
          proposalCode: 'ACU/FIN/2026/091',
          title: 'Central Digital Knowledge Repository & Automated RFID Library System',
          category: 'Major Expenditure Approvals',
          department: 'University Central Library',
          submittedBy: 'Chief University Librarian',
          urgency: 'Normal',
          budgetInvolved: '₹ 1,10,00,000',
          description: 'Automated book kiosk, self-checkout kiosks, RFID tagging for 1,20,000 volumes, and IEEE/ScienceDirect multi-year subscription.',
          supportingDocs: ['library_automation_tender.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Library Committee', actor: 'Chief Librarian', role: 'Librarian', action: 'Submitted', timestamp: new Date('2026-10-20') },
            { stage: 'Finance Officer', actor: 'Finance Officer', role: 'FO', action: 'Funds allocated under development grant', timestamp: new Date('2026-10-27') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-03') },
          ],
        },

        // Category 4: MoU / Collaboration Requests (6)
        {
          proposalCode: 'ACU/MOU/2026/021',
          title: 'International Academic & Research Exchange MoU with National University of Singapore (NUS)',
          category: 'MoU / Collaboration Requests',
          department: 'Office of International Affairs & AIMS',
          submittedBy: 'Prof. M. A. Shekar, Vice-Chancellor',
          urgency: 'High',
          budgetInvolved: 'Mutual Institutional Support',
          description:
            'Bilateral agreement covering joint clinical research, faculty sabbaticals, student elective clinical rotations in Singapore, and co-supervision of Ph.D theses.',
          supportingDocs: ['mou_nus_acu_draft_legal_cleared.pdf', 'statutory_compliance_mea.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'International Relations', actor: 'Dean International Affairs', role: 'Dean', action: 'Drafted MoU terms', timestamp: new Date('2026-10-12') },
            { stage: 'Registrar Scrutiny', actor: 'Dr. C. K. Subbaraya', role: 'Registrar', action: 'Legal compliance with Ministry of External Affairs reviewed', timestamp: new Date('2026-10-20') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Prof. M. A. Shekar', role: 'VC', action: 'Strongly endorsed for Chancellor execution', timestamp: new Date('2026-10-29') },
          ],
        },
        {
          proposalCode: 'ACU/MOU/2026/022',
          title: 'Translational Cancer Research Collaborative with Tata Memorial Centre, Mumbai',
          category: 'MoU / Collaboration Requests',
          department: 'Adichunchanagiri Cancer Research Center',
          submittedBy: 'Dr. T. M. Chandrashekar, Director Oncology',
          urgency: 'High',
          budgetInvolved: '₹ 1.2 Cr Joint Funding',
          description: 'Multi-centric clinical trials in gynecological and head-and-neck oncology and rural cancer screening protocols.',
          supportingDocs: ['tmc_mou_draft.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Oncology Center', actor: 'Director Oncology', role: 'Director', action: 'Submitted', timestamp: new Date('2026-10-14') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Vetted', timestamp: new Date('2026-10-21') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-10-30') },
          ],
        },
        {
          proposalCode: 'ACU/MOU/2026/023',
          title: 'Industry-Academia CoE in Generative AI for Diagnostic Imaging with Infosys Healthcare Hub',
          category: 'MoU / Collaboration Requests',
          department: 'BGS Institute of Technology',
          submittedBy: 'Dr. B. K. Narendra, Principal BGSIT',
          urgency: 'Normal',
          budgetInvolved: '₹ 80 Lakhs Industry Funded',
          description: 'Joint laboratory establishment and sponsorship of 10 annual graduate fellowships.',
          supportingDocs: ['infosys_mou_terms.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'BGSIT Principal', actor: 'Principal BGSIT', role: 'Principal', action: 'Submitted', timestamp: new Date('2026-10-16') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-23') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-01') },
          ],
        },
        {
          proposalCode: 'ACU/MOU/2026/024',
          title: 'Cardiovascular Device Testing & Clinical Evaluation MoU with Sree Chitra Tirunal Institute (SCTIMST)',
          category: 'MoU / Collaboration Requests',
          department: 'Cardiology Division, AIMS Hospital',
          submittedBy: 'Dr. Suresh V., Head of Cardiology',
          urgency: 'Normal',
          budgetInvolved: 'Grant Assisted',
          description: 'Animal lab testing and phase-I clinical validation of indigenous heart valves and biocompatible stents.',
          supportingDocs: ['sctimst_mou.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Cardiology Division', actor: 'Head Cardiology', role: 'HOD', action: 'Submitted', timestamp: new Date('2026-10-18') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-25') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-02') },
          ],
        },
        {
          proposalCode: 'ACU/MOU/2026/025',
          title: 'Herbal Drug Standardization & Phytopharmaceutical Research with Dabur India Research R&D',
          category: 'MoU / Collaboration Requests',
          department: 'Sri Adichunchanagiri College of Pharmacy',
          submittedBy: 'Dean of Pharmacy',
          urgency: 'Normal',
          budgetInvolved: '₹ 45 Lakhs Research Sponsorship',
          description: 'Bio-equivalence studies and chromatographic fingerprinting of Ayurvedic medicinal plants native to Western Ghats.',
          supportingDocs: ['dabur_mou.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Pharmacy College', actor: 'Dean Pharmacy', role: 'Dean', action: 'Submitted', timestamp: new Date('2026-10-20') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-27') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-03') },
          ],
        },
        {
          proposalCode: 'ACU/MOU/2026/026',
          title: 'Student Clinical Elective & Public Health Field Training with Karolinska Institute, Sweden',
          category: 'MoU / Collaboration Requests',
          department: 'Community Medicine & Nursing Faculty',
          submittedBy: 'Registrar & International Affairs',
          urgency: 'Normal',
          budgetInvolved: 'Erasmus+ Funded',
          description: 'Exchange program for 12 postgraduate students and 4 faculty members annually in tropical medicine.',
          supportingDocs: ['karolinska_mou.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Community Medicine', actor: 'HOD Community Medicine', role: 'HOD', action: 'Submitted', timestamp: new Date('2026-10-22') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Scrutinized', timestamp: new Date('2026-10-28') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-04') },
          ],
        },

        // Category 5: Appointment / Promotion Cases (7)
        {
          proposalCode: 'ACU/HR/2026/101',
          title: 'Appointment of Dean & Chair Professor – Department of Surgical Oncology',
          category: 'Appointment / Promotion Cases',
          department: 'Adichunchanagiri Institute of Medical Sciences',
          submittedBy: 'Statutory Selection Committee & VC',
          urgency: 'High',
          budgetInvolved: 'Apex Scale (UGC Pay Matrix)',
          description:
            'Selection Committee recommendation for appointment of Dr. K. Radhakrishnan, MS, MCh (AIIMS New Delhi), following nationwide open advertisement and peer assessment.',
          supportingDocs: ['selection_committee_report.pdf', 'candidate_cv_publications.pdf', 'vigilance_clearance.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Selection Committee', actor: 'Apex Selection Committee', role: 'Committee', action: 'Unanimous selection recommendation', timestamp: new Date('2026-10-18') },
            { stage: 'Registrar Scrutiny', actor: 'Dr. C. K. Subbaraya', role: 'Registrar', action: 'Statutory eligibility and NMC qualifications confirmed', timestamp: new Date('2026-10-26') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Prof. M. A. Shekar', role: 'VC', action: 'Endorsed for Chancellor formal appointment order', timestamp: new Date('2026-10-31') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/102',
          title: 'Career Advancement Scheme (CAS): Promotion of 8 Associate Professors to Professor Rank',
          category: 'Appointment / Promotion Cases',
          department: 'University-wide Faculties (Medical, Engg, Pharmacy)',
          submittedBy: 'University Screening & Evaluation Committee',
          urgency: 'Normal',
          budgetInvolved: 'Pay Band Revision',
          description: 'Academic performance indicator (API) score verification and expert referee reviews completed for 8 faculty members.',
          supportingDocs: ['cas_committee_recommendations.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'CAS Committee', actor: 'Screening Committee', role: 'Committee', action: 'Recommended promotions', timestamp: new Date('2026-10-20') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Service book & roster points audited', timestamp: new Date('2026-10-27') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed for Chancellor assent', timestamp: new Date('2026-11-01') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/103',
          title: 'Empanelment of Vice-Chancellor Search Committee (Statutory Formation)',
          category: 'Appointment / Promotion Cases',
          department: 'Office of the Chancellor',
          submittedBy: 'Registrar & Government Liaison Officer',
          urgency: 'Urgent',
          budgetInvolved: 'Statutory',
          description: 'Constitution of 3-member Search-cum-Selection Committee for upcoming Vice-Chancellor term as per University Act statutes.',
          supportingDocs: ['statutory_panel_names.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Registrar Drafting', actor: 'Registrar', role: 'Registrar', action: 'Prepared panel as per Act', timestamp: new Date('2026-10-22') },
            { stage: 'Vice-Chancellor Scrutiny', actor: 'Vice-Chancellor', role: 'VC', action: 'Forwarded to Chancellor Secretariat', timestamp: new Date('2026-10-28') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/104',
          title: 'Appointment of Director of International Relations & Strategic Partnerships',
          category: 'Appointment / Promotion Cases',
          department: 'University Central Administration',
          submittedBy: 'Vice-Chancellor',
          urgency: 'Normal',
          budgetInvolved: 'UGC Scale',
          description: 'Appointment of senior academic administrator to spearhead QS and Times Higher Education internationalization initiatives.',
          supportingDocs: ['director_ir_dossier.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'VC Office', actor: 'Vice-Chancellor', role: 'VC', action: 'Nomination submitted', timestamp: new Date('2026-10-24') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-29') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/105',
          title: 'Appointment of Chief Superintendent of Valuation & Central Evaluation Centers',
          category: 'Appointment / Promotion Cases',
          department: 'Examination Branch',
          submittedBy: 'Controller of Examinations',
          urgency: 'High',
          budgetInvolved: 'Statutory Honorarium',
          description: 'Appointment of senior professor for upcoming winter 2026 university-wide centralized digital evaluation.',
          supportingDocs: ['coe_recommendation.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'COE Office', actor: 'COE', role: 'COE', action: 'Submitted panel', timestamp: new Date('2026-10-25') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-30') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-03') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/106',
          title: 'Confirmation of Probationary Services for 14 Assistant Professors',
          category: 'Appointment / Promotion Cases',
          department: 'Human Resources Division',
          submittedBy: 'HR Manager & Deans Committee',
          urgency: 'Normal',
          budgetInvolved: 'Regularized',
          description: 'Satisfactory completion of 2-year probationary tenure, student feedback review, and research publication requirements.',
          supportingDocs: ['probation_audit_records.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'HR Division', actor: 'HR Manager', role: 'HR', action: 'Submitted', timestamp: new Date('2026-10-26') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified', timestamp: new Date('2026-10-31') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Endorsed', timestamp: new Date('2026-11-04') },
          ],
        },
        {
          proposalCode: 'ACU/HR/2026/107',
          title: 'Conferment of Professor Emeritus Status on Dr. B. C. Gowda, Former Dean of Surgery',
          category: 'Appointment / Promotion Cases',
          department: 'Department of General Surgery',
          submittedBy: 'Academic Council',
          urgency: 'Normal',
          budgetInvolved: 'Honorary',
          description: 'Conferment of honorary lifelong title and research mentorship privileges in recognition of 35 years of distinguished surgical leadership.',
          supportingDocs: ['academic_council_citation.pdf'],
          status: 'Pending Chancellor Action',
          auditTrail: [
            { stage: 'Academic Council', actor: 'Academic Council', role: 'Council', action: 'Unanimous resolution', timestamp: new Date('2026-10-27') },
            { stage: 'Registrar Scrutiny', actor: 'Registrar', role: 'Registrar', action: 'Verified statutory compliance', timestamp: new Date('2026-10-31') },
            { stage: 'Vice-Chancellor Endorsement', actor: 'Vice-Chancellor', role: 'VC', action: 'Recommended for Chancellor conferment decree', timestamp: new Date('2026-11-05') },
          ],
        },
      ];

      await ChancellorProposal.insertMany(defaultProposals);
    }

    // 3. Seed ADMS Parameters (Image 2)
    const admsCount = await ChancellorAdmsMetrics.countDocuments();
    if (admsCount === 0) {
      await ChancellorAdmsMetrics.create({
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
      });
    }

    // 4. Seed Subcontent Governance records if empty
    const govCount = await ChancellorGovernance.countDocuments();
    if (govCount === 0) {
      const defaultGov = [
        // Policies
        {
          section: 'policies',
          referenceCode: 'ACU-POL-01',
          title: 'University Comprehensive Academic & Examination Integrity Policy',
          department: 'Academic Council',
          date: '02 Oct 2026',
          status: 'Active',
          summary: 'Institutional framework for academic honesty, automated plagiarism scanning, and exam grievance redressing.',
          amountOrMetric: 'University-wide',
          leadPerson: 'Registrar',
        },
        {
          section: 'policies',
          referenceCode: 'ACU-POL-02',
          title: 'Adichunchanagiri Research Commercialization & IP Guidelines',
          department: 'Research Center',
          date: '18 Sep 2026',
          status: 'Active',
          summary: 'Governs patents, copyright, invention disclosures and startup equity allocation.',
          amountOrMetric: '52 Departments',
          leadPerson: 'Director Research',
        },
        // Statutes
        {
          section: 'statutes',
          referenceCode: 'ACU-STAT-04',
          title: 'Statute Governing Constitution and Powers of Academic Council',
          department: 'Chancellor Secretariat',
          date: '15 Aug 2026',
          status: 'Gazetted',
          summary: 'Defines representation, term of office, sub-committees, and plenary voting guidelines under Karnataka Act.',
          amountOrMetric: 'Apex Statute',
          leadPerson: 'Chancellor / VC',
        },
        // Ordinances
        {
          section: 'ordinances',
          referenceCode: 'ACU-ORD-11',
          title: 'Ordinance for Ph.D Degree Minimum Standards and Procedures',
          department: 'Deanery of Research',
          date: '05 Jul 2026',
          status: 'Enforced',
          summary: 'Doctoral regulations aligning with UGC 2022 norms including course work and mandatory Scopus publication.',
          amountOrMetric: '8% Doctoral Cohort',
          leadPerson: 'Dean Research',
        },
        // Academic Programs
        {
          section: 'academic-programs',
          referenceCode: 'ACU-PROG-320',
          title: 'Active Program Registry: 320 Approved Programs',
          department: 'All 12 Constituent Faculties',
          date: 'Academic Year 2026-27',
          status: 'Operational',
          summary: 'Complete statutory register of 176 Undergraduate, 102 Postgraduate, 26 Doctoral, and 16 Super-specialty curricula.',
          amountOrMetric: '320 Active Programs',
          leadPerson: 'Dean Academic Affairs',
        },
        // Annual Budget
        {
          section: 'annual-budget',
          referenceCode: 'ACU-BUDGET-2026',
          title: 'Consolidated University Budget FY 2026-27',
          department: 'Finance Branch',
          date: '01 Apr 2026',
          status: 'Approved by Syndicate',
          summary: 'Consolidated revenue budget of ₹ 342.5 Crore with ₹ 68 Crore earmarked for capital infrastructure and healthcare lab expansion.',
          amountOrMetric: '₹ 342.50 Cr',
          leadPerson: 'Finance Officer',
        },
        // Major Expenditures
        {
          section: 'major-expenditures',
          referenceCode: 'ACU-CAPEX-14',
          title: 'Cancer Hospital Linear Accelerator & Radiotherapy Wing',
          department: 'Estate & Medical Projects',
          date: '20 Oct 2026',
          status: 'Execution Phase',
          summary: 'Installation of high-energy medical LINAC with IGRT/SBRT capabilities for tertiary regional cancer treatment.',
          amountOrMetric: '₹ 18.50 Cr',
          leadPerson: 'Finance Officer & Medical Director',
        },
        // Research Projects
        {
          section: 'research-projects',
          referenceCode: 'ACU-RES-420',
          title: 'Active Funded Research Projects Registry',
          department: 'Center for Research & Innovation',
          date: 'Current',
          status: 'Ongoing (420 Projects)',
          summary: 'Government and industry sponsored extramural research across Medical, Pharmacy, Bio-engineering, and Nanotechnology.',
          amountOrMetric: '420 Active Grants',
          leadPerson: 'Dean Research',
        },
        // Collaborations (MoUs)
        {
          section: 'collaborations-mous',
          referenceCode: 'ACU-MOU-68',
          title: 'Active Institutional Collaborations & MoUs',
          department: 'International & Corporate Relations',
          date: 'Current',
          status: '68 Active Partnerships',
          summary: 'Global and domestic strategic alliances with hospitals, national research labs, and academic consortia.',
          amountOrMetric: '68 Active MoUs',
          leadPerson: 'Registrar',
        },
        // Executive Council
        {
          section: 'executive-council',
          referenceCode: 'ACU-EC-48',
          title: '48th Executive Council Proceedings & Resolutions',
          department: 'Registrar Secretariat',
          date: '15 Nov 2026',
          status: 'Scheduled',
          summary: 'Statutory meeting to review annual audited statements, professorial recruitments, and campus infrastructure expansion.',
          amountOrMetric: '15 Nov 2026',
          leadPerson: 'Chancellor (Chair)',
        },
      ];

      await ChancellorGovernance.insertMany(defaultGov);
    }
  } catch (error) {
    console.error('[Chancellor Service] Auto-seed notice:', error.message);
  }
};

export const chancellorService = {
  // Get Comprehensive Dashboard Overview
  getOverview: async (academicYear = '2026 - 2027') => {
    await seedInitialDataIfEmpty();

    let overview = await ChancellorOverview.findOne({ academicYear }).lean();
    if (!overview) {
      overview = await ChancellorOverview.findOne().sort({ createdAt: -1 }).lean();
    }

    // Dynamic pending approvals counts by category from database
    const pendingCounts = await ChancellorProposal.aggregate([
      { $match: { status: 'Pending Chancellor Action' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const pendingMap = {
      'New Program Proposals': 0,
      'Policy / Regulation Amendments': 0,
      'Major Expenditure Approvals': 0,
      'MoU / Collaboration Requests': 0,
      'Appointment / Promotion Cases': 0,
    };

    pendingCounts.forEach((p) => {
      if (pendingMap.hasOwnProperty(p._id)) {
        pendingMap[p._id] = p.count;
      }
    });

    const totalPending = Object.values(pendingMap).reduce((a, b) => a + b, 0);

    return {
      academicYear: overview?.academicYear || academicYear,
      totalStudents: overview?.totalStudents || 24560,
      totalStudentsGrowth: overview?.totalStudentsGrowth || '+6.2%',
      totalFaculty: overview?.totalFaculty || 1820,
      totalFacultyGrowth: overview?.totalFacultyGrowth || '+3.8%',
      departments: overview?.departments || 52,
      activePrograms: overview?.activePrograms || 320,
      studentDistribution: overview?.studentDistribution || { ug: 55, pg: 32, phd: 8, others: 5 },
      academicResearchHighlights: overview?.academicResearchHighlights || {
        naacGrade: 'A++',
        researchProjects: 420,
        activeMoUs: 68,
      },
      upcomingMeetings: overview?.upcomingMeetings || [],
      goal: overview?.goal || 'Ensure academic excellence, good governance, financial sustainability, regulatory compliance, and long-term growth of the university.',
      responsibilities: overview?.responsibilities || [],
      pendingActions: {
        total: totalPending,
        breakdown: [
          { category: 'New Program Proposals', count: pendingMap['New Program Proposals'], iconType: 'document' },
          { category: 'Policy / Regulation Amendments', count: pendingMap['Policy / Regulation Amendments'], iconType: 'gear' },
          { category: 'Major Expenditure Approvals', count: pendingMap['Major Expenditure Approvals'], iconType: 'coins' },
          { category: 'MoU / Collaboration Requests', count: pendingMap['MoU / Collaboration Requests'], iconType: 'handshake' },
          { category: 'Appointment / Promotion Cases', count: pendingMap['Appointment / Promotion Cases'], iconType: 'user' },
        ],
      },
    };
  },

  // Get Dynamic Proposals with Filtering
  getProposals: async ({ category, status, search }) => {
    await seedInitialDataIfEmpty();

    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { proposalCode: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    const proposals = await ChancellorProposal.find(query).sort({ urgency: -1, createdAt: -1 }).lean();
    return proposals;
  },

  // Get Single Proposal
  getProposalById: async (id) => {
    await seedInitialDataIfEmpty();
    const proposal = await ChancellorProposal.findById(id).lean();
    return proposal;
  },

  // Flowchart Decision Action: Approve | Reject | Return
  decideProposal: async (id, { decision, remarks = '', digitalSignatureId = '' }) => {
    const proposal = await ChancellorProposal.findById(id);
    if (!proposal) {
      throw new Error(`Proposal with ID ${id} not found.`);
    }

    let updatedStatus = 'Pending Chancellor Action';
    let auditAction = '';

    if (decision === 'Approve') {
      updatedStatus = 'Approved';
      auditAction = 'Approved / Digitally Signed';
      proposal.chancellorDecision = {
        decision: 'Approve',
        remarks: remarks || 'Approved under Chancellor apex statutory authority.',
        decidedAt: new Date(),
        digitalSignatureId: digitalSignatureId || 'CHANCELLOR-ACU-APEX-SEAL-' + Date.now().toString(36).toUpperCase(),
      };
    } else if (decision === 'Reject') {
      updatedStatus = 'Rejected';
      auditAction = 'Rejected with Remarks';
      proposal.chancellorDecision = {
        decision: 'Reject',
        remarks: remarks || 'Declined with executive observations.',
        decidedAt: new Date(),
        digitalSignatureId: '',
      };
    } else if (decision === 'Return') {
      updatedStatus = 'Returned for Correction';
      auditAction = 'Sent for Correction to Registrar / Vice-Chancellor';
      proposal.chancellorDecision = {
        decision: 'Return',
        remarks: remarks || 'Returned for compliance rectifications and resubmission.',
        decidedAt: new Date(),
        digitalSignatureId: '',
      };
    }

    proposal.status = updatedStatus;

    // Append to Audit Trail
    proposal.auditTrail.push({
      stage: 'Chancellor Apex Decision',
      actor: 'The Chancellor, ACU',
      role: 'Chancellor',
      action: auditAction,
      timestamp: new Date(),
      remarks: remarks || auditAction,
    });

    await proposal.save();
    return proposal;
  },

  // Create Proposal
  createProposal: async (data) => {
    const code = data.proposalCode || `ACU/PROP/2026/${Math.floor(100 + Math.random() * 900)}`;
    const newProp = await ChancellorProposal.create({
      ...data,
      proposalCode: code,
      auditTrail: [
        {
          stage: 'Department Submission',
          actor: data.submittedBy || 'Department Officer',
          role: 'Proponent',
          action: 'Initial submission',
          timestamp: new Date(),
          remarks: 'Submitted for statutory processing.',
        },
      ],
    });
    return newProp;
  },

  // Get Subcontent Governance Records
  getGovernanceRecords: async (section, search) => {
    await seedInitialDataIfEmpty();

    const query = {};
    if (section && section !== 'all') {
      query.section = section;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { referenceCode: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const records = await ChancellorGovernance.find(query).sort({ createdAt: -1 }).lean();
    return records;
  },

  // Get ADMS Parameter's Dashboard Metrics (Image 2)
  getAdmsMetrics: async (academicYear = '2026 - 2027') => {
    await seedInitialDataIfEmpty();

    let metrics = await ChancellorAdmsMetrics.findOne({ academicYear }).lean();
    if (!metrics) {
      metrics = await ChancellorAdmsMetrics.findOne().lean();
    }
    return metrics;
  },
};

export default chancellorService;
