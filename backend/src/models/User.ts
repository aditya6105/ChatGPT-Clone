import mongoose from "mongoose";
import { randomUUID } from "crypto";

// Define the Chat schema
const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID,
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Define the User schema with chats as an embedded array
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatSchema],
    default: undefined, // Use `undefined` to initialize as empty DocumentArray
  },
});

export default mongoose.model("User", userSchema);
