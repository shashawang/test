import { createApp } from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap';
import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
import axios from "./utils/http.js"
import '/public/UEditor/ueditor.config.js'
import '/public/UEditor/ueditor.all.min.js'
import '/public/UEditor/lang/zh-cn/zh-cn.js'
import '/public/UEditor/ueditor.parse.min.js'

// createApp(App).mount('#app')
const app = createApp(App)
app.config.globalProperties.$api = axios;
app.use(router)
app.use(ElementUI)
app.mount('#app')
