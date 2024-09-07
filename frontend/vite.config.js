import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{

    proxy:{
     "/api/":"https://safarsarthi-backendserve.onrender.com/",
     "/uploads/":"https://safarsarthi-backendserve.onrender.com/",
     "/payUploads/":"https://safarsarthi-backendserve.onrender.com/"
    },
  },
})
