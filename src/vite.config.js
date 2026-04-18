import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/global-wealth-github/",
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: {
        enter: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home.html"),
        about: resolve(__dirname, "about.html"),
        "wealth-distribution": resolve(__dirname, "wealth-distribution.html"),
        "world-map": resolve(__dirname, "world-map.html"),
      },
    },
  },
});
