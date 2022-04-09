import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),

    visualizer({
      filename: './dist/report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          "react-router": path.resolve(
            __dirname,
            "../../packages/react-router/index.tsx"
          ),
          "react-router-dom": path.resolve(
            __dirname,
            "../../packages/react-router-dom/index.tsx"
          ),
        },
      }
    : {},
});
