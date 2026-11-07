import mongoose from 'mongoose';

const ViceChancellorOverviewSchema = new mongoose.Schema(
  {
    academicYear: { type: String, required: true, default: '2024 - 2025' },
    viceChancellorName: { type: String, default: 'Dr. R. Sharma' },
    motto: {
      type: String,
      default: 'Committed to Academic Excellence, Research, Innovation and Holistic Development',
    },

    totalStudents: { type: Number, default: 24560 },
    totalStudentsGrowth: { type: String, default: '↑ 6.2%' },
    totalFaculty: { type: Number, default: 1820 },
    totalFacultyGrowth: { type: String, default: '↑ 3.8%' },
    departments: { type: Number, default: 52 },
    departmentsGrowth: { type: String, default: '↑ 2.0%' },
    academicPrograms: { type: Number, default: 320 },
    academicProgramsGrowth: { type: String, default: '↑ 4.5%' },

    studentDistribution: {
      ug: { type: Number, default: 55 },
      pg: { type: Number, default: 32 },
      phd: { type: Number, default: 8 },
      others: { type: Number, default: 5 },
    },

    academicPerformance: {
      ugPassCurrent: { type: Number, default: 87 },
      ugPassPrevious: { type: Number, default: 83 },
      pgPassCurrent: { type: Number, default: 92 },
      pgPassPrevious: { type: Number, default: 88 },
      phdCompletionCurrent: { type: Number, default: 76 },
      phdCompletionPrevious: { type: Number, default: 70 },
    },

    researchInnovation: {
      activeProjects: { type: Number, default: 120 },
      grantsReceived: { type: Number, default: 48 },
      mousCollaborations: { type: Number, default: 36 },
      publicationsLastYear: { type: Number, default: 245 },
    },

    upcomingMeetings: [
      {
        id: { type: String },
        title: { type: String, required: true },
        date: { type: String, required: true },
        type: { type: String, default: 'Executive Council' },
        venue: { type: String, default: 'Senate Chamber' },
        time: { type: String, default: '11:00 AM' },
      },
    ],

    notifications: [
      {
        id: { type: String },
        message: { type: String, required: true },
        timeAgo: { type: String, default: '2 hours ago' },
        category: { type: String, default: 'research' },
        read: { type: Boolean, default: false },
      },
    ],

    responsibilities: [
      {
        id: { type: String },
        number: { type: Number },
        title: { type: String, required: true },
        bullets: [{ type: String }],
        iconType: { type: String, default: 'academic' },
      },
    ],

    erpModulesAccess: [
      {
        module: { type: String, required: true },
        keyFeatures: { type: String, required: true },
        iconType: { type: String, default: 'dashboard' },
      },
    ],

    goal: {
      type: String,
      default:
        'To provide visionary leadership, ensure academic excellence, and drive the university towards growth and global recognition.',
    },
  },
  { timestamps: true }
);

export const ViceChancellorOverview =
  mongoose.models.ViceChancellorOverview ||
  mongoose.model('ViceChancellorOverview', ViceChancellorOverviewSchema);

export default ViceChancellorOverview;
