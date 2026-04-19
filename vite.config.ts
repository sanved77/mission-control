import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

const isLocal = process.env.LOCAL_DEV === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ...(isLocal ? [basicSsl()] : [])],
  server: {
    ...(isLocal && {
      allowedHosts: ['prettycache.local'],
      port: 5173,
      host: true,
    }),
  },
})
