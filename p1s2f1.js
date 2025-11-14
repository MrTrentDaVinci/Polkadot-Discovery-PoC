// p1s2f1.js
// Component: Cp1s2f1.1 (ViteConfig)
// Purpose: Configures Vite build and development server to support SCIS filenames and custom HTML entry
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "./",
  publicDir: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: resolve(__dirname, "p1s0f1.html"),
    },
  },
  resolve: {
    alias: {
      p0s0f1: "/p0s0f1.js",
      p0s0f4: "/p0s0f4.js",
      p0s0f5: "/p0s0f5.js",
      p0s0f6: "/p0s0f6.js",
      p0s1f1: "/p0s1f1.js",
      p0s2f1: "/p0s2f1.js",
      p0s2f2: "/p0s2f2.js",
      p0s2f3: "/p0s2f3.js",
      p1s0f2: "/p1s0f2.jsx",
      p1s0f3: "/p1s0f3.jsx",
      p1s0f4: "/p1s0f4.jsx",
      p1s0f5: "/p1s0f5.jsx",
      p1s0f6: "/p1s0f6.jsx",
      p1s0f7: "/p1s0f7.css",
      p1s0f8: "/p1s0f8.jsx",
      p1s1f1: "/p1s1f1.json",
      p1s1f2: "/p1s1f2.json",
      p1s1f3: "/p1s1f3.json",
      p1s1f4: "/p1s1f4.json",
      p1s1f5: "/p1s1f5.json",
      p1s1f6: "/p1s1f6.json",
      p1s2f1: "/p1s2f1.js",
      p1s2f2: "/p1s2f2.js",
      p1s2f3: "/p1s2f3.json",
      p1s3f1: "/p1s3f1.js",
      p1s3f2: "/p1s3f2.js",
      package: "/package.json",
    },
  },
  server: {
    open: "/p1s0f1.html",
    fs: {
      strict: false,
    },
    middlewareMode: false,
    watch: {
      usePolling: true, // For file system issues
    },
  },
});
