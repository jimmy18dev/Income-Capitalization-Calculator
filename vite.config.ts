import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default ({ mode }) => {
//   // const env = loadEnv(mode, process.cwd())
//   return defineConfig({
//     plugins: [
//       vue(),
//       createHtmlPlugin({
//         inject: {
//           data: {
//             title: 'คำนวณราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า',
//             description: 'ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่',
//             rootUrl: 'http://localhost:3000',
//           },
//         },
//       }),
//     ],
//   })
// }

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.ts',
        template: './index.html',
        inject: {
          data: {
            title: 'index',
          },
        },
      })
    ]
  }
})
