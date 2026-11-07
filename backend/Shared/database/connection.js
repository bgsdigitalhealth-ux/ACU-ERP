import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bgsdigitalhealth_db_user:ZFNSqyikCoFBUChP@cluster0.cpxf4ss.mongodb.net/acu_erp?retryWrites=true&w=majority&compressors=zlib';

export const connectDB = async () => {
  try {
    console.log('[MongoDB Atlas] Establishing secure connection to cluster...');
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB Atlas] Active Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB Atlas] Connection notice:', error.message);
    return null;
  }
};

