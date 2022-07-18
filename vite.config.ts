import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_PAGE_TITLE,
            description: env.VITE_APP_PAGE_DESCRIPTION,
            rootUrl: env.VITE_APP_ROOT_URL,
          },
        },
      }),
    ],
  })
}
