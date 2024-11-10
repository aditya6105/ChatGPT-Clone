import axios from "axios";

// Create an instance of axios with the backend URL as the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Include credentials like cookies in cross-origin requests
});

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return res.data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await api.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return res.data;
};
