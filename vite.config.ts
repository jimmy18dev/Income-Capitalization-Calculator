import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: 'index',
          },
        },
      })
    ]
  }
})
