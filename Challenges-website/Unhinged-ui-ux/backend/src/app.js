import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// ============================================
// Import Routes
// ============================================

import productRoute from "./routers/product.route.js";

// ============================================
// Initialize Express App
// ============================================
const app = express();
const __dirname = path.resolve();

// ============================================
// Middleware Configuration
// ============================================

/**
 * CORS Configuration
 * - Allows requests from frontend
 * - Configurable via environment or default to localhost
 */
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      `http://localhost:${process.env.FRONTEND_PORT}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ============================================
// Setting up logger for info
// ============================================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * Body Parser Middleware
 * - Parses incoming JSON request bodies (limit: 10mb)
 * - Parses incoming form-encoded request bodies
 * - Parses cookies from Cookie header
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Regretail API",
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
app.get("/api/healthz", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================
// API Routes
// ============================================

app.use("/api/products", productRoute);

// ============================================
// Frontend Catch-All (SPA Router)
// ============================================
// Must be AFTER all API routes to avoid intercepting API calls
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
