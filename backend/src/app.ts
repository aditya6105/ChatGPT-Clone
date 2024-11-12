import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN || "Not set");
// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // Set this to the Vercel URL for production, or localhost for local testing
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Temporary Test Route for CLIENT_ORIGIN
app.get("/check-origin", (req, res) => {
  res.send(
    `CLIENT_ORIGIN is set to: ${process.env.CLIENT_ORIGIN || "Not set"}`
  );
});

// Log requests in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
