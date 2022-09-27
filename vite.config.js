import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 跨域
  server: {
    cors: true, // 默认启用并允许任何源
    proxy: {
      '/agent': {
        target: 'https://netease-cloud-music-api-nxzt.vercel.app',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/agent/, '')
      },
    }
  }
})