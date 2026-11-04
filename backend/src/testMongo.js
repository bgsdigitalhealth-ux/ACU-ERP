import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI || 'mongodb+srv://bgsdigitalhealth_db_user:ZFNSqyikCoFBUChP@cluster0.cpxf4ss.mongodb.net/acu_erp?retryWrites=true&w=majority&compressors=zlib';

console.log('Connecting to:', uri.replace(/:ZFNSqyikCoFBUChP@/, ':****@'));

mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  .then((conn) => {
    console.log('[SUCCESS] Connected to MongoDB Atlas!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error('[ERROR] Failed to connect:', err.message);
    process.exit(1);
  });
