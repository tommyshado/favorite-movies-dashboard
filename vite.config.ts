import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      MOVIES_API_KEY: process.env.MOVIES_API_KEY,
    },
  },
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 to allow external access
    port: 3000,      // Ensure the correct port is used
  },
});
