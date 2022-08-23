import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'

const app = createApp(App).use(store).use(router)

app.config.warnHandler = () => null
app.mount('#app')
