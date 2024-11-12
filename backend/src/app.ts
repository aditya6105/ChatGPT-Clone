import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Allowed origins for CORS (including localhost for development and the deployed frontend for production)
const allowedOrigins = [
  "http://localhost:5173", // Local development frontend
  "https://chat-gpt-clone-seven-eta.vercel.app", // Production frontend (Vercel)
];

// CORS middleware configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Allow headers typically used in auth requests
  })
);

// Explicitly handle OPTIONS requests for pre-flight CORS
app.options("*", cors());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Development logging (remove in production)
app.use(morgan("dev"));

// Route handling
app.use("/api/v1", appRouter);

export default app;
