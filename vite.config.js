import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
  // https://vitejs.dev/config/
export default defineConfig({
  base: "/Lumina",
  plugins: [react(),
  VitePWA({
      manifest: {
        name: 'Lumina',
        short_name: 'lumina',
        description: 'Lumina Ai chatbot',
        theme_color: '#1c1c22',
        icons: [ 
	{ src: "pwa-64x64.png", sizes: "64x64", type: "image/png" }, 
	{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" } 
	{ src: "pwa-512x512.png", sizes: "512x512", type: "image/png" }, 
	{ src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
	] 
      }
    })
    ],
  assetsInclude: ["**/*.{JPG,PNG,jpg,png}"],
  optimizeDeps:{
    override: true
  }
})
