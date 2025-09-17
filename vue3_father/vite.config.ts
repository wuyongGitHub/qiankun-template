import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

// 向 defineConfig 传递对象改为传递方法，并返回配置对象
export default defineConfig(({ mode }) => {
  // mode：获取 --mode 指定的模式，process.cwd()项目根目录,下面 `env` 相当于 `import.meta.env`
  const env = loadEnv(mode, process.cwd())
  return {
    // 开发服务器选项
    server: {
      port: 8080, // //端口号， 如果端口号被占用，会自动提升1
      open: true, //启动服务时自动打开浏览器访问
      host: '0.0.0.0',
      proxy: {
        // 匹配以env.VITE_APP_BASE_API开头的请求，交给代理服务器转换到目标接口
        [env.VITE_APP_BASE_API]: {
          // 代理后的目标地址
          target: env.VITE_APP_SERVICE_URL,
          // 开启代理，是否允许跨域
          changeOrigin: true,
          // /dev-api/xxx => xxx, 将 env.VITE_APP_BASE_AP 替换为 '',也就是 /dev-api 会移除
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueSetupExtend(), // // 让 `<script setup name="xx">` 上 name 作为缓存组件名
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
