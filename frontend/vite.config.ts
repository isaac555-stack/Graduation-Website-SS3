import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Since you have tailwindcss v4 in package.json
import path from "path";

export default defineConfig({
  // FIX: Forces absolute asset paths across deep router refreshes
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
