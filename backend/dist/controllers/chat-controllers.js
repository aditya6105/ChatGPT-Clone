import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessageRoleEnum, } from "openai";
import { Types } from "mongoose";
// Generates a new chat completion using OpenAI API
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        // Initialize `user.chats` as an empty DocumentArray if undefined
        if (!user.chats) {
            user.chats = new Types.DocumentArray([]);
        }
        // Map `user.chats` to match `ChatCompletionRequestMessage` type
        const chats = user.chats
            ? user.chats.map(({ role, content }) => ({
                role: role, // Cast role to expected enum type
                content,
            }))
            : [];
        // Push user message to `chats`
        chats.push({
            content: message,
            role: ChatCompletionRequestMessageRoleEnum.User,
        });
        user.chats?.push({
            content: message,
            role: "user",
            id: new Types.ObjectId().toString(),
        });
        // Configure and call OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // Process AI response
        const aiMessage = chatResponse.data.choices[0]?.message;
        if (aiMessage) {
            user.chats?.push({
                content: aiMessage.content,
                role: aiMessage.role, // Cast the role to match mongoose schema if needed
                id: new Types.ObjectId().toString(),
            });
            await user.save();
            return res.status(200).json({ chats: user.chats });
        }
        else {
            return res.status(500).json({ message: "AI response missing" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: "Something went wrong", cause: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
// Deletes all chats for the authenticated user
export const deleteChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // Clear the chats array
        user.chats?.splice(0, user.chats.length);
        await user.save();
        res.status(200).json({ message: "All chats deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete chats" });
    }
};
// Sends all chats to the authenticated user
export const sendChatsToUser = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.status(200).json({ chats: user.chats || [] });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve chats" });
    }
};
//# sourceMappingURL=chat-controllers.js.map