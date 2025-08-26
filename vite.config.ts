import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/Rozvazej.Registration/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "multi-step.js",
        assetFileNames: "multi-step[extname]",
      },
    },
  },
});
