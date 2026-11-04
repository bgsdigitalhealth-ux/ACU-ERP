import mongoose from 'mongoose';

const testURIs = [
  // 1. Exact string provided by user
  'mongodb+srv://bgsdigitalhealth_db_user:bgsdigitalhealth_db_user@cluster0.tsobslo.mongodb.net/?compressors=zlib',
  // 2. Standard Atlas URI without compressor
  'mongodb+srv://bgsdigitalhealth_db_user:bgsdigitalhealth_db_user@cluster0.tsobslo.mongodb.net/?retryWrites=true&w=majority',
  // 3. With authSource=admin
  'mongodb+srv://bgsdigitalhealth_db_user:bgsdigitalhealth_db_user@cluster0.tsobslo.mongodb.net/admin?retryWrites=true&w=majority',
  // 4. Direct shard host
  'mongodb://bgsdigitalhealth_db_user:bgsdigitalhealth_db_user@ac-lsr0idb-shard-00-00.tsobslo.mongodb.net:27017,ac-lsr0idb-shard-00-01.tsobslo.mongodb.net:27017,ac-lsr0idb-shard-00-02.tsobslo.mongodb.net:27017/?ssl=true&replicaSet=atlas-13b3p3-shard-0&authSource=admin&retryWrites=true&w=majority'
];

async function run() {
  for (let i = 0; i < testURIs.length; i++) {
    const uri = testURIs[i];
    console.log(`\nTesting URI #${i + 1}: ${uri.replace(/:bgsdigitalhealth_db_user@/, ':****@')}`);
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`SUCCESS! Connected to ${conn.connection.host}`);
      await mongoose.disconnect();
      return;
    } catch (err) {
      console.error(`FAILED #${i + 1}:`, err.message);
    }
  }
}

run();

