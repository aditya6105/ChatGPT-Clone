import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Updated CORS configuration to include frontend deployment URL
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://chat-gpt-clone-seven-eta.vercel.app", // Deployed frontend on Vercel
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove it in production
app.use(morgan("dev"));

// Routes
app.use("/api/v1", appRouter);

export default app;
