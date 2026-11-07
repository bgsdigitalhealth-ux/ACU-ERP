import mongoose from 'mongoose';

const ChancellorAdmsMetricsSchema = new mongoose.Schema(
  {
    academicYear: { type: String, default: '2026 - 2027' },
    enrollment: [
      {
        parameter: { type: String, required: true },
        value: { type: Number, required: true },
        maxScale: { type: Number, default: 80 },
        color: { type: String, default: '#0284c7' },
      },
    ],
    curriculumAcademics: [
      {
        parameter: { type: String, required: true },
        value: { type: Number, required: true },
        maxScale: { type: Number, default: 20 },
        color: { type: String, default: '#10b981' },
      },
    ],
    research: [
      {
        label: { type: String, required: true },
        value: { type: Number, required: true },
        color: { type: String, default: '#0284c7' },
      },
    ],
    infrastructureGovernance: [
      {
        parameter: { type: String, required: true },
        value: { type: Number, required: true },
        maxScale: { type: Number, default: 6 },
        color: { type: String, default: '#10b981' },
      },
    ],
  },
  { timestamps: true }
);

export const ChancellorAdmsMetrics =
  mongoose.models.ChancellorAdmsMetrics ||
  mongoose.model('ChancellorAdmsMetrics', ChancellorAdmsMetricsSchema);

export default ChancellorAdmsMetrics;

