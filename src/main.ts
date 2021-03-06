import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Cleave from 'cleave.js'
import router from './router'
import './assets/styles/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBuilding as fasBuilding, faSackDollar as fasSackDollar } from '@fortawesome/free-solid-svg-icons'

library.add(fasBuilding, fasSackDollar)

const pinia = createPinia()
const app = createApp(App)

app.directive('cleave', {
  mounted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {})
  },
  updated: (el) => {
    const event = new Event('input', { bubbles: true })
    setTimeout(function () {
      el.value = el.cleave.properties.result
      el.dispatchEvent(event)
    }, 100)
  }
})

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
