import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const mode: string = "development"
const env = loadEnv(mode, process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env" : env
  },
  plugins: [react()],
})
