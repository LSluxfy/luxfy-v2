import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: mode === "development"
      ? {
          "/qr": {
            target: "http://localhost:3000", // proxy apenas no dev
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
}))
