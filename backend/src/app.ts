import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// CORS configuration with dynamic origin handling
const allowedOrigins = [
  "http://localhost:5173", // Local development frontend
  "https://chat-gpt-clone-seven-eta.vercel.app", // Production frontend (Vercel)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from allowed origins or no origin (for server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow typical auth and content headers
  })
);

// Preflight OPTIONS support
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Development logging (remove in production)
app.use(morgan("dev"));

// Route handling
app.use("/api/v1", appRouter);

export default app;
