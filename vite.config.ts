import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginHtmlEnv from 'vite-plugin-html-env'

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd())
  // const htmlPlugin = () => {
  //   return {
  //     name: "html-transform",
  //     transformIndexHtml(html: string) {
  //       // const r = html.replace(/<%\s(.*?)\s%>/g, (match, p1) => {
  //       //   return env[p1]
  //       // })
  //       // console.log(r)
  //       // return r
  //       // const reg = new RegExp(`(${prefix}|<%)\\s+(\\w+)\\s+(${suffix}|\/>)`, 'g')
  //       // return html.replace(reg, (...arg) => {
  //       //   const key = arg[2]
  //       //   return `${map[key]}`
  //       // })
  //     },
  //   }
  // }
  return {
    plugins: [
      vue(),
      VitePluginHtmlEnv(),
    ]
  }
})
