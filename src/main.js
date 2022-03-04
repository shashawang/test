import { createApp } from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap';
import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
import axios from "./utils/http.js"

// createApp(App).mount('#app')
const app = createApp(App)
app.config.globalProperties.$api = axios;
app.use(router)
app.use(ElementUI)
app.mount('#app')
