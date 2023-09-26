///<reference types="vitest"/>
///<reference types="vite/client" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: false,
      provider: "v8",
      reporter: ["text", "html"],
    },
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./setupDomTests.ts"],
  },
  build: {
    assetsDir: "assets",
    emptyOutDir: true,
  },
});
