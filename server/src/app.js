
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";



// Middlewares
import {
  notFound,
  errorHandler,
} from "./middlewares/error.middleware.js";
// Routes
import profileRouter from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";
import socialmediarouter from "./routes/socialmedialink.routes.js";

const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Health Check
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Linkora API is running",
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/social-media-links", socialmediarouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
