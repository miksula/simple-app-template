import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  plugins: [devtoolsJson()],
  server: {
    proxy: {
      "/api": "http://localhost:8001",
    },
  },
});
