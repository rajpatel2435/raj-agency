import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Client } from 'appwrite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
