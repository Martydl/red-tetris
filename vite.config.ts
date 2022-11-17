/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      exclude: ["**/assets/**", "**/test/**"],
      reporter: ["text", "html"],
    },
  },
});
