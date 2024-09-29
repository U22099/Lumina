import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
  // https://vitejs.dev/config/
export default defineConfig({
  base: "/Lumina",
  plugins: [react(),
  VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lumina AI Chatbot',
        short_name: 'Lumina AI',
        description: 'Lumina AI is a cutting-edge, multi-modal AI chatbot powered by Gemini API and designed by Swag. Programmed by full-stack web developer Daniel, Lumina combines advanced natural language processing (NLP) with creative and compassionate communication to provide insightful and engaging conversations. Whether you need help with coding, design, brainstorming, or just a friendly chat, Lumina is here to assist you',
        background_color: '#1c1c22', 
        display: 'standalone', 
        start_url: '/Lumina',
        scope: '/',
        orientation: 'portrait',
        theme_color: '#1c1c22',
        permissions: ['microphone', 'speechSynthesis'],
        icons: [ 
			{ 
				src: "pwa-64x64.png", 
				sizes: "64x64", 
				type: "image/png" 
			}, 
			{ 
				src: "pwa-192x192.png", 
				sizes: "192x192", 
				type: "image/png" 
			},
			{ 
				src: "pwa-512x512.png", 
				sizes: "512x512", 
				type: "image/png" 
			}, 
			{ 
				src: "maskable-icon-512x512.png", 
				sizes: "512x512", 
				type: "image/png", 
				purpose: "maskable"
			}
		] 
      }
    })
    ],
  assetsInclude: ["**/*.{JPG,PNG,jpg,png}"],
  optimizeDeps:{
    override: true
  }
})
