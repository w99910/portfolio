import { defineConfig } from "vite";

export default defineConfig({
  server:{
    open:'./dev.html',
  },
  build: {
    outDir: "./",
  },
})