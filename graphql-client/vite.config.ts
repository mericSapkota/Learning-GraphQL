import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    //rick and morty api is used for testing purposes, you can replace it with your own graphql server
    // proxy: {
    //   "/graphql": {
    //     target: "https://rickandmortyapi.com",
    //     changeOrigin: true,
    //     secure: true,
    //   },
    // },
    // proxy: {
    //   "/": {
    //     target: "http://localhost:4000",
    //     changeOrigin: true,
    //     secure: true,
    //   },
    // },
  },
});
