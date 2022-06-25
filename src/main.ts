import { createApp } from 'vue'
import App from './App.vue'
import Cleave from 'cleave.js'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.directive('cleave', {
  mounted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {})
  },
  updated: (el) => {
    const event = new Event('input', {bubbles: true})
    setTimeout(function () {
      el.value = el.cleave.properties.result
      el.dispatchEvent(event)
    }, 100)
  }
})

app.use(router)
app.mount('#app')
