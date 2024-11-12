import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Load environment variables
import { config } from "dotenv";
config();

// Ensure that necessary environment variables are loaded
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not set in environment variables.");
}

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Open on ${PORT} and connected to database`)
    );
  })
  .catch((err) => console.log(err));
