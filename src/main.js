import './assets/all.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createPinia } from 'pinia'

library.add(faTimes)
library.add(faPlus)

const app = createApp(App)
const pinia = createPinia()

app.use(router)

app.use(VueSweetalert2)
// 全局註冊FontAwesomeIcon組件
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)

app.mount('#app')
