import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // const htmlPlugin = () => {
  //   return {
  //     name: "html-transform",
  //     transformIndexHtml(html: string) {
  //       const r = html.replace(/<%\s(.*?)\s%>/g, (match, p1) => {
  //         return env[p1]
  //       })
  //       console.log(r)
  //       return r
  //     },
  //   }
  // }
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        // minify: true,
        inject: {
          data: {
            title: 'ทดสอบ',
            injectScript: `<script src="./inject.js"></script>`,
          },
        },
      }),
    ]
  }
})
