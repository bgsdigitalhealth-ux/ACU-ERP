import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { getDashboard, getModules } from './controllers/erpController.js';
import {
  getAssessments,
  createAssessment,
  getAcademicCalendar,
  seedDatabase,
} from './controllers/medicalErpController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize MongoDB connection asynchronously
connectDB();

// Core Root & Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'ACU ERP - Adichunchanagiri University Backend API',
    endpoints: {
      health: '/api/health',
      dashboard: '/api/dashboard',
      modules: '/api/modules',
      assessments: '/api/assessments',
      calendar: '/api/academic-calendar',
    },
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'ACU ERP - Adichunchanagiri University',
    database: 'MongoDB Atlas (acu_erp)',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/dashboard', getDashboard);
app.get('/api/modules', getModules);

// Medical ERP Assessment & Calendar Routes
app.get('/api/assessments', getAssessments);
app.post('/api/assessments', createAssessment);
app.get('/api/academic-calendar', getAcademicCalendar);
app.post('/api/seed', seedDatabase);

app.listen(PORT, () => {
  console.log(`[ACU ERP Backend] Server listening on http://localhost:${PORT}`);
});
