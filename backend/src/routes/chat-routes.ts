import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

// Route to create a new chat completion
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

// Route to get all chats for the user
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

// Route to delete all chats for the user
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
