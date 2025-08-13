import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// vite.config.js
// export default defineConfig({
//   server: {
//     host: '192.168.7.90', // or '0.0.0.0' for all interfaces
//     port: 5173 // optional
//   }
// });
