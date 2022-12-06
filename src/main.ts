import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pinia from './pinia/store'
import 'element-plus/dist/index.css'

const app = createApp(App).use(store).use(router).use(pinia)

app.config.warnHandler = () => null
app.mount('#app')
