import app from './app';
import { config } from './config/env.config';
import { connectDB } from './config/database.config';
import { consoleIt } from './utils/consoleIt';

const PORT = config.port;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  consoleIt.log(`🚀 Server is running on port ${PORT}`);
  consoleIt.log(`📍 Environment: ${config.nodeEnv}`);
  consoleIt.log(`🌐 http://localhost:${PORT}`);
});

