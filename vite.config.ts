import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const htmlPlugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html: string) {
        return html.replace(/<%(.*?)%>/g, function (match, p1) {
          return env[p1]
        })
      },
    }
  }
  console.log('env', env)
  return {
    plugins: [
      vue(),
      htmlPlugin()
    ]
  }
})
