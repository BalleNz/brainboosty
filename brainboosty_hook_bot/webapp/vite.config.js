import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const webappRoot = fileURLToPath(new URL(".", import.meta.url));
const packageAssets = path.resolve(webappRoot, "../assets");

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  appType: "spa",
  base: "/",
  root: webappRoot,
  publicDir: path.join(webappRoot, "public"),
  resolve: {
    alias: {
      "@bb-assets": packageAssets,
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: [webappRoot, packageAssets],
    },
    proxy: {
      "/api/webapp": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.join(webappRoot, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 8192,
  },
});
