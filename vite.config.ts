import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [
        // "offline.html",
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        theme_color: "#001449",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/WorkOutTrackingApp/",
        start_url: "/WorkOutTrackingApp/",
        name: "Workout App",
        short_name: "Workout App",
        description: "An app to record the workout and foods history",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
