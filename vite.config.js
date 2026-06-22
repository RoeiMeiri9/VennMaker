import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import checker from "vite-plugin-checker";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [checker({ typescript: true }), svelte()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
