import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Markdown from "vite-plugin-md";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Markdown({
      include: "**/*.md",
    }),
    copy({
      targets: [
        { src: "src/site/notes/*", dest: "public/notes" },
        { src: "./graphData.json", dest: "public" },
      ],
      hook: "writeBundle",
    }),
  ],
  assetsInclude: ["**/*.md", "**/*.ttc"],
});
