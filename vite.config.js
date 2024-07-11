import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // vueDevTools(),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios']
  },
  build: {
    sourcemap: true
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@import "@/styles/mixin.scss";'
      }
    }
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      // '/api/': {
      //   target: 'http://8.222.255.108/gs-test',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/api/, '')
      // }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
