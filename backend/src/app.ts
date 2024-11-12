import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Define allowed origins
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://chat-gpt-clone-seven-eta.vercel.app",
]);

// Middleware to handle CORS headers and preflight
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    // Return early for OPTIONS requests
    if (req.method === "OPTIONS") {
      return res.sendStatus(200); // Use 200 OK instead of 204 No Content
    }
  }
  next();
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);

export default app;
