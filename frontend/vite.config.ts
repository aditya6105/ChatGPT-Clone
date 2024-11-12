import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Assuming your backend is running on http://localhost:5000
      "/api": "http://localhost:5000", // Change this to your actual backend URL during local development
    },
  },
});
