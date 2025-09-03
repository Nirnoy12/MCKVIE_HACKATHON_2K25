import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removed lovable-tagger branding and plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
