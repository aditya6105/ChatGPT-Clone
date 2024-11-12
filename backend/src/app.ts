import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers typically used in auth requests
  })
);
app.options(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-gpt-clone-seven-eta.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
