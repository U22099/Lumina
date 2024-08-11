import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import origin from "./config/origin.json"
// https://vitejs.dev/config/
export default defineConfig({
  base: "/Lumina-AI",
  plugins: [react()],
  assetsInclude: ["**/*.{JPG,PNG,jpg,png}"],
  optimizeDeps:{
    override: true
  },
  server: {
    proxy: {
      "/server": {
        target: origin.default.origin,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ""),
      },
    },
  },
})
