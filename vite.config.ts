import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
  clearScreen: false,
  root: "./src",
  build: {
    outDir: "docs"
  }
});