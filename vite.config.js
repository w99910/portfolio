import { defineConfig } from "vite";

export default defineConfig({
  server:{
    open:'./src/index.html',
  },
  build: {
    outDir: "./",
    rollupOptions:{
      input:'./src/index.html'
    }
  },
})