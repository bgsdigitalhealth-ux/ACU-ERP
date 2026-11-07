import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './Shared/middleware/corsMiddleware.js';
import { errorHandler, notFoundHandler } from './Shared/middleware/errorMiddleware.js';
import { verifyToken } from './Shared/middleware/authMiddleware.js';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

// Global Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyToken);

// Root Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'ACU ERP - Adichunchanagiri University Enterprise Architecture',
    architecture: 'Modular University / College Backend Architecture',
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
  });
});

// Mount All Modular API Routes under /api
app.use('/api', apiRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

