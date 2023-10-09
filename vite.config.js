import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Markdown from "vite-plugin-md";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Markdown({
      include: "**/*.md",
    }),
  ],
  assetsInclude: ["**/*.md", "**/*.ttc"],
});
