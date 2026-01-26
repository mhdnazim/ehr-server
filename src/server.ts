import app from './app';
import { config } from './config/env.config';
import { connectDB } from './config/database.config';

const PORT = config.port;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🌐 http://localhost:${PORT}`);
});

