import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.config';
import { errorHandler } from './middlewares/handleError';
import { HttpError } from './utils/httpError';
import { apiRateLimiter } from './middlewares/rateLimit';
import { consoleIt } from './utils/consoleIt';

const app: Application = express();

app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiter: 100 requests per 15 minutes
const limiter = apiRateLimiter(15, 100);
app.use('/api/', limiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Express TypeScript Server',
    port: config.port,
  });
});

// API Routes
import routes from './routes/index.routes';
app.use('/api', routes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(HttpError.notFound());
});

// Global Error Handler
app.use(errorHandler);

// Start server if not imported (this file exports app, server.ts starts it)
// But wait, server.ts starts it. Checking server.ts usage.

export default app;

