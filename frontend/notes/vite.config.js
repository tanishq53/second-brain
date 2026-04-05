import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Second Brain",
        short_name: "Brain",
        description: "Your personal note app",
        theme_color: "#111111",
        background_color: "#111111",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});