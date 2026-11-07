import mongoose from 'mongoose';

const ViceChancellorAnalyticsSchema = new mongoose.Schema(
  {
    academicYear: { type: String, default: '2024 - 2025' },
    
    // Enrollment Growth Trends (Line chart)
    enrollmentTrends: [
      { month: { type: String, required: true }, students: { type: Number, required: true } },
    ],

    // Departmental Success Index (Grouped Bar chart: CS, ENG, ART, BUS, SCI)
    departmentalSuccessIndex: [
      { department: { type: String, required: true }, passRate: { type: Number, required: true }, placementRate: { type: Number, required: true } },
    ],

    // Faculty Allocation (Donut chart)
    facultyAllocation: [
      { faculty: { type: String, required: true }, percentage: { type: Number, required: true }, color: { type: String } },
    ],

    // Strategic Insights
    strategicInsights: [
      { title: { type: String, required: true }, description: { type: String, required: true }, type: { type: String, default: 'info' } },
    ],

    // Multi-Campus Management & Accreditation Readiness (Image 3)
    multiCampus: [
      { name: { type: String, required: true }, location: { type: String, required: true }, students: { type: Number }, departments: { type: Number } },
    ],

    accreditationReadiness: {
      naacStatus: { type: String, default: 'Prepared (A++)' },
      nbaStatus: { type: String, default: 'Compliant (Tier-1)' },
      nirfStatus: { type: String, default: 'Data Ready (Top 50 band)' },
      overallReadinessPercentage: { type: Number, default: 92 },
    },
  },
  { timestamps: true }
);

export const ViceChancellorAnalytics =
  mongoose.models.ViceChancellorAnalytics ||
  mongoose.model('ViceChancellorAnalytics', ViceChancellorAnalyticsSchema);

export default ViceChancellorAnalytics;
