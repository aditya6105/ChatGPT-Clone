import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    const mongoUrl = process.env.MONGODB_URL as string;
    await connect(mongoUrl);
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
