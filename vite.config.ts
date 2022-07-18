import { defineConfig } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
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

export default defineConfig({
  plugins: [vue()]
})
