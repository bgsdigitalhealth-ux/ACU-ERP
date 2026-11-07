import app from './app.js';
import { connectDB } from './Shared/database/connection.js';
import { config } from './Shared/config/index.js';

const PORT = config.port || 5000;

// Connect to MongoDB Atlas cluster
connectDB();

app.listen(PORT, () => {
  console.log(`[ACU ERP Enterprise Server] Listening on http://localhost:${PORT}`);
  console.log(`[Architecture] Modular University & College Architecture Active`);
});

export default app;

