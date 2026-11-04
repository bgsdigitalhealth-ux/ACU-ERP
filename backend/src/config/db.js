import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bgsdigitalhealth_db_user:bgsdigitalhealth_db_user@cluster0.tsobslo.mongodb.net/acu_erp?retryWrites=true&w=majority&compressors=zlib';

export const connectDB = async () => {
  try {
    console.log('[MongoDB] Connecting to MongoDB Atlas Cluster...');
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB] Connected successfully to Atlas host: ${conn.connection.host}`);
    console.log(`[MongoDB] Active Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB] Connection error:', error.message);
    // Don't crash the server if network is restricted in sandbox, but log clear message
    return null;
  }
};

