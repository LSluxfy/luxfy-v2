import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ mode }) => {
  // carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
    define: {
      // expõe a variável VITE_API_URL para o código cliente
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  }
})
