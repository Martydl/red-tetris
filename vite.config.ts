/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ["text", "html"],
    },
  },
});
