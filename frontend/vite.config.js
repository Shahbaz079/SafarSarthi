import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{

    proxy:{
     "/api/":"https://safarsarthi-backend.onrender.com/",
     "/uploads/":"https://safarsarthi-backend.onrender.com/",
     "/payUploads/":"https://safarsarthi-backend.onrender.com/"
    },
  },
})
