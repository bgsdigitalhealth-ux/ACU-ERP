import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://bgsdigitalhealth_db_user:ZFNSqyikCoFBUChP@cluster0.cpxf4ss.mongodb.net/acu_erp?retryWrites=true&w=majority&compressors=zlib',
  jwtSecret: process.env.JWT_SECRET || 'acu_erp_jwt_super_secret_key_2026',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  universityName: 'Adichunchanagiri University (ACU)',
  platform: 'Karnataka Higher Education Institutional ERP',
};

export default config;

