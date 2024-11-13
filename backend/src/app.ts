import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Define corsOptions with multiple allowed origins
const corsOptions = {
  origin: [
    "https://chat-gpt-clone-seven-eta.vercel.app", // First Vercel URL
    "https://chat-gpt-clone-l1gmlpl82-aditya6105s-projects.vercel.app", // Second Vercel URL
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions)); // Use corsOptions here
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Additional middleware to handle preflight requests for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Log requests in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
