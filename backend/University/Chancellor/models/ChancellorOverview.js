import mongoose from 'mongoose';

const ChancellorOverviewSchema = new mongoose.Schema(
  {
    academicYear: { type: String, required: true, default: '2026 - 2027' },
    totalStudents: { type: Number, default: 24560 },
    totalStudentsGrowth: { type: String, default: '+6.2%' },
    totalFaculty: { type: Number, default: 1820 },
    totalFacultyGrowth: { type: String, default: '+3.8%' },
    departments: { type: Number, default: 52 },
    activePrograms: { type: Number, default: 320 },

    studentDistribution: {
      ug: { type: Number, default: 55 },
      pg: { type: Number, default: 32 },
      phd: { type: Number, default: 8 },
      others: { type: Number, default: 5 },
    },

    academicResearchHighlights: {
      naacGrade: { type: String, default: 'A++' },
      researchProjects: { type: Number, default: 420 },
      activeMoUs: { type: Number, default: 68 },
    },

    upcomingMeetings: [
      {
        id: { type: String },
        title: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, default: '11:00 AM' },
        venue: { type: String, default: 'Senate Hall, University Administrative Block' },
        type: { type: String, default: 'Executive Council' },
        agendaCount: { type: Number, default: 8 },
        status: { type: String, default: 'Scheduled' },
      },
    ],

    goal: {
      type: String,
      default:
        'Ensure academic excellence, good governance, financial sustainability, regulatory compliance, and long-term growth of the university.',
    },

    responsibilities: [
      {
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        iconType: { type: String, default: 'building' },
      },
    ],
  },
  { timestamps: true }
);

export const ChancellorOverview =
  mongoose.models.ChancellorOverview ||
  mongoose.model('ChancellorOverview', ChancellorOverviewSchema);

export default ChancellorOverview;

