import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: 3000,
  host: '0.0.0.0'
=======
  
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
>>>>>>> 544398113f7bfc2a539f6c5598cf89c040796832
})
