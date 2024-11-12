import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Define corsOptions with only the production origin
const corsOptions = {
  origin: "https://chat-gpt-clone-seven-eta.vercel.app", // Only allow requests from the Vercel URL
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions)); // Use corsOptions here
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Log requests in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
