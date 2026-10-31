import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const r = p => fileURLToPath(new URL(p, import.meta.url))

// Two pages: the booking page (index.html) and the thank-you page (thank-you.html → /thank-you)
export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: { main: r('./index.html'), thanks: r('./thank-you.html') } } },
})
