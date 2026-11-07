import mongoose from 'mongoose';

const ViceChancellorOverviewSchema = new mongoose.Schema(
  {
    academicYear: { type: String, required: true, default: '2026 – 2027' },
    viceChancellorName: { type: String, default: 'Prof. (Dr.) Ramesh K.' },
    roleTitle: { type: String, default: 'Vice Chancellor' },
    motto: {
      type: String,
      default: 'Oversee • Lead • Approve • Monitor • Develop',
    },

    // 8 KPI Summary Cards matching Mockup
    totalStudents: { type: Number, default: 24560 },
    totalStudentsGrowth: { type: String, default: '↑ 6.2%' },
    totalFaculty: { type: Number, default: 1820 },
    totalFacultyGrowth: { type: String, default: '↑ 3.8%' },
    departments: { type: Number, default: 52 },
    academicPrograms: { type: Number, default: 320 },
    academicProgramsBreakdown: { type: String, default: '(UG 198 | PG 92 | PhD 30)' },
    affiliatedColleges: { type: Number, default: 186 },
    researchProjects: { type: Number, default: 420 },
    researchFunding: { type: String, default: '(₹ 86.4 Cr)' },
    activeMous: { type: Number, default: 68 },
    mousBreakdown: { type: String, default: '(National 42 | International 26)' },
    pendingApprovalsCount: { type: Number, default: 37 },

    // University Academic Overview Donut
    studentDistribution: {
      ug: { type: Number, default: 55 },
      pg: { type: Number, default: 32 },
      phd: { type: Number, default: 8 },
      others: { type: Number, default: 5 },
    },

    // Finance Overview (FY 2026–27)
    financeOverview: {
      fiscalYear: { type: String, default: 'FY 2026–27' },
      annualBudget: { type: String, default: '₹ 520.00 Cr' },
      expenditureYtd: { type: String, default: '₹ 286.40 Cr (55.1%)' },
      committed: { type: String, default: '₹ 112.30 Cr (21.6%)' },
      balance: { type: String, default: '₹ 121.30 Cr (23.3%)' },
    },

    // Upcoming Meetings (4 statutory meetings)
    upcomingMeetings: [
      {
        id: { type: String },
        title: { type: String, required: true },
        date: { type: String, required: true },
        type: { type: String, default: 'Statutory Body' },
        venue: { type: String, default: 'Senate Chamber' },
        time: { type: String, default: '11:00 AM' },
      },
    ],

    // Notifications & Alerts
    notifications: [
      {
        id: { type: String },
        message: { type: String, required: true },
        timeAgo: { type: String, default: '2 hours ago' },
        category: { type: String, default: 'statutory' },
        read: { type: Boolean, default: false },
      },
    ],

    // 10 Key Work & Responsibilities matching Part 2
    responsibilities: [
      {
        id: { type: String },
        number: { type: Number },
        title: { type: String, required: true },
        bullets: [{ type: String }],
        iconType: { type: String, default: 'academic' },
      },
    ],

    // 12 ERP Modules & Subcontents matching Part 2
    erpModulesAccess: [
      {
        module: { type: String, required: true },
        keyFeatures: { type: String, required: true },
        iconType: { type: String, default: 'dashboard' },
      },
    ],

    // Key Reports & Analytics (7 items)
    reportsList: [{ type: String }],

    // Other Important ERP Components (8 items)
    importantComponents: [{ type: String }],

    goal: {
      type: String,
      default:
        'Ensure academic excellence, research innovation, good governance, financial sustainability, regulatory compliance and holistic development of the university.',
    },
  },
  { timestamps: true }
);

export const ViceChancellorOverview =
  mongoose.models.ViceChancellorOverview ||
  mongoose.model('ViceChancellorOverview', ViceChancellorOverviewSchema);

export default ViceChancellorOverview;