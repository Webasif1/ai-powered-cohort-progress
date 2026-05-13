import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// ============================================
// Initialize Express App
// ============================================
const app = express();

// ============================================
// Setting up logger for info
// ============================================
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * Body Parser Middleware
 * - Parses incoming JSON request bodies (limit: 10mb)
 * - Parses incoming form-encoded request bodies
 * - Parses cookies from Cookie header
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Capstopn Project API is running! 🚀',
  });
});
// ============================================
// Health Check Endpoint
// ============================================

/**
 * Health Check Route
 * - Verifies server is running
 * - Used for monitoring and tests
 * Endpoint: GET /api/health
 */
app.get('/router/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default app
