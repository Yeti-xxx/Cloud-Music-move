import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  // 跨域
  server: {
    cors: true, // 默认启用并允许任何源
    proxy: {
      '/agent': {
        target: 'https://service-mlkn7ujm-1310291392.gz.apigw.tencentcs.com/release/',
          //原先接口部署在vercel上，虽然免费但是太慢了......
        changeOrigin: true,
      },
    }
  },
  base:'./'
})