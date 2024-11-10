import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { Types } from "mongoose";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Convert the DocumentArray to a plain array of messages for the OpenAI API
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // Add the new message to the chats array
    chats.push({ content: message, role: "user" });

    // Add the new message to the user's `chats` field (Mongoose DocumentArray)
    user.chats.push({
      content: message,
      role: "user",
      id: new Types.ObjectId().toString(),
    });

    // Send the updated chat array to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // Get the response from OpenAI
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    const aiMessage = chatResponse.data.choices[0]?.message;
    if (aiMessage) {
      // Save the AI response to the user's `chats`
      user.chats.push(aiMessage);
      await user.save();
      return res.status(200).json({ chats: user.chats });
    } else {
      return res.status(500).json({ message: "AI response missing" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", cause: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
